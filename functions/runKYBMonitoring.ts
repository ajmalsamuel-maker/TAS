import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const KYB_BASE_URL = 'https://api.kyb-provider.com';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { schedule_id } = await req.json();

    if (!schedule_id) {
      return Response.json({ error: 'schedule_id required' }, { status: 400 });
    }

    // Get monitoring schedule
    const schedules = await base44.entities.MonitoringSchedule.filter({ id: schedule_id });
    const schedule = schedules[0];

    if (!schedule) {
      return Response.json({ error: 'Schedule not found' }, { status: 404 });
    }

    // Run KYB screening
    const kybApiKey = Deno.env.get('KYB_API_KEY');
    
    const response = await fetch(`${KYB_BASE_URL}/api/verify-company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lei: schedule.entity_lei || undefined,
        company_name: schedule.entity_name,
        country: schedule.monitoring_config?.country || undefined,
        api_key: kybApiKey
      })
    });

    const result = await response.json();

    // Check for changes in company status
    const newAlerts = [];
    if (result.data?.changes && result.data.changes.length > 0) {
      for (const change of result.data.changes) {
        const alert = await base44.entities.KYBAlert.create({
          organization_id: schedule.organization_id,
          monitoring_schedule_id: schedule_id,
          alert_type: change.type || 'company_status_change',
          severity: change.severity || 'medium',
          entity_name: schedule.entity_name,
          entity_lei: schedule.entity_lei,
          change_details: {
            field_changed: change.field,
            old_value: change.old_value,
            new_value: change.new_value,
            change_date: change.date
          },
          status: 'new'
        });
        
        newAlerts.push(alert);

        // Send notification if configured
        if (schedule.monitoring_config?.notify_emails) {
          for (const email of schedule.monitoring_config.notify_emails) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: email,
              subject: `KYB Alert: ${change.type || 'Company Change'} Detected`,
              body: `
                <h2>KYB Monitoring Alert</h2>
                <p><strong>Entity:</strong> ${schedule.entity_name}</p>
                <p><strong>Change Type:</strong> ${change.type}</p>
                <p><strong>Field:</strong> ${change.field}</p>
                <p><strong>Old Value:</strong> ${change.old_value}</p>
                <p><strong>New Value:</strong> ${change.new_value}</p>
                <p><strong>Severity:</strong> ${alert.severity.toUpperCase()}</p>
                <p>Please review this alert in the TAS dashboard.</p>
              `
            });
          }
        }
      }
    }

    // Update schedule
    await base44.entities.MonitoringSchedule.update(schedule_id, {
      last_check_date: new Date().toISOString(),
      next_check_date: getNextCheckDate(schedule.frequency),
      check_count: (schedule.check_count || 0) + 1,
      alert_count: (schedule.alert_count || 0) + newAlerts.length
    });

    return Response.json({
      success: true,
      checks_performed: 1,
      alerts_generated: newAlerts.length,
      new_alerts: newAlerts,
      next_check: getNextCheckDate(schedule.frequency)
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
});

function getNextCheckDate(frequency) {
  const now = new Date();
  
  switch (frequency) {
    case 'daily':
      now.setDate(now.getDate() + 1);
      break;
    case 'weekly':
      now.setDate(now.getDate() + 7);
      break;
    case 'monthly':
      now.setMonth(now.getMonth() + 1);
      break;
    case 'quarterly':
      now.setMonth(now.getMonth() + 3);
      break;
    default:
      now.setMonth(now.getMonth() + 3);
  }
  
  return now.toISOString();
}