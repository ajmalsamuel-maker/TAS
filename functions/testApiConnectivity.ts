import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const AML_BASE_URL = 'https://api.amlwatcher.com';
const FACIA_BASE_URL = 'https://api.facia.ai';
const KYB_BASE_URL = 'https://api.kyb.fts-alpha.com';

async function testAMLWatcher() {
  try {
    const apiKey = Deno.env.get('AMLWATCHER_API_KEY');

    if (!apiKey) {
      return {
        service: 'AML Watcher',
        status: 'warning',
        message: 'API Key not configured',
        connected: false,
        note: 'Please set AMLWATCHER_API_KEY'
      };
    }

    // Test a simple search request
    const searchResponse = await fetch(`${AML_BASE_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Entity',
        categories: ['PEP'],
        entity_type: ['Person'],
        match_score: 100,
        api_key: apiKey
      })
    });

    if (!searchResponse.ok) {
      const text = await searchResponse.text();
      return {
        service: 'AML Watcher',
        status: 'error',
        message: `API request failed: ${text}`,
        connected: false
      };
    }

    const searchData = await searchResponse.json();

    if (searchData.status === 'SUCCESS' || searchData.status === 'FAIL') {
      return {
        service: 'AML Watcher',
        status: 'success',
        message: 'Connected successfully',
        connected: true,
        capabilities: ['Entity Screening', 'PEP Detection', 'Sanctions Screening', 'Adverse Media']
      };
    } else {
      return {
        service: 'AML Watcher',
        status: 'warning',
        message: 'Unexpected API response format',
        connected: false,
        details: searchData
      };
    }

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

    // Facia API returns token in result.data.token, not access_token
    const accessToken = data.result?.data?.token || data.access_token;

    if (!accessToken || !data.status) {
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