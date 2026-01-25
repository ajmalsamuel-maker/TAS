import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Loader, Trash2, Edit2, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OrgWebhookManager({ organization }) {
  const [showForm, setShowForm] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: webhooks = [], isLoading } = useQuery({
    queryKey: ['webhooks', organization?.id],
    queryFn: async () => {
      if (!organization?.id) return [];
      return await base44.entities.Webhook.filter({ organization_id: organization.id });
    },
    enabled: !!organization?.id
  });

  const eventOptions = [
    { value: 'application_submitted', label: 'Application Submitted' },
    { value: 'application_approved', label: 'Application Approved' },
    { value: 'application_rejected', label: 'Application Rejected' },
    { value: 'workflow_completed', label: 'Workflow Completed' },
    { value: 'aml_alert', label: 'AML Alert' }
  ];

  const handleAddWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast.error('Please enter webhook URL');
      return;
    }

    if (selectedEvents.length === 0) {
      toast.error('Select at least one event');
      return;
    }

    setIsSaving(true);
    try {
      await base44.functions.invoke('createOrgWebhook', {
        organizationId: organization.id,
        url: webhookUrl,
        event_types: selectedEvents
      });

      toast.success('Webhook added successfully');
      setWebhookUrl('');
      setSelectedEvents([]);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    } catch (error) {
      toast.error('Failed to add webhook');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteWebhook = async (webhookId) => {
    try {
      await base44.entities.Webhook.delete(webhookId);
      toast.success('Webhook deleted');
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    } catch (error) {
      toast.error('Failed to delete webhook');
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Webhooks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Webhooks</CardTitle>
            <Button
              size="sm"
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          ) : webhooks.length === 0 ? (
            <p className="text-sm text-gray-600 py-6 text-center">
              No webhooks configured. Add one to receive real-time events.
            </p>
          ) : (
            webhooks.map((webhook) => (
              <div key={webhook.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm text-gray-700 break-all">{webhook.url}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(webhook.url);
                        toast.success('URL copied');
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteWebhook(webhook.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-1 flex-wrap">
                    {webhook.event_types.map((event) => (
                      <Badge key={event} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                  <Badge className={webhook.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {webhook.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                {webhook.last_triggered && (
                  <p className="text-xs text-gray-500">
                    Last triggered: {new Date(webhook.last_triggered).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Add Webhook Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Webhook</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Webhook URL
              </label>
              <Input
                type="url"
                placeholder="https://example.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                disabled={isSaving}
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send POST requests to this URL with event data
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Trigger Events
              </label>
              <div className="space-y-2">
                {eventOptions.map((event) => (
                  <label key={event.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEvents([...selectedEvents, event.value]);
                        } else {
                          setSelectedEvents(selectedEvents.filter(ev => ev !== event.value));
                        }
                      }}
                      disabled={isSaving}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{event.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddWebhook}
                disabled={isSaving || !webhookUrl.trim() || selectedEvents.length === 0}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Webhook'
                )}
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false);
                  setWebhookUrl('');
                  setSelectedEvents([]);
                }}
                variant="outline"
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}