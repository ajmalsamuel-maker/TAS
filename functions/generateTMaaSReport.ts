import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Generate TMaaS analytics report
 * Returns transaction metrics, trends, and risk analysis
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const startDate = url.searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = url.searchParams.get('end_date') || new Date().toISOString();

    // Get transactions in date range
    const transactions = await base44.asServiceRole.entities.Transaction.filter({
      organization_id: user.organization_id,
      created_date: { $gte: startDate, $lte: endDate }
    });

    if (!transactions || transactions.length === 0) {
      return Response.json({
        success: true,
        period: { start: startDate, end: endDate },
        summary: {
          total_transactions: 0,
          total_volume: 0,
          approved: 0,
          flagged: 0,
          blocked: 0,
          average_risk_score: 0
        },
        metrics: {}
      });
    }

    // Calculate metrics
    const summary = {
      total_transactions: transactions.length,
      total_volume: transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0),
      approved: transactions.filter(tx => tx.status === 'approved').length,
      flagged: transactions.filter(tx => tx.status === 'flagged').length,
      blocked: transactions.filter(tx => tx.status === 'blocked').length,
      rejected: transactions.filter(tx => tx.status === 'rejected').length,
      average_risk_score: Math.round(
        transactions.reduce((sum, tx) => sum + (tx.risk_score || 0), 0) / transactions.length
      )
    };

    // Risk distribution
    const riskDistribution = {
      low: transactions.filter(tx => tx.risk_level === 'low').length,
      medium: transactions.filter(tx => tx.risk_level === 'medium').length,
      high: transactions.filter(tx => tx.risk_level === 'high').length,
      critical: transactions.filter(tx => tx.risk_level === 'critical').length
    };

    // Top triggered rules
    const ruleMap = {};
    transactions.forEach(tx => {
      if (tx.triggered_rules) {
        tx.triggered_rules.forEach(rule => {
          ruleMap[rule] = (ruleMap[rule] || 0) + 1;
        });
      }
    });

    const topRules = Object.entries(ruleMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([rule, count]) => ({ rule, count }));

    // Trends by day
    const dayMap = {};
    transactions.forEach(tx => {
      const day = new Date(tx.created_date).toISOString().split('T')[0];
      if (!dayMap[day]) {
        dayMap[day] = {
          count: 0,
          volume: 0,
          flagged: 0,
          blocked: 0,
          avg_risk: []
        };
      }
      dayMap[day].count++;
      dayMap[day].volume += tx.amount || 0;
      if (tx.status === 'flagged') dayMap[day].flagged++;
      if (tx.status === 'blocked') dayMap[day].blocked++;
      dayMap[day].avg_risk.push(tx.risk_score || 0);
    });

    const trends = Object.entries(dayMap)
      .map(([date, data]) => ({
        date,
        count: data.count,
        volume: data.volume,
        flagged: data.flagged,
        blocked: data.blocked,
        avg_risk_score: Math.round(
          data.avg_risk.reduce((a, b) => a + b, 0) / data.avg_risk.length
        )
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Top alert types
    const alerts = await base44.asServiceRole.entities.TransactionAlert.filter({
      organization_id: user.organization_id,
      created_date: { $gte: startDate, $lte: endDate }
    });

    const alertTypeMap = {};
    alerts?.forEach(alert => {
      alertTypeMap[alert.alert_type] = (alertTypeMap[alert.alert_type] || 0) + 1;
    });

    const topAlerts = Object.entries(alertTypeMap)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }));

    // Approval rate
    const approvalRate = summary.total_transactions > 0
      ? Math.round((summary.approved / summary.total_transactions) * 100)
      : 0;

    const blockedRate = summary.total_transactions > 0
      ? Math.round((summary.blocked / summary.total_transactions) * 100)
      : 0;

    // Average transaction amount
    const avgTransactionAmount = summary.total_transactions > 0
      ? Math.round(summary.total_volume / summary.total_transactions)
      : 0;

    return Response.json({
      success: true,
      period: { start: startDate, end: endDate },
      summary,
      metrics: {
        approval_rate: approvalRate,
        blocked_rate: blockedRate,
        alert_count: alerts?.length || 0,
        avg_transaction_amount: avgTransactionAmount,
        false_positive_estimate: Math.max(0, approvalRate - 95)
      },
      distribution: {
        by_risk_level: riskDistribution,
        by_status: {
          approved: summary.approved,
          flagged: summary.flagged,
          blocked: summary.blocked,
          rejected: summary.rejected,
          pending: transactions.filter(tx => tx.status === 'pending').length
        }
      },
      top_triggered_rules: topRules,
      top_alert_types: topAlerts,
      trends: trends
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});