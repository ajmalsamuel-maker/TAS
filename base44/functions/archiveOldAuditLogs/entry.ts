import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Fetch audit settings
    const settings = await base44.asServiceRole.entities.AuditSettings.filter({});
    const config = settings[0] || {
      retention_policy: {
        default_retention_days: 2555 // 7 years
      },
      archival_settings: {
        auto_archive_enabled: true,
        compress_archives: true
      }
    };

    const defaultRetentionDays = config.retention_policy.default_retention_days;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - defaultRetentionDays);

    // Find logs older than retention period
    const oldLogs = await base44.asServiceRole.entities.AuditLog.filter({
      is_archived: false,
      created_date: { $lt: cutoffDate.toISOString() }
    });

    let archived = 0;
    let failed = 0;
    const errors = [];

    for (const log of oldLogs) {
      try {
        // In production, move to cold storage (S3 Glacier, Azure Archive, etc.)
        // For now, just mark as archived
        await base44.asServiceRole.entities.AuditLog.update(log.id, {
          is_archived: true,
          archived_at: new Date().toISOString(),
          archive_location: `archive/${new Date().getFullYear()}/${log.id}`
        });

        archived++;
      } catch (error) {
        failed++;
        errors.push({ log_id: log.id, error: error.message });
      }
    }

    // Log the archival operation itself
    await base44.asServiceRole.entities.AuditLog.create({
      timestamp: new Date().toISOString(),
      event_category: 'system_configuration',
      event_type: 'audit_archival',
      event: 'Automated audit log archival',
      actor: 'System',
      actor_email: 'system@tas.com',
      details: {
        archived_count: archived,
        failed_count: failed,
        cutoff_date: cutoffDate.toISOString(),
        retention_days: defaultRetentionDays
      },
      severity: failed > 0 ? 'warning' : 'info',
      result: failed > 0 ? 'partial' : 'success'
    });

    return Response.json({
      success: true,
      archived,
      failed,
      errors,
      cutoff_date: cutoffDate.toISOString()
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});