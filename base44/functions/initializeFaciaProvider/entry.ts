import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Check if Facia provider already exists
    const existing = await base44.entities.Provider.filter({ name: 'Facia' });
    
    if (existing.length > 0) {
      return Response.json({ message: 'Facia provider already exists', provider: existing[0] });
    }

    // Create Facia provider
    const faciaProvider = await base44.entities.Provider.create({
      name: 'Facia',
      provider_category: 'FACIAL_RECOGNITION',
      service_type: 'facial_recognition',
      status: 'active',
      uptime_percentage: 99.9,
      avg_response_time_ms: 1200,
      region: 'Global',
      config: {
        client_id: process.env.FACIA_CLIENT_ID || '',
        client_secret: process.env.FACIA_CLIENT_SECRET || '',
        api_endpoint: 'https://api.facia.io',
        api_version: 'v1'
      },
      global_provider_id: 'facia-global'
    });

    return Response.json({ 
      message: 'Facia provider created successfully', 
      provider: faciaProvider 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});