import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Link2, CheckCircle2, Zap } from 'lucide-react';

export default function CrossChainIdentityPanel({ user }) {
  const hasLEI = !!user?.lei;
  const hasVLEI = !!user?.oor_credential;
  
  const supportedChains = [
    { name: 'Ethereum', status: 'verified' },
    { name: 'Polygon', status: 'verified' },
    { name: 'Avalanche', status: 'verified' },
    { name: 'Arbitrum', status: 'verified' },
    { name: 'Optimism', status: 'verified' },
    { name: 'Base', status: 'verified' }
  ];

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          Cross-Chain Identity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {hasLEI ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Universal Identity Active</p>
                  <p className="text-xs text-gray-600">Blockchain-agnostic LEI credential</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <Zap className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="h-4 w-4 text-blue-700" />
                  <p className="text-sm font-semibold text-blue-900">Verified Across Networks</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {supportedChains.map((chain) => (
                    <div key={chain.name} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="text-gray-700">{chain.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1">Portability</p>
                  <p className="font-semibold text-gray-900">Full</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1">Web2 Compatible</p>
                  <p className="font-semibold text-green-700">Yes</p>
                </div>
              </div>

              {hasVLEI && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs font-semibold text-purple-900 mb-1">vLEI Enhancement</p>
                  <p className="text-xs text-gray-700">
                    Your vLEI credential adds cryptographic verification to your cross-chain identity
                  </p>
                </div>
              )}

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Manage Chain Integrations
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-blue-300 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Cross-Chain Identity Pending</h4>
              <p className="text-sm text-gray-600 mb-4">
                Complete LEI onboarding to unlock universal cross-chain identity
              </p>
              <Button variant="outline" className="border-blue-300">
                Get Started
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}