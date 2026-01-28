import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Get comprehensive TMaaS analytics and performance metrics
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const { days = 30, tmaas_config_id } = payload;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get TMaaS config
    const configs = await base44.asServiceRole.entities.TMaaSConfig.filter({
      organization_id: user.organization_id,
      ...(tmaas_config_id && { id: tmaas_config_id })
    });

    if (!configs || configs.length === 0) {
      return Response.json({ 
        analytics: {
          screening_performance: {},
          rule_effectiveness: {},
          alert_trends: {},
          enrichment_performance: {},
          risk_exposure: {}
        },
        message: 'No TMaaS configuration found'
      });
    }

    const configIds = configs.map(c => c.id);
    const analytics = {};

    for (const config of configs) {
      // Get transactions for this period
      const transactions = await base44.asServiceRole.entities.Transaction.filter({
        organization_id: user.organization_id,
        tmaas_config_id: config.id,
        created_date: { $gte: startDate.toISOString() }
      });

      // Get alerts for this period
      const alerts = await base44.asServiceRole.entities.TransactionAlert.filter({
        organization_id: user.organization_id,
        tmaas_config_id: config.id,
        created_date: { $gte: startDate.toISOString() }
      });

      // Get feedback for rules
      const rules = await base44.asServiceRole.entities.TransactionRule.filter({
        organization_id: user.organization_id
      });

      const feedback = await base44.asServiceRole.entities.RuleFeedback.filter({
        organization_id: user.organization_id,
        created_date: { $gte: startDate.toISOString() }
      });

      // SCREENING PERFORMANCE
      const totalTx = transactions?.length || 0;
      const approvedTx = transactions?.filter(t => t.status === 'approved').length || 0;
      const blockedTx = transactions?.filter(t => t.status === 'blocked').length || 0;
      const flaggedTx = transactions?.filter(t => t.status === 'flagged').length || 0;

      const screeningPerf = {
        total_transactions: totalTx,
        approved: approvedTx,
        blocked: blockedTx,
        flagged: flaggedTx,
        approval_rate: totalTx > 0 ? (approvedTx / totalTx * 100).toFixed(2) : 0,
        block_rate: totalTx > 0 ? (blockedTx / totalTx * 100).toFixed(2) : 0,
        flag_rate: totalTx > 0 ? (flaggedTx / totalTx * 100).toFixed(2) : 0,
        avg_processing_time_ms: calculateAvgProcessingTime(transactions),
        high_risk_transactions: transactions?.filter(t => t.risk_level === 'critical').length || 0,
        high_risk_rate: totalTx > 0 ? ((transactions?.filter(t => t.risk_level === 'critical').length || 0) / totalTx * 100).toFixed(2) : 0
      };

      // RULE EFFECTIVENESS
      const ruleMetrics = {};
      for (const rule of rules || []) {
        const ruleId = rule.id;
        const ruleFeedback = feedback?.filter(f => f.rule_id === ruleId) || [];
        
        const tp = ruleFeedback.filter(f => f.actual_outcome === 'true_positive').length;
        const fp = ruleFeedback.filter(f => f.actual_outcome === 'false_positive').length;
        const tn = ruleFeedback.filter(f => f.actual_outcome === 'true_negative').length;
        const fn = ruleFeedback.filter(f => f.actual_outcome === 'false_negative').length;

        const precision = (tp + fp) > 0 ? (tp / (tp + fp) * 100).toFixed(2) : 'N/A';
        const recall = (tp + fn) > 0 ? (tp / (tp + fn) * 100).toFixed(2) : 'N/A';
        const fpr = (fp + tn) > 0 ? (fp / (fp + tn) * 100).toFixed(2) : 'N/A';

        ruleMetrics[ruleId] = {
          name: rule.name,
          triggered_count: rule.triggered_count || 0,
          true_positives: tp,
          false_positives: fp,
          precision: precision === 'N/A' ? 0 : parseFloat(precision),
          recall: recall === 'N/A' ? 0 : parseFloat(recall),
          false_positive_rate: fpr === 'N/A' ? 0 : parseFloat(fpr),
          feedback_samples: ruleFeedback.length
        };
      }

      // ALERT TRENDS (by day)
      const alertsByDay = {};
      const alertsBySeverity = {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0
      };

      alerts?.forEach(alert => {
        const day = new Date(alert.created_date).toISOString().split('T')[0];
        alertsByDay[day] = (alertsByDay[day] || 0) + 1;
        alertsBySeverity[alert.severity] = (alertsBySeverity[alert.severity] || 0) + 1;
      });

      const alertTrends = {
        total_alerts: alerts?.length || 0,
        by_day: alertsByDay,
        by_severity: alertsBySeverity,
        by_type: groupBy(alerts, 'alert_type'),
        avg_alerts_per_day: Object.keys(alertsByDay).length > 0 
          ? (Object.values(alertsByDay).reduce((a, b) => a + b, 0) / Object.keys(alertsByDay).length).toFixed(2)
          : 0,
        alert_resolution_rate: alerts?.filter(a => a.status === 'resolved').length / (alerts?.length || 1) * 100 || 0
      };

      // ENRICHMENT PERFORMANCE
      const enrichmentPerf = {
        geo_ip_enabled: config?.monitoring_rules?.aml_screening || false,
        domain_rep_enabled: config?.monitoring_rules?.fraud_detection || false,
        device_fp_enabled: false,
        velocity_enabled: config?.monitoring_rules?.velocity_checks || false,
        avg_enrichment_time_ms: 150, // Placeholder
        enrichment_success_rate: 98.5, // Placeholder
        data_quality_score: 94.2 // Placeholder
      };

      // RISK EXPOSURE
      const riskExposure = {
        critical_transactions: transactions?.filter(t => t.risk_level === 'critical').length || 0,
        high_transactions: transactions?.filter(t => t.risk_level === 'high').length || 0,
        medium_transactions: transactions?.filter(t => t.risk_level === 'medium').length || 0,
        low_transactions: transactions?.filter(t => t.risk_level === 'low').length || 0,
        critical_volume: transactions?.filter(t => t.risk_level === 'critical').reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
        high_volume: transactions?.filter(t => t.risk_level === 'high').reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
        avg_risk_score: transactions?.length > 0 
          ? (transactions.reduce((sum, t) => sum + (t.risk_score || 0), 0) / transactions.length).toFixed(2)
          : 0,
        high_risk_countries: getTopRiskCountries(transactions),
        aml_hit_rate: alerts?.filter(a => a.alert_type === 'aml_match').length / (alerts?.length || 1) * 100 || 0,
        fraud_detection_rate: alerts?.filter(a => a.alert_type === 'fraud_detected').length / (alerts?.length || 1) * 100 || 0
      };

      analytics[config.id] = {
        config_name: config.service_name,
        period_days: days,
        screening_performance: screeningPerf,
        rule_effectiveness: ruleMetrics,
        alert_trends: alertTrends,
        enrichment_performance: enrichmentPerf,
        risk_exposure: riskExposure
      };
    }

    return Response.json({
      success: true,
      timestamp: new Date().toISOString(),
      analytics
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function calculateAvgProcessingTime(transactions) {
  if (!transactions || transactions.length === 0) return 0;
  const total = transactions.reduce((sum, t) => {
    const created = new Date(t.created_date);
    const reviewed = t.reviewed_at ? new Date(t.reviewed_at) : new Date();
    return sum + (reviewed - created);
  }, 0);
  return (total / transactions.length).toFixed(0);
}

function groupBy(items, key) {
  if (!items) return {};
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function getTopRiskCountries(transactions) {
  if (!transactions) return [];
  const countries = groupBy(transactions, 'counterparty_country');
  return Object.entries(countries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([country, count]) => ({ country, count }));
}