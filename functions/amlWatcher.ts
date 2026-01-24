import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const AML_BASE_URL = 'https://api.amlwatcher.com';

async function getAccessToken() {
  const clientId = Deno.env.get('AMLWATCHER_CLIENT_ID');
  const clientSecret = Deno.env.get('AMLWATCHER_CLIENT_SECRET');

  const response = await fetch(`${AML_BASE_URL}/get-access-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret
    })
  });

  const data = await response.json();
  if (data.status !== 'SUCCESS') {
    throw new Error(data.error || 'Failed to get access token');
  }

  return data.data.access_token;
}

async function generateApiKey(accessToken) {
  const response = await fetch(`${AML_BASE_URL}/api/api-key`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ expires_at: 30 })
  });

  const data = await response.json();
  if (data.status !== 'SUCCESS') {
    throw new Error(data.error || 'Failed to generate API key');
  }

  return data.data.api_key.key;
}

async function screenEntity(apiKey, searchParams) {
  const response = await fetch(`${AML_BASE_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchParams)
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
      const accessToken = await getAccessToken();
      const apiKey = await generateApiKey(accessToken);
      const results = await screenEntity(apiKey, params);

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