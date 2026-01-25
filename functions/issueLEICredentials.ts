import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Orchestrate LEI + vLEI credential issuance
 * Called when application is approved
 * Flow: Generate LEI → Generate vLEI → Update User → Create notification
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId } = await req.json();

    if (!applicationId) {
      return Response.json({ error: 'applicationId required' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status !== 'approved') {
      return Response.json({ 
        error: 'Application must be approved before issuing credentials',
        currentStatus: application.status
      }, { status: 400 });
    }

    // Step 1: Generate LEI
    let lei = application.generated_lei;
    if (!lei) {
      const leiRes = await base44.functions.invoke('generateLEI', {
        applicationId: applicationId
      });
      lei = leiRes.data.lei;
    }

    // Step 2: Generate vLEI
    let vleiCredential = application.vlei_credential;
    if (!vleiCredential) {
      const vleiRes = await base44.functions.invoke('generateVLEI', {
        applicationId: applicationId,
        lei: lei
      });
      vleiCredential = vleiRes.data.vlei;
    }

    // Step 3: Update user entity with credentials
    await base44.auth.updateMe({
      lei: lei,
      vlei: vleiCredential.id,
      oor_credential: vleiCredential
    });

    // Step 4: Update application TAS verification status
    await base44.entities.OnboardingApplication.update(applicationId, {
      tas_verification_status: 'complete'
    });

    // Step 5: Create credential ready notification
    await base44.entities.Notification.create({
      recipient_email: application.email,
      type: 'workflow_completed',
      title: 'Your LEI and vLEI Credentials Are Ready',
      message: `Your Legal Entity Identifier (${lei}) and vLEI credential have been successfully issued. You can now access them in your credentials dashboard.`,
      action_url: '/credentials',
      priority: 'high',
      send_email: true
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: 'LEI and vLEI credentials issued successfully',
      event_type: 'workflow_completed',
      actor: 'system',
      actor_lei: lei,
      details: {
        lei: lei,
        vlei_id: vleiCredential.id,
        issued_at: new Date().toISOString(),
        recipient_email: application.email
      }
    });

    return Response.json({
      success: true,
      credentials: {
        lei: lei,
        vlei: vleiCredential
      },
      message: 'LEI and vLEI credentials issued successfully'
    });
  } catch (error) {
    console.error('Error issuing credentials:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});