import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationCenter from './NotificationCenter';

export default function NotificationBell({ user }) {
  const [showPanel, setShowPanel] = useState(false);

  const { data: unreadNotifications = [], refetch } = useQuery({
    queryKey: ['unread-notifications', user?.id],
    queryFn: () => {
      if (!user?.id) return [];
      return base44.entities.Notification.filter({
        recipient_id: user.id,
        status: 'unread'
      }, '-created_date', 50);
    },
    enabled: !!user?.id,
    refetchInterval: 30000
  });

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = base44.entities.Notification.subscribe((event) => {
        if (event.data?.recipient_id === user.id && event.type === 'create') {
          refetch();
        }
      });
      return unsubscribe;
    }
  }, [user?.id, refetch]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute top-14 right-0 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={() => setShowPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <NotificationCenter notifications={unreadNotifications} onClose={() => setShowPanel(false)} />
        </div>
      )}
    </div>
  );
}