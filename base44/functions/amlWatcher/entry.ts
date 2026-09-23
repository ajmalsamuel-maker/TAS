import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ...params } = await req.json();

    if (action !== 'screen') {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Route through orchestrator for intelligent provider selection
    const orchestratorResponse = await base44.functions.invoke('providerOrchestrator', {
      service_type: 'aml',
      country_code: params.country || user.country_code,
      request_data: {
        name: params.name,
        categories: params.categories || ["PEP", "SIP", "Sanctions"],
        entity_type: params.entity_type || ["Person"],
        match_score: params.match_score || 80,
        exact_search: params.exact_search || false,
        group_data: params.group_data || false,
        countries: params.countries || [],
        birth_incorporation_date: params.birth_incorporation_date || "",
        unique_identifier: params.unique_identifier || "",
        client_reference: params.client_reference || ""
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