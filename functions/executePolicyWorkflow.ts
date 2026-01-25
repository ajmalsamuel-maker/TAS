import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { policy_id, input_data } = await req.json();

    if (!policy_id) {
      return Response.json({ error: 'policy_id is required' }, { status: 400 });
    }

    // Fetch policy
    const policies = await base44.entities.Policy.filter({ id: policy_id });
    const policy = policies[0];

    if (!policy) {
      return Response.json({ error: 'Policy not found' }, { status: 404 });
    }

    if (policy.status !== 'active') {
      return Response.json({ error: 'Policy is not active' }, { status: 400 });
    }

    // A/B Testing - Route to variant
    let workflowDefinition = policy.workflow_definition;
    let selectedVariant = 'A';

    if (policy.ab_testing_enabled && policy.ab_test_config?.variant_b_id) {
      const randomValue = Math.random() * 100;
      if (randomValue > (policy.ab_test_config.variant_a_percentage || 50)) {
        const variantBPolicies = await base44.entities.Policy.filter({ 
          id: policy.ab_test_config.variant_b_id 
        });
        if (variantBPolicies[0]) {
          workflowDefinition = variantBPolicies[0].workflow_definition;
          selectedVariant = 'B';
        }
      }
    }

    const startTime = Date.now();
    const executionResult = await executeWorkflow(workflowDefinition, input_data, base44);
    const executionTime = Date.now() - startTime;

    // Update policy metrics
    const newExecutionCount = (policy.execution_count || 0) + 1;
    const newApprovalRate = executionResult.decision === 'approved' 
      ? ((policy.approval_rate || 0) * (newExecutionCount - 1) + 100) / newExecutionCount
      : ((policy.approval_rate || 0) * (newExecutionCount - 1)) / newExecutionCount;
    const newAvgTime = ((policy.avg_execution_time_ms || 0) * (newExecutionCount - 1) + executionTime) / newExecutionCount;

    await base44.asServiceRole.entities.Policy.update(policy_id, {
      execution_count: newExecutionCount,
      approval_rate: Math.round(newApprovalRate * 100) / 100,
      avg_execution_time_ms: Math.round(newAvgTime),
      last_executed: new Date().toISOString()
    });

    return Response.json({
      decision: executionResult.decision,
      reason: executionResult.reason,
      execution_trace: executionResult.trace,
      execution_time_ms: executionTime,
      variant: selectedVariant,
      policy_name: policy.name
    });

  } catch (error) {
    console.error('Policy execution error:', error);
    return Response.json({ 
      error: 'Policy execution failed', 
      details: error.message 
    }, { status: 500 });
  }
});

async function executeWorkflow(workflow, inputData, base44) {
  const { nodes, edges } = workflow;
  const context = { input: inputData, results: {} };
  const trace = [];

  // Find start node
  const startNode = nodes.find(n => n.type === 'start');
  if (!startNode) {
    throw new Error('Workflow must have a start node');
  }

  let currentNodeId = startNode.id;
  let maxIterations = 50; // Prevent infinite loops
  let iterations = 0;

  while (currentNodeId && iterations < maxIterations) {
    iterations++;
    const currentNode = nodes.find(n => n.id === currentNodeId);
    
    if (!currentNode) break;

    trace.push({ node_id: currentNodeId, node_type: currentNode.type, timestamp: new Date().toISOString() });

    // Execute node logic
    if (currentNode.type === 'data_source') {
      const result = await executeDataSource(currentNode.config, context, base44);
      context.results[currentNodeId] = result;
      trace[trace.length - 1].result = result;
    } else if (currentNode.type === 'condition') {
      const conditionMet = evaluateCondition(currentNode.config, context);
      trace[trace.length - 1].condition_met = conditionMet;
      
      // Find next edge based on condition
      const nextEdge = edges.find(e => 
        e.source === currentNodeId && 
        (conditionMet ? e.label === 'true' : e.label === 'false')
      );
      
      if (nextEdge) {
        currentNodeId = nextEdge.target;
        continue;
      }
    } else if (currentNode.type === 'approve') {
      return { 
        decision: 'approved', 
        reason: currentNode.label,
        trace 
      };
    } else if (currentNode.type === 'reject') {
      return { 
        decision: 'rejected', 
        reason: currentNode.label,
        trace 
      };
    } else if (currentNode.type === 'manual_review') {
      return { 
        decision: 'manual_review', 
        reason: currentNode.label,
        trace 
      };
    }

    // Find next node
    const nextEdge = edges.find(e => e.source === currentNodeId);
    currentNodeId = nextEdge?.target;
  }

  return { decision: 'error', reason: 'Workflow did not reach a terminal node', trace };
}

async function executeDataSource(config, context, base44) {
  const { source, timeout } = config;

  try {
    // Map data sources to actual function calls
    if (source === 'fts_kyb') {
      return await base44.functions.invoke('runKYBVerification', context.input);
    } else if (source === 'fts_aml') {
      return await base44.functions.invoke('runAmlScreening', { 
        entity_name: context.input.legal_name 
      });
    } else if (source === 'facia') {
      return await base44.functions.invoke('initiateFacialVerification', { 
        application_id: context.input.application_id 
      });
    } else if (source === 'certizen') {
      return { status: 'success', provider: 'Certizen', data: {} };
    } else if (source === 'gleif') {
      return { status: 'success', provider: 'GLEIF', data: {} };
    }
    
    return { error: 'Unknown data source' };
  } catch (error) {
    return { error: error.message };
  }
}

function evaluateCondition(config, context) {
  const { field, operator, value } = config;
  
  // Extract field value from context using dot notation
  const fieldValue = field.split('.').reduce((obj, key) => obj?.[key], context);

  switch (operator) {
    case 'equals':
      return fieldValue == value;
    case 'not_equals':
      return fieldValue != value;
    case 'greater_than':
      return parseFloat(fieldValue) > parseFloat(value);
    case 'less_than':
      return parseFloat(fieldValue) < parseFloat(value);
    case 'contains':
      return String(fieldValue).includes(value);
    case 'not_contains':
      return !String(fieldValue).includes(value);
    case 'in_list':
      return value.split(',').map(v => v.trim()).includes(String(fieldValue));
    case 'regex_match':
      return new RegExp(value).test(String(fieldValue));
    default:
      return false;
  }
}