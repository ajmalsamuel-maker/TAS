import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Test all three APIs
    const results = {
      timestamp: new Date().toISOString(),
      apis: {}
    };

    // Test AML Watcher API
    try {
      const amlResponse = await fetch('https://api.amlwatcher.com/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('AMLWATCHER_API_KEY')}`,
          'Content-Type': 'application/json'
        },
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

    // Test KYB Company API
    try {
      const kybResponse = await fetch('https://api.kyb-company.com/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('KYB_API_KEY')}`,
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.kybCompany = {
        status: kybResponse.ok ? 'online' : 'offline',
        statusCode: kybResponse.status
      };
    } catch (error) {
      results.apis.kybCompany = {
        status: 'offline',
        error: error.message
      };
    }

    // Test Facia API
    try {
      const faciaResponse = await fetch('https://api.facia.io/health', {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      
      results.apis.facia = {
        status: faciaResponse.ok ? 'online' : 'offline',
        statusCode: faciaResponse.status
      };
    } catch (error) {
      results.apis.facia = {
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