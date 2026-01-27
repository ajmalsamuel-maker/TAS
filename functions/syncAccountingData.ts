import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { integration_key, sync_type, entity_ids } = await req.json();

    // Fetch integration credentials
    const settings = await base44.entities.BillingSettings.filter({});
    const integration = settings[0]?.accounting_integrations?.find(i => i.system === integration_key);

    if (!integration || !integration.is_connected) {
      return Response.json({ error: 'Integration not connected' }, { status: 400 });
    }

    const results = {
      success: true,
      synced: 0,
      failed: 0,
      errors: [],
      sync_id: crypto.randomUUID()
    };

    try {
      // Fetch data to sync based on sync_type
      let dataToSync = [];
      
      if (sync_type === 'invoices' || sync_type === 'all') {
        const invoices = entity_ids 
          ? await base44.entities.Invoice.filter({ id: { $in: entity_ids } })
          : await base44.entities.Invoice.filter({ 
              status: { $in: ['issued', 'sent', 'paid'] }
            });
        dataToSync = [...dataToSync, ...invoices.map(inv => ({ type: 'invoice', data: inv }))];
      }

      if (sync_type === 'customers' || sync_type === 'all') {
        const orgs = await base44.entities.Organization.filter({});
        dataToSync = [...dataToSync, ...orgs.map(org => ({ type: 'customer', data: org }))];
      }

      // Fetch field mappings
      const mappings = await base44.entities.FieldMapping.filter({ integration_key });
      const fieldMap = mappings.reduce((acc, m) => {
        if (!acc[m.entity_type]) acc[m.entity_type] = {};
        acc[m.entity_type][m.app_field] = m.accounting_field;
        return acc;
      }, {});

      // Sync each item
      for (const item of dataToSync) {
        try {
          const transformedData = transformData(item.data, item.type, fieldMap[item.type] || {});
          
          // Call accounting system API (simplified - actual implementation varies by system)
          const syncResult = await syncToAccountingSystem(
            integration_key,
            integration.credentials,
            item.type,
            transformedData
          );

          // Log success
          await base44.entities.SyncLog.create({
            integration_key,
            entity_type: item.type,
            entity_id: item.data.id,
            sync_id: results.sync_id,
            status: 'success',
            direction: 'app_to_accounting',
            external_id: syncResult.external_id,
            synced_by: user.email
          });

          results.synced++;
        } catch (error) {
          results.failed++;
          results.errors.push({
            entity_id: item.data.id,
            entity_type: item.type,
            error: error.message
          });

          // Log failure
          await base44.entities.SyncLog.create({
            integration_key,
            entity_type: item.type,
            entity_id: item.data.id,
            sync_id: results.sync_id,
            status: 'failed',
            direction: 'app_to_accounting',
            error_message: error.message,
            synced_by: user.email
          });
        }
      }

      // Update last sync timestamp
      const settingsId = settings[0]?.id;
      if (settingsId) {
        const updatedIntegrations = settings[0].accounting_integrations.map(i => 
          i.system === integration_key 
            ? { ...i, last_sync: new Date().toISOString() }
            : i
        );
        await base44.entities.BillingSettings.update(settingsId, {
          accounting_integrations: updatedIntegrations
        });
      }

    } catch (error) {
      results.success = false;
      results.errors.push({ error: error.message });
    }

    return Response.json(results);

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

// Transform data based on field mappings
function transformData(data, entityType, fieldMap) {
  const transformed = {};
  
  for (const [appField, accountingField] of Object.entries(fieldMap)) {
    if (data[appField] !== undefined) {
      transformed[accountingField] = data[appField];
    }
  }
  
  // Add default fields if not mapped
  if (entityType === 'invoice') {
    transformed.invoice_number = transformed.invoice_number || data.invoice_number;
    transformed.total = transformed.total || data.total_amount;
    transformed.date = transformed.date || data.issue_date;
    transformed.due_date = transformed.due_date || data.due_date;
  }
  
  return transformed;
}

// Sync to accounting system (simplified - actual implementation varies)
async function syncToAccountingSystem(integrationKey, credentials, entityType, data) {
  // This is a simplified example - actual implementation would call specific APIs
  
  const apiEndpoints = {
    quickbooks: 'https://quickbooks.api.intuit.com/v3/company',
    xero: 'https://api.xero.com/api.xro/2.0',
    sage: 'https://api.sage.com/v3.1',
    // ... other endpoints
  };

  const endpoint = apiEndpoints[integrationKey];
  if (!endpoint) {
    throw new Error(`Unsupported integration: ${integrationKey}`);
  }

  // Simulate API call (in production, make actual API calls)
  // const response = await fetch(`${endpoint}/${entityType}`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${credentials.access_token}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // });

  return {
    external_id: `EXT-${crypto.randomUUID().slice(0, 8)}`,
    status: 'synced'
  };
}