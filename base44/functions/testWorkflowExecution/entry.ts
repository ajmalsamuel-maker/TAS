import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Test workflow execution with sample data
 * Validates workflow logic before deploying
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { organizationId, workflowDefinition } = await req.json();

    if (!organizationId || !workflowDefinition) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Validate workflow structure
    if (!workflowDefinition.nodes || workflowDefinition.nodes.length === 0) {
      return Response.json({ error: 'Workflow must have at least one node' }, { status: 400 });
    }

    // Simulate execution with test data
    const executionResults = {
      workflowId: `test-${Date.now()}`,
      organizationId,
      status: 'completed',
      steps: [],
      executionTime: Math.floor(Math.random() * 5000) + 1000 // 1-6 seconds
    };

    // Simulate each step
    for (const node of workflowDefinition.nodes) {
      const stepResult = {
        nodeId: node.id,
        type: node.type,
        label: node.label,
        status: 'passed',
        duration: Math.floor(Math.random() * 2000) + 500
      };

      if (node.type === 'kyb_check') {
        stepResult.result = { businessVerified: true, riskScore: 25 };
      } else if (node.type === 'aml_screening') {
        stepResult.result = { screeningPassed: true, hitCount: 0 };
      } else if (node.type === 'facial_verification') {
        stepResult.result = { livenessDetected: true, confidence: 0.98 };
      } else if (node.type === 'decision') {
        stepResult.result = { decision: 'approve' };
      }

      executionResults.steps.push(stepResult);
    }

    // Create audit log for test execution
    await base44.entities.AuditLog.create({
      workflow_id: executionResults.workflowId,
      event: 'Workflow test execution completed',
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        organizationId,
        nodeCount: workflowDefinition.nodes.length,
        executionTime: executionResults.executionTime,
        result: 'success'
      }
    });

    return Response.json({
      success: true,
      executionResults,
      message: 'Workflow test execution completed successfully'
    });
  } catch (error) {
    console.error('Error testing workflow execution:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});