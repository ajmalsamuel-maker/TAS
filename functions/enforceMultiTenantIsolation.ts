import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Enforce multi-tenant data isolation
 * Validates that users only access their organization's data
 * Called at the start of sensitive operations
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requestedOrgId, resourceType } = await req.json();

    if (!requestedOrgId) {
      return Response.json({ error: 'Missing organization context' }, { status: 400 });
    }

    // Admins can access any organization
    if (user.role === 'admin') {
      return Response.json({
        success: true,
        allowed: true,
        message: 'Admin access granted'
      });
    }

    // Regular users can only access their own organization
    if (user.organization_id !== requestedOrgId) {
      // Log unauthorized access attempt
      await base44.asServiceRole.entities.AuditLog.create({
        workflow_id: 'security_check',
        event: `Unauthorized access attempt to organization ${requestedOrgId}`,
        event_type: 'workflow_started',
        actor: user.email,
        actor_lei: user.lei || 'N/A',
        details: {
          userOrgId: user.organization_id,
          requestedOrgId,
          resourceType,
          timestamp: new Date().toISOString()
        }
      });

      return Response.json({ error: 'Forbidden: Access denied to this organization' }, { status: 403 });
    }

    return Response.json({
      success: true,
      allowed: true,
      organizationId: requestedOrgId,
      message: 'Multi-tenant isolation check passed'
    });
  } catch (error) {
    console.error('Error enforcing multi-tenant isolation:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});