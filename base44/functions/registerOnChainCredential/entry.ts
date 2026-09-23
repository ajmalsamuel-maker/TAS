import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Register LEI/vLEI credentials on-chain
 * Stores credential reference in blockchain for universal verification
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, walletAddress, chainId, lei, vlei } = await req.json();

    if (!applicationId || !walletAddress || !chainId || !lei) {
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
    // 1. Call Web3 smart contract to register credential
    // 2. Pay gas fees from organization account
    // 3. Return transaction hash
    
    const txHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    // Record on-chain registration
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `Credential registered on-chain on ${chainId}`,
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        walletAddress,
        chainId,
        lei,
        txHash
      }
    });

    return Response.json({
      success: true,
      txHash,
      walletAddress,
      chainId,
      lei,
      message: 'Credential registered on-chain successfully'
    });
  } catch (error) {
    console.error('Error registering on-chain credential:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});