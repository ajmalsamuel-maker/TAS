import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Server, Activity, Globe, Settings, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function ProvidersManagement({ providers: initialProviders }) {
  const [editingProvider, setEditingProvider] = useState(null);
  const [loadedCredentials, setLoadedCredentials] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [loadingCredentials, setLoadingCredentials] = useState(false);
  const queryClient = useQueryClient();

  const { data: providers = initialProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.Provider.list()
  });

  const loadCredentials = async (provider) => {
    setLoadingCredentials(true);
    try {
      const { data } = await base44.functions.invoke('getProviderCredentials', { 
        provider_name: provider.name 
      });
      setLoadedCredentials({
        ...data.credentials,
        api_endpoint: data.api_endpoint
      });
    } catch (error) {
      console.error('Failed to load credentials:', error);
      setLoadedCredentials({});
    }
    setLoadingCredentials(false);
  };

  const { mutate: updateProvider } = useMutation({
    mutationFn: async (data) => {
      return await base44.entities.Provider.update(editingProvider.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      setEditingProvider(null);
      alert('Provider updated successfully!');
    }
  });

  const { mutate: deleteProvider } = useMutation({
    mutationFn: async (id) => {
      return await base44.entities.Provider.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      alert('Provider deleted successfully!');
    }
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceColor = (type) => {
    const colors = {
      'vlei': 'bg-blue-100 text-blue-800',
      'kyb': 'bg-purple-100 text-purple-800',
      'aml': 'bg-orange-100 text-orange-800',
      'did': 'bg-cyan-100 text-cyan-800',
      'credential_verification': 'bg-pink-100 text-pink-800',
      'web3': 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Server className="h-6 w-6 text-[#0044CC]" />
          Service Providers Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Provider</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Avg Response</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-[#0044CC]">
                          {provider.name?.charAt(0)}
                        </span>
                      </div>
                      <span>{provider.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getServiceColor(provider.service_type)}>
                      {provider.service_type?.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(provider.status)} variant="outline">
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{provider.uptime_percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{provider.avg_response_time_ms || 85}ms</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      {provider.region || 'Global'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Dialog open={showDialog && editingProvider?.id === provider.id} onOpenChange={(open) => {
                        setShowDialog(open);
                        if (!open) setEditingProvider(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => {
                              setEditingProvider(provider);
                              setShowDialog(true);
                              loadCredentials(provider);
                            }}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          {editingProvider && (
                            <>
                              <DialogHeader>
                                <DialogTitle>Configure {editingProvider.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
                                  <strong>Provider:</strong> {editingProvider.name} | <strong>Type:</strong> {editingProvider.service_type}
                                </div>

                                {loadingCredentials && (
                                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
                                    Loading credentials...
                                  </div>
                                )}

                                <div>
                                  <Label className="text-sm font-semibold mb-2 block">API Key</Label>
                                  <Input
                                    value={loadedCredentials.api_key || editingProvider.api_key || ''}
                                    onChange={(e) => setLoadedCredentials({...loadedCredentials, api_key: e.target.value})}
                                    type="password"
                                    placeholder="Enter API key"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold mb-2 block">Client ID</Label>
                                  <Input
                                    value={loadedCredentials.client_id || editingProvider.client_id || ''}
                                    onChange={(e) => setLoadedCredentials({...loadedCredentials, client_id: e.target.value})}
                                    placeholder="Enter client ID"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold mb-2 block">Client Secret</Label>
                                  <Input
                                    value={loadedCredentials.client_secret || editingProvider.client_secret || ''}
                                    onChange={(e) => setLoadedCredentials({...loadedCredentials, client_secret: e.target.value})}
                                    type="password"
                                    placeholder="Enter client secret"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold mb-2 block">API Endpoint</Label>
                                  <Input
                                    value={editingProvider.api_endpoint || ''}
                                    onChange={(e) => setEditingProvider({...editingProvider, api_endpoint: e.target.value})}
                                    placeholder="e.g., https://api.provider.com"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold mb-2 block">Custom Configuration (JSON)</Label>
                                  <Textarea
                                    placeholder='{"key": "value"}'
                                    value={typeof editingProvider.config === 'string' ? editingProvider.config : JSON.stringify(editingProvider.config || {})}
                                    onChange={(e) => setEditingProvider({...editingProvider, config: e.target.value})}
                                    className="h-32 font-mono text-xs"
                                  />
                                </div>

                                <Button 
                                  onClick={() => updateProvider({ 
                                    api_key: loadedCredentials.api_key || editingProvider.api_key,
                                    client_id: loadedCredentials.client_id || editingProvider.client_id,
                                    client_secret: loadedCredentials.client_secret || editingProvider.client_secret,
                                    api_endpoint: editingProvider.api_endpoint,
                                    config: editingProvider.config
                                  })} 
                                  className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                  Save Configuration
                                </Button>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          if (confirm(`Delete ${provider.name}?`)) {
                            deleteProvider(provider.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  </TableRow>
                  ))}
              {providers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No providers configured yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}