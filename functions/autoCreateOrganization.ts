import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { application_id } = await req.json();

    if (!application_id) {
      return Response.json({ error: 'application_id required' }, { status: 400 });
    }

    // Get application
    const applications = await base44.asServiceRole.entities.OnboardingApplication.filter({ id: application_id });
    const application = applications[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Check if already has organization
    if (application.organization_id) {
      return Response.json({ 
        success: false, 
        message: 'Organization already exists',
        organization_id: application.organization_id 
      });
    }

    // Verify all requirements met
    if (application.status !== 'approved') {
      return Response.json({ 
        success: false, 
        message: 'Application not approved' 
      }, { status: 400 });
    }

    // Check verifications
    const verificationsComplete = 
      application.aml_result && 
      application.facia_session_id &&
      application.generated_lei;

    if (!verificationsComplete) {
      return Response.json({ 
        success: false, 
        message: 'Verifications incomplete',
        details: {
          aml_complete: !!application.aml_result,
          facial_complete: !!application.facia_session_id,
          lei_issued: !!application.generated_lei
        }
      }, { status: 400 });
    }

    // Create organization
    const organization = await base44.asServiceRole.entities.Organization.create({
      name: application.legal_name,
      lei: application.generated_lei,
      legal_name: application.legal_name,
      registry_country: application.registry_country_code,
      business_registration_number: application.unique_business_id,
      entity_type: application.entity_category,
      headquarters_address: application.headquarters_address,
      legal_address: application.legal_address,
      website: application.website,
      onboarding_completed: false,
      tier: 'starter',
      status: 'active',
      contact_email: application.email,
      contact_name: application.legal_representative_name,
      contact_phone: application.legal_representative_mobile
    });

    // Link application to organization
    await base44.asServiceRole.entities.OnboardingApplication.update(application_id, {
      organization_id: organization.id
    });

    // Update user with organization_id
    const users = await base44.asServiceRole.entities.User.filter({ email: application.created_by });
    if (users.length > 0) {
      await base44.asServiceRole.entities.User.update(users[0].id, {
        organization_id: organization.id,
        lei: application.generated_lei
      });
    }

    // Create initial monitoring schedule (quarterly AML + KYB)
    const nextCheck = new Date();
    nextCheck.setMonth(nextCheck.getMonth() + 3);

    await base44.asServiceRole.entities.MonitoringSchedule.create({
      organization_id: organization.id,
      application_id: application.id,
      monitoring_type: 'combined',
      frequency: 'quarterly',
      status: 'active',
      entity_name: application.legal_name,
      entity_lei: application.generated_lei,
      next_check_date: nextCheck.toISOString(),
      monitoring_config: {
        alert_threshold: 80,
        notify_emails: [application.email],
        auto_escalate: true
      }
    });

    // Send notification
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: application.email,
      subject: 'Organization Created - Welcome to TAS',
      body: `
        <h2>Welcome to Trust Anchor Service!</h2>
        <p>Your organization has been successfully created:</p>
        <ul>
          <li><strong>Organization:</strong> ${organization.name}</li>
          <li><strong>LEI:</strong> ${organization.lei}</li>
          <li><strong>Status:</strong> Active</li>
        </ul>
        <p>Automatic monitoring has been configured:</p>
        <ul>
          <li>Quarterly AML screening</li>
          <li>Quarterly KYB verification</li>
          <li>Email alerts for any changes</li>
        </ul>
        <p>Complete your organization setup by logging into your portal.</p>
      `
    });

    return Response.json({
      success: true,
      organization_id: organization.id,
      organization_name: organization.name,
      lei: organization.lei,
      monitoring_enabled: true
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});