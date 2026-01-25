import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { 
      alert_id, 
      application_id, 
      type, 
      priority, 
      subject, 
      description,
      sla_hours 
    } = await req.json();

    if (!type || !subject) {
      return Response.json({ error: 'type and subject are required' }, { status: 400 });
    }

    // Calculate SLA due date
    const now = new Date();
    const slaDueDate = sla_hours 
      ? new Date(now.getTime() + sla_hours * 60 * 60 * 1000)
      : new Date(now.getTime() + 24 * 60 * 60 * 1000); // Default 24h

    // Generate case number
    const caseNumber = `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Fetch context data
    let contextData = {};
    if (application_id) {
      const apps = await base44.entities.OnboardingApplication.filter({ id: application_id });
      contextData = apps[0] || {};
    } else if (alert_id) {
      const alerts = await base44.entities.AMLAlert.filter({ id: alert_id });
      contextData = alerts[0] || {};
    }

    // Create case
    const newCase = await base44.asServiceRole.entities.Case.create({
      case_number: caseNumber,
      type,
      priority: priority || 'medium',
      status: 'new',
      subject,
      description,
      related_entity_type: application_id ? 'OnboardingApplication' : alert_id ? 'AMLAlert' : null,
      related_entity_id: application_id || alert_id,
      context_data: contextData,
      sla_due_date: slaDueDate.toISOString(),
      sla_status: 'on_time',
      tags: [type, priority || 'medium']
    });

    // Auto-assign using round-robin
    await base44.functions.invoke('assignCase', {
      case_id: newCase.id,
      assignment_rule: 'round_robin'
    });

    return Response.json({
      success: true,
      case_id: newCase.id,
      case_number: caseNumber
    });

  } catch (error) {
    console.error('Case creation error:', error);
    return Response.json({ 
      error: 'Case creation failed', 
      details: error.message 
    }, { status: 500 });
  }
});