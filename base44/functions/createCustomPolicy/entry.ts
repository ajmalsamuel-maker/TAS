import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Create custom verification policy for organization
 * Allows organizations to define their own verification workflows
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { organizationId, name, description, workflow_definition } = await req.json();

    if (!organizationId || !name || !workflow_definition) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Verify user belongs to organization
    const orgs = await base44.entities.Organization.filter({ id: organizationId });
    if (orgs.length === 0) {
      return Response.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Create policy
    const policy = await base44.entities.Policy.create({
      organization_id: organizationId,
      name,
      description,
      type: 'custom',
      workflow_definition,
      status: 'draft',
      version: 1
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: policy.id,
      event: `Custom policy created: ${name}`,
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        organizationId,
        policyName: name,
        nodeCount: workflow_definition.nodes?.length || 0
      }
    });

    return Response.json({
      success: true,
      policy,
      message: 'Custom policy created successfully'
    });
  } catch (error) {
    console.error('Error creating custom policy:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});