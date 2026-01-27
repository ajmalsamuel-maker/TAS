import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Activity, Loader, ExternalLink, Settings, RefreshCw, BarChart } from 'lucide-react';
import { toast } from 'sonner';
import FieldMappingConfig from './FieldMappingConfig';
import AccountingSyncDashboard from './AccountingSyncDashboard';

export default function BillingSettingsPanel() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [connectingIntegration, setConnectingIntegration] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [managingIntegration, setManagingIntegration] = useState(null);
  const [syncing, setSyncing] = useState(false);

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

  // Connect integration
  const connectMutation = useMutation({
    mutationFn: async ({ integrationKey, credentials }) => {
      const updatedIntegrations = settings?.accounting_integrations || [];
      const existingIndex = updatedIntegrations.findIndex(i => i.system === integrationKey);
      
      const integrationData = {
        system: integrationKey,
        is_connected: true,
        api_key_set: true,
        auto_export: true,
        last_sync: new Date().toISOString(),
        credentials: credentials // Store encrypted in production
      };

      if (existingIndex >= 0) {
        updatedIntegrations[existingIndex] = integrationData;
      } else {
        updatedIntegrations.push(integrationData);
      }

      if (settings?.id) {
        return base44.entities.BillingSettings.update(settings.id, {
          accounting_integrations: updatedIntegrations
        });
      } else {
        return base44.entities.BillingSettings.create({
          accounting_integrations: updatedIntegrations
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billingSettings'] });
      toast.success('Integration connected successfully');
      setConnectingIntegration(null);
      setCredentials({});
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to connect integration');
    }
  });

  const handleConnect = (integrationKey) => {
    setConnectingIntegration(integrationKey);
    setCredentials({});
  };

  const handleSaveConnection = () => {
    const config = integrationConfigs[connectingIntegration];
    const requiredFields = config.fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !credentials[f.name]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    connectMutation.mutate({
      integrationKey: connectingIntegration,
      credentials: credentials
    });
  };

  const handleManageIntegration = (integrationKey) => {
    setManagingIntegration(integrationKey);
  };

  const handleSyncNow = async (integrationKey) => {
    setSyncing(true);
    try {
      const { data } = await base44.functions.invoke('syncAccountingData', {
        integration_key: integrationKey,
        sync_type: 'all'
      });
      
      if (data.success) {
        toast.success(`Synced ${data.synced} items successfully${data.failed > 0 ? `, ${data.failed} failed` : ''}`);
      } else {
        toast.error('Sync failed');
      }
    } catch (error) {
      toast.error(error.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8"><Loader className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  // Integration credential configurations
  const integrationConfigs = {
    quickbooks: {
      fields: [
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'realm_id', label: 'Company ID (Realm ID)', type: 'text', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://developer.intuit.com/app/developer/qbo/docs/get-started'
    },
    xero: {
      fields: [
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'tenant_id', label: 'Tenant ID', type: 'text', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://developer.xero.com/documentation/getting-started-guide/'
    },
    sage: {
      fields: [
        { name: 'subscription_key', label: 'Subscription Key', type: 'text', required: true },
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://developer.sage.com/'
    },
    netsuite: {
      fields: [
        { name: 'account_id', label: 'Account ID', type: 'text', required: true },
        { name: 'consumer_key', label: 'Consumer Key', type: 'text', required: true },
        { name: 'consumer_secret', label: 'Consumer Secret', type: 'password', required: true },
        { name: 'token_id', label: 'Token ID', type: 'text', required: true },
        { name: 'token_secret', label: 'Token Secret', type: 'password', required: true }
      ],
      authType: 'Token-Based',
      docs: 'https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4247337262.html'
    },
    oracle: {
      fields: [
        { name: 'base_url', label: 'Base URL', type: 'text', required: true, placeholder: 'https://your-instance.oraclecloud.com' },
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true }
      ],
      authType: 'Basic Auth',
      docs: 'https://docs.oracle.com/en/cloud/saas/financials/23d/farfa/index.html'
    },
    sap: {
      fields: [
        { name: 'api_url', label: 'API URL', type: 'text', required: true },
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'company_id', label: 'Company ID', type: 'text', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://api.sap.com/'
    },
    zohobooks: {
      fields: [
        { name: 'organization_id', label: 'Organization ID', type: 'text', required: true },
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://www.zoho.com/books/api/v3/'
    },
    dynamics365: {
      fields: [
        { name: 'tenant_id', label: 'Tenant ID', type: 'text', required: true },
        { name: 'client_id', label: 'Application (Client) ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'environment_url', label: 'Environment URL', type: 'text', required: true }
      ],
      authType: 'OAuth 2.0 (Azure AD)',
      docs: 'https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/services-home-page'
    },
    freshbooks: {
      fields: [
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'account_id', label: 'Account ID', type: 'text', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://www.freshbooks.com/api/start'
    },
    myob: {
      fields: [
        { name: 'client_id', label: 'Client ID', type: 'text', required: true },
        { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
        { name: 'company_file_id', label: 'Company File ID', type: 'text', required: true }
      ],
      authType: 'OAuth 2.0',
      docs: 'https://developer.myob.com/api/accountright/api-overview/'
    },
    tallyprime: {
      fields: [
        { name: 'server_url', label: 'Tally Server URL', type: 'text', required: true, placeholder: 'http://localhost:9000' },
        { name: 'company_name', label: 'Company Name', type: 'text', required: true },
        { name: 'username', label: 'Username (if security enabled)', type: 'text', required: false },
        { name: 'password', label: 'Password (if security enabled)', type: 'password', required: false }
      ],
      authType: 'XML API / ODBC',
      docs: 'https://tallysolutions.com/integration/'
    }
  };

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
      logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/c9d1b21b9_png-clipart-logo-sage-group-brand-graphics-sage-logo-text-trademark.png',
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
                  <div className="flex items-center gap-2">
                    {integration.connected && (
                      <>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleSyncNow(integration.key)}
                          disabled={syncing}
                        >
                          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleManageIntegration(integration.key)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="hover:bg-blue-50 hover:border-blue-600"
                      onClick={() => handleConnect(integration.key)}
                    >
                      {integration.connected ? 'Reconfigure' : 'Connect'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manage Integration Modal */}
      {managingIntegration && (
        <Dialog open={!!managingIntegration} onOpenChange={() => setManagingIntegration(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Manage {integrations.find(i => i.key === managingIntegration)?.name}
              </DialogTitle>
              <DialogDescription>
                Configure field mappings and view sync history
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="mappings" className="mt-4">
              <TabsList>
                <TabsTrigger value="mappings">Field Mappings</TabsTrigger>
                <TabsTrigger value="dashboard">Sync Dashboard</TabsTrigger>
              </TabsList>

              <TabsContent value="mappings">
                <FieldMappingConfig 
                  integrationKey={managingIntegration}
                  integrationName={integrations.find(i => i.key === managingIntegration)?.name}
                />
              </TabsContent>

              <TabsContent value="dashboard">
                <AccountingSyncDashboard />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Connection Modal */}
      {connectingIntegration && (
        <Dialog open={!!connectingIntegration} onOpenChange={() => setConnectingIntegration(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                Connect {integrations.find(i => i.key === connectingIntegration)?.name}
              </DialogTitle>
              <DialogDescription>
                Authentication Type: <span className="font-semibold">{integrationConfigs[connectingIntegration]?.authType}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {integrationConfigs[connectingIntegration]?.fields.map((field) => (
                <div key={field.name}>
                  <label className="text-sm font-semibold">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    value={credentials[field.name] || ''}
                    onChange={(e) => setCredentials({...credentials, [field.name]: e.target.value})}
                    className="mt-1"
                  />
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900">Need help?</p>
                    <p className="text-blue-700">
                      Visit the{' '}
                      <a 
                        href={integrationConfigs[connectingIntegration]?.docs} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-900"
                      >
                        official documentation
                      </a>
                      {' '}to get your API credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setConnectingIntegration(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveConnection}
                disabled={connectMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {connectMutation.isPending ? 'Connecting...' : 'Save & Connect'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

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