import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all providers with health check enabled
    const providers = await base44.entities.Provider.list();
    const providersToCheck = providers.filter(p => 
      p.health_check_config?.enabled !== false && p.is_active
    );

    const results = [];

    for (const provider of providersToCheck) {
      const healthResult = await checkProviderStatus(provider);
      
      // Update provider with health check results
      await base44.entities.Provider.update(provider.id, {
        status: healthResult.status,
        uptime_percentage: healthResult.uptime,
        last_health_check: new Date().toISOString(),
        consecutive_failures: healthResult.consecutiveFailures,
        avg_response_time_ms: healthResult.responseTime
      });

      results.push({
        provider: provider.name,
        status: healthResult.status,
        uptime: healthResult.uptime,
        responseTime: healthResult.responseTime,
        error: healthResult.error
      });
    }

    return Response.json({ 
      success: true, 
      checked: results.length,
      results 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function checkProviderStatus(provider) {
  let status = 'offline';
  let responseTime = 0;
  let error = null;
  let uptime = 0;
  let consecutiveFailures = provider.consecutive_failures || 0;

  const healthCheckUrl = provider.health_check_endpoint 
    ? `${provider.endpoint}${provider.health_check_endpoint}`
    : null;

  const timeout = (provider.health_check_config?.timeout_seconds || 10) * 1000;

  try {
    // Try health endpoint first if configured
    if (healthCheckUrl) {
      const startTime = Date.now();
      const healthResponse = await Promise.race([
        fetch(healthCheckUrl),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Health check timeout')), timeout)
        )
      ]);

      responseTime = Date.now() - startTime;
      const expectedCode = provider.health_check_config?.expected_response_code || 200;

      if (healthResponse.status === expectedCode) {
        status = 'active';
        consecutiveFailures = 0;
        uptime = 99.9; // Assume high uptime if health check passes
      } else {
        error = `Health endpoint returned ${healthResponse.status}`;
        consecutiveFailures++;
      }
    } else {
      // Fallback to testing actual API
      const startTime = Date.now();
      const testResponse = await Promise.race([
        testProviderAPI(provider),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('API test timeout')), timeout)
        )
      ]);

      responseTime = Date.now() - startTime;

      if (testResponse.success) {
        status = 'active';
        consecutiveFailures = 0;
        uptime = 99.9;
      } else {
        error = testResponse.error;
        consecutiveFailures++;
      }
    }
  } catch (err) {
    error = err.message;
    consecutiveFailures++;
    uptime = calculateUptime(provider.total_requests || 0, provider.failed_requests || 0);
  }

  // Mark offline if consecutive failures exceed threshold
  if (consecutiveFailures >= (provider.failure_threshold || 3)) {
    status = 'offline';
  } else if (status === 'active' && consecutiveFailures > 0) {
    status = 'degraded';
  }

  return {
    status,
    uptime: uptime || calculateUptime(provider.total_requests || 0, provider.failed_requests || 0),
    responseTime,
    error,
    consecutiveFailures
  };
}

async function testProviderAPI(provider) {
  try {
    // Test with a simple API call based on service type
    let testUrl = provider.endpoint;
    let headers = {};

    // Add authentication based on available credentials
    if (provider.api_key) {
      headers['Authorization'] = `Bearer ${provider.api_key}`;
    }

    const response = await fetch(`${testUrl}/status`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(5000)
    });

    return { success: response.ok, error: null };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function calculateUptime(totalRequests, failedRequests) {
  if (totalRequests === 0) return 99.9;
  return ((totalRequests - failedRequests) / totalRequests) * 100;
}