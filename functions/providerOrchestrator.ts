import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { service_type, country_code, request_data } = body;

    if (!service_type || !request_data) {
      return Response.json(
        { error: 'service_type and request_data are required' },
        { status: 400 }
      );
    }

    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get optimal provider
    const providerResponse = await base44.functions.invoke('selectOptimalProvider', {
      service_type,
      country_code: country_code || user.country_code
    });

    if (!providerResponse.data.success) {
      return Response.json(
        { error: providerResponse.data.error },
        { status: 404 }
      );
    }

    const selectedProvider = providerResponse.data.provider;
    const fallbacks = providerResponse.data.fallbacks || [];

    // Try providers in order (primary + fallbacks)
    const providersToTry = [selectedProvider, ...fallbacks];
    let lastError = null;

    for (const provider of providersToTry) {
      try {
        console.log(`[Orchestrator] Attempting ${service_type} with provider: ${provider.name}`);

        const result = await routeRequest(service_type, provider, request_data);

        return Response.json({
          success: true,
          data: result,
          provider_used: {
            id: provider.id,
            name: provider.name
          }
        });
      } catch (error) {
        lastError = error;
        console.log(
          `[Orchestrator] Provider ${provider.name} failed: ${error.message}`
        );

        // Mark provider as having issues
        try {
          await base44.asServiceRole.entities.Provider.update(provider.id, {
            consecutive_failures: (provider.consecutive_failures || 0) + 1
          });
        } catch (e) {
          console.error('Failed to update provider status:', e.message);
        }

        // Continue to next provider
        continue;
      }
    }

    // All providers failed
    return Response.json(
      {
        error: `All providers failed for ${service_type}`,
        last_error: lastError?.message,
        attempts: providersToTry.length
      },
      { status: 503 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function routeRequest(serviceType, provider, requestData) {
  const headers = {
    'Content-Type': 'application/json'
  };

  // Add authentication based on available credentials
  if (provider.credentials?.api_key) {
    headers['Authorization'] = `Bearer ${provider.credentials.api_key}`;
  } else if (provider.credentials?.client_id && provider.credentials?.client_secret) {
    const auth = btoa(
      `${provider.credentials.client_id}:${provider.credentials.client_secret}`
    );
    headers['Authorization'] = `Basic ${auth}`;
  }

  const endpoint = provider.endpoint;

  // Route based on service type
  let url = endpoint;
  switch (serviceType) {
    case 'kyb':
      url = `${endpoint}/kyb/verify`;
      break;
    case 'aml':
      url = `${endpoint}/aml/screen`;
      break;
    case 'did':
      url = `${endpoint}/did/resolve`;
      break;
    case 'credential_verification':
      url = `${endpoint}/verify/credential`;
      break;
    default:
      url = `${endpoint}/${serviceType}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestData),
    signal: AbortSignal.timeout(30000)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Provider returned ${response.status}: ${
        errorData.error || response.statusText
      }`
    );
  }

  return await response.json();
}