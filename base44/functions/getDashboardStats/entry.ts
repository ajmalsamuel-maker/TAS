import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = user.role === 'admin';

    // Get workflows
    const workflows = isAdmin 
      ? await base44.asServiceRole.entities.Workflow.list()
      : await base44.entities.Workflow.filter({ user_id: user.id });

    // Get AML alerts
    const alerts = isAdmin
      ? await base44.asServiceRole.entities.AMLAlert.list()
      : await base44.entities.AMLAlert.filter({ user_id: user.id });

    // Get applications (admin only)
    const applications = isAdmin
      ? await base44.asServiceRole.entities.OnboardingApplication.list()
      : [];

    // Get providers (admin only)
    const providers = isAdmin
      ? await base44.asServiceRole.entities.Provider.list()
      : [];

    // Calculate stats
    const stats = {
      total_workflows: workflows.length,
      completed_workflows: workflows.filter(w => w.status === 'completed').length,
      in_progress_workflows: workflows.filter(w => w.status === 'in_progress').length,
      failed_workflows: workflows.filter(w => w.status === 'failed').length,
      
      total_alerts: alerts.length,
      new_alerts: alerts.filter(a => a.status === 'new').length,
      critical_alerts: alerts.filter(a => a.severity === 'critical').length,
      high_alerts: alerts.filter(a => a.severity === 'high').length,
      
      workflows_by_type: {
        kyb: workflows.filter(w => w.type === 'kyb').length,
        aml: workflows.filter(w => w.type === 'aml').length,
        vlei_issuance: workflows.filter(w => w.type === 'vlei_issuance').length,
        did_verification: workflows.filter(w => w.type === 'did_verification').length
      }
    };

    if (isAdmin) {
      stats.total_applications = applications.length;
      stats.pending_applications = applications.filter(a => a.status === 'submitted').length;
      stats.approved_applications = applications.filter(a => a.status === 'approved').length;
      
      stats.active_providers = providers.filter(p => p.status === 'active').length;
      stats.total_providers = providers.length;
    }

    // Calculate monthly trends (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthWorkflows = workflows.filter(w => {
        const created = new Date(w.created_date);
        return created >= monthStart && created <= monthEnd;
      });

      monthlyData.push({
        month: monthStart.toISOString().slice(0, 7),
        workflows: monthWorkflows.length,
        revenue: monthWorkflows.length * 50 // Simplified revenue calculation
      });
    }

    return Response.json({
      status: 'success',
      stats,
      monthly_data: monthlyData,
      recent_workflows: workflows.slice(0, 10),
      recent_alerts: alerts.slice(0, 10)
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});