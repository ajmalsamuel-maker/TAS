import { base44 } from '@/api/base44Client';

export const logAction = async (action, details = {}) => {
  try {
    const user = await base44.auth.me();
    if (!user) return;

    await base44.entities.AuditLog.create({
      event: action,
      actor: user.full_name,
      actor_email: user.email,
      details: JSON.stringify(details),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log action:', error);
  }
};

export const ACTION_TYPES = {
  USER_INVITED: 'user_invited',
  USER_ROLE_CHANGED: 'user_role_changed',
  USER_DELETED: 'user_deleted',
  TRANSLATION_ADDED: 'translation_added',
  TRANSLATION_UPDATED: 'translation_updated',
  TRANSLATION_DELETED: 'translation_deleted',
  PROVIDER_STATUS_CHANGED: 'provider_status_changed',
  WORKFLOW_STARTED: 'workflow_started',
  WORKFLOW_COMPLETED: 'workflow_completed',
  APPLICATION_APPROVED: 'application_approved',
  APPLICATION_REJECTED: 'application_rejected'
};