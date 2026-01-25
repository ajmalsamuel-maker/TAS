import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Settings, Loader, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProviderIntegrationPanel({ organization }) {
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isIntegrating, setIsIntegrating] = useState(false);
  const queryClient = useQueryClient();

  const { data: providers = [], isLoading } = useQuery({
    queryKey: ['providers', organization?.id],
    queryFn: async () => {
      if (!organization?.id) return [];
      return await base44.entities.Provider.filter({ status: 'active' });
    },
    enabled: !!organization?.id
  });

  const { data: integrations = [] } = useQuery({
    queryKey: ['integrations', organization?.id],
    queryFn: async () => {
      if (!organization?.id) return [];
      // Would fetch from integration records
      return [];
    },
    enabled: !!organization?.id
  });

  const handleIntegrate = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter API key');
      return;
    }

    setIsIntegrating(true);
    try {
      await base44.functions.invoke('setupProviderIntegration', {
        organizationId: organization.id,
        providerId: selectedProvider.id,
        apiKey: apiKey
      });

      toast.success(`${selectedProvider.name} integrated successfully`);
      setShowApiKeyForm(false);
      setApiKey('');
      setSelectedProvider(null);
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    } catch (error) {
      toast.error('Integration failed');
    } finally {
      setIsIntegrating(false);
    }
  };

  const handleDisconnect = async (provider) => {
    try {
      await base44.functions.invoke('disconnectProvider', {
        organizationId: organization.id,
        providerId: provider.id
      });

      toast.success(`${provider.name} disconnected`);
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    } catch (error) {
      toast.error('Disconnection failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {integrations.length === 0 ? (
            <p className="text-sm text-gray-600 py-6 text-center">
              No providers integrated yet. Add providers to get started.
            </p>
          ) : (
            integrations.map((integration) => (
              <div key={integration.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{integration.provider_name}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge className="bg-green-100 text-green-800 text-xs">Connected</Badge>
                    <span className="text-xs text-gray-500">Connected {integration.connected_days} days ago</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDisconnect(integration)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Add Provider */}
      {!showApiKeyForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Available Providers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {providers.map((provider) => {
              const isConnected = integrations.some(i => i.provider_id === provider.id);
              return (
                <div
                  key={provider.id}
                  className="p-3 border rounded-lg flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-600">{provider.service_type}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedProvider(provider);
                      setShowApiKeyForm(true);
                    }}
                    disabled={isConnected}
                    className={
                      isConnected
                        ? 'bg-gray-300 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }
                  >
                    {isConnected ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Integrate {selectedProvider?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                API Key
              </label>
              <Input
                type="password"
                placeholder="Enter API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={isIntegrating}
              />
              <p className="text-xs text-gray-500 mt-1">
                Your API key will be securely stored and encrypted
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleIntegrate}
                disabled={isIntegrating || !apiKey.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isIntegrating ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Integrating...
                  </>
                ) : (
                  'Confirm Integration'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowApiKeyForm(false);
                  setSelectedProvider(null);
                  setApiKey('');
                }}
                disabled={isIntegrating}
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