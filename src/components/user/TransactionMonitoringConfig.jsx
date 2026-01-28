import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Plus, Key, Webhook, Settings, BarChart } from 'lucide-react';
import { toast } from 'sonner';

export default function TransactionMonitoringConfig({ organization }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    merchant_id: '',
    bank_id: '',
    processor_name: '',
    callback_url: '',
    monitoring_rules: {
      aml_screening: true,
      fraud_detection: true,
      velocity_checks: true,
      amount_threshold: 10000,
      auto_approve_threshold: 30,
      auto_block_threshold: 80
    }
  });

  const queryClient = useQueryClient();

  const { data: configs = [] } = useQuery({
    queryKey: ['tmaas-configs', organization?.id],
    queryFn: () => base44.entities.TMaaSConfig.filter({ organization_id: organization.id }),
    enabled: !!organization?.id,
    initialData: []
  });

  const createConfigMutation = useMutation({
    mutationFn: async (data) => {
      const webhookUrl = `${window.location.origin}/api/tmaas/${organization.id}/inbound`;
      return base44.entities.TMaaSConfig.create({
        ...data,
        organization_id: organization.id,
        webhook_url: webhookUrl,
        api_key: crypto.randomUUID()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tmaas-configs'] });
      toast.success('Configuration created');
      setShowCreateForm(false);
      setFormData({
        service_name: '',
        merchant_id: '',
        bank_id: '',
        processor_name: '',
        callback_url: '',
        monitoring_rules: {
          aml_screening: true,
          fraud_detection: true,
          velocity_checks: true,
          amount_threshold: 10000,
          auto_approve_threshold: 30,
          auto_block_threshold: 80
        }
      });
    }
  });

  if (!organization?.tmaas_enabled) {
    return (
      <Card className="border-2 border-amber-200">
        <CardContent className="py-12 text-center">
          <Activity className="h-12 w-12 mx-auto text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Transaction Monitoring Not Available</h3>
          <p className="text-gray-600 mb-4">
            Upgrade your plan to enable Transaction Monitoring as a Service (TMaaS)
          </p>
          <Button className="bg-blue-600">Upgrade Plan</Button>
        </CardContent>
      </Card>
    );
  }

  const totalProcessed = configs.reduce((sum, c) => sum + (c.transactions_processed || 0), 0);
  const totalBlocked = configs.reduce((sum, c) => sum + (c.transactions_blocked || 0), 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Configs</p>
                <p className="text-3xl font-bold">{configs.filter(c => c.status === 'active').length}</p>
              </div>
              <Settings className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processed</p>
                <p className="text-3xl font-bold">{totalProcessed.toLocaleString()}</p>
              </div>
              <Activity className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked</p>
                <p className="text-3xl font-bold">{totalBlocked}</p>
              </div>
              <BarChart className="h-10 w-10 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold">{organization.tmaas_transactions_used || 0} / {organization.tmaas_transaction_limit || '∞'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Monitoring Configurations</h3>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          New Configuration
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle>New Transaction Monitoring Configuration</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              createConfigMutation.mutate(formData);
            }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Service Name *</Label>
                  <Input
                    value={formData.service_name}
                    onChange={(e) => setFormData({...formData, service_name: e.target.value})}
                    placeholder="My Payment Gateway Monitoring"
                    required
                  />
                </div>
                <div>
                  <Label>Processor Name</Label>
                  <Input
                    value={formData.processor_name}
                    onChange={(e) => setFormData({...formData, processor_name: e.target.value})}
                    placeholder="Stripe, Square, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Merchant ID (MID)</Label>
                  <Input
                    value={formData.merchant_id}
                    onChange={(e) => setFormData({...formData, merchant_id: e.target.value})}
                    placeholder="MID-123456"
                  />
                </div>
                <div>
                  <Label>Bank ID</Label>
                  <Input
                    value={formData.bank_id}
                    onChange={(e) => setFormData({...formData, bank_id: e.target.value})}
                    placeholder="BANK-789"
                  />
                </div>
              </div>

              <div>
                <Label>Callback URL *</Label>
                <Input
                  value={formData.callback_url}
                  onChange={(e) => setFormData({...formData, callback_url: e.target.value})}
                  placeholder="https://your-processor.com/webhook/transaction-result"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Where to send screening results</p>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Monitoring Rules</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>AML Screening</Label>
                    <Switch
                      checked={formData.monitoring_rules.aml_screening}
                      onCheckedChange={(v) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, aml_screening: v}
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Fraud Detection</Label>
                    <Switch
                      checked={formData.monitoring_rules.fraud_detection}
                      onCheckedChange={(v) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, fraud_detection: v}
                      })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Amount Threshold ($)</Label>
                    <Input
                      type="number"
                      value={formData.monitoring_rules.amount_threshold}
                      onChange={(e) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, amount_threshold: parseFloat(e.target.value)}
                      })}
                    />
                  </div>
                  <div>
                    <Label>Auto-Approve Below</Label>
                    <Input
                      type="number"
                      value={formData.monitoring_rules.auto_approve_threshold}
                      onChange={(e) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, auto_approve_threshold: parseFloat(e.target.value)}
                      })}
                    />
                  </div>
                  <div>
                    <Label>Auto-Block Above</Label>
                    <Input
                      type="number"
                      value={formData.monitoring_rules.auto_block_threshold}
                      onChange={(e) => setFormData({
                        ...formData,
                        monitoring_rules: {...formData.monitoring_rules, auto_block_threshold: parseFloat(e.target.value)}
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-600" disabled={createConfigMutation.isPending}>
                  {createConfigMutation.isPending ? 'Creating...' : 'Create Configuration'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Configurations List */}
      <div className="space-y-4">
        {configs.map(config => (
          <Card key={config.id} className="border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{config.service_name}</h3>
                    <Badge className={config.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                      {config.status}
                    </Badge>
                  </div>
                  {config.processor_name && (
                    <p className="text-sm text-gray-600">Processor: {config.processor_name}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Webhook className="h-4 w-4 text-gray-500" />
                    <Label className="text-sm">Webhook URL (Inbound)</Label>
                  </div>
                  <Input value={config.webhook_url} readOnly className="font-mono text-xs" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-gray-500" />
                    <Label className="text-sm">API Key</Label>
                  </div>
                  <Input value={config.api_key} readOnly className="font-mono text-xs" type="password" />
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Processed</p>
                  <p className="font-semibold text-lg">{(config.transactions_processed || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Blocked</p>
                  <p className="font-semibold text-lg text-red-600">{config.transactions_blocked || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Flagged</p>
                  <p className="font-semibold text-lg text-yellow-600">{config.transactions_flagged || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Transaction</p>
                  <p className="font-semibold text-sm">
                    {config.last_transaction_date ? new Date(config.last_transaction_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {configs.length === 0 && !showCreateForm && (
          <Card>
            <CardContent className="py-12 text-center">
              <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No configurations yet</p>
              <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Configuration
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}