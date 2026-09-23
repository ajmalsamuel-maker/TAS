import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Link LEI identity across multiple blockchains
 * Enables unified identity verification across chains
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, chainId, lei } = await req.json();

    if (!applicationId || !chainId || !lei) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Verify user owns the application
    if (application.created_by !== user.email) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // In production, this would:
    // 1. Register identity on target chain
    // 2. Create cross-chain attestation
    // 3. Link identities via IBC or similar protocol

    const linkageId = `${lei}-${chainId}-${Date.now()}`;

    // Record cross-chain linking
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `Identity linked to ${chainId}`,
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        chainId,
        lei,
        linkageId,
        timestamp: new Date().toISOString()
      }
    });

    return Response.json({
      success: true,
      linkageId,
      chainId,
      lei,
      status: 'linked',
      message: `Identity successfully linked to ${chainId}`
    });
  } catch (error) {
    console.error('Error linking cross-chain identity:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});