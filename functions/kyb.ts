import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const KYB_BASE_URL = 'https://api.thekyb.com/api';

async function searchCompany(query, apiKey) {
  const response = await fetch(`${KYB_BASE_URL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      query: query,
      country: query.country || 'US'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`KYB API error: ${errorText}`);
  }

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
    const apiKey = Deno.env.get('KYB_API_KEY');

    if (!apiKey) {
      return Response.json({ error: 'KYB API Key not configured' }, { status: 500 });
    }

    let result;

    switch (action) {
      case 'search':
        result = await searchCompany(params, apiKey);
        break;
      
      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    return Response.json({
      status: 'success',
      data: result
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});