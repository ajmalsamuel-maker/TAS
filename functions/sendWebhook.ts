import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event_type, workflow_id, application_id, data } = await req.json();

    // Get all active webhooks for this event
    const webhooks = await base44.asServiceRole.entities.Webhook.filter({
      is_active: true
    });

    const relevantWebhooks = webhooks.filter(w => w.event_types.includes(event_type));

    const results = [];
    for (const webhook of relevantWebhooks) {
      try {
        const payload = {
          event: event_type,
          timestamp: new Date().toISOString(),
          workflow_id,
          application_id,
          data
        };

        // Create HMAC signature
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
          'raw',
          encoder.encode(webhook.secret_key || ''),
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        );
        const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(JSON.stringify(payload)));
        const signatureHex = Array.from(new Uint8Array(signature))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');

        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Signature': signatureHex,
            'X-Webhook-Event': event_type
          },
          body: JSON.stringify(payload)
        });

        const success = response.ok;
        results.push({
          webhook_id: webhook.id,
          url: webhook.url,
          success,
          status: response.status
        });

        // Update webhook last_triggered
        if (success) {
          await base44.asServiceRole.entities.Webhook.update(webhook.id, {
            last_triggered: new Date().toISOString(),
            last_status: 'success'
          });
        }
      } catch (error) {
        results.push({
          webhook_id: webhook.id,
          url: webhook.url,
          success: false,
          error: error.message
        });
      }
    }

    return Response.json({ status: 'success', results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});