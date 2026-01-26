import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { application_id } = await req.json();

        if (!application_id) {
            return Response.json({ error: 'Application ID required' }, { status: 400 });
        }

        const apps = await base44.entities.OnboardingApplication.filter({ id: application_id });
        
        if (apps.length === 0) {
            return Response.json({ error: 'Application not found' }, { status: 404 });
        }

        const application = apps[0];
        const faciaClientId = Deno.env.get('FACIA_CLIENT_ID');
        const faciaClientSecret = Deno.env.get('FACIA_CLIENT_SECRET');

        // Get Facia access token
        const tokenResponse = await fetch('https://api.facia.ai/request-access-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: faciaClientId,
                client_secret: faciaClientSecret
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to get Facia access token');
        }

        const tokenData = await tokenResponse.json();
        const access_token = tokenData.access_token;

        if (!access_token) {
            throw new Error('No access token returned from Facia');
        }

        // Generate liveness URL
        const baseUrl = Deno.env.get('BASE_URL') || 'https://app.base44.com';
        const livenessResponse = await fetch('https://api.facia.ai/generate-liveness-url', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                redirect_url: `${baseUrl}/app/CompleteOnboarding?application_id=${application_id}&facia_complete=true`,
                callback_url: `${baseUrl}/api/facia-callback`,
                customer_id: application.id,
                customer_email: application.email || user.email,
                ttl: 60
            })
        });

        if (!livenessResponse.ok) {
            const errorData = await livenessResponse.json();
            throw new Error(errorData.message || 'Failed to generate liveness URL');
        }

        const livenessData = await livenessResponse.json();

        // Update application to mark facial verification initiated
        await base44.asServiceRole.entities.OnboardingApplication.update(application.id, {
            facial_verification_initiated: new Date().toISOString(),
            facia_session_id: livenessData.reference_id || livenessData.session_id
        });

        return Response.json({
            success: true,
            facia_url: livenessData.url,
            session_id: livenessData.reference_id || livenessData.session_id,
            expires_in: livenessData.ttl || 60
        });

    } catch (error) {
        console.error('Facial verification initiation error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});