import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { applicationId, approvalNotes } = await req.json();

    if (!applicationId) {
      return Response.json({ error: 'applicationId required' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update application to approved
    const updatedApp = await base44.entities.OnboardingApplication.update(applicationId, {
      status: 'approved'
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `Application approved by ${user.email}`,
      event_type: 'workflow_started',
      actor: user.email,
      details: {
        approved_by: user.email,
        approval_notes: approvalNotes || null,
        approved_at: new Date().toISOString()
      }
    });

    // Create notification for applicant
    await base44.entities.Notification.create({
      recipient_email: application.email,
      type: 'application_approved',
      title: 'Your LEI Application Has Been Approved',
      message: 'Your business onboarding application has been approved. LEI and vLEI credentials will be issued shortly.',
      action_url: '/credentials',
      priority: 'high',
      send_email: true
    });

    // Trigger LEI/vLEI credential issuance
    try {
      await base44.functions.invoke('issueLEICredentials', {
        applicationId: applicationId
      });
    } catch (credentialError) {
      console.error('Error issuing credentials:', credentialError);
      // Don't fail the approval if credential issuance has issues (can retry later)
    }

    return Response.json({
      success: true,
      application: updatedApp,
      message: 'Application approved successfully. Credentials are being issued.'
    });
  } catch (error) {
    console.error('Error approving application:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});