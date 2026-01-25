import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Generate comprehensive compliance report
 * Aggregates metrics from applications, alerts, and workflows
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { period = 'monthly', organizationId, format = 'json' } = await req.json();

    // Fetch relevant data
    const [applications, alerts, workflows, cases] = await Promise.all([
      base44.entities.OnboardingApplication.list(),
      base44.entities.AMLAlert.list(),
      base44.entities.Workflow.list(),
      base44.entities.Case.list()
    ]);

    // Calculate metrics
    const totalApplications = applications.length;
    const approvedApplications = applications.filter(a => a.status === 'approved').length;
    const approvalRate = totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0;
    
    const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
    const resolvedAlerts = alerts.filter(a => a.status === 'resolved').length;
    const alertResolutionRate = alerts.length > 0 ? Math.round((resolvedAlerts / alerts.length) * 100) : 0;

    const completedWorkflows = workflows.filter(w => w.status === 'completed').length;
    const failedWorkflows = workflows.filter(w => w.status === 'failed').length;
    const workflowSuccessRate = workflows.length > 0 ? Math.round((completedWorkflows / workflows.length) * 100) : 0;

    const activeCases = cases.filter(c => ['new', 'assigned', 'in_progress'].includes(c.status)).length;
    const resolvedCases = cases.filter(c => c.status === 'resolved').length;

    // Build report
    const report = {
      period,
      generatedAt: new Date().toISOString(),
      generatedBy: user.email,
      summary: {
        totalApplications,
        approvedApplications,
        approvalRate,
        criticalAlerts,
        resolvedAlerts,
        alertResolutionRate,
        completedWorkflows,
        failedWorkflows,
        workflowSuccessRate,
        activeCases,
        resolvedCases
      },
      statusBreakdown: {
        applications: {
          draft: applications.filter(a => a.status === 'draft').length,
          submitted: applications.filter(a => a.status === 'submitted').length,
          underReview: applications.filter(a => a.status === 'under_review').length,
          approved: approvedApplications,
          rejected: applications.filter(a => a.status === 'rejected').length
        }
      },
      alertDetails: {
        bySeverity: {
          critical: alerts.filter(a => a.severity === 'critical').length,
          high: alerts.filter(a => a.severity === 'high').length,
          medium: alerts.filter(a => a.severity === 'medium').length,
          low: alerts.filter(a => a.severity === 'low').length
        },
        byType: {
          sanctionHit: alerts.filter(a => a.type === 'sanction_hit').length,
          pepMatch: alerts.filter(a => a.type === 'pep_match').length,
          adverseMedia: alerts.filter(a => a.type === 'adverse_media').length,
          transactionAnomaly: alerts.filter(a => a.type === 'transaction_anomaly').length,
          highRiskJurisdiction: alerts.filter(a => a.type === 'high_risk_jurisdiction').length
        }
      },
      recommendations: generateRecommendations({
        approvalRate,
        alertResolutionRate,
        workflowSuccessRate,
        criticalAlerts
      })
    };

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: 'report_generation',
      event: `Compliance report generated for period: ${period}`,
      event_type: 'workflow_completed',
      actor: user.email,
      details: { reportType: format, period }
    });

    return Response.json({
      success: true,
      report,
      message: 'Compliance report generated successfully'
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function generateRecommendations(metrics) {
  const recommendations = [];

  if (metrics.approvalRate < 75) {
    recommendations.push({
      priority: 'high',
      category: 'Applications',
      message: 'Approval rate is below target. Review rejection reasons and application quality.'
    });
  }

  if (metrics.alertResolutionRate < 80) {
    recommendations.push({
      priority: 'high',
      category: 'Alerts',
      message: 'Alert resolution rate is low. Increase investigator capacity or optimize review processes.'
    });
  }

  if (metrics.workflowSuccessRate < 90) {
    recommendations.push({
      priority: 'medium',
      category: 'Workflows',
      message: 'Workflow success rate has room for improvement. Check provider integrations.'
    });
  }

  if (metrics.criticalAlerts > 5) {
    recommendations.push({
      priority: 'high',
      category: 'Risk Management',
      message: 'Multiple critical alerts detected. Escalate for immediate review.'
    });
  }

  return recommendations;
}