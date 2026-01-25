import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get applications created by this user, scoped to their organization
    const applications = await base44.entities.OnboardingApplication.filter({
      created_by: user.email
    });

    // If user has org_id, filter further (safety check for multi-tenancy)
    let filtered = applications;
    if (user.organization_id) {
      filtered = applications.filter(app => app.organization_id === user.organization_id || !app.organization_id);
    }

    // Sort by created_date descending
    filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    return Response.json({
      success: true,
      applications: filtered || [],
      count: filtered?.length || 0
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});