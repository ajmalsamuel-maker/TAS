import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Track the status of credential issuance for an application
 * Returns current LEI/vLEI status and progress
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const applicationId = url.searchParams.get('applicationId');

    if (!applicationId) {
      return Response.json({ error: 'applicationId query parameter required' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Verify user has access to this application
    if (user.role !== 'admin' && application.created_by !== user.email) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Build credential status
    const credentialStatus = {
      application_status: application.status,
      verification_status: application.tas_verification_status || 'submitted',
      lei: {
        issued: !!application.generated_lei,
        value: application.generated_lei || null,
        issued_date: application.lei_issued_date || null
      },
      vlei: {
        issued: !!application.generated_vlei,
        value: application.generated_vlei || null,
        credential: application.vlei_credential || null
      },
      aml: {
        status: application.aml_result ? 'completed' : 'pending',
        result: application.aml_result || null
      },
      facial_verification: {
        initiated: !!application.facial_verification_initiated,
        initiated_date: application.facial_verification_initiated || null,
        session_id: application.facia_session_id || null
      },
      timeline: {
        submitted_at: application.created_date,
        lei_issued_at: application.lei_issued_date || null
      }
    };

    // Determine progress percentage
    let progressPercentage = 0;
    if (application.status === 'submitted') progressPercentage = 25;
    if (application.status === 'under_review') progressPercentage = 50;
    if (application.status === 'approved' && !application.generated_lei) progressPercentage = 75;
    if (application.generated_lei && !application.generated_vlei) progressPercentage = 85;
    if (application.generated_vlei) progressPercentage = 100;

    return Response.json({
      success: true,
      applicationId: applicationId,
      progress: progressPercentage,
      status: credentialStatus,
      message: 'Credential issuance status retrieved'
    });
  } catch (error) {
    console.error('Error tracking credential status:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});