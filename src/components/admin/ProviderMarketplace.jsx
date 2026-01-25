import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Star, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export default function ProviderMarketplace({ onSelectProvider }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const providers = [
    {
      id: 'certizen',
      name: 'Certizen Technology',
      category: 'kyb',
      rating: 4.9,
      reviews: 847,
      status: 'active',
      logo: '🏢',
      description: 'Comprehensive KYB verification with UBO detection',
      features: ['UBO Detection', 'Document Verification', 'Risk Assessment'],
      pricing: 'Custom',
      uptime: 99.98
    },
    {
      id: 'fts-aml',
      name: 'FTS AML',
      category: 'aml',
      rating: 4.8,
      reviews: 623,
      status: 'active',
      logo: '⚠️',
      description: 'Real-time AML screening and sanctions list checks',
      features: ['Sanctions Screening', 'PEP Detection', 'Adverse Media'],
      pricing: 'Pay-per-hit',
      uptime: 99.95
    },
    {
      id: 'fts-kyb',
      name: 'FTS KYB',
      category: 'kyb',
      rating: 4.7,
      reviews: 512,
      status: 'active',
      logo: '🔍',
      description: 'Global KYB with beneficial ownership verification',
      features: ['Global Coverage', 'Real-time Updates', 'API Integration'],
      pricing: 'Volume-based',
      uptime: 99.92
    },
    {
      id: 'facia',
      name: 'FACIA Verification',
      category: 'facial',
      rating: 4.6,
      reviews: 434,
      status: 'active',
      logo: '👤',
      description: 'Liveness detection and facial recognition',
      features: ['Liveness Detection', 'Document Matching', 'Low False Positives'],
      pricing: 'Per-verification',
      uptime: 99.88
    },
    {
      id: 'onfido',
      name: 'Onfido',
      category: 'identity',
      rating: 4.5,
      reviews: 892,
      status: 'active',
      logo: '🆔',
      description: 'Identity verification and document checks',
      features: ['Document OCR', 'Liveness Check', 'ID Verification'],
      pricing: 'Per-verification',
      uptime: 99.85
    },
    {
      id: 'refinitiv',
      name: 'Refinitiv Entity Search',
      category: 'data',
      rating: 4.4,
      reviews: 756,
      status: 'active',
      logo: '📊',
      description: 'Enterprise entity data and market intelligence',
      features: ['Entity Database', 'Corporate Actions', 'News Integration'],
      pricing: 'Subscription',
      uptime: 99.90
    }
  ];

  const categories = [
    { id: 'all', label: 'All Providers', count: 6 },
    { id: 'kyb', label: 'KYB', count: 3 },
    { id: 'aml', label: 'AML', count: 1 },
    { id: 'facial', label: 'Facial Verification', count: 1 },
    { id: 'identity', label: 'Identity', count: 1 }
  ];

  const filteredProviders = providers.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider Marketplace</h2>
        <p className="text-gray-600">Discover and integrate trusted service providers</p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{provider.logo}</span>
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {provider.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  className={
                    provider.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {provider.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{provider.description}</p>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {provider.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Uptime</p>
                  <p className="text-sm font-semibold text-gray-900">{provider.uptime}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Pricing</p>
                  <p className="text-sm font-semibold text-gray-900">{provider.pricing}</p>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => onSelectProvider(provider)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}