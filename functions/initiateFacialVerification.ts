import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { applicationId } = await req.json();

        if (!applicationId) {
            return Response.json({ error: 'Application ID required' }, { status: 400 });
        }

        const application = await base44.entities.OnboardingApplication.read(applicationId);
        
        if (!application) {
            return Response.json({ error: 'Application not found' }, { status: 404 });
        }

        if (application.status !== 'approved') {
            return Response.json({ error: 'Application must be approved before facial verification' }, { status: 400 });
        }

        const faciaClientId = Deno.env.get('FACIA_CLIENT_ID');
        const faciaClientSecret = Deno.env.get('FACIA_CLIENT_SECRET');

        // Get Facia access token
        const tokenResponse = await fetch('https://api.facia.ai/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: faciaClientId,
                client_secret: faciaClientSecret,
                grant_type: 'client_credentials'
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to get Facia access token');
        }

        const { access_token } = await tokenResponse.json();

        // Create verification session with Facia
        const sessionResponse = await fetch('https://api.facia.ai/v1/verification/session', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email: user.email,
                user_id: user.id,
                verification_type: 'facial',
                metadata: {
                    application_id: applicationId,
                    entity_name: application.legal_name
                }
            })
        });

        if (!sessionResponse.ok) {
            throw new Error('Failed to create Facia verification session');
        }

        const sessionData = await sessionResponse.json();

        // Store workflow record
        await base44.entities.Workflow.create({
            user_id: user.id,
            type: 'did_verification',
            status: 'in_progress',
            provider_name: 'Facia',
            result: {
                facia_session_id: sessionData.session_id,
                verification_url: sessionData.verification_url,
                expires_at: sessionData.expires_at
            }
        });

        // Update application to mark facial verification in progress
        await base44.entities.OnboardingApplication.update(applicationId, {
            status: 'under_review',
            tas_verification_status: 'facial_verified',
            facial_verification_initiated: new Date().toISOString(),
            facia_session_id: sessionData.session_id
        });

        // Create notification with action URL
        await base44.entities.Notification.create({
            recipient_id: user.id,
            recipient_email: user.email,
            type: 'workflow_completed',
            title: 'Identity Verification Required',
            message: 'Please complete facial verification to finalize your LEI application.',
            action_url: sessionData.verification_url,
            priority: 'high',
            send_email: true,
            metadata: { application_id: applicationId }
        });

        return Response.json({
            success: true,
            sessionId: sessionData.session_id,
            verificationUrl: sessionData.verification_url,
            expiresAt: sessionData.expires_at
        });

    } catch (error) {
        console.error('Facial verification initiation error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});