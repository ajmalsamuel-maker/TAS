import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workflowId, type, entityData } = await req.json();

    // Create or get workflow
    let workflow;
    if (workflowId) {
      workflow = await base44.entities.Workflow.filter({ id: workflowId });
      workflow = workflow[0];
    } else {
      workflow = await base44.entities.Workflow.create({
        user_id: user.id,
        type,
        status: 'in_progress',
        language: user.language || 'en',
        provenance_chain: []
      });
    }

    const provenanceChain = workflow.provenance_chain || [];
    let results = {};

    // Step 1: LEI Verification
    if (type === 'kyb' || type === 'vlei_issuance') {
      const leiStep = {
        step: 'lei_verification',
        provider: 'GLEIF',
        lei: 'GLEIF',
        vlei_role: 'OOR',
        timestamp: new Date().toISOString()
      };
      
      const leiResult = await base44.functions.invoke('gleifLei', {
        action: 'search',
        name: entityData.legal_name
      });

      results.lei = leiResult.data;
      leiStep.signature = await generateSignature(leiStep, leiResult.data);
      provenanceChain.push(leiStep);
    }

    // Step 2: Identity Verification (Facia)
    if (type === 'kyb' && entityData.faceFrame && entityData.idFrame) {
      const faciaStep = {
        step: 'identity_verification',
        provider: 'Facia',
        timestamp: new Date().toISOString()
      };

      const faciaResult = await base44.functions.invoke('faciaVerification', {
        action: 'faceMatch',
        faceFrame: entityData.faceFrame,
        idFrame: entityData.idFrame,
        clientReference: workflow.id
      });

      results.identity = faciaResult.data;
      faciaStep.signature = await generateSignature(faciaStep, faciaResult.data);
      provenanceChain.push(faciaStep);
    }

    // Step 3: AML Screening
    if (type === 'aml' || type === 'kyb') {
      const amlStep = {
        step: 'aml_screening',
        provider: 'AML Watcher',
        timestamp: new Date().toISOString()
      };

      const amlResult = await base44.functions.invoke('amlWatcher', {
        action: 'screen',
        entity_name: entityData.legal_name,
        country: entityData.country,
        entity_type: 'business'
      });

      results.aml = amlResult.data;
      amlStep.signature = await generateSignature(amlStep, amlResult.data);
      provenanceChain.push(amlStep);

      // Create AML alerts if needed
      if (amlResult.data?.data?.matches?.length > 0) {
        for (const match of amlResult.data.data.matches.slice(0, 5)) {
          await base44.asServiceRole.entities.AMLAlert.create({
            user_id: user.id,
            workflow_id: workflow.id,
            type: match.category || 'sanction_hit',
            severity: match.score > 0.8 ? 'high' : match.score > 0.5 ? 'medium' : 'low',
            details: match,
            status: 'new'
          });
        }
      }
    }

    // Step 4: Generate Data Passport
    const dataPassport = {
      workflow_id: workflow.id,
      entity_data: entityData,
      verification_results: results,
      provenance_chain: provenanceChain,
      issued_at: new Date().toISOString(),
      signature: await generateSignature({ workflow_id: workflow.id }, { results, provenanceChain })
    };

    // Update workflow
    await base44.asServiceRole.entities.Workflow.update(workflow.id, {
      status: 'completed',
      provenance_chain: provenanceChain,
      result: results,
      data_passport: dataPassport
    });

    // Create audit log
    await base44.asServiceRole.entities.AuditLog.create({
      workflow_id: workflow.id,
      event: 'workflow_completed',
      event_type: 'workflow_completed',
      actor: user.email,
      details: { type, steps: provenanceChain.length },
      signature: await generateSignature({ workflow_id: workflow.id }, { completed: true })
    });

    return Response.json({
      status: 'success',
      workflow,
      results,
      data_passport: dataPassport
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});

async function generateSignature(step, data) {
  const content = JSON.stringify({ step, data, timestamp: Date.now() });
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}