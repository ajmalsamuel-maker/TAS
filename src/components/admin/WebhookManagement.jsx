import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Webhook, Send, Trash2, CheckCircle2, AlertCircle, Loader, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function WebhookManagement() {
  const [showForm, setShowForm] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    event_types: [],
    partner_name: '',
    secret_key: ''
  });

  const queryClient = useQueryClient();

  const { data: webhooks = [] } = useQuery({
    queryKey: ['webhooks'],
    queryFn: () => base44.entities.Webhook.list(),
    initialData: []
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Webhook.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success('Webhook created successfully');
      setShowForm(false);
      setFormData({ url: '', event_types: [], partner_name: '', secret_key: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Webhook.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success('Webhook deleted');
    }
  });

  const handleTest = async (webhook) => {
    setTestingWebhook(webhook.id);
    try {
      const response = await base44.functions.invoke('sendWebhook', {
        event: {
          type: 'workflow_updated',
          entity_name: 'Workflow',
          entity_id: 'test-123'
        },
        data: { status: 'completed', test: true }
      });
      
      if (response.data.results?.some(r => r.success)) {
        toast.success('Webhook test successful');
      } else {
        toast.error('Webhook test failed');
      }
    } catch (error) {
      toast.error('Failed to test webhook');
    } finally {
      setTestingWebhook(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const eventTypes = [
    'workflow_started',
    'workflow_updated',
    'workflow_completed',
    'application_submitted',
    'application_approved',
    'application_rejected',
    'aml_alert'
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-[#0044CC]" />
              Webhook Management
            </CardTitle>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#0044CC] hover:bg-[#002D66]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg space-y-4">
              <div>
                <Label>Webhook URL *</Label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/webhook"
                  required
                />
              </div>

              <div>
                <Label>Partner Name</Label>
                <Input
                  value={formData.partner_name}
                  onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
                  placeholder="Integration partner name"
                />
              </div>

              <div>
                <Label>Event Types *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {eventTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.event_types.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, event_types: [...formData.event_types, type] });
                          } else {
                            setFormData({ ...formData, event_types: formData.event_types.filter(t => t !== type) });
                          }
                        }}
                        className="rounded"
                      />
                      {type.replace(/_/g, ' ')}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Secret Key (HMAC)</Label>
                <Input
                  value={formData.secret_key}
                  onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                  placeholder="Optional webhook signature secret"
                  type="password"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Webhook'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {webhooks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No webhooks configured</p>
            ) : (
              webhooks.map((webhook) => (
                <div key={webhook.id} className="p-4 border rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-mono text-sm">{webhook.url}</p>
                        <Badge variant={webhook.is_active ? 'default' : 'secondary'}>
                          {webhook.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        {webhook.last_status === 'success' && (
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Last: Success
                          </Badge>
                        )}
                        {webhook.last_status === 'failed' && (
                          <Badge className="bg-red-500">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Last: Failed
                          </Badge>
                        )}
                      </div>
                      {webhook.partner_name && (
                        <p className="text-sm text-gray-600">Partner: {webhook.partner_name}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {webhook.event_types?.map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                      {webhook.last_triggered && (
                        <p className="text-xs text-gray-500 mt-2">
                          Last triggered: {new Date(webhook.last_triggered).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTest(webhook)}
                        disabled={testingWebhook === webhook.id}
                      >
                        {testingWebhook === webhook.id ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}