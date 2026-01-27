import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Filter, Eye, ExternalLink, Globe, 
  Zap, Shield, TrendingUp, CheckCircle2, AlertCircle, Cpu
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const categoryIcons = {
  'KYB_KYC': <Shield className="h-4 w-4" />,
  'AML_SCREENING': <AlertCircle className="h-4 w-4" />,
  'FACIAL_RECOGNITION': <Eye className="h-4 w-4" />,
  'ID_VERIFICATION': <CheckCircle2 className="h-4 w-4" />,
  'DOCUMENT_VERIFICATION': <Filter className="h-4 w-4" />,
  'LIVENESS_DETECTION': <Zap className="h-4 w-4" />,
  'LEI_ISSUANCE': <Globe className="h-4 w-4" />,
  'VLEI_ISSUANCE': <Globe className="h-4 w-4" />,
  'WEB3_VERIFICATION': <TrendingUp className="h-4 w-4" />,
  'BLOCKCHAIN_COMPLIANCE': <Shield className="h-4 w-4" />
};

const categoryColors = {
  'KYB_KYC': 'bg-blue-100 text-blue-800',
  'AML_SCREENING': 'bg-red-100 text-red-800',
  'FACIAL_RECOGNITION': 'bg-purple-100 text-purple-800',
  'ID_VERIFICATION': 'bg-green-100 text-green-800',
  'DOCUMENT_VERIFICATION': 'bg-yellow-100 text-yellow-800',
  'LIVENESS_DETECTION': 'bg-pink-100 text-pink-800',
  'LEI_ISSUANCE': 'bg-indigo-100 text-indigo-800',
  'VLEI_ISSUANCE': 'bg-indigo-100 text-indigo-800',
  'WEB3_VERIFICATION': 'bg-orange-100 text-orange-800',
  'BLOCKCHAIN_COMPLIANCE': 'bg-cyan-100 text-cyan-800'
};

export default function GlobalProviders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const { data: providers, isLoading } = useQuery({
    queryKey: ['provider-global'],
    queryFn: () => base44.entities.ProviderGlobal.list()
  });

  const web3Categories = ['WEB3_VERIFICATION', 'BLOCKCHAIN_COMPLIANCE'];
  const tradCategories = ['KYB_KYC', 'AML_SCREENING', 'FACIAL_RECOGNITION', 'ID_VERIFICATION', 'DOCUMENT_VERIFICATION', 'LIVENESS_DETECTION'];
  const leiCategories = ['LEI_ISSUANCE', 'VLEI_ISSUANCE'];

  const filteredByTab = activeTab === 'web3' 
    ? providers?.filter(p => web3Categories.includes(p.provider_category))
    : activeTab === 'lei'
    ? providers?.filter(p => leiCategories.includes(p.provider_category))
    : activeTab === 'traditional'
    ? providers?.filter(p => tradCategories.includes(p.provider_category))
    : providers;

  const filteredProviders = filteredByTab?.filter(p => {
    const matchesSearch = p.provider_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.service_types?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.provider_category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const categories = ['all', ...new Set(filteredByTab?.map(p => p.provider_category) || [])];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Global Provider Marketplace</h1>
        <p className="text-gray-600">Browse and compare all available service providers</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setSelectedCategory('all'); }}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="traditional">Traditional</TabsTrigger>
          <TabsTrigger value="web3" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" /> Web3
          </TabsTrigger>
          <TabsTrigger value="lei">LEI/vLEI</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Search & Filters */}
          <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search providers, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat === 'all' ? 'All Providers' : cat.replace(/_/g, ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{providers?.length || 0}</div>
              <p className="text-sm text-gray-600 mt-1">Total Providers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{providers?.filter(p => p.is_operational).length || 0}</div>
              <p className="text-sm text-gray-600 mt-1">Operational</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{filteredProviders.length}</div>
              <p className="text-sm text-gray-600 mt-1">Matching Search</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Providers Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading providers...</div>
      ) : filteredProviders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No providers found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map(provider => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{provider.provider_name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={categoryColors[provider.provider_category]}>
                        {categoryIcons[provider.provider_category]}
                        <span className="ml-1">{provider.provider_category.replace(/_/g, ' ')}</span>
                      </Badge>
                      {provider.is_operational && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Operational
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Service Types */}
                {provider.service_types?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Services</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.service_types.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {provider.service_types.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.service_types.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Coverage */}
                {provider.global_coverage?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Coverage</p>
                    <p className="text-sm text-gray-700">{provider.global_coverage.join(', ')}</p>
                  </div>
                )}

                {/* Blockchains (Web3) */}
                {provider.supported_blockchains?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Blockchains</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.supported_blockchains.slice(0, 3).map((chain, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {chain}
                        </Badge>
                      ))}
                      {provider.supported_blockchains.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.supported_blockchains.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {provider.pricing_model && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pricing:</span>
                    <Badge variant="outline">{provider.pricing_model.replace(/_/g, ' ')}</Badge>
                  </div>
                )}

                {/* Response Time & Accuracy */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {provider.response_time_ms && (
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Response</p>
                      <p className="font-semibold">{provider.response_time_ms}ms</p>
                    </div>
                  )}
                  {provider.accuracy_rate && (
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Accuracy</p>
                      <p className="font-semibold">{provider.accuracy_rate}%</p>
                    </div>
                  )}
                </div>

                {/* Compliance */}
                {provider.compliance_standards?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Compliance</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.compliance_standards.slice(0, 2).map((std, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {std}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Details */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {categoryIcons[provider.provider_category]}
                        {provider.provider_name}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Category & Status */}
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={categoryColors[provider.provider_category]}>
                          {provider.provider_category.replace(/_/g, ' ')}
                        </Badge>
                        {provider.is_operational && (
                          <Badge className="bg-green-100 text-green-800">Operational</Badge>
                        )}
                        {!provider.is_active && (
                          <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                        )}
                      </div>

                      {/* Best For */}
                      {provider.best_for && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Best For</h4>
                          <p className="text-sm text-gray-700">{provider.best_for}</p>
                        </div>
                      )}

                      {/* Services */}
                      {provider.service_types?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Services</h4>
                          <ul className="space-y-1 text-sm">
                            {provider.service_types.map((service, idx) => (
                              <li key={idx} className="text-gray-700">• {service}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Coverage */}
                      {provider.global_coverage?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Geographic Coverage</h4>
                          <p className="text-sm text-gray-700">{provider.global_coverage.join(', ')}</p>
                        </div>
                      )}

                      {/* Blockchains */}
                      {provider.supported_blockchains?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Supported Blockchains</h4>
                          <div className="flex flex-wrap gap-2">
                            {provider.supported_blockchains.map((chain, idx) => (
                              <Badge key={idx} variant="outline">{chain}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Performance */}
                      <div className="grid grid-cols-2 gap-4">
                        {provider.response_time_ms && (
                          <div className="border rounded p-3">
                            <p className="text-xs text-gray-600">Response Time</p>
                            <p className="text-lg font-semibold">{provider.response_time_ms}ms</p>
                          </div>
                        )}
                        {provider.accuracy_rate && (
                          <div className="border rounded p-3">
                            <p className="text-xs text-gray-600">Accuracy</p>
                            <p className="text-lg font-semibold">{provider.accuracy_rate}%</p>
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Pricing</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-600">Model</p>
                            <p className="text-sm font-semibold">{provider.pricing_model?.replace(/_/g, ' ')}</p>
                          </div>
                          {provider.pricing_range && (
                            <div>
                              <p className="text-xs text-gray-600">Range</p>
                              <p className="text-sm font-semibold">
                                ${provider.pricing_range.min_cost} - ${provider.pricing_range.max_cost}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* API Details */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">API Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-mono">{provider.api_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Auth:</span>
                            <span className="font-mono">{provider.authentication_method}</span>
                          </div>
                          {provider.api_endpoints?.base_url && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Endpoint:</span>
                              <a href={provider.api_endpoints.base_url} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 hover:underline flex items-center gap-1">
                                Visit <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Compliance */}
                      {provider.compliance_standards?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Compliance Standards</h4>
                          <div className="flex flex-wrap gap-2">
                            {provider.compliance_standards.map((std, idx) => (
                              <Badge key={idx} variant="secondary">{std}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-2 gap-4">
                        {provider.pros?.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 text-green-700">Pros</h4>
                            <ul className="space-y-1 text-xs text-gray-700">
                              {provider.pros.map((pro, idx) => (
                                <li key={idx}>✓ {pro}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {provider.cons?.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 text-red-700">Cons</h4>
                            <ul className="space-y-1 text-xs text-gray-700">
                              {provider.cons.map((con, idx) => (
                                <li key={idx}>✗ {con}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Alternatives */}
                      {provider.alternative_providers?.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm mb-2">Alternative Providers</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {provider.alternative_providers.map((alt, idx) => (
                              <li key={idx}>• {alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
        </TabsContent>
      </Tabs>
    </div>
  );
}