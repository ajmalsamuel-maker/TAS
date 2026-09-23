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

        // Generate LEI via GLEIF
        const lei = await generateLei(application);

        // Generate vLEI
        const { vlei, credential } = await generateVlei(lei, user);

        // Update application with generated credentials and TAS verification complete
        await base44.entities.OnboardingApplication.update(applicationId, {
            status: 'approved',
            tas_verification_status: 'complete',
            generated_lei: lei,
            generated_vlei: vlei,
            vlei_credential: credential,
            lei_issued_date: new Date().toISOString()
        });

        // Create subscription tier for the new organization
        await base44.entities.Subscription.create({
            user_id: user.id,
            tier: 'starter',
            monthly_fee: 99,
            status: 'active',
            start_date: new Date().toISOString().split('T')[0],
            api_calls_limit: 10000
        });

        // Create success notification
        await base44.entities.Notification.create({
            recipient_id: user.id,
            recipient_email: user.email,
            type: 'application_approved',
            title: 'LEI & vLEI Issued Successfully',
            message: `Your LEI (${lei}) and vLEI credentials have been issued. You can now access the platform.`,
            priority: 'high',
            send_email: true,
            metadata: { 
                application_id: applicationId,
                lei: lei,
                vlei: vlei
            }
        });

        return Response.json({
            success: true,
            lei: lei,
            vlei: vlei,
            applicationStatus: 'approved'
        });

    } catch (error) {
        console.error('LEI issuance error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});

async function generateLei(application) {
    // Call GLEIF API to generate LEI
    const leiResponse = await fetch('https://api.gleif.org/v1/lei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            entity: {
                legal_name: application.legal_name,
                legal_form: application.entity_legal_form,
                addresses: [{
                    address: application.legal_address?.address,
                    city: application.legal_address?.city,
                    country: application.legal_address?.country,
                    postal_code: application.legal_address?.postal_code
                }],
                registration_number: application.unique_business_id
            }
        })
    });

    if (!leiResponse.ok) {
        throw new Error('Failed to generate LEI');
    }

    const leiData = await leiResponse.json();
    return leiData.lei;
}

async function generateVlei(lei, user) {
    // Generate vLEI credential with TAS as issuer
    // Format: vLEI-{LEI}-{timestamp}-issued-by-{issuer}
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('T')[0];
    const vlei = `vLEI-${lei}-${timestamp}-TAS`;
    
    // Create vLEI credential object (would be cryptographically signed in production)
    const vleiCredential = {
        credential_type: 'vLEI',
        lei: lei,
        vlei_id: vlei,
        issuer: 'Trust Anchor Service (TAS)',
        issued_at: new Date().toISOString(),
        verification_status: {
            kyb_completed: true,
            aml_passed: true,
            facial_verified: true
        },
        credential_proof: `${lei}-TAS-${Date.now()}`
    };
    
    return { vlei, credential: vleiCredential };
}