import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Orchestrate all side effects of application status change
 * - Create notification
 * - Send email
 * - Create audit log
 * - Trigger next workflow steps (if applicable)
 */
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

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    const oldStatus = application.status;

    // Update application status
    await base44.entities.OnboardingApplication.update(applicationId, {
      status: newStatus
    });

    // Build notification based on status
    const notificationMap = {
      submitted: {
        title: 'Application Submitted',
        message: 'Your LEI application has been successfully submitted. We will begin reviewing it shortly.'
      },
      under_review: {
        title: 'Application Under Review',
        message: 'Your application is now being reviewed by our compliance team. We will notify you of any updates.'
      },
      approved: {
        title: 'Application Approved',
        message: 'Congratulations! Your application has been approved. LEI and vLEI credentials are being issued.'
      },
      rejected: {
        title: 'Application Review Complete',
        message: notes ? `Your application review is complete. ${notes}` : 'Your application has been reviewed.'
      }
    };

    const notif = notificationMap[newStatus];

    // Send notification
    if (notif) {
      try {
        await base44.functions.invoke('sendNotification', {
          recipientEmail: application.email,
          type: `application_${newStatus}`,
          title: notif.title,
          message: notif.message,
          actionUrl: '/applications/status',
          priority: newStatus === 'approved' ? 'high' : 'medium',
          sendEmail: true
        });
      } catch (notifError) {
        console.error('Error sending notification:', notifError);
      }
    }

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `Application status changed from ${oldStatus} to ${newStatus}`,
      event_type: 'workflow_started',
      actor: user.email,
      details: {
        old_status: oldStatus,
        new_status: newStatus,
        notes: notes || null,
        changed_at: new Date().toISOString()
      }
    });

    return Response.json({
      success: true,
      application: application,
      notification: notif,
      message: `Application status updated to ${newStatus}`
    });
  } catch (error) {
    console.error('Error in application status change:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});