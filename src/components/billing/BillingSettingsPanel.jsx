import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Activity, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function BillingSettingsPanel() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch billing settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['billingSettings'],
    queryFn: async () => {
      const result = await base44.entities.BillingSettings.filter({});
      return result.length ? result[0] : null;
    }
  });

  // Update settings
  const updateMutation = useMutation({
    mutationFn: (data) => {
      if (settings?.id) {
        return base44.entities.BillingSettings.update(settings.id, data);
      } else {
        return base44.entities.BillingSettings.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billingSettings'] });
      toast.success('Billing settings updated');
      setEditing(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update settings');
    }
  });

  if (isLoading) {
    return <div className="text-center py-8"><Loader className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  const integrations = [
    { 
      name: 'QuickBooks Online', 
      key: 'quickbooks', 
      logo: 'https://cdn.worldvectorlogo.com/logos/quickbooks-1.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'quickbooks' && i.is_connected) 
    },
    { 
      name: 'Xero', 
      key: 'xero', 
      logo: 'https://www.vectorlogo.zone/logos/xero/xero-ar21.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'xero' && i.is_connected) 
    },
    { 
      name: 'Sage', 
      key: 'sage', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sage-logo_svg.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'sage' && i.is_connected) 
    },
    { 
      name: 'NetSuite', 
      key: 'netsuite', 
      logo: 'https://www.svgrepo.com/show/342094/oracle-netsuite.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'netsuite' && i.is_connected) 
    },
    { 
      name: 'Oracle Finance Cloud', 
      key: 'oracle', 
      logo: 'https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'oracle' && i.is_connected) 
    },
    { 
      name: 'SAP', 
      key: 'sap', 
      logo: 'https://www.vectorlogo.zone/logos/sap/sap-ar21.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'sap' && i.is_connected) 
    },
    { 
      name: 'Zoho Books', 
      key: 'zohobooks', 
      logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/b8799f259_download9.png',
      connected: settings?.accounting_integrations?.some(i => i.system === 'zohobooks' && i.is_connected) 
    },
    { 
      name: 'Microsoft Dynamics 365', 
      key: 'dynamics365', 
      logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'dynamics365' && i.is_connected) 
    },
    { 
      name: 'FreshBooks', 
      key: 'freshbooks', 
      logo: 'https://cdn.worldvectorlogo.com/logos/freshbooks-1.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'freshbooks' && i.is_connected) 
    },
    { 
      name: 'MYOB', 
      key: 'myob', 
      logo: 'https://cdn.worldvectorlogo.com/logos/myob.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'myob' && i.is_connected) 
    },
    { 
      name: 'TallyPrime', 
      key: 'tallyprime', 
      logo: 'https://cdn.worldvectorlogo.com/logos/tally-solutions.svg',
      connected: settings?.accounting_integrations?.some(i => i.system === 'tallyprime' && i.is_connected) 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Company Information</CardTitle>
          <Button
            variant="outline"
            onClick={() => {
              setFormData(settings || {});
              setEditing(!editing);
            }}
          >
            {editing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Company Name</label>
                <Input
                  value={formData.company_name || ''}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Email</label>
                <Input
                  value={formData.company_email || ''}
                  onChange={(e) => setFormData({...formData, company_email: e.target.value})}
                  placeholder="billing@company.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Tax ID</label>
                <Input
                  value={formData.tax_id || ''}
                  onChange={(e) => setFormData({...formData, tax_id: e.target.value})}
                  placeholder="EIN or Tax ID"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Default Tax Rate (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.default_tax_rate || 0}
                  onChange={(e) => setFormData({...formData, default_tax_rate: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Payment Terms (days)</label>
                <Input
                  type="number"
                  value={formData.payment_terms_days || 30}
                  onChange={(e) => setFormData({...formData, payment_terms_days: parseInt(e.target.value)})}
                />
              </div>
              <Button
                onClick={() => updateMutation.mutate(formData)}
                disabled={updateMutation.isPending}
                className="w-full"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div><p className="text-sm text-gray-600">Company</p><p className="font-semibold">{settings?.company_name}</p></div>
              <div><p className="text-sm text-gray-600">Email</p><p className="font-semibold">{settings?.company_email}</p></div>
              <div><p className="text-sm text-gray-600">Tax ID</p><p className="font-semibold">{settings?.tax_id}</p></div>
              <div><p className="text-sm text-gray-600">Default Tax Rate</p><p className="font-semibold">{settings?.default_tax_rate}%</p></div>
              <div><p className="text-sm text-gray-600">Payment Terms</p><p className="font-semibold">{settings?.payment_terms_days} days</p></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accounting Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Accounting Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div key={integration.key} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {integration.logo ? (
                    <img 
                      src={integration.logo} 
                      alt={`${integration.name} logo`}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <Activity className="h-8 w-8 text-blue-600" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{integration.name}</p>
                    <p className="text-sm text-gray-600">Auto-export invoices</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {integration.connected ? (
                    <Badge className="bg-blue-600 text-white flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Not Connected
                    </Badge>
                  )}
                  <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-600">
                    {integration.connected ? 'Reconfigure' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Invoice Prefix</p>
            <p className="font-mono font-semibold">{settings?.invoice_prefix || 'INV'}-2026-001</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={settings?.auto_generate_invoices} className="rounded" />
            <label className="text-sm">Auto-generate invoices on billing date</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={settings?.auto_send_invoices} className="rounded" />
            <label className="text-sm">Auto-send invoices to customers</label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}