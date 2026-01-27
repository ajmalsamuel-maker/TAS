import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const AML_BASE_URL = 'https://api.amlwatcher.com';
const FACIA_BASE_URL = 'https://api.facia.ai';
const KYB_BASE_URL = 'https://api.kyb.fts-alpha.com';

async function testAMLWatcher() {
  const clientId = Deno.env.get('AMLWATCHER_CLIENT_ID');
  const clientSecret = Deno.env.get('AMLWATCHER_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    return {
      service: 'AML Watcher',
      status: 'error',
      message: 'Missing credentials',
      connected: false
    };
  }

  try {
    // Test authentication
    const authResponse = await fetch(`${AML_BASE_URL}/get-access-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret })
    });

    const authData = await authResponse.json();
    
    if (authData.status !== 'SUCCESS') {
      return {
        service: 'AML Watcher',
        status: 'error',
        message: authData.error || 'Authentication failed',
        connected: false
      };
    }

    // Test API key generation
    const apiKeyResponse = await fetch(`${AML_BASE_URL}/api/api-key`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.data.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expires_at: 30 })
    });

    const apiKeyData = await apiKeyResponse.json();

    if (apiKeyData.status !== 'SUCCESS') {
      return {
        service: 'AML Watcher',
        status: 'warning',
        message: 'Authenticated but API key generation failed',
        connected: true,
        details: apiKeyData
      };
    }

    return {
      service: 'AML Watcher',
      status: 'success',
      message: 'Connected successfully',
      connected: true,
      capabilities: ['Authentication', 'API Key Generation', 'Entity Screening']
    };
  } catch (error) {
    return {
      service: 'AML Watcher',
      status: 'error',
      message: error.message,
      connected: false
    };
  }
}

async function testFacia() {
  const clientId = Deno.env.get('FACIA_CLIENT_ID');
  const clientSecret = Deno.env.get('FACIA_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    return {
      service: 'Facia',
      status: 'error',
      message: 'Missing credentials',
      connected: false
    };
  }

  try {
    // Test authentication
    const response = await fetch(`${FACIA_BASE_URL}/request-access-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        service: 'Facia',
        status: 'error',
        message: `HTTP ${response.status}: ${errorText}`,
        connected: false
      };
    }

    const data = await response.json();

    if (!data.access_token) {
      return {
        service: 'Facia',
        status: 'error',
        message: data.message || data.error || 'Authentication failed - no access token received',
        connected: false,
        details: data
      };
    }

    return {
      service: 'Facia',
      status: 'success',
      message: 'Connected successfully',
      connected: true,
      capabilities: ['Liveness Detection', 'Face Matching', 'ID Verification']
    };
  } catch (error) {
    return {
      service: 'Facia',
      status: 'error',
      message: error.message,
      connected: false
    };
  }
}

async function testKYB() {
  try {
    // Test KYB API endpoint with a health check or basic query
    const response = await fetch(`${KYB_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      return {
        service: 'KYB (FTS)',
        status: 'success',
        message: 'Connected successfully',
        connected: true,
        capabilities: ['Business Verification', 'Registry Lookup', 'Document Validation']
      };
    } else {
      return {
        service: 'KYB (FTS)',
        status: 'warning',
        message: `API responded with status ${response.status}`,
        connected: false
      };
    }
  } catch (error) {
    return {
      service: 'KYB (FTS)',
      status: 'error',
      message: error.message,
      connected: false,
      note: 'KYB API credentials or endpoint may need configuration'
    };
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Run all tests in parallel
    const [amlResult, faciaResult, kybResult] = await Promise.all([
      testAMLWatcher(),
      testFacia(),
      testKYB()
    ]);

    const allConnected = amlResult.connected && faciaResult.connected && kybResult.connected;

    return Response.json({
      status: allConnected ? 'success' : 'partial',
      message: allConnected 
        ? 'All services connected successfully' 
        : 'Some services have connection issues',
      timestamp: new Date().toISOString(),
      results: [amlResult, faciaResult, kybResult],
      summary: {
        total: 3,
        connected: [amlResult, faciaResult, kybResult].filter(r => r.connected).length,
        failed: [amlResult, faciaResult, kybResult].filter(r => !r.connected).length
      }
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});