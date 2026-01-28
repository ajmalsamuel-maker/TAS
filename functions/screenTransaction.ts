import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Screen a transaction against AML, fraud, and custom rules
 * Called when transaction arrives via TMaaS webhook
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const { transaction_id, amount, currency, type, from_account, to_account, counterparty_name, counterparty_country, ip_address } = payload;

    // Validate required fields
    if (!transaction_id || !amount || !type) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get TMaaS config for this organization
    const configs = await base44.asServiceRole.entities.TMaaSConfig.filter({
      organization_id: user.organization_id
    });

    if (!configs || configs.length === 0) {
      return Response.json({ error: 'TMaaS not configured' }, { status: 400 });
    }

    const config = configs[0];
    const rules = config.monitoring_rules || {};

    // Initialize screening results
    const screeningResults = {
      aml_score: 0,
      fraud_score: 0,
      aml_matches: [],
      fraud_indicators: []
    };

    let risk_score = 0;
    const triggered_rules = [];
    const flags = [];

    // 1. AML SCREENING
    if (rules.aml_screening) {
      try {
        const amlKey = Deno.env.get('AMLWATCHER_API_KEY');
        if (amlKey) {
          const amlResponse = await fetch('https://api.amlwatcher.com/screen', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${amlKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: counterparty_name,
              country: counterparty_country,
              transaction_amount: amount
            })
          });

          if (amlResponse.ok) {
            const amlData = await amlResponse.json();
            screeningResults.aml_score = amlData.risk_score || 0;
            screeningResults.aml_matches = amlData.matches || [];
            risk_score += amlData.risk_score || 0;
            if (amlData.matches && amlData.matches.length > 0) {
              flags.push('aml_match');
            }
          }
        }
      } catch (error) {
        console.error('AML screening error:', error);
      }
    }

    // 2. FRAUD DETECTION (Velocity checks, anomalies)
    if (rules.fraud_detection) {
      try {
        // Count recent transactions from same account
        const recentTxs = await base44.asServiceRole.entities.Transaction.filter({
          from_account: from_account,
          created_date: { $gte: new Date(Date.now() - 3600000).toISOString() }
        });

        const recentCount = recentTxs?.length || 0;
        const recentAmount = recentTxs?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0;

        // Simple fraud scoring
        let fraudScore = 0;
        const indicators = [];

        // High velocity
        if (recentCount > 5) {
          fraudScore += 15;
          indicators.push('high_velocity');
        }

        // Large amount
        if (amount > 100000) {
          fraudScore += 10;
          indicators.push('large_amount');
        }

        // Rapid succession
        if (recentCount > 2 && recentAmount > 50000) {
          fraudScore += 20;
          indicators.push('rapid_succession');
        }

        screeningResults.fraud_score = fraudScore;
        screeningResults.fraud_indicators = indicators;
        risk_score += fraudScore;
        if (fraudScore > 30) {
          flags.push('fraud_risk');
        }
      } catch (error) {
        console.error('Fraud detection error:', error);
      }
    }

    // 3. EVALUATE CUSTOM RULES
    const ruleResults = await evaluateCustomRules(
      base44,
      user.organization_id,
      { amount, from_account, to_account, counterparty_country, currency },
      triggered_rules
    );

    // 4. DETERMINE STATUS AND ACTIONS
    let status = 'pending';
    let auto_action = null;

    // Auto-approve small, low-risk transactions
    if (risk_score < (rules.auto_approve_threshold || 20) && triggered_rules.length === 0) {
      status = 'approved';
      auto_action = 'auto_approved';
    }
    // Auto-block high-risk or rule-triggered
    else if (risk_score > (rules.auto_block_threshold || 70) || ruleResults.shouldBlock) {
      status = 'blocked';
      auto_action = 'auto_blocked';
      flags.push('blocked');
    }
    // Flag for manual review
    else if (risk_score > 30 || ruleResults.shouldFlag) {
      status = 'flagged';
      flags.push('flagged');
    }

    // 5. CREATE TRANSACTION RECORD
    const txRecord = await base44.asServiceRole.entities.Transaction.create({
      organization_id: user.organization_id,
      transaction_id,
      amount,
      currency,
      type,
      from_account,
      to_account,
      counterparty_name,
      counterparty_country,
      ip_address,
      status,
      risk_score: Math.round(risk_score),
      risk_level: getRiskLevel(risk_score),
      screening_status: 'completed',
      screening_results: screeningResults,
      triggered_rules,
      flags,
      tmaas_config_id: config.id
    });

    // 6. CREATE ALERTS IF NEEDED
    if (status === 'blocked' || status === 'flagged') {
      await base44.asServiceRole.entities.TransactionAlert.create({
        organization_id: user.organization_id,
        transaction_id: txRecord.id,
        tmaas_config_id: config.id,
        alert_type: status === 'blocked' ? 'amount_threshold' : 'rule_triggered',
        severity: status === 'blocked' ? 'critical' : 'high',
        details: {
          risk_score: Math.round(risk_score),
          triggered_rules,
          flags
        },
        transaction_amount: amount,
        transaction_currency: currency
      });

      // Send webhook callback with alert
      if (config.callback_url) {
        await sendCallback(config.callback_url, {
          transaction_id: txRecord.id,
          status,
          risk_score: Math.round(risk_score),
          action: status === 'blocked' ? 'block' : 'flag'
        });
      }
    } else if (config.callback_url) {
      // Send callback with result
      await sendCallback(config.callback_url, {
        transaction_id: txRecord.id,
        status: auto_action || status,
        risk_score: Math.round(risk_score),
        action: 'approve'
      });
    }

    // 7. UPDATE TMaaS stats
    await base44.asServiceRole.entities.TMaaSConfig.update(config.id, {
      transactions_processed: (config.transactions_processed || 0) + 1,
      transactions_blocked: status === 'blocked' ? (config.transactions_blocked || 0) + 1 : config.transactions_blocked,
      transactions_flagged: status === 'flagged' ? (config.transactions_flagged || 0) + 1 : config.transactions_flagged,
      last_transaction_date: new Date().toISOString()
    });

    return Response.json({
      success: true,
      transaction_id: txRecord.id,
      status,
      risk_score: Math.round(risk_score),
      action: auto_action || status
    });
  } catch (error) {
    console.error('Transaction screening error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function evaluateCustomRules(base44, orgId, txData, triggeredRules) {
  try {
    const rules = await base44.asServiceRole.entities.TransactionRule.filter({
      organization_id: orgId,
      enabled: true
    });

    let shouldFlag = false;
    let shouldBlock = false;

    for (const rule of rules || []) {
      const condition = rule.condition;
      const value = rule.value;
      let isTriggered = false;

      switch (rule.type) {
        case 'amount':
          if (condition === 'greater_than' && txData.amount > parseFloat(value)) isTriggered = true;
          if (condition === 'less_than' && txData.amount < parseFloat(value)) isTriggered = true;
          break;
        case 'country':
          if (txData.counterparty_country === value) isTriggered = true;
          break;
        case 'velocity':
          // Handled in screenTransaction
          break;
      }

      if (isTriggered) {
        triggeredRules.push(rule.name);
        if (rule.action === 'flag') shouldFlag = true;
        if (rule.action === 'auto_block') shouldBlock = true;
      }
    }

    return { shouldFlag, shouldBlock };
  } catch (error) {
    console.error('Rule evaluation error:', error);
    return { shouldFlag: false, shouldBlock: false };
  }
}

function getRiskLevel(score) {
  if (score >= 75) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 25) return 'medium';
  return 'low';
}

async function sendCallback(callbackUrl, data) {
  try {
    await fetch(callbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Callback error:', error);
  }
}