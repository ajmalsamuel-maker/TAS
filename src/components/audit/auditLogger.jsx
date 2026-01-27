import { base44 } from '@/api/base44Client';

/**
 * Comprehensive Audit Logger
 * 
 * Compliance Standards:
 * - SOX (Sarbanes-Oxley): 7 years retention for financial records
 * - GDPR: 3-6 years for financial transactions
 * - HIPAA: 6 years minimum
 * - PCI-DSS: 1 year minimum, 3 years recommended
 * - ISO 27001: Varies by data type
 * - GLEIF/LEI: 5-7 years for identity records
 * 
 * Default: 7 years (2555 days) for financial services
 */

export async function logAuditEvent({
  eventCategory,
  eventType,
  event,
  actor,
  actorEmail,
  entityType,
  entityId,
  organizationId,
  beforeState,
  afterState,
  details = {},
  severity = 'info',
  result = 'success',
  errorMessage,
  complianceFlags = [],
  retentionDays,
  workflowId,
  actorLei,
  actorVleiRole,
  requireSignature = false
}) {
  try {
    const timestamp = new Date().toISOString();
    
    // Generate signature for critical events
    let signature = null;
    let signatureAlgorithm = null;
    
    if (requireSignature || severity === 'critical' || eventCategory === 'security') {
      const dataToSign = JSON.stringify({
        timestamp,
        event,
        actor,
        entityType,
        entityId,
        beforeState,
        afterState
      });
      
      // In production, use proper cryptographic signing
      // For now, using a simple hash
      signature = await simpleHash(dataToSign);
      signatureAlgorithm = 'SHA-256';
    }

    const logEntry = {
      timestamp,
      event_category: eventCategory,
      event_type: eventType,
      event,
      actor,
      actor_email: actorEmail,
      actor_lei: actorLei,
      actor_vlei_role: actorVleiRole,
      organization_id: organizationId,
      entity_type: entityType,
      entity_id: entityId,
      workflow_id: workflowId,
      before_state: beforeState,
      after_state: afterState,
      details,
      signature,
      signature_algorithm: signatureAlgorithm,
      severity,
      result,
      error_message: errorMessage,
      compliance_flags: complianceFlags,
      retention_period_days: retentionDays || 2555, // 7 years default
      is_archived: false
    };

    await base44.entities.AuditLog.create(logEntry);

    // If critical, also create notification
    if (severity === 'critical') {
      await base44.entities.Notification.create({
        organization_id: organizationId,
        type: 'security_alert',
        title: 'Critical Security Event',
        message: event,
        severity: 'critical',
        read: false,
        details: { audit_log_id: logEntry.id }
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to log audit event:', error);
    return { success: false, error: error.message };
  }
}

// Simple hash function for demonstration
async function simpleHash(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Predefined event types for consistency
export const AUDIT_EVENTS = {
  // Authentication
  LOGIN: 'user_login',
  LOGOUT: 'user_logout',
  LOGIN_FAILED: 'login_failed',
  PASSWORD_RESET: 'password_reset',
  
  // User Management
  USER_CREATED: 'user_created',
  USER_INVITED: 'user_invited',
  USER_ROLE_CHANGED: 'user_role_changed',
  USER_DELETED: 'user_deleted',
  
  // Data Access
  DATA_VIEWED: 'data_viewed',
  DATA_EXPORTED: 'data_exported',
  DATA_DOWNLOADED: 'data_downloaded',
  
  // Data Modification
  ENTITY_CREATED: 'entity_created',
  ENTITY_UPDATED: 'entity_updated',
  ENTITY_DELETED: 'entity_deleted',
  
  // Billing
  INVOICE_CREATED: 'invoice_created',
  INVOICE_SENT: 'invoice_sent',
  PAYMENT_RECEIVED: 'payment_received',
  SUBSCRIPTION_CHANGED: 'subscription_changed',
  
  // Compliance
  APPLICATION_SUBMITTED: 'application_submitted',
  APPLICATION_APPROVED: 'application_approved',
  APPLICATION_REJECTED: 'application_rejected',
  LEI_ISSUED: 'lei_issued',
  VLEI_ISSUED: 'vlei_issued',
  AML_SCREENING: 'aml_screening_performed',
  KYB_VERIFICATION: 'kyb_verification_performed',
  
  // Security
  UNAUTHORIZED_ACCESS: 'unauthorized_access_attempt',
  PERMISSION_DENIED: 'permission_denied',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity_detected',
  
  // System Configuration
  SETTINGS_CHANGED: 'settings_changed',
  INTEGRATION_CONNECTED: 'integration_connected',
  INTEGRATION_DISCONNECTED: 'integration_disconnected',
  
  // Workflow
  WORKFLOW_STARTED: 'workflow_started',
  WORKFLOW_COMPLETED: 'workflow_completed',
  WORKFLOW_FAILED: 'workflow_failed'
};

export const EVENT_CATEGORIES = {
  AUTHENTICATION: 'authentication',
  USER_MANAGEMENT: 'user_management',
  DATA_ACCESS: 'data_access',
  DATA_MODIFICATION: 'data_modification',
  SYSTEM_CONFIGURATION: 'system_configuration',
  BILLING: 'billing',
  COMPLIANCE: 'compliance',
  SECURITY: 'security',
  WORKFLOW: 'workflow',
  INTEGRATION: 'integration'
};

// Backward compatibility aliases
export const ACTION_TYPES = AUDIT_EVENTS;
export const logAction = logAuditEvent;