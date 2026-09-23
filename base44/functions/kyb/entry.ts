import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ...params } = await req.json();

    if (action !== 'search') {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Route through orchestrator for intelligent provider selection
    const orchestratorResponse = await base44.functions.invoke('providerOrchestrator', {
      service_type: 'kyb',
      country_code: params.country || user.country_code,
      request_data: {
        query: params.query,
        country: params.country || 'US'
      }
    });

    return Response.json({
      status: 'success',
      data: orchestratorResponse.data.data,
      provider_used: orchestratorResponse.data.provider_used
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});