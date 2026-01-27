import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { service_type, country_code, exclude_providers = [] } = body;

    if (!service_type) {
      return Response.json(
        { error: 'service_type is required' },
        { status: 400 }
      );
    }

    // Get all active providers for this service
    const allProviders = await base44.entities.Provider.list();
    let candidates = allProviders.filter(p =>
      p.is_active &&
      p.service_type === service_type &&
      !exclude_providers.includes(p.id) &&
      p.status !== 'offline'
    );

    if (candidates.length === 0) {
      return Response.json(
        { error: `No available providers for service: ${service_type}` },
        { status: 404 }
      );
    }

    // Filter by country if provided
    if (country_code) {
      const countrySpecific = candidates.filter(p => {
        const rules = p.country_routing_rules;
        if (!rules?.enabled) return true; // Always available if routing disabled
        
        const countries = rules.countries || [];
        
        // If countries is empty, provider is globally available
        if (countries.length === 0) return true;
        
        // If exclusive, only serve if in list
        if (rules.exclusive_countries) return countries.includes(country_code);
        
        // Otherwise, return if in list, or as fallback if fallback enabled
        return countries.includes(country_code);
      });

      // If country-specific providers found, use those; otherwise use all
      if (countrySpecific.length > 0) {
        candidates = countrySpecific;
      }
    }

    // Sort by priority weight (lower = higher priority), then by health status
    candidates.sort((a, b) => {
      const aWeight = a.priority_weight || 10;
      const bWeight = b.priority_weight || 10;

      // Same weight: prioritize by status (active > degraded > offline)
      if (aWeight === bWeight) {
        const statusOrder = { 'active': 0, 'degraded': 1, 'offline': 2 };
        const aStatus = statusOrder[a.status] || 2;
        const bStatus = statusOrder[b.status] || 2;
        return aStatus - bStatus;
      }

      return aWeight - bWeight;
    });

    const selected = candidates[0];

    return Response.json({
      success: true,
      provider: {
        id: selected.id,
        name: selected.name,
        service_type: selected.service_type,
        endpoint: selected.endpoint,
        status: selected.status,
        uptime_percentage: selected.uptime_percentage,
        priority_weight: selected.priority_weight,
        country_routing: selected.country_routing_rules,
        credentials: {
          api_key: selected.api_key ? '***' : null,
          client_id: selected.client_id ? '***' : null,
          client_secret: selected.client_secret ? '***' : null
        }
      },
      fallbacks: candidates.slice(1).map(p => ({
        id: p.id,
        name: p.name,
        status: p.status,
        priority_weight: p.priority_weight
      }))
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});