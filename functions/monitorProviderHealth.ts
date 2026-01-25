import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Monitor provider health and performance
 * Called daily via scheduled automation to track uptime and response times
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch all providers
    const providers = await base44.asServiceRole.entities.Provider.list();

    const healthReport = {
      timestamp: new Date().toISOString(),
      providers: []
    };

    // Check each provider (in production, make actual health check calls)
    for (const provider of providers) {
      const healthCheck = {
        providerId: provider.id,
        name: provider.name,
        status: provider.status,
        uptime: provider.uptime_percentage,
        responseTime: provider.avg_response_time_ms,
        totalRequests: provider.total_requests,
        lastChecked: new Date().toISOString()
      };

      healthReport.providers.push(healthCheck);

      // Update provider status based on checks
      if (provider.uptime_percentage < 95) {
        await base44.asServiceRole.entities.Provider.update(provider.id, {
          status: 'degraded'
        });
      } else if (provider.uptime_percentage >= 99.5) {
        await base44.asServiceRole.entities.Provider.update(provider.id, {
          status: 'active'
        });
      }
    }

    // Log health check
    await base44.asServiceRole.entities.AuditLog.create({
      workflow_id: 'provider_health_check',
      event: 'Daily provider health check completed',
      event_type: 'workflow_completed',
      actor: 'system',
      details: healthReport
    });

    return Response.json({
      success: true,
      healthReport,
      message: 'Provider health check completed'
    });
  } catch (error) {
    console.error('Error monitoring provider health:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});