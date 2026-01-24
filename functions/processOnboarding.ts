import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { applicationId, action } = await req.json();

    const applications = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = applications[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    if (action === 'approve') {
      // Generate LEI (simplified - in production, this would go through LEI issuer)
      const generatedLei = `984500${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Update application
      await base44.entities.OnboardingApplication.update(applicationId, {
        status: 'approved',
        generated_lei: generatedLei
      });

      // Create or update user with LEI
      const users = await base44.asServiceRole.entities.User.filter({ email: application.email });
      if (users.length > 0) {
        await base44.asServiceRole.entities.User.update(users[0].id, {
          lei: generatedLei,
          legal_name: application.legal_name
        });
      }

      // Run KYB workflow
      const workflowResult = await base44.functions.invoke('workflowExecutor', {
        type: 'kyb',
        entityData: {
          legal_name: application.legal_name,
          country: application.legal_address?.country,
          lei: generatedLei
        }
      });

      return Response.json({
        status: 'success',
        message: 'Application approved and LEI issued',
        lei: generatedLei,
        workflow: workflowResult.data
      });
    }

    if (action === 'reject') {
      await base44.entities.OnboardingApplication.update(applicationId, {
        status: 'rejected'
      });

      return Response.json({
        status: 'success',
        message: 'Application rejected'
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
});