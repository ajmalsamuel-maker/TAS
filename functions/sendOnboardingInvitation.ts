import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { organization_id, contact_email, organization_name } = await req.json();

    if (!organization_id || !contact_email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create OnboardingApplication record for this organization
    const application = await base44.asServiceRole.entities.OnboardingApplication.create({
      organization_id,
      email: contact_email,
      legal_name: organization_name,
      status: 'pending_documents',
      entity_category: 'other',
      apply_purpose: 'LEI Application initiated by TAS Admin'
    });

    // Generate unique onboarding link
    const onboardingUrl = `${Deno.env.get('BASE_URL') || 'https://app.base44.com'}/app/CompleteOnboarding?application_id=${application.id}`;

    // Send email with onboarding link
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: 'TAS Platform',
      to: contact_email,
      subject: 'Complete Your LEI Application - TAS Platform',
      body: `
        <h2>Welcome to Trust Anchor Service</h2>
        <p>Hello,</p>
        <p>Your organization has been registered on the TAS Platform. To complete your LEI application, please complete the following steps:</p>
        
        <ol>
          <li>Upload required business registration documents</li>
          <li>Complete facial liveness verification</li>
          <li>Submit your application for review</li>
        </ol>
        
        <p><strong>Click the link below to get started:</strong></p>
        <p><a href="${onboardingUrl}" style="background-color: #0066B3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Complete Onboarding</a></p>
        
        <p>Or copy this link: ${onboardingUrl}</p>
        
        <p>This link is unique to your organization. Once you complete the onboarding process, our team will review your application and issue your LEI credentials.</p>
        
        <p>If you have any questions, please contact our support team.</p>
        
        <p>Best regards,<br>TAS Platform Team</p>
      `
    });

    return Response.json({
      success: true,
      application_id: application.id,
      onboarding_url: onboardingUrl,
      message: 'Onboarding invitation sent successfully'
    });

  } catch (error) {
    console.error('Error sending onboarding invitation:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});