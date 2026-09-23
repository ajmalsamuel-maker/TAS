import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const GLEIF_BASE_URL = 'https://api.gleif.org/api/v1';

async function searchLeiByName(name) {
  const response = await fetch(
    `${GLEIF_BASE_URL}/lei-records?filter[entity.legalName]=${encodeURIComponent(name)}&page[size]=10`
  );
  return await response.json();
}

async function fuzzySearchLei(name) {
  const response = await fetch(
    `${GLEIF_BASE_URL}/fuzzycompletions?field=entity.legalName&q=${encodeURIComponent(name)}`
  );
  return await response.json();
}

async function getLeiDetails(lei) {
  const response = await fetch(`${GLEIF_BASE_URL}/lei-records/${lei}`);
  return await response.json();
}

async function searchLeiByBic(bic) {
  const response = await fetch(
    `${GLEIF_BASE_URL}/lei-records?filter[bic]=${encodeURIComponent(bic)}`
  );
  return await response.json();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, name, lei, bic } = await req.json();

    let result;

    switch (action) {
      case 'search':
        result = await searchLeiByName(name);
        break;
      case 'fuzzySearch':
        result = await fuzzySearchLei(name);
        break;
      case 'getDetails':
        result = await getLeiDetails(lei);
        break;
      case 'searchByBic':
        result = await searchLeiByBic(bic);
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