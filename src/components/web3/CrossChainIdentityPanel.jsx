import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Link2, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';

export default function CrossChainIdentityPanel({ application }) {
  const [linkedChains, setLinkedChains] = useState([]);
  const [isLinking, setIsLinking] = useState(false);

  const chains = [
    { id: 'ethereum', name: 'Ethereum', explorer: 'etherscan.io', status: 'verified' },
    { id: 'polygon', name: 'Polygon', explorer: 'polygonscan.com', status: 'verified' },
    { id: 'base', name: 'Base', explorer: 'basescan.org', status: 'verified' },
    { id: 'optimism', name: 'Optimism', explorer: 'optimistic.etherscan.io', status: 'verified' }
  ];

  const handleLinkChain = async (chainId) => {
    setIsLinking(true);
    try {
      await base44.functions.invoke('linkCrossChainIdentity', {
        applicationId: application.id,
        chainId: chainId,
        lei: application.generated_lei
      });

      setLinkedChains([...linkedChains, chainId]);
      toast.success(`Identity linked to ${chains.find(c => c.id === chainId)?.name}`);
    } catch (error) {
      toast.error('Failed to link identity');
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <Card className="border-2 border-indigo-200 bg-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-indigo-600" />
          Cross-Chain Identity Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-gray-700">
          Link your LEI across multiple blockchains for universal verification and compliance proof.
        </p>

        {/* Available Chains */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-900">Available Networks</p>
          <div className="grid gap-3">
            {chains.map((chain) => {
              const isLinked = linkedChains.includes(chain.id);
              return (
                <div
                  key={chain.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    isLinked
                      ? 'border-green-300 bg-green-50'
                      : 'border-indigo-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{chain.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{chain.explorer}</p>
                    </div>
                    {isLinked ? (
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Linked</span>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleLinkChain(chain.id)}
                        disabled={isLinking}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        {isLinking ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          'Link'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Status */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
          <p className="text-sm font-semibold text-gray-900">Identity Verification Status</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">LEI Validity</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">KYB Status</span>
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">AML Screening</span>
              <Badge className="bg-green-100 text-green-800">Passed</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Linked Chains</span>
              <Badge variant="outline">{linkedChains.length}/{chains.length}</Badge>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2 p-4 bg-indigo-100 border-l-4 border-indigo-600 rounded">
          <p className="font-semibold text-indigo-900 text-sm">Cross-Chain Verification Benefits</p>
          <ul className="text-sm text-indigo-800 space-y-1 list-disc list-inside">
            <li>Single identity across all chains</li>
            <li>Unified compliance verification</li>
            <li>Streamlined DeFi access</li>
            <li>Portable reputation score</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}