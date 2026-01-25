import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Admin can pass organizationId, regular users get their own org
    const url = new URL(req.url);
    const requestedOrgId = url.searchParams.get('organizationId');
    
    const orgId = requestedOrgId && user.role === 'admin' ? requestedOrgId : user.organization_id;

    if (!orgId) {
      return Response.json({ error: 'No organization found for user' }, { status: 404 });
    }

    // Verify access (admin can access any org, regular users only their own)
    if (!user.role === 'admin' && user.organization_id !== orgId) {
      return Response.json({ error: 'Forbidden: Cannot access other organizations' }, { status: 403 });
    }

    // Fetch organization
    const orgs = await base44.entities.Organization.filter({ id: orgId });
    const org = orgs[0];

    if (!org) {
      return Response.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Fetch org-scoped data
    const applications = await base44.entities.OnboardingApplication.filter({ organization_id: orgId });
    const workflows = await base44.entities.Workflow.filter({ organization_id: orgId });
    const alerts = await base44.entities.AMLAlert.filter({ organization_id: orgId });
    const users = await base44.entities.User.filter({ organization_id: orgId });

    return Response.json({
      success: true,
      organization: org,
      data: {
        applications: applications || [],
        workflows: workflows || [],
        alerts: alerts || [],
        users: users || [],
        stats: {
          totalApplications: applications?.length || 0,
          approvedApplications: applications?.filter(a => a.status === 'approved').length || 0,
          activeWorkflows: workflows?.filter(w => w.status === 'in_progress').length || 0,
          criticalAlerts: alerts?.filter(a => a.severity === 'critical').length || 0,
          teamMembers: users?.length || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching organization data:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});