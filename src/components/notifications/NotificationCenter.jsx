import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle2, AlertTriangle, UserPlus, Shield, Eye, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { markAsRead, archiveNotification } from './notificationService';

const NOTIFICATION_ICONS = {
  user_invited: UserPlus,
  role_changed: Shield,
  critical_alert: AlertTriangle,
  workflow_completed: CheckCircle2,
  aml_alert: AlertTriangle,
  application_approved: CheckCircle2
};

const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function NotificationCenter({ notifications = [], onClose }) {
  const queryClient = useQueryClient();

  const markReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unread-notifications'] });
    }
  });

  const archiveMutation = useMutation({
    mutationFn: archiveNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unread-notifications'] });
    }
  });

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <Eye className="h-10 w-10 mb-2 opacity-50" />
        <p className="text-sm">No new notifications</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-1">
      <div className="space-y-2 p-4">
        {notifications.map((notification) => {
          const Icon = NOTIFICATION_ICONS[notification.type] || AlertTriangle;
          const priorityColor = PRIORITY_COLORS[notification.priority] || PRIORITY_COLORS.medium;

          return (
            <div
              key={notification.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-l-4 border-blue-500"
            >
              <div className="flex items-start gap-3 mb-2">
                <Icon className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${priorityColor}`}>
                  {notification.priority}
                </span>
                <div className="flex gap-1">
                  {notification.action_url && (
                    <Link to={notification.action_url} onClick={onClose}>
                      <Button size="xs" variant="ghost" className="text-blue-600 hover:text-blue-700 h-6">
                        View
                      </Button>
                    </Link>
                  )}
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => markReadMutation.mutate(notification.id)}
                    className="text-gray-600 hover:text-gray-700 h-6"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => archiveMutation.mutate(notification.id)}
                    className="text-gray-600 hover:text-gray-700 h-6"
                    title="Archive"
                  >
                    <Archive className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}