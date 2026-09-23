import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Evaluate complex transaction rules with multiple conditions
 * Returns matching rules and automated actions to take
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const { 
      transaction_id, 
      organization_id,
      transaction_data,
      enriched_data 
    } = payload;

    // Get all active rules for organization, sorted by priority
    const rules = await base44.asServiceRole.entities.TransactionRule.filter({
      organization_id,
      enabled: true
    });

    const sortedRules = (rules || []).sort((a, b) => 
      (a.priority || 10) - (b.priority || 10)
    );

    const triggeredRules = [];
    const automatedActions = [];

    // Evaluate each rule
    for (const rule of sortedRules) {
      if (rule.rule_type === 'simple') {
        // Simple rule: single condition
        if (rule.conditions && rule.conditions.length > 0) {
          const condition = rule.conditions[0];
          if (evaluateCondition(condition, transaction_data, enriched_data)) {
            triggeredRules.push({
              rule_id: rule.id,
              rule_name: rule.name,
              priority: rule.priority
            });

            if (rule.automated_actions) {
              automatedActions.push({
                rule_id: rule.id,
                action_type: rule.automated_actions.action_type,
                priority: rule.automated_actions.escalation_priority,
                assign_to_group: rule.automated_actions.assign_to_group
              });
            }
          }
        }
      } else if (rule.rule_type === 'complex') {
        // Complex rule: multiple conditions with AND/OR logic
        const conditions = rule.conditions || [];
        const logic = rule.logic || 'AND';

        const results = conditions.map(condition =>
          evaluateCondition(condition, transaction_data, enriched_data)
        );

        const isTriggered = logic === 'AND'
          ? results.every(r => r === true)
          : results.some(r => r === true);

        if (isTriggered) {
          triggeredRules.push({
            rule_id: rule.id,
            rule_name: rule.name,
            priority: rule.priority,
            matched_conditions: conditions.length
          });

          if (rule.automated_actions) {
            automatedActions.push({
              rule_id: rule.id,
              action_type: rule.automated_actions.action_type,
              priority: rule.automated_actions.escalation_priority,
              assign_to_group: rule.automated_actions.assign_to_group,
              notify: rule.automated_actions.notify_on_trigger
            });
          }

          // Update rule metrics
          await base44.asServiceRole.entities.TransactionRule.update(rule.id, {
            triggered_count: (rule.triggered_count || 0) + 1,
            last_triggered: new Date().toISOString()
          });
        }
      }
    }

    // Consolidate automated actions (prioritize blocks, then escalations, then flags)
    const actionsByType = {};
    automatedActions.forEach(action => {
      if (!actionsByType[action.action_type]) {
        actionsByType[action.action_type] = [];
      }
      actionsByType[action.action_type].push(action);
    });

    // Determine final action (block > escalate > flag > approve)
    let finalAction = null;
    if (actionsByType.auto_block) {
      finalAction = 'auto_block';
    } else if (actionsByType.escalate_to_case) {
      finalAction = 'escalate_to_case';
    } else if (actionsByType.flag) {
      finalAction = 'flag';
    } else if (actionsByType.auto_approve) {
      finalAction = 'auto_approve';
    }

    return Response.json({
      success: true,
      triggered_rules: triggeredRules,
      final_action: finalAction,
      action_details: actionsByType,
      enrichment_used: Object.keys(enriched_data || {}).filter(k => enriched_data[k])
    });
  } catch (error) {
    console.error('Rule evaluation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function evaluateCondition(condition, txData, enrichedData) {
  const { attribute, operator, value } = condition;
  let txValue = null;

  // Get attribute value from transaction or enriched data
  switch (attribute) {
    case 'amount':
      txValue = txData.amount;
      break;
    case 'country':
      txValue = txData.counterparty_country;
      break;
    case 'currency':
      txValue = txData.currency;
      break;
    case 'transaction_type':
      txValue = txData.type;
      break;
    case 'counterparty_name':
      txValue = txData.counterparty_name;
      break;
    case 'velocity':
      txValue = enrichedData?.velocity_history?.transactions_24h;
      break;
    case 'risk_score':
      txValue = txData.risk_score;
      break;
    case 'device_fingerprint':
      txValue = txData.device_fingerprint;
      break;
    case 'ip_address':
      txValue = enrichedData?.geo_ip?.is_vpn || enrichedData?.geo_ip?.is_proxy ? 1 : 0;
      break;
  }

  if (txValue === null || txValue === undefined) {
    return false;
  }

  // Evaluate operator
  switch (operator) {
    case 'greater_than':
      return parseFloat(txValue) > parseFloat(value);
    case 'less_than':
      return parseFloat(txValue) < parseFloat(value);
    case 'equals':
      return txValue === value || txValue == value;
    case 'contains':
      return String(txValue).includes(String(value));
    case 'in_list':
      return Array.isArray(value) && value.includes(txValue);
    case 'between':
      if (Array.isArray(value) && value.length === 2) {
        return parseFloat(txValue) >= parseFloat(value[0]) && 
               parseFloat(txValue) <= parseFloat(value[1]);
      }
      return false;
    case 'matches_pattern':
      try {
        const regex = new RegExp(value);
        return regex.test(String(txValue));
      } catch {
        return false;
      }
    default:
      return false;
  }
}