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

        // Fetch the application
        const application = await base44.entities.OnboardingApplication.read(applicationId);
        
        if (!application) {
            return Response.json({ error: 'Application not found' }, { status: 404 });
        }

        const amlWatcherClientId = Deno.env.get('AMLWATCHER_CLIENT_ID');
        const amlWatcherClientSecret = Deno.env.get('AMLWATCHER_CLIENT_SECRET');

        // Get access token for AML Watcher
        const tokenResponse = await fetch('https://api.amlwatcher.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: amlWatcherClientId,
                client_secret: amlWatcherClientSecret,
                grant_type: 'client_credentials'
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to get AML Watcher access token');
        }

        const { access_token } = await tokenResponse.json();

        // Screen the business entity
        const screeningResponse = await fetch('https://api.amlwatcher.com/v1/screening/kyb', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entity_name: application.legal_name,
                entity_type: 'business',
                country: application.legal_address?.country || 'HK',
                registration_number: application.unique_business_id,
                screening_type: 'enhanced'
            })
        });

        if (!screeningResponse.ok) {
            throw new Error('AML screening request failed');
        }

        const screeningResult = await screeningResponse.json();

        // Create AML Alert record
        const amlAlert = await base44.entities.AMLAlert.create({
            user_id: user.id,
            type: screeningResult.risk_level === 'high' ? 'sanction_hit' : 'adverse_media',
            severity: screeningResult.risk_level === 'high' ? 'high' : screeningResult.risk_level === 'medium' ? 'medium' : 'low',
            details: {
                aml_watcher_id: screeningResult.screening_id,
                matches: screeningResult.matches || [],
                risk_indicators: screeningResult.risk_indicators || []
            },
            status: screeningResult.risk_level === 'high' ? 'new' : 'resolved'
        });

        // Update application status and TAS verification progress
        const newStatus = screeningResult.risk_level === 'high' ? 'under_review' : 'approved';
        await base44.entities.OnboardingApplication.update(applicationId, {
            status: newStatus,
            tas_verification_status: newStatus === 'approved' ? 'aml_passed' : 'submitted',
            aml_result: screeningResult
        });

        // Create notification for user
        await base44.entities.Notification.create({
            recipient_id: user.id,
            recipient_email: user.email,
            type: newStatus === 'approved' ? 'workflow_completed' : 'aml_alert',
            title: newStatus === 'approved' ? 'AML Check Passed' : 'Application Under Review',
            message: newStatus === 'approved' 
                ? 'Your AML screening passed. Please proceed to facial verification.'
                : 'Your application requires additional review. Our team will contact you shortly.',
            priority: newStatus === 'approved' ? 'medium' : 'high',
            send_email: true,
            metadata: { application_id: applicationId }
        });

        return Response.json({
            success: true,
            amlAlertId: amlAlert.id,
            applicationStatus: newStatus,
            screeningResult: screeningResult
        });

    } catch (error) {
        console.error('AML screening error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});