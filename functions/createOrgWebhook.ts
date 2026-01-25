import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Create organization-specific webhook
 * Allows organizations to receive real-time event notifications
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { organizationId, url, event_types } = await req.json();

    if (!organizationId || !url || !event_types || event_types.length === 0) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return Response.json({ error: 'Invalid webhook URL' }, { status: 400 });
    }

    // Create webhook
    const webhook = await base44.entities.Webhook.create({
      organization_id: organizationId,
      url,
      event_types,
      partner_name: `Webhook-${Date.now()}`,
      is_active: true,
      last_triggered: null,
      last_status: 'pending',
      secret_key: `wh_${generateSecretKey()}`
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: webhook.id,
      event: `Webhook created for ${event_types.join(', ')}`,
      event_type: 'workflow_completed',
      actor: user.email,
      details: {
        organizationId,
        webhookUrl: url,
        eventTypes: event_types
      }
    });

    return Response.json({
      success: true,
      webhook,
      message: 'Webhook created successfully'
    });
  } catch (error) {
    console.error('Error creating webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function generateSecretKey() {
  return Array(32)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}