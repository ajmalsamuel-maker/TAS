import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { applicationId, rejectionReason } = await req.json();

    if (!applicationId || !rejectionReason) {
      return Response.json({ error: 'applicationId and rejectionReason required' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update application to rejected
    const updatedApp = await base44.entities.OnboardingApplication.update(applicationId, {
      status: 'rejected'
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `Application rejected by ${user.email}`,
      event_type: 'workflow_started',
      actor: user.email,
      details: {
        rejected_by: user.email,
        rejection_reason: rejectionReason,
        rejected_at: new Date().toISOString()
      }
    });

    // Create notification for applicant
    await base44.entities.Notification.create({
      recipient_email: application.email,
      type: 'application_rejected',
      title: 'Your LEI Application Was Not Approved',
      message: `Your business onboarding application has been rejected. Reason: ${rejectionReason}`,
      action_url: '/applications/status',
      priority: 'high',
      send_email: true
    });

    return Response.json({
      success: true,
      application: updatedApp,
      message: 'Application rejected successfully'
    });
  } catch (error) {
    console.error('Error rejecting application:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});