import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store, Search, Star, CheckCircle, ExternalLink } from 'lucide-react';

const SERVICE_CATEGORIES = [
  'Identity Verification',
  'Credential Issuance',
  'AML Screening',
  'KYB Services',
  'DID Resolution',
  'Blockchain Anchoring',
  'Secure Storage',
  'API Integration'
];

const MOCK_SERVICES = [
  {
    id: 'service_1',
    name: 'Premium DID Resolver',
    provider: 'Certizen Technology',
    category: 'DID Resolution',
    description: 'High-performance DID resolution supporting multiple methods (ethr, web, key, ion)',
    price: '$0.05 per resolution',
    rating: 4.8,
    verified: true,
    features: ['Multi-chain support', 'Caching', '99.9% uptime', 'Rate limiting']
  },
  {
    id: 'service_2',
    name: 'Verifiable Credential Storage',
    provider: 'FTS.Money',
    category: 'Secure Storage',
    description: 'Encrypted credential storage with selective disclosure',
    price: '$10/month + usage',
    rating: 4.9,
    verified: true,
    features: ['End-to-end encryption', 'Selective disclosure', 'GDPR compliant', 'Backup & recovery']
  },
  {
    id: 'service_3',
    name: 'Blockchain Anchoring Service',
    provider: 'TrustChain Labs',
    category: 'Blockchain Anchoring',
    description: 'Anchor credentials and documents to multiple blockchains',
    price: '$0.10 per anchor',
    rating: 4.7,
    verified: true,
    features: ['Multi-chain', 'Merkle proofs', 'Timestamping', 'Verification API']
  },
  {
    id: 'service_4',
    name: 'Advanced AML Oracle',
    provider: 'ComplianceChain',
    category: 'AML Screening',
    description: 'Real-time AML screening with blockchain-verified results',
    price: '$1 per check',
    rating: 4.6,
    verified: false,
    features: ['Real-time screening', 'Global watchlists', 'Risk scoring', 'Audit trail']
  },
  {
    id: 'service_5',
    name: 'Decentralized KYB Verification',
    provider: 'IdentityDAO',
    category: 'KYB Services',
    description: 'Community-governed KYB verification network',
    price: '$50 per verification',
    rating: 4.5,
    verified: true,
    features: ['DAO governance', 'Multi-party validation', 'Credential issuance', 'Reputation system']
  },
  {
    id: 'service_6',
    name: 'vLEI Credential Issuer API',
    provider: 'Certizen Technology',
    category: 'Credential Issuance',
    description: 'Automated vLEI credential issuance with GLEIF compliance',
    price: '$100 per credential',
    rating: 5.0,
    verified: true,
    features: ['GLEIF certified', 'Instant issuance', 'Revocation support', 'QR code generation']
  }
];

export default function ServiceMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Store className="h-6 w-6" />
            Web3 Service Marketplace
          </CardTitle>
          <p className="text-sm text-blue-100 mt-2">
            Discover and integrate verifiable identity services powered by blockchain and DIDs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl font-bold">{MOCK_SERVICES.length}</p>
              <p className="text-sm">Available Services</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl font-bold">{MOCK_SERVICES.filter(s => s.verified).length}</p>
              <p className="text-sm">Verified Providers</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl font-bold">{SERVICE_CATEGORIES.length}</p>
              <p className="text-sm">Categories</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {SERVICE_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredServices.map(service => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{service.name}</h3>
                    {service.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{service.provider}</p>
                  <Badge variant="outline" className="text-xs">{service.category}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{service.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{service.description}</p>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Pricing</p>
                  <p className="text-sm font-semibold text-blue-600">{service.price}</p>
                </div>
                <Button size="sm" onClick={() => setSelectedService(service)}>
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedService && (
        <Card className="fixed inset-x-4 top-20 max-w-2xl mx-auto z-50 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">{selectedService.name}</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setSelectedService(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Provider</p>
              <p className="text-sm text-gray-700">{selectedService.provider}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Integration</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                base44.integrations.marketplace.connect('{selectedService.id}')
              </code>
            </div>
            <Button className="w-full bg-blue-600">
              Connect Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}