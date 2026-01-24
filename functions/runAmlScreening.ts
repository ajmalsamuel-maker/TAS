import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entityName, country, entityType = 'business' } = await req.json();

    // Create workflow
    const workflow = await base44.entities.Workflow.create({
      user_id: user.id,
      type: 'aml',
      status: 'in_progress',
      language: user.language || 'en',
      provenance_chain: []
    });

    // Run AML screening
    const amlResult = await base44.functions.invoke('amlWatcher', {
      action: 'screen',
      entity_name: entityName,
      country,
      entity_type: entityType
    });

    const provenanceChain = [{
      step: 'aml_screening',
      provider: 'AML Watcher',
      timestamp: new Date().toISOString(),
      signature: await generateSignature({ entityName, country })
    }];

    // Process results and create alerts
    const alerts = [];
    if (amlResult.data?.data?.matches) {
      for (const match of amlResult.data.data.matches) {
        const alert = await base44.asServiceRole.entities.AMLAlert.create({
          user_id: user.id,
          workflow_id: workflow.id,
          type: match.category || 'sanction_hit',
          severity: match.score > 0.8 ? 'high' : match.score > 0.5 ? 'medium' : 'low',
          details: match,
          status: 'new'
        });
        alerts.push(alert);
      }
    }

    // Update workflow
    await base44.entities.Workflow.update(workflow.id, {
      status: 'completed',
      provenance_chain: provenanceChain,
      result: amlResult.data,
      data_passport: {
        workflow_id: workflow.id,
        screening_results: amlResult.data,
        alerts_created: alerts.length,
        issued_at: new Date().toISOString()
      }
    });

    return Response.json({
      status: 'success',
      workflow_id: workflow.id,
      results: amlResult.data,
      alerts: alerts.length
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});

async function generateSignature(data) {
  const content = JSON.stringify({ ...data, timestamp: Date.now() });
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}