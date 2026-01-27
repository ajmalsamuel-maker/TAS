import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data, old_data } = await req.json();

    // Only process updates
    if (event.type !== 'update') {
      return Response.json({ message: 'Not an update event' });
    }

    const provider = data;
    const oldProvider = old_data;

    // Check if status changed to offline or degraded
    const statusChanged = oldProvider?.status !== provider.status;
    const isCritical = provider.status === 'offline' || provider.status === 'degraded';

    if (!statusChanged || !isCritical) {
      return Response.json({ message: 'No critical alert needed' });
    }

    // Get all admin users
    const adminUsers = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    
    if (adminUsers.length === 0) {
      console.warn('No admin users found to notify');
      return Response.json({ warning: 'No admin users found' });
    }

    // Prepare alert details
    const alertDetails = {
      provider_name: provider.name,
      service_type: provider.service_type,
      status: provider.status,
      previous_status: oldProvider.status,
      consecutive_failures: provider.consecutive_failures || 0,
      last_health_check: provider.last_health_check,
      uptime: provider.uptime_percentage || 0,
      detection_time: new Date().toISOString()
    };

    // Send email notifications to all admins
    const emailPromises = adminUsers.map(admin =>
      sendEmailAlert(base44, admin, alertDetails)
    );

    // Send Slack notification if configured
    const slackPromise = sendSlackAlert(base44, alertDetails);

    // Create alert record
    const createAlertPromise = base44.asServiceRole.entities.ProviderAlert?.create?.({
      provider_id: provider.id,
      provider_name: provider.name,
      service_type: provider.service_type,
      alert_type: provider.status === 'offline' ? 'provider_offline' : 'provider_degraded',
      status: 'active',
      severity: provider.status === 'offline' ? 'critical' : 'high',
      details: alertDetails,
      notified_admins: adminUsers.map(u => u.email),
      alert_time: new Date().toISOString()
    }).catch(e => console.log('Alert entity not available:', e.message));

    await Promise.allSettled([
      ...emailPromises,
      slackPromise,
      createAlertPromise
    ]);

    return Response.json({
      success: true,
      alert_sent: true,
      provider: provider.name,
      status: provider.status,
      admins_notified: adminUsers.length
    });
  } catch (error) {
    console.error('Alert function error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function sendEmailAlert(base44, admin, alertDetails) {
  const subject = `⚠️ Provider Alert: ${alertDetails.provider_name} is ${alertDetails.status.toUpperCase()}`;
  
  const body = `
Provider Health Alert
=====================

Provider: ${alertDetails.provider_name}
Service Type: ${alertDetails.service_type}
Status: ${alertDetails.status.toUpperCase()}
Previous Status: ${alertDetails.previous_status}

Details:
- Consecutive Failures: ${alertDetails.consecutive_failures}
- Uptime: ${alertDetails.uptime}%
- Last Health Check: ${alertDetails.last_health_check || 'Never'}
- Detection Time: ${alertDetails.detection_time}

Action Required:
Please review the provider's health status in the admin dashboard and take necessary action.
The system will automatically failover to fallback providers if available.

---
Trust Anchor Service - Provider Monitoring System
  `.trim();

  try {
    await base44.integrations.Core.SendEmail({
      to: admin.email,
      subject,
      body,
      from_name: 'Provider Monitoring'
    });
    console.log(`Email sent to ${admin.email}`);
  } catch (error) {
    console.error(`Failed to send email to ${admin.email}:`, error.message);
  }
}

async function sendSlackAlert(base44, alertDetails) {
  try {
    const slackWebhook = Deno.env.get('SLACK_WEBHOOK_URL');
    
    if (!slackWebhook) {
      console.log('Slack webhook not configured');
      return;
    }

    const color = alertDetails.status === 'offline' ? 'danger' : 'warning';
    const emoji = alertDetails.status === 'offline' ? '🔴' : '🟡';

    const payload = {
      attachments: [
        {
          color,
          title: `${emoji} Provider Alert: ${alertDetails.provider_name}`,
          fields: [
            {
              title: 'Status',
              value: alertDetails.status.toUpperCase(),
              short: true
            },
            {
              title: 'Service Type',
              value: alertDetails.service_type,
              short: true
            },
            {
              title: 'Previous Status',
              value: alertDetails.previous_status,
              short: true
            },
            {
              title: 'Consecutive Failures',
              value: String(alertDetails.consecutive_failures),
              short: true
            },
            {
              title: 'Uptime',
              value: `${alertDetails.uptime}%`,
              short: true
            },
            {
              title: 'Detection Time',
              value: new Date(alertDetails.detection_time).toLocaleString(),
              short: true
            }
          ],
          footer: 'Trust Anchor Service - Provider Monitoring',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    const response = await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Slack notification sent');
    } else {
      console.error('Slack notification failed:', response.statusText);
    }
  } catch (error) {
    console.error('Slack alert error:', error.message);
  }
}