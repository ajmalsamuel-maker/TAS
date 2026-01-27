import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { provider_name } = await req.json();

    const credentials = {};

    // Map provider names to their secret keys
    const secretMap = {
      'Facia': ['FACIA_CLIENT_ID', 'FACIA_CLIENT_SECRET'],
      'KYB': ['KYB_API_KEY', 'KYB_CLIENT_ID', 'KYB_CLIENT_SECRET'],
      'AML': ['AMLWATCHER_API_KEY', 'AMLWATCHER_CLIENT_ID', 'AMLWATCHER_CLIENT_SECRET'],
      'AMLWatcher': ['AMLWATCHER_API_KEY', 'AMLWATCHER_CLIENT_ID', 'AMLWATCHER_CLIENT_SECRET']
    };

    const keys = secretMap[provider_name] || [];

    for (const key of keys) {
      const value = Deno.env.get(key);
      if (value) {
        // Convert secret key names to field names
        if (key.includes('CLIENT_ID')) credentials.client_id = value;
        else if (key.includes('CLIENT_SECRET')) credentials.client_secret = value;
        else if (key.includes('API_KEY')) credentials.api_key = value;
      }
    }

    return Response.json({ 
      provider_name,
      credentials
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});