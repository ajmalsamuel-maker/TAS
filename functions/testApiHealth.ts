import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get API credentials from environment
    const amlWatcherApiKey = Deno.env.get('AMLWATCHER_API_KEY');
    const kybApiKey = Deno.env.get('KYB_API_KEY');
    const faciaClientId = Deno.env.get('FACIA_CLIENT_ID');
    const faciaClientSecret = Deno.env.get('FACIA_CLIENT_SECRET');

    const results = {
      timestamp: new Date().toISOString(),
      apis: {}
    };

    // Test AML Watcher API
    try {
      const amlResponse = await fetch('https://api.amlwatcher.com/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${amlWatcherApiKey}`,
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.amlWatcher = {
        status: amlResponse.ok ? 'online' : 'offline',
        statusCode: amlResponse.status,
        message: amlResponse.ok ? 'API is responding' : 'API returned error'
      };
    } catch (error) {
      results.apis.amlWatcher = {
        status: 'offline',
        error: error.message,
        message: 'Failed to connect to AML Watcher API'
      };
    }

    // Test KYB Company API
    try {
      const kybResponse = await fetch('https://api.kyb-company.com/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kybApiKey}`,
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.kybCompany = {
        status: kybResponse.ok ? 'online' : 'offline',
        statusCode: kybResponse.status,
        message: kybResponse.ok ? 'API is responding' : 'API returned error'
      };
    } catch (error) {
      results.apis.kybCompany = {
        status: 'offline',
        error: error.message,
        message: 'Failed to connect to KYB Company API'
      };
    }

    // Test Facia API
    try {
      const faciaResponse = await fetch('https://api.facia.io/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.facia = {
        status: faciaResponse.ok ? 'online' : 'offline',
        statusCode: faciaResponse.status,
        message: faciaResponse.ok ? 'API is responding' : 'API returned error'
      };
    } catch (error) {
      results.apis.facia = {
        status: 'offline',
        error: error.message,
        message: 'Failed to connect to Facia API'
      };
    }

    // Check if credentials are set
    results.credentialsConfigured = {
      amlWatcher: !!amlWatcherApiKey,
      kybCompany: !!kybApiKey,
      facia: !!(faciaClientId && faciaClientSecret)
    };

    // Overall status
    const allOnline = Object.values(results.apis).every(api => api.status === 'online');
    results.overallStatus = allOnline ? 'healthy' : 'degraded';

    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});