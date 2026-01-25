import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Generate a Legal Entity Identifier (LEI)
 * Format: 20-character alphanumeric code per ISO 17442
 * Structure: 4-char prefix + 12-char random + 4-char check digits
 */
function generateLEICode() {
  // TAS prefix (Trust Anchor Service)
  const prefix = 'TAS0';
  
  // Generate 12 random alphanumeric characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 12; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Generate 4-char checksum (simplified version - in production use ISO 17442 algorithm)
  const checksum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${prefix}${random}${checksum}`;
}

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

    // Fetch application
    const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    // Check if LEI already generated
    if (application.generated_lei) {
      return Response.json({
        success: true,
        lei: application.generated_lei,
        message: 'LEI already generated for this application'
      });
    }

    // Generate new LEI
    const lei = generateLEICode();

    // Update application with generated LEI
    await base44.entities.OnboardingApplication.update(applicationId, {
      generated_lei: lei,
      lei_issued_date: new Date().toISOString()
    });

    // Create audit log
    await base44.entities.AuditLog.create({
      workflow_id: applicationId,
      event: `LEI generated: ${lei}`,
      event_type: 'signature_generated',
      actor: 'system',
      details: {
        lei: lei,
        generated_at: new Date().toISOString(),
        legal_name: application.legal_name
      }
    });

    return Response.json({
      success: true,
      lei: lei,
      applicationId: applicationId,
      message: 'LEI generated successfully'
    });
  } catch (error) {
    console.error('Error generating LEI:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});