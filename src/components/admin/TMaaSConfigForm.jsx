import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X, Save, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function TMaaSConfigForm({ config, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_name: config?.service_name || '',
    processor_name: config?.processor_name || '',
    merchant_id: config?.merchant_id || '',
    webhook_url: config?.webhook_url || '',
    callback_url: config?.callback_url || '',
    status: config?.status || 'testing',
    monitoring_rules: {
      aml_screening: config?.monitoring_rules?.aml_screening ?? true,
      fraud_detection: config?.monitoring_rules?.fraud_detection ?? true,
      velocity_checks: config?.monitoring_rules?.velocity_checks ?? true,
      amount_threshold: config?.monitoring_rules?.amount_threshold || '',
      auto_approve_threshold: config?.monitoring_rules?.auto_approve_threshold || 20,
      auto_block_threshold: config?.monitoring_rules?.auto_block_threshold || 70
    },
    notification_settings: {
      email_alerts: config?.notification_settings?.email_alerts ?? true,
      alert_emails: config?.notification_settings?.alert_emails?.join(', ') || '',
      webhook_alerts: config?.notification_settings?.webhook_alerts ?? false
    }
  });

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        notification_settings: {
          ...formData.notification_settings,
          alert_emails: formData.notification_settings.alert_emails.split(',').map(e => e.trim()).filter(e => e)
        }
      };

      if (config?.id) {
        await base44.entities.TMaaSConfig.update(config.id, submitData);
        toast.success('Configuration updated');
      } else {
        await base44.entities.TMaaSConfig.create(submitData);
        toast.success('Configuration created');
      }

      queryClient.invalidateQueries({ queryKey: ['tmaas-configs'] });
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to save configuration');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [section, key] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <Card className="w-full max-w-2xl border-2 border-blue-100 my-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 flex flex-row items-center justify-between">
          <CardTitle>{config?.id ? 'Edit TMaaS Configuration' : 'New TMaaS Configuration'}</CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Name *</label>
                <Input
                  placeholder="e.g., Premium Monitoring"
                  value={formData.service_name}
                  onChange={(e) => handleChange('service_name', e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Processor Name</label>
                  <Input
                    placeholder="e.g., Stripe, PayPal"
                    value={formData.processor_name}
                    onChange={(e) => handleChange('processor_name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Merchant ID</label>
                  <Input
                    placeholder="Merchant identifier"
                    value={formData.merchant_id}
                    onChange={(e) => handleChange('merchant_id', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Webhooks */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Webhook Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Webhook URL (incoming transactions) *</label>
                <Input
                  placeholder="https://api.yourcompany.com/webhooks/transactions"
                  value={formData.webhook_url}
                  onChange={(e) => handleChange('webhook_url', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Where transactions are received from your processor</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Callback URL (results)</label>
                <Input
                  placeholder="https://api.yourcompany.com/webhooks/screening-results"
                  value={formData.callback_url}
                  onChange={(e) => handleChange('callback_url', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Where screening results are sent back to your system</p>
              </div>
            </div>
          </div>

          {/* Monitoring Rules */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Monitoring Rules</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">AML Screening</p>
                  <p className="text-sm text-gray-600">Screen against sanctions & watchlists</p>
                </div>
                <Switch
                  checked={formData.monitoring_rules.aml_screening}
                  onCheckedChange={(checked) => handleChange('monitoring_rules.aml_screening', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Fraud Detection</p>
                  <p className="text-sm text-gray-600">Monitor velocity & anomalies</p>
                </div>
                <Switch
                  checked={formData.monitoring_rules.fraud_detection}
                  onCheckedChange={(checked) => handleChange('monitoring_rules.fraud_detection', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Velocity Checks</p>
                  <p className="text-sm text-gray-600">Flag rapid transaction sequences</p>
                </div>
                <Switch
                  checked={formData.monitoring_rules.velocity_checks}
                  onCheckedChange={(checked) => handleChange('monitoring_rules.velocity_checks', checked)}
                />
              </div>

              <div className="border-t pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount Threshold ($)</label>
                  <Input
                    type="number"
                    placeholder="Auto-flag amounts above this"
                    value={formData.monitoring_rules.amount_threshold}
                    onChange={(e) => handleChange('monitoring_rules.amount_threshold', parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Auto-Approve Threshold (risk score)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.monitoring_rules.auto_approve_threshold}
                      onChange={(e) => handleChange('monitoring_rules.auto_approve_threshold', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Auto-Block Threshold (risk score)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.monitoring_rules.auto_block_threshold}
                      onChange={(e) => handleChange('monitoring_rules.auto_block_threshold', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-gray-600">Send email on suspicious transactions</p>
                </div>
                <Switch
                  checked={formData.notification_settings.email_alerts}
                  onCheckedChange={(checked) => handleChange('notification_settings.email_alerts', checked)}
                />
              </div>

              {formData.notification_settings.email_alerts && (
                <div>
                  <label className="block text-sm font-medium mb-1">Alert Email Addresses</label>
                  <Textarea
                    placeholder="email1@company.com, email2@company.com"
                    value={formData.notification_settings.alert_emails}
                    onChange={(e) => handleChange('notification_settings.alert_emails', e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated list</p>
                </div>
              )}

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Webhook Alerts</p>
                  <p className="text-sm text-gray-600">Send alerts to callback URL</p>
                </div>
                <Switch
                  checked={formData.notification_settings.webhook_alerts}
                  onCheckedChange={(checked) => handleChange('notification_settings.webhook_alerts', checked)}
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="flex gap-4">
              {['testing', 'active'].map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="rounded"
                  />
                  <span className="capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Webhook Setup Required</p>
              <p>Configure your transaction source to POST transactions to the webhook URL above. We'll handle screening and send results to the callback URL.</p>
            </div>
          </div>
        </CardContent>

        {/* Actions */}
        <div className="border-t p-6 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-[#0044CC] hover:bg-[#002D66]"
            disabled={isLoading || !formData.service_name || !formData.webhook_url}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </Card>
    </div>
  );
}