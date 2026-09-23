import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId } = await req.json();

    if (!applicationId) {
      return Response.json({ error: 'applicationId required' }, { status: 400 });
    }

    // Get the application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Run AML screening
    const apiKey = Deno.env.get('AMLWATCHER_API_KEY');
    
    const response = await fetch('https://api.amlwatcher.com/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: application.legal_name,
        categories: ['PEP', 'Sanctions', 'SIP', 'Adverse Media'],
        entity_type: ['Organization'],
        match_score: 80,
        api_key: apiKey
      })
    });

    if (!response.ok) {
      throw new Error(`AML API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Check for matches
    const hasMatches = result.data?.matches && result.data.matches.length > 0;
    const highRiskMatches = hasMatches 
      ? result.data.matches.filter(m => m.match_score >= 80)
      : [];

    // Update application with AML results
    await base44.entities.OnboardingApplication.update(applicationId, {
      aml_screening_status: 'completed',
      aml_screening_results: {
        matches: highRiskMatches,
        all_matches: result.data?.matches || [],
        screening_date: new Date().toISOString(),
        passed: highRiskMatches.length === 0
      }
    });

    // Create alert if high-risk matches found
    if (highRiskMatches.length > 0 && application.organization_id) {
      await base44.entities.AMLAlert.create({
        organization_id: application.organization_id,
        user_id: user.id,
        type: 'sanction_hit',
        severity: highRiskMatches.some(m => m.match_score >= 95) ? 'critical' : 'high',
        details: {
          entity_name: application.legal_name,
          matches: highRiskMatches,
          screening_date: new Date().toISOString()
        },
        status: 'new'
      });
    }

    return Response.json({
      success: true,
      aml_completed: true,
      matches_found: highRiskMatches.length,
      passed: highRiskMatches.length === 0,
      screening_results: result.data
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
});