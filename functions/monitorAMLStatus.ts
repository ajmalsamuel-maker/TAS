import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Monitor AML screening status and notify when complete
 * Can be called periodically via automation/webhook from AML provider
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { applicationId, amlStatus, amlResult } = await req.json();

    if (!applicationId) {
      return Response.json({ error: 'applicationId required' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update AML result
    const updates = {
      aml_result: amlResult || {}
    };

    // Update TAS verification status if AML passed
    if (amlStatus === 'passed') {
      updates.tas_verification_status = 'aml_passed';
    } else if (amlStatus === 'flagged') {
      updates.tas_verification_status = 'submitted'; // Back to submitted for manual review
    }

    await base44.entities.OnboardingApplication.update(applicationId, updates);

    // Notify user based on AML result
    let notification = null;
    if (amlStatus === 'passed') {
      notification = {
        title: 'AML Screening Passed',
        message: 'Your application has passed AML screening. Proceeding with verification process.',
        priority: 'medium'
      };
    } else if (amlStatus === 'flagged') {
      notification = {
        title: 'AML Screening Alert',
        message: 'Your application requires additional review due to AML screening results. Our team will contact you shortly.',
        priority: 'high'
      };
    }

    if (notification) {
      try {
        await base44.functions.invoke('sendNotification', {
          recipientEmail: application.email,
          type: `aml_${amlStatus}`,
          title: notification.title,
          message: notification.message,
          actionUrl: '/applications/status',
          priority: notification.priority,
          sendEmail: true
        });
      } catch (notifError) {
        console.error('Error sending AML notification:', notifError);
      }
    }

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `AML screening completed with status: ${amlStatus}`,
      event_type: 'provider_called',
      actor: 'system',
      details: {
        aml_status: amlStatus,
        aml_result: amlResult || null,
        completed_at: new Date().toISOString()
      }
    });

    // If AML passed and user has facial verification, trigger credential issuance
    if (amlStatus === 'passed' && application.facial_verification_initiated) {
      try {
        await base44.functions.invoke('issueLEICredentials', {
          applicationId: applicationId
        });
      } catch (credError) {
        console.error('Auto-issuance failed (will retry on approval):', credError);
      }
    }

    return Response.json({
      success: true,
      amlStatus: amlStatus,
      message: 'AML status monitored and notification sent'
    });
  } catch (error) {
    console.error('Error monitoring AML status:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});