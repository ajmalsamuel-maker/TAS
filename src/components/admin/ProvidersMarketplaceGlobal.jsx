import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Globe, Zap, DollarSign, Check, X, Settings } from 'lucide-react';

const PROVIDER_CATEGORIES = [
  'KYB_KYC',
  'AML_SCREENING',
  'FACIAL_RECOGNITION',
  'ID_VERIFICATION',
  'DOCUMENT_VERIFICATION',
  'LIVENESS_DETECTION',
  'WEB3_VERIFICATION',
  'BLOCKCHAIN_COMPLIANCE',
  'LEI_ISSUANCE',
  'VLEI_ISSUANCE'
];

const CATEGORY_LABELS = {
  KYB_KYC: 'KYB/KYC Verification',
  AML_SCREENING: 'AML Screening',
  FACIAL_RECOGNITION: 'Facial Recognition',
  ID_VERIFICATION: 'ID Verification',
  DOCUMENT_VERIFICATION: 'Document Verification',
  LIVENESS_DETECTION: 'Liveness Detection',
  WEB3_VERIFICATION: 'Web3 Verification',
  BLOCKCHAIN_COMPLIANCE: 'Blockchain Compliance',
  LEI_ISSUANCE: 'LEI Issuance',
  VLEI_ISSUANCE: 'vLEI Issuance'
};

export default function ProvidersMarketplaceGlobal() {
  const [selectedCategory, setSelectedCategory] = useState('KYB_KYC');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProvider, setShowAddProvider] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: enableProvider, isPending } = useMutation({
    mutationFn: async (globalProvider) => {
      return await base44.entities.Provider.create({
        name: globalProvider.provider_name,
        provider_category: globalProvider.provider_category,
        api_type: globalProvider.api_type,
        authentication_method: globalProvider.authentication_method,
        api_endpoints: globalProvider.api_endpoints,
        status: 'pending_configuration',
        global_provider_id: globalProvider.id,
        setup_requirements: globalProvider.setup_requirements
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      alert('Provider enabled! Configure it in the Providers section.');
    },
    onError: () => {
      alert('Failed to enable provider. It may already be configured.');
    }
  });

  const handleEnableProvider = (provider) => {
    enableProvider(provider);
  };

  const { data: providers, isLoading } = useQuery({
    queryKey: ['providersGlobal', selectedCategory],
    queryFn: () => base44.entities.ProviderGlobal.filter({
      provider_category: selectedCategory,
      is_active: true
    })
  });

  const { data: enabledProviders = [] } = useQuery({
    queryKey: ['enabledProviders'],
    queryFn: () => base44.entities.Provider.list()
  });

  // Remove duplicates by provider_name
  const uniqueProviders = providers?.filter((p, idx, arr) => 
    arr.findIndex(x => x.provider_name === p.provider_name) === idx
  ) || [];

  const filteredProviders = uniqueProviders.filter(p =>
    p.provider_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
           <h2 className="text-2xl font-bold">Global Provider Marketplace</h2>
           <p className="text-gray-600 text-sm mt-1">Browse and add third-party providers to the global registry. Enable providers to use them operationally.</p>
         </div>
         <Dialog open={showAddProvider} onOpenChange={setShowAddProvider}>
           <DialogTrigger asChild>
             <Button className="bg-blue-600 hover:bg-blue-700">+ Add Provider</Button>
           </DialogTrigger>
           <AddProviderDialog onClose={() => setShowAddProvider(false)} />
         </Dialog>
       </div>

      {/* Category Tabs */}
       <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
         <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto">
           {PROVIDER_CATEGORIES.map(cat => (
             <TabsTrigger key={cat} value={cat} className="text-xs py-2">
               {CATEGORY_LABELS[cat]?.split(' ')[0]}
             </TabsTrigger>
           ))}
         </TabsList>

        {PROVIDER_CATEGORIES.map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            {/* Search */}
            <div className="flex gap-2">
              <Input
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>

            {/* Providers Grid */}
            <div className="grid gap-4">
              {isLoading ? (
                <p className="text-gray-600">Loading providers...</p>
              ) : filteredProviders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-600">
                    No providers found in this category
                  </CardContent>
                </Card>
              ) : (
                filteredProviders.map(provider => {
                  const enabledProvider = enabledProviders.find(p => p.global_provider_id === provider.id);
                  return (
                    <ProviderCard 
                      key={provider.id} 
                      provider={provider} 
                      enabledProvider={enabledProvider}
                      queryClient={queryClient}
                      onEnable={enableProvider}
                      isEnabling={isPending}
                    />
                  );
                })
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProviderCard({ provider, enabledProvider, queryClient, onEnable, isEnabling }) {
  const [expanded, setExpanded] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [config, setConfig] = useState(enabledProvider?.config || {});

  const { mutate: updateProvider } = useMutation({
    mutationFn: async () => {
      return await base44.entities.Provider.update(enabledProvider.id, {
        config: config
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enabledProviders'] });
      setEditOpen(false);
      alert('Provider configuration updated!');
    }
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{provider.provider_name}</CardTitle>
              <Badge variant="outline">{provider.api_type}</Badge>
              <Badge className="bg-blue-100 text-blue-800">{provider.authentication_method}</Badge>
              {enabledProvider && (
                <Badge className="bg-green-100 text-green-800">✓ Enabled</Badge>
              )}
            </div>
            <CardDescription className="line-clamp-2">{provider.best_for}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '−' : '+'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Coverage</p>
            <p className="font-bold text-sm">{provider.global_coverage?.length || 0} Countries</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Accuracy</p>
            <p className="font-bold text-sm">{provider.accuracy_rate}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Response</p>
            <p className="font-bold text-sm">{provider.response_time_ms}ms</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Pricing</p>
            <p className="font-bold text-sm">{provider.pricing_model?.split('_').join(' ')}</p>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-2">Services</p>
          <div className="flex flex-wrap gap-2">
            {provider.service_types?.map(service => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        {expanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* Coverage Map */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Global Coverage</p>
              <div className="flex flex-wrap gap-1">
                {provider.global_coverage?.slice(0, 10).map(country => (
                  <Badge key={country} variant="outline" className="text-xs">
                    {country}
                  </Badge>
                ))}
                {provider.global_coverage?.length > 10 && (
                  <Badge variant="outline" className="text-xs">
                    +{provider.global_coverage.length - 10} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Supported Documents */}
            {provider.supported_documents?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Supported Documents</p>
                <div className="flex flex-wrap gap-1">
                  {provider.supported_documents.map(doc => (
                    <Badge key={doc} className="bg-emerald-100 text-emerald-800 text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Fields */}
            {provider.data_extraction_fields?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Data Fields Extracted</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {provider.data_extraction_fields.slice(0, 6).map(field => (
                    <div key={field} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API Details */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-gray-600 mb-2">API Details</p>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate Limiting:</span>
                  <span className="font-mono">{provider.rate_limiting?.requests_per_second} req/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Batch Processing:</span>
                  <span>{provider.batch_processing ? '✓ Yes' : '✗ No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Webhooks:</span>
                  <span>{provider.webhook_support ? '✓ Yes' : '✗ No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Retention:</span>
                  <span className="font-mono">{provider.data_retention}</span>
                </div>
              </div>
            </div>

            {/* Compliance */}
            {provider.compliance_standards?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Compliance Standards</p>
                <div className="flex flex-wrap gap-1">
                  {provider.compliance_standards.map(std => (
                    <Badge key={std} className="bg-blue-100 text-blue-800 text-xs">
                      {std}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-green-700 mb-2">Advantages</p>
                <ul className="space-y-1 text-xs">
                  {provider.pros?.map((pro, idx) => (
                    <li key={idx} className="flex gap-2">
                      <Check className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700 mb-2">Limitations</p>
                <ul className="space-y-1 text-xs">
                  {provider.cons?.map((con, idx) => (
                    <li key={idx} className="flex gap-2">
                      <X className="h-3 w-3 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing Details */}
            {provider.pricing_range && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 mb-2">Pricing</p>
                <p className="text-sm font-bold">
                  ${provider.pricing_range.min_cost} - ${provider.pricing_range.max_cost} {provider.pricing_range.currency}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {enabledProvider ? (
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Configure {provider.provider_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Provider Status</Label>
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {enabledProvider.status}
                        </div>
                      </div>

                      {provider.setup_requirements?.map(req => (
                        <div key={req}>
                          <Label className="text-sm font-semibold mb-2 block">{req}</Label>
                          <Input
                            placeholder={`Enter ${req}`}
                            value={config[req] || ''}
                            onChange={(e) => setConfig({...config, [req]: e.target.value})}
                          />
                        </div>
                      ))}

                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Custom Configuration (JSON)</Label>
                        <Textarea
                          placeholder='{"key": "value"}'
                          value={typeof config.custom_fields === 'string' ? config.custom_fields : JSON.stringify(config.custom_fields || {})}
                          onChange={(e) => setConfig({...config, custom_fields: e.target.value})}
                          className="h-32 font-mono text-xs"
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-xs text-blue-800 mb-2 font-semibold">API Details</p>
                        <div className="text-xs text-blue-700 space-y-1">
                          <p><strong>Base URL:</strong> {provider.api_endpoints?.base_url}</p>
                          <p><strong>Auth Method:</strong> {provider.authentication_method}</p>
                          <p><strong>Sandbox:</strong> {provider.api_endpoints?.sandbox_url}</p>
                        </div>
                      </div>

                      <Button onClick={() => updateProvider()} className="w-full bg-blue-600 hover:bg-blue-700">
                        Save Configuration
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button 
                  onClick={() => onEnable(provider)}
                  disabled={isEnabling}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isEnabling ? 'Enabling...' : `Enable ${provider.provider_name}`}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}