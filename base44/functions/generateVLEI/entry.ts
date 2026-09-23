import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Generate a virtual LEI (vLEI) credential with KERI/ACDC proof
 * vLEI is a digital credential signed by the LEI issuer (TAS)
 */
function generateVLEICredential(lei, legalName, entityType) {
  const vLEIId = `vlei:${lei}:${Date.now()}`;
  
  // Simplified vLEI credential structure (in production, use KERI/ACDC library)
  return {
    id: vLEIId,
    lei: lei,
    issuer: 'TAS',
    issued_at: new Date().toISOString(),
    issued_to: legalName,
    entity_type: entityType,
    credential_type: 'OOR', // Organization Organizational Role
    roles: ['OOR'],
    status: 'active',
    // In production: add cryptographic signatures, merkle proofs, KERI verifiable identifiers
    verification: {
      method: 'KERI',
      algorithm: 'blake3',
      signature: `sig_${Math.random().toString(36).substr(2, 32)}` // Placeholder
    }
  };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, lei } = await req.json();

    if (!applicationId || !lei) {
      return Response.json({ error: 'applicationId and lei required' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Generate vLEI credential
    const vleiCredential = generateVLEICredential(
      lei,
      application.legal_name,
      application.entity_category
    );

    // Update application with vLEI
    await base44.entities.OnboardingApplication.update(applicationId, {
      generated_vlei: vleiCredential.id,
      vlei_credential: vleiCredential
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `vLEI credential generated`,
      event_type: 'signature_generated',
      actor: 'system',
      details: {
        vlei_id: vleiCredential.id,
        lei: lei,
        generated_at: new Date().toISOString()
      }
    });

    return Response.json({
      success: true,
      vlei: vleiCredential,
      vleiId: vleiCredential.id,
      applicationId: applicationId,
      message: 'vLEI credential generated successfully'
    });
  } catch (error) {
    console.error('Error generating vLEI:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});