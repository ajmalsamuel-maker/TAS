import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, organizationName } = await req.json();

    if (!applicationId) {
      return Response.json({ error: 'applicationId required' }, { status: 400 });
    }

    // Fetch the application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Create organization
    const org = await base44.entities.Organization.create({
      name: organizationName || application.legal_name,
      legal_name: application.legal_name,
      organization_type: application.entity_category,
      country: application.registry_country_code,
      subscription_tier: 'starter',
      subscription_status: 'trial',
      contact_email: application.contact_person_email || application.email,
      contact_phone: application.contact_person_tel,
      is_active: true,
      onboarding_completed: false,
      trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    // Update application with organization_id
    await base44.entities.OnboardingApplication.update(applicationId, {
      organization_id: org.id
    });

    // Update user with organization_id
    await base44.auth.updateMe({
      organization_id: org.id
    });

    return Response.json({
      success: true,
      organization: org,
      message: 'Organization created successfully'
    });
  } catch (error) {
    console.error('Error creating organization:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});