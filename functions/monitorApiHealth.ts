import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Test all three APIs
    const results = {
      timestamp: new Date().toISOString(),
      apis: {}
    };

    // Test AML Watcher API (use /get-access-token to verify credentials)
    try {
      const amlWatcherClientId = Deno.env.get('AMLWATCHER_CLIENT_ID');
      const amlWatcherClientSecret = Deno.env.get('AMLWATCHER_CLIENT_SECRET');
      
      const amlResponse = await fetch('https://api.amlwatcher.com/get-access-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: amlWatcherClientId,
          client_secret: amlWatcherClientSecret
        }),
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.amlWatcher = {
        status: amlResponse.ok ? 'online' : 'offline',
        statusCode: amlResponse.status
      };
    } catch (error) {
      results.apis.amlWatcher = {
        status: 'offline',
        error: error.message
      };
    }

    // Test KYB (The KYB) API - correct base URL
    try {
      const kybResponse = await fetch('https://api.thekyb.com/api', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('KYB_API_KEY')}`,
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.theKyb = {
        status: kybResponse.ok ? 'online' : 'offline',
        statusCode: kybResponse.status
      };
    } catch (error) {
      results.apis.theKyb = {
        status: 'offline',
        error: error.message
      };
    }

    // Test FACEIO API - correct endpoint with /status
    try {
      const faciaApiKey = Deno.env.get('FACIA_CLIENT_ID');
      const faciaResponse = await fetch(`https://api.faceio.net/status?key=${faciaApiKey}`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.faceio = {
        status: faciaResponse.ok ? 'online' : 'offline',
        statusCode: faciaResponse.status
      };
    } catch (error) {
      results.apis.faceio = {
        status: 'offline',
        error: error.message
      };
    }

    // Check if all are online
    const allOnline = Object.values(results.apis).every(api => api.status === 'online');
    
    if (allOnline) {
      // Send notification to admin
      try {
        await base44.integrations.Core.SendEmail({
          to: 'admin@tas.local',
          subject: '✅ All External APIs Are Now Online',
          body: `All verification APIs are now operational:\n\n` +
                `- AML Watcher: ONLINE\n` +
                `- KYB Company: ONLINE\n` +
                `- Facia: ONLINE\n\n` +
                `Timestamp: ${results.timestamp}`
        });
      } catch (emailError) {
        console.error('Failed to send notification:', emailError.message);
      }
    }

    results.allOnline = allOnline;
    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});