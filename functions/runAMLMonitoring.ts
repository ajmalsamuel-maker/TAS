import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const AML_BASE_URL = 'https://api.amlwatcher.com';

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

    // Run AML screening
    const apiKey = Deno.env.get('AMLWATCHER_API_KEY');
    
    const response = await fetch(`${AML_BASE_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: schedule.entity_name,
        categories: ['PEP', 'Sanctions', 'SIP', 'Adverse Media'],
        entity_type: ['Organization'],
        match_score: schedule.monitoring_config?.alert_threshold || 80,
        api_key: apiKey
      })
    });

    const result = await response.json();

    // Check for new matches
    const newAlerts = [];
    if (result.data?.matches && result.data.matches.length > 0) {
      for (const match of result.data.matches) {
        // Create alert if match score is high enough
        if (match.match_score >= (schedule.monitoring_config?.alert_threshold || 80)) {
          const alert = await base44.entities.AMLAlert.create({
            organization_id: schedule.organization_id,
            workflow_id: schedule.application_id,
            type: match.categories?.[0] === 'Adverse Media' ? 'adverse_media' : 
                  match.categories?.[0] === 'PEP' ? 'pep_match' : 'sanction_hit',
            severity: match.match_score >= 95 ? 'critical' : 
                     match.match_score >= 90 ? 'high' : 
                     match.match_score >= 80 ? 'medium' : 'low',
            details: {
              entity_name: match.name,
              match_score: match.match_score,
              categories: match.categories,
              notes: match.notes,
              source: 'AML Watcher',
              monitored_entity: schedule.entity_name
            },
            status: 'new'
          });
          
          newAlerts.push(alert);

          // Send notification if configured
          if (schedule.monitoring_config?.notify_emails) {
            for (const email of schedule.monitoring_config.notify_emails) {
              await base44.asServiceRole.integrations.Core.SendEmail({
                to: email,
                subject: `AML Alert: ${match.categories?.[0] || 'Match'} Detected`,
                body: `
                  <h2>AML Monitoring Alert</h2>
                  <p><strong>Entity:</strong> ${schedule.entity_name}</p>
                  <p><strong>Match:</strong> ${match.name}</p>
                  <p><strong>Score:</strong> ${match.match_score}%</p>
                  <p><strong>Categories:</strong> ${match.categories?.join(', ')}</p>
                  <p><strong>Severity:</strong> ${alert.severity.toUpperCase()}</p>
                  <p>Please review this alert in the TAS dashboard.</p>
                `
              });
            }
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
      now.setMonth(now.getMonth() + 3); // Default to quarterly
  }
  
  return now.toISOString();
}