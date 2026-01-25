import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Disconnect provider from organization
 * Removes integration and revokes access
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { organizationId, providerId } = await req.json();

    if (!organizationId || !providerId) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Fetch provider
    const providers = await base44.entities.Provider.filter({ id: providerId });
    const provider = providers[0];

    if (!provider) {
      return Response.json({ error: 'Provider not found' }, { status: 404 });
    }

    // Find and disable integration webhook
    const webhooks = await base44.entities.Webhook.filter({
      organization_id: organizationId,
      partner_name: provider.name
    });

    if (webhooks.length > 0) {
      await base44.entities.Webhook.update(webhooks[0].id, {
        is_active: false
      });
    }

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: 'provider_disconnection',
      event: `${provider.name} disconnected`,
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        organizationId,
        providerId,
        providerName: provider.name
      }
    });

    return Response.json({
      success: true,
      message: `${provider.name} disconnected successfully`
    });
  } catch (error) {
    console.error('Error disconnecting provider:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});