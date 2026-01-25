import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, newStatus, notes } = await req.json();

    if (!applicationId || !newStatus) {
      return Response.json({ error: 'applicationId and newStatus required' }, { status: 400 });
    }

    // Valid status transitions
    const validStatuses = ['draft', 'submitted', 'under_review', 'approved', 'rejected'];
    if (!validStatuses.includes(newStatus)) {
      return Response.json({ error: `Invalid status: ${newStatus}` }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update application status
    const updatedApp = await base44.entities.OnboardingApplication.update(applicationId, {
      status: newStatus
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: application.id,
      event: `Application status changed from ${application.status} to ${newStatus}`,
      event_type: 'workflow_started',
      actor: user.email,
      details: {
        old_status: application.status,
        new_status: newStatus,
        notes: notes || null
      }
    });

    return Response.json({
      success: true,
      application: updatedApp,
      message: `Application status updated to ${newStatus}`
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});