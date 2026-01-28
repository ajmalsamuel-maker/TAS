import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, AlertTriangle, Copy, Check, Loader, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function TMaaSSetup() {
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: tmaasConfig } = useQuery({
    queryKey: ['tmaasConfig', user?.organization_id],
    queryFn: () => base44.entities.TMaaSConfig.filter({ organization_id: user?.organization_id }),
    enabled: !!user?.organization_id,
    initialData: []
  });

  const config = tmaasConfig?.[0];

  const [formData, setFormData] = useState({
    webhook_url: config?.webhook_url || '',
    callback_url: config?.callback_url || '',
    service_name: config?.service_name || `TMaaS - ${new Date().toLocaleDateString()}`,
    monitoring_rules: config?.monitoring_rules || {
      aml_screening: true,
      fraud_detection: true,
      velocity_checks: true,
      amount_threshold: 10000,
      auto_approve_threshold: 100,
      auto_block_threshold: 50000
    },
    notification_settings: config?.notification_settings || {
      email_alerts: true,
      webhook_alerts: false,
      alert_on_blocked: true,
      alert_on_flagged: true
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      if (config) {
        return base44.entities.TMaaSConfig.update(config.id, data);
      } else {
        return base44.entities.TMaaSConfig.create({
          ...data,
          organization_id: user.organization_id,
          status: 'testing'
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tmaasConfig'] });
      toast.success('TMaaS configuration saved');
    },
    onError: (error) => {
      toast.error('Failed to save configuration');
      console.error(error);
    }
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleTestWebhook = async () => {
    setTestingWebhook(true);
    try {
      // Test webhook by sending a sample transaction
      const response = await fetch(formData.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: 'test-' + Date.now(),
          amount: 1000,
          currency: 'USD',
          type: 'transfer',
          test: true
        })
      });
      
      if (response.ok) {
        toast.success('Webhook test successful');
      } else {
        toast.error('Webhook test failed: ' + response.statusText);
      }
    } catch (error) {
      toast.error('Could not reach webhook URL');
    } finally {
      setTestingWebhook(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TMaaS Configuration</h1>
          <p className="text-lg text-gray-600">Set up webhooks, providers, and monitoring rules</p>
        </div>

        {config && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              TMaaS is currently <strong>{config.status?.toUpperCase()}</strong>. Status: {config.transactions_processed} transactions processed.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="webhooks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="rules">Monitoring Rules</TabsTrigger>
          </TabsList>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Webhook URL *</label>
                  <p className="text-xs text-gray-600 mb-3">Where TAS sends incoming transaction data for screening</p>
                  <Input
                    value={formData.webhook_url}
                    onChange={(e) => setFormData({...formData, webhook_url: e.target.value})}
                    placeholder="https://your-api.com/transactions/webhook"
                    className="mb-3"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestWebhook}
                    disabled={testingWebhook}
                  >
                    {testingWebhook ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                    Test Webhook
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Callback URL *</label>
                  <p className="text-xs text-gray-600 mb-3">Where TAS sends screening results back to you</p>
                  <Input
                    value={formData.callback_url}
                    onChange={(e) => setFormData({...formData, callback_url: e.target.value})}
                    placeholder="https://your-api.com/screening/callback"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Webhook Payload Example</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-auto">
                    <pre>{JSON.stringify({
                      transaction_id: "tx_123",
                      amount: 5000,
                      currency: "USD",
                      type: "transfer",
                      from_account: "ACC_001",
                      to_account: "ACC_002",
                      counterparty_name: "Example Corp",
                      ip_address: "192.168.1.1"
                    }, null, 2)}</pre>
                  </div>
                </div>

                <Button onClick={handleSave} className="bg-[#0044CC] hover:bg-[#002D66] w-full" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                  Save Webhook Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle>Screening Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Providers are configured globally by your admin. Contact support to add or switch providers.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">AML Screening</h4>
                        <p className="text-sm text-gray-600">AMLWatcher Sanctions & PEP</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Fraud Detection</h4>
                        <p className="text-sm text-gray-600">Velocity & anomaly patterns</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={formData.monitoring_rules.aml_screening}
                        onChange={(e) => setFormData({
                          ...formData,
                          monitoring_rules: {...formData.monitoring_rules, aml_screening: e.target.checked}
                        })}
                        className="w-4 h-4"
                      />
                      <span className="font-semibold text-gray-900">AML Screening</span>
                    </label>
                    <p className="text-sm text-gray-600 ml-7">Screen against sanctions & PEP lists</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={formData.monitoring_rules.fraud_detection}
                        onChange={(e) => setFormData({
                          ...formData,
                          monitoring_rules: {...formData.monitoring_rules, fraud_detection: e.target.checked}
                        })}
                        className="w-4 h-4"
                      />
                      <span className="font-semibold text-gray-900">Fraud Detection</span>
                    </label>
                    <p className="text-sm text-gray-600 ml-7">Detect anomalies & patterns</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={formData.monitoring_rules.velocity_checks}
                        onChange={(e) => setFormData({
                          ...formData,
                          monitoring_rules: {...formData.monitoring_rules, velocity_checks: e.target.checked}
                        })}
                        className="w-4 h-4"
                      />
                      <span className="font-semibold text-gray-900">Velocity Checks</span>
                    </label>
                    <p className="text-sm text-gray-600 ml-7">Monitor transaction frequency</p>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Auto-Approve Threshold ($)</label>
                    <Input
                      type="number"
                      value={formData.monitoring_rules.auto_approve_threshold}
                      onChange={(e) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, auto_approve_threshold: parseInt(e.target.value)}
                      })}
                      placeholder="100"
                    />
                    <p className="text-xs text-gray-600 mt-1">Auto-approve transactions below this amount</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Auto-Block Threshold ($)</label>
                    <Input
                      type="number"
                      value={formData.monitoring_rules.auto_block_threshold}
                      onChange={(e) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, auto_block_threshold: parseInt(e.target.value)}
                      })}
                      placeholder="50000"
                    />
                    <p className="text-xs text-gray-600 mt-1">Auto-block transactions above this amount</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Manual Review Threshold ($)</label>
                    <Input
                      type="number"
                      value={formData.monitoring_rules.amount_threshold}
                      onChange={(e) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, amount_threshold: parseInt(e.target.value)}
                      })}
                      placeholder="10000"
                    />
                    <p className="text-xs text-gray-600 mt-1">Flag transactions above this amount for review</p>
                  </div>
                </div>

                <Button onClick={handleSave} className="bg-[#0044CC] hover:bg-[#002D66] w-full" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                  Save Rules
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}