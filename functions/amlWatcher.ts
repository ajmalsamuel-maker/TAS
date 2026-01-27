import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const AML_BASE_URL = 'https://api.amlwatcher.com';

async function screenEntity(searchParams) {
  const apiKey = Deno.env.get('AMLWATCHER_API_KEY');
  
  const response = await fetch(`${AML_BASE_URL}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: searchParams.name,
      categories: searchParams.categories || ["PEP", "SIP", "Sanctions"],
      entity_type: searchParams.entity_type || ["Person"],
      match_score: searchParams.match_score || 80,
      exact_search: searchParams.exact_search || false,
      group_data: searchParams.group_data || false,
      countries: searchParams.countries || [],
      birth_incorporation_date: searchParams.birth_incorporation_date || "",
      unique_identifier: searchParams.unique_identifier || "",
      client_reference: searchParams.client_reference || "",
      api_key: apiKey
    })
  });

  return await response.json();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ...params } = await req.json();

    if (action === 'screen') {
      const results = await screenEntity(params);

      return Response.json({ 
        status: 'success',
        data: results 
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return Response.json({ 
      error: error.message,
      status: 'error' 
    }, { status: 500 });
  }
});