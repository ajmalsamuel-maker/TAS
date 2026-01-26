import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Facia sends callback with verification results
    const { 
      customer_id, 
      status, 
      reference_id,
      liveness_result,
      confidence_score 
    } = body;

    if (!customer_id) {
      return Response.json({ error: 'Missing customer_id' }, { status: 400 });
    }

    // Find the application by customer_id (which is application_id)
    const apps = await base44.asServiceRole.entities.OnboardingApplication.filter({ 
      id: customer_id 
    });

    if (apps.length === 0) {
      console.error(`Application not found for customer_id: ${customer_id}`);
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    const application = apps[0];

    // Update application based on verification result
    const updateData = {
      facia_session_id: reference_id,
      facial_verification_initiated: application.facial_verification_initiated || new Date().toISOString()
    };

    if (status === 'success' || liveness_result === 'passed') {
      updateData.status = 'submitted';
      updateData.tas_verification_status = 'complete';
      
      // Create success notification
      await base44.asServiceRole.entities.Notification.create({
        recipient_id: application.created_by,
        recipient_email: application.email,
        type: 'workflow_completed',
        title: 'Facial Verification Successful',
        message: 'Your facial verification has been completed successfully. Your LEI application is now under review.',
        priority: 'medium',
        send_email: true,
        metadata: { application_id: customer_id, confidence_score }
      });
    } else {
      updateData.status = 'pending_documents';
      
      // Create failure notification
      await base44.asServiceRole.entities.Notification.create({
        recipient_id: application.created_by,
        recipient_email: application.email,
        type: 'critical_alert',
        title: 'Facial Verification Failed',
        message: 'Your facial verification could not be completed. Please try again or contact support.',
        priority: 'high',
        send_email: true,
        metadata: { application_id: customer_id, reason: body.reason || 'Verification failed' }
      });
    }

    await base44.asServiceRole.entities.OnboardingApplication.update(application.id, updateData);

    return Response.json({ success: true, message: 'Callback processed' });

  } catch (error) {
    console.error('Facia callback error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});