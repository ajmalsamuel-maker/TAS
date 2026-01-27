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

    // Map provider names to their secret keys and endpoints
    const secretMap = {
      'Facia': {
        keys: ['FACIA_CLIENT_ID', 'FACIA_CLIENT_SECRET'],
        endpoint: 'https://api.facia.io'
      },
      'KYB': {
        keys: ['KYB_API_KEY'],
        endpoint: 'https://api.kyb.provider.com'
      },
      'FTS KYB': {
        keys: ['KYB_API_KEY'],
        endpoint: 'https://api.kyb.provider.com'
      },
      'The KYB Company': {
        keys: ['KYB_API_KEY'],
        endpoint: 'https://api.kyb.provider.com'
      },
      'AML': {
        keys: ['AMLWATCHER_API_KEY', 'AMLWATCHER_CLIENT_ID', 'AMLWATCHER_CLIENT_SECRET'],
        endpoint: 'https://api.amlwatcher.com'
      },
      'FTS AML': {
        keys: ['AMLWATCHER_API_KEY', 'AMLWATCHER_CLIENT_ID', 'AMLWATCHER_CLIENT_SECRET'],
        endpoint: 'https://api.amlwatcher.com'
      },
      'AML Watcher': {
        keys: ['AMLWATCHER_API_KEY', 'AMLWATCHER_CLIENT_ID', 'AMLWATCHER_CLIENT_SECRET'],
        endpoint: 'https://api.amlwatcher.com'
      },
      'AMLWatcher': {
        keys: ['AMLWATCHER_API_KEY', 'AMLWATCHER_CLIENT_ID', 'AMLWATCHER_CLIENT_SECRET'],
        endpoint: 'https://api.amlwatcher.com'
      }
    };

    const config = secretMap[provider_name];
    if (!config) {
      return Response.json({ provider_name, credentials: {}, api_endpoint: '' });
    }

    const { keys, endpoint } = config;

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
      credentials,
      api_endpoint: endpoint
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});