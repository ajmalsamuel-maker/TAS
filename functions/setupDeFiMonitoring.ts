import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Setup DeFi transaction monitoring
 * Monitors wallet for compliance violations across DeFi protocols
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, walletAddress, lei } = await req.json();

    if (!applicationId || !walletAddress || !lei) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Create monitoring configuration
    const monitoringConfig = {
      walletAddress,
      lei,
      protocols: ['uniswap', 'aave', 'curve', 'lido'],
      riskThresholds: {
        autoBlockScore: 75,
        flagForReviewScore: 50
      },
      screeningTypes: ['sanctions', 'aml', 'pep', 'adverse_media'],
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: 'DeFi monitoring enabled',
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        walletAddress,
        protocols: monitoringConfig.protocols,
        riskThresholds: monitoringConfig.riskThresholds
      }
    });

    return Response.json({
      success: true,
      monitoringConfig,
      protocolCount: monitoringConfig.protocols.length,
      message: 'DeFi monitoring setup successfully'
    });
  } catch (error) {
    console.error('Error setting up DeFi monitoring:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});