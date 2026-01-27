import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const KYB_BASE_URL = 'https://api.thekyb.com/api';

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

    // Get current company data for comparison
    const applications = await base44.entities.OnboardingApplication.filter({ 
      id: schedule.application_id 
    });
    const application = applications[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Fetch latest company data from KYB API
    const apiKey = Deno.env.get('KYB_API_KEY');
    
    const response = await fetch(`${KYB_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        query: schedule.entity_name,
        country: application.registry_country_code || 'US',
        registration_number: application.unique_business_id
      })
    });

    const result = await response.json();

    // Detect changes
    const newAlerts = [];
    if (result.data?.companies && result.data.companies.length > 0) {
      const latestData = result.data.companies[0];
      
      // Check for status changes
      if (latestData.status && latestData.status !== application.entity_status) {
        const alert = await base44.entities.KYBAlert.create({
          organization_id: schedule.organization_id,
          monitoring_schedule_id: schedule_id,
          alert_type: 'company_status_change',
          severity: latestData.status === 'dissolved' || latestData.status === 'inactive' ? 'critical' : 'medium',
          entity_name: schedule.entity_name,
          entity_lei: schedule.entity_lei,
          change_details: {
            field_changed: 'Company Status',
            old_value: application.entity_status || 'active',
            new_value: latestData.status,
            change_date: new Date().toISOString().split('T')[0]
          },
          status: 'new',
          raw_data: latestData
        });
        newAlerts.push(alert);
      }

      // Check for address changes
      if (latestData.address && latestData.address !== application.legal_address?.address) {
        const alert = await base44.entities.KYBAlert.create({
          organization_id: schedule.organization_id,
          monitoring_schedule_id: schedule_id,
          alert_type: 'address_change',
          severity: 'low',
          entity_name: schedule.entity_name,
          entity_lei: schedule.entity_lei,
          change_details: {
            field_changed: 'Registered Address',
            old_value: application.legal_address?.address,
            new_value: latestData.address,
            change_date: new Date().toISOString().split('T')[0]
          },
          status: 'new',
          raw_data: latestData
        });
        newAlerts.push(alert);
      }

      // Check for beneficial ownership changes (if available)
      if (latestData.beneficial_owners && JSON.stringify(latestData.beneficial_owners) !== JSON.stringify(application.beneficial_owners)) {
        const alert = await base44.entities.KYBAlert.create({
          organization_id: schedule.organization_id,
          monitoring_schedule_id: schedule_id,
          alert_type: 'ownership_change',
          severity: 'high',
          entity_name: schedule.entity_name,
          entity_lei: schedule.entity_lei,
          change_details: {
            field_changed: 'Beneficial Ownership',
            old_value: 'Previous ownership structure',
            new_value: 'New ownership structure detected',
            change_date: new Date().toISOString().split('T')[0]
          },
          status: 'new',
          raw_data: latestData
        });
        newAlerts.push(alert);
      }

      // Send notifications
      if (newAlerts.length > 0 && schedule.monitoring_config?.notify_emails) {
        for (const email of schedule.monitoring_config.notify_emails) {
          await base44.asServiceRole.integrations.Core.SendEmail({
            to: email,
            subject: `KYB Alert: Changes Detected for ${schedule.entity_name}`,
            body: `
              <h2>KYB Monitoring Alert</h2>
              <p><strong>Entity:</strong> ${schedule.entity_name}</p>
              <p><strong>LEI:</strong> ${schedule.entity_lei || 'N/A'}</p>
              <p><strong>Changes Detected:</strong> ${newAlerts.length}</p>
              <ul>
                ${newAlerts.map(a => `<li>${a.alert_type.replace(/_/g, ' ').toUpperCase()}: ${a.change_details.old_value} → ${a.change_details.new_value}</li>`).join('')}
              </ul>
              <p>Please review these alerts in the TAS dashboard.</p>
            `
          });
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
      changes_detected: newAlerts.length,
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