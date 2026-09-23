import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { applicationId, interval_days = 90 } = await req.json();

    // Fetch application
    const application = await base44.asServiceRole.entities.OnboardingApplication.read(applicationId);
    
    if (!application || application.status !== 'approved') {
      return Response.json({ error: 'Application not approved' }, { status: 400 });
    }

    // Create AML monitoring schedule
    const schedule = {
      application_id: applicationId,
      entity_name: application.legal_name,
      unique_business_id: application.unique_business_id,
      last_checked: new Date().toISOString(),
      next_check: new Date(Date.now() + interval_days * 24 * 60 * 60 * 1000).toISOString(),
      interval_days,
      status: 'active'
    };

    // Run initial AML check using AML Watcher API
    const amlWatcherResponse = await fetch('https://api.amlwatcher.com/v1/screen/corporate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('AMLWATCHER_CLIENT_ID')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_name: application.legal_name,
        jurisdiction: application.legal_address?.country || '',
        business_id: application.unique_business_id
      })
    });

    const amlResult = await amlWatcherResponse.json();

    // If issues found, create alert
    if (amlResult.risk_level && amlResult.risk_level !== 'low') {
      await base44.asServiceRole.entities.AMLAlert.create({
        user_id: application.created_by_id,
        workflow_id: applicationId,
        type: 'perpetual_monitoring_hit',
        severity: amlResult.risk_level === 'critical' ? 'critical' : amlResult.risk_level === 'high' ? 'high' : 'medium',
        details: amlResult,
        status: 'new'
      });

      // Trigger webhook
      await base44.functions.invoke('sendWebhook', {
        event_type: 'aml_alert',
        application_id: applicationId,
        data: amlResult
      });
    }

    return Response.json({
      status: 'success',
      schedule,
      aml_check_result: amlResult
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});