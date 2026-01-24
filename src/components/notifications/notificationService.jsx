import { base44 } from '@/api/base44Client';

export const NOTIFICATION_TYPES = {
  USER_INVITED: 'user_invited',
  ROLE_CHANGED: 'role_changed',
  CRITICAL_ALERT: 'critical_alert',
  WORKFLOW_COMPLETED: 'workflow_completed',
  AML_ALERT: 'aml_alert',
  APPLICATION_APPROVED: 'application_approved'
};

export const createNotification = async ({
  recipientId,
  recipientEmail,
  type,
  title,
  message,
  actionUrl = null,
  priority = 'medium',
  sendEmail = false,
  metadata = {}
}) => {
  try {
    await base44.entities.Notification.create({
      recipient_id: recipientId,
      recipient_email: recipientEmail,
      type,
      title,
      message,
      action_url: actionUrl,
      priority,
      send_email: sendEmail,
      metadata
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};

export const markAsRead = async (notificationId) => {
  try {
    await base44.entities.Notification.update(notificationId, {
      status: 'read'
    });
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
  }
};

export const archiveNotification = async (notificationId) => {
  try {
    await base44.entities.Notification.update(notificationId, {
      status: 'archived'
    });
  } catch (error) {
    console.error('Failed to archive notification:', error);
  }
};

export const getUserNotifications = async (userId) => {
  try {
    const notifications = await base44.entities.Notification.filter({
      recipient_id: userId,
      status: 'unread'
    }, '-created_date');
    return notifications;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return [];
  }
};