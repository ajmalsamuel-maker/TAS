import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transaction_id } = await req.json();

    if (!transaction_id) {
      return Response.json({ error: 'transaction_id is required' }, { status: 400 });
    }

    // Fetch transaction
    const transactions = await base44.entities.Transaction.filter({ id: transaction_id });
    const transaction = transactions[0];

    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Fetch active rules
    const rules = await base44.entities.TransactionRule.filter({ is_active: true });

    let riskScore = 0;
    let flags = [];
    let triggeredRules = [];

    // Evaluate each rule
    for (const rule of rules) {
      const ruleResult = evaluateRule(rule, transaction);
      
      if (ruleResult.triggered) {
        triggeredRules.push(rule.id);
        flags.push(...ruleResult.flags);
        riskScore += ruleResult.riskPoints;

        // Update rule trigger count
        await base44.asServiceRole.entities.TransactionRule.update(rule.id, {
          trigger_count: (rule.trigger_count || 0) + 1,
          last_triggered: new Date().toISOString()
        });

        // Auto-create case if configured
        if (rule.auto_create_case) {
          await base44.functions.invoke('createCaseFromAlert', {
            type: 'transaction_review',
            priority: rule.severity,
            subject: `${rule.name} - Transaction ${transaction.transaction_id || transaction.id}`,
            description: `Transaction flagged by rule: ${rule.name}\nAmount: $${transaction.amount}\nFlags: ${ruleResult.flags.join(', ')}`,
            sla_hours: rule.severity === 'critical' ? 2 : rule.severity === 'high' ? 4 : 24
          });
        }
      }
    }

    // Calculate final risk level
    let riskLevel = 'low';
    if (riskScore >= 80) riskLevel = 'critical';
    else if (riskScore >= 60) riskLevel = 'high';
    else if (riskScore >= 40) riskLevel = 'medium';

    // Determine status
    let status = 'approved';
    if (triggeredRules.length > 0) {
      const criticalRule = rules.find(r => triggeredRules.includes(r.id) && r.action === 'block');
      status = criticalRule ? 'blocked' : 'flagged';
    }

    // Update transaction
    await base44.asServiceRole.entities.Transaction.update(transaction_id, {
      risk_score: riskScore,
      risk_level: riskLevel,
      status,
      flags,
      triggered_rules: triggeredRules,
      screening_results: {
        screened_at: new Date().toISOString(),
        rules_evaluated: rules.length,
        rules_triggered: triggeredRules.length
      }
    });

    // Run fraud detection
    if (triggeredRules.length > 0 || riskScore > 50) {
      await base44.functions.invoke('detectFraud', {
        transaction_id: transaction_id
      });
    }

    return Response.json({
      success: true,
      risk_score: riskScore,
      risk_level: riskLevel,
      status,
      flags,
      triggered_rules: triggeredRules.length
    });

  } catch (error) {
    console.error('Transaction screening error:', error);
    return Response.json({ 
      error: 'Screening failed', 
      details: error.message 
    }, { status: 500 });
  }
});

function evaluateRule(rule, transaction) {
  const result = { triggered: false, flags: [], riskPoints: 0 };
  const conditions = rule.conditions;

  switch (rule.rule_type) {
    case 'amount_threshold':
      if (conditions.amount_min && transaction.amount < conditions.amount_min) {
        result.triggered = true;
        result.flags.push(`Below minimum threshold ($${conditions.amount_min})`);
        result.riskPoints = 20;
      }
      if (conditions.amount_max && transaction.amount > conditions.amount_max) {
        result.triggered = true;
        result.flags.push(`Exceeds maximum threshold ($${conditions.amount_max})`);
        result.riskPoints = 40;
      }
      break;

    case 'geographic':
      const highRiskCountries = conditions.high_risk_jurisdictions || [];
      if (transaction.counterparty_country && highRiskCountries.includes(transaction.counterparty_country)) {
        result.triggered = true;
        result.flags.push(`High-risk jurisdiction: ${transaction.counterparty_country}`);
        result.riskPoints = 50;
      }
      break;

    case 'watchlist':
      if (conditions.watchlist_check && transaction.counterparty_name) {
        const watchlistMatch = checkWatchlist(transaction.counterparty_name);
        if (watchlistMatch) {
          result.triggered = true;
          result.flags.push('Watchlist match detected');
          result.riskPoints = 80;
        }
      }
      break;

    case 'velocity':
      // Simplified velocity check - in production, query recent transactions
      result.triggered = true;
      result.flags.push('Velocity check triggered');
      result.riskPoints = 30;
      break;

    case 'pattern':
      // Pattern detection logic
      if (transaction.amount && transaction.amount % 100 === 0 && transaction.amount > 9000) {
        result.triggered = true;
        result.flags.push('Structured transaction pattern');
        result.riskPoints = 35;
      }
      break;
  }

  return result;
}

function checkWatchlist(name) {
  // Simplified watchlist - in production, check against real sanctions lists
  const watchlist = ['OFAC', 'SANCTIONED', 'BLOCKED'];
  return watchlist.some(item => name.toUpperCase().includes(item));
}