import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || !user.organization_id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const configId = url.searchParams.get('configId');
    const timePeriod = url.searchParams.get('timePeriod') || '30'; // days

    // Get TMaaS config
    let configs = [];
    if (configId) {
      configs = await base44.entities.TMaaSConfig.filter({ 
        id: configId,
        organization_id: user.organization_id 
      });
    } else {
      configs = await base44.entities.TMaaSConfig.filter({ 
        organization_id: user.organization_id 
      });
    }

    if (!configs || configs.length === 0) {
      return Response.json({ error: 'No TMaaS configurations found' }, { status: 404 });
    }

    const config = configs[0];

    // Get transactions for the time period
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timePeriod));

    const transactions = await base44.entities.Transaction.filter({
      tmaas_config_id: config.id,
      organization_id: user.organization_id,
      created_date: { $gte: startDate.toISOString() }
    });

    // Get rules and calculate effectiveness
    const rules = await base44.entities.TransactionRule.filter({
      organization_id: user.organization_id,
      enabled: true
    });

    // Get alerts
    const alerts = await base44.entities.TransactionAlert.filter({
      tmaas_config_id: config.id,
      organization_id: user.organization_id
    });

    // Calculate metrics
    const totalTransactions = transactions?.length || 0;
    const approvedCount = transactions?.filter(t => t.status === 'approved').length || 0;
    const blockedCount = transactions?.filter(t => t.status === 'blocked').length || 0;
    const flaggedCount = transactions?.filter(t => t.status === 'flagged').length || 0;

    const avgRiskScore = totalTransactions > 0
      ? Math.round(transactions.reduce((sum, t) => sum + (t.risk_score || 0), 0) / totalTransactions)
      : 0;

    // Rule effectiveness
    const ruleEffectiveness = rules?.map(rule => ({
      rule_id: rule.id,
      rule_name: rule.name,
      triggered_count: transactions?.filter(t => t.triggered_rules?.includes(rule.id)).length || 0,
      effectiveness: rule.performance_metrics?.precision || 0
    })) || [];

    // Alert trends (daily breakdown)
    const alertTrends = {};
    alerts?.forEach(alert => {
      const date = new Date(alert.created_date).toLocaleDateString();
      alertTrends[date] = (alertTrends[date] || 0) + 1;
    });

    // Risk exposure analysis
    const riskLevels = {
      low: transactions?.filter(t => t.risk_level === 'low').length || 0,
      medium: transactions?.filter(t => t.risk_level === 'medium').length || 0,
      high: transactions?.filter(t => t.risk_level === 'high').length || 0,
      critical: transactions?.filter(t => t.risk_level === 'critical').length || 0
    };

    return Response.json({
      success: true,
      config_id: config.id,
      config_name: config.service_name,
      time_period: `${timePeriod} days`,
      
      screening_performance: {
        total_transactions: totalTransactions,
        approved: approvedCount,
        blocked: blockedCount,
        flagged: flaggedCount,
        approval_rate: totalTransactions > 0 ? Math.round((approvedCount / totalTransactions) * 100) : 0,
        block_rate: totalTransactions > 0 ? Math.round((blockedCount / totalTransactions) * 100) : 0,
        flag_rate: totalTransactions > 0 ? Math.round((flaggedCount / totalTransactions) * 100) : 0,
        avg_risk_score: avgRiskScore
      },

      rule_effectiveness: ruleEffectiveness,

      alert_trends: {
        total_alerts: alerts?.length || 0,
        daily_breakdown: alertTrends,
        by_type: {
          aml_match: alerts?.filter(a => a.alert_type === 'aml_match').length || 0,
          fraud_detected: alerts?.filter(a => a.alert_type === 'fraud_detected').length || 0,
          velocity_exceeded: alerts?.filter(a => a.alert_type === 'velocity_exceeded').length || 0,
          amount_threshold: alerts?.filter(a => a.alert_type === 'amount_threshold').length || 0,
          rule_triggered: alerts?.filter(a => a.alert_type === 'rule_triggered').length || 0
        },
        by_severity: {
          low: alerts?.filter(a => a.severity === 'low').length || 0,
          medium: alerts?.filter(a => a.severity === 'medium').length || 0,
          high: alerts?.filter(a => a.severity === 'high').length || 0,
          critical: alerts?.filter(a => a.severity === 'critical').length || 0
        }
      },

      risk_exposure: {
        by_level: riskLevels,
        distribution: totalTransactions > 0 ? {
          low_pct: Math.round((riskLevels.low / totalTransactions) * 100),
          medium_pct: Math.round((riskLevels.medium / totalTransactions) * 100),
          high_pct: Math.round((riskLevels.high / totalTransactions) * 100),
          critical_pct: Math.round((riskLevels.critical / totalTransactions) * 100)
        } : {}
      },

      enrichment_data: {
        aml_checks_performed: transactions?.filter(t => t.screening_results?.aml_score > 0).length || 0,
        fraud_checks_performed: transactions?.filter(t => t.screening_results?.fraud_score > 0).length || 0,
        avg_aml_score: transactions?.length > 0 
          ? Math.round(transactions.reduce((sum, t) => sum + (t.screening_results?.aml_score || 0), 0) / transactions.length)
          : 0,
        avg_fraud_score: transactions?.length > 0
          ? Math.round(transactions.reduce((sum, t) => sum + (t.screening_results?.fraud_score || 0), 0) / transactions.length)
          : 0
      }
    });

  } catch (error) {
    console.error('TMaaS analytics error:', error);
    return Response.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
});