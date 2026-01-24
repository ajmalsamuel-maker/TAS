import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const FACIA_BASE_URL = 'https://api.facia.ai';

async function getAccessToken() {
  const clientId = Deno.env.get('FACIA_CLIENT_ID');
  const clientSecret = Deno.env.get('FACIA_CLIENT_SECRET');

  const response = await fetch(`${FACIA_BASE_URL}/request-access-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret
    })
  });

  const data = await response.json();
  if (!data.access_token) {
    throw new Error(data.message || 'Failed to get access token');
  }

  return data.access_token;
}

async function generateLivenessUrl(accessToken, customerData) {
  const response = await fetch(`${FACIA_BASE_URL}/generate-liveness-url`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      redirect_url: customerData.redirect_url,
      callback_url: customerData.callback_url,
      customer_id: customerData.customer_id,
      customer_email: customerData.customer_email,
      ttl: customerData.ttl || 60
    })
  });

  return await response.json();
}

async function faceMatch(accessToken, faceFrameUrl, idFrameUrl, clientReference) {
  const formData = new FormData();
  formData.append('type', 'photo_id_match');
  formData.append('face_frame', faceFrameUrl);
  formData.append('id_frame', idFrameUrl);
  formData.append('client_reference', clientReference);
  formData.append('allow_override', '0');
  formData.append('enroll_face', 'true');

  const response = await fetch(`${FACIA_BASE_URL}/face-match`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData
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
    const accessToken = await getAccessToken();

    let result;

    switch (action) {
      case 'generateLiveness':
        result = await generateLivenessUrl(accessToken, params);
        break;
      
      case 'faceMatch':
        result = await faceMatch(accessToken, params.faceFrame, params.idFrame, params.clientReference);
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