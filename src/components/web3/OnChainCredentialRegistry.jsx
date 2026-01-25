import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Copy, CheckCircle2, AlertCircle, Loader, ExternalLink, Gem } from 'lucide-react';
import { toast } from 'sonner';

export default function OnChainCredentialRegistry({ application }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredChains, setRegisteredChains] = useState([]);

  const supportedChains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', chainId: '0x1' },
    { id: 'polygon', name: 'Polygon', icon: '⬡', chainId: '0x89' },
    { id: 'base', name: 'Base', icon: '⊙', chainId: '0x2105' },
    { id: 'optimism', name: 'Optimism', icon: '◯', chainId: '0xa' }
  ];

  const handleRegisterCredential = async (chainId) => {
    if (!walletAddress.trim()) {
      toast.error('Please enter a wallet address');
      return;
    }

    setIsRegistering(true);
    try {
      const result = await base44.functions.invoke('registerOnChainCredential', {
        applicationId: application.id,
        walletAddress: walletAddress,
        chainId: chainId,
        lei: application.generated_lei,
        vlei: application.generated_vlei
      });

      toast.success(`Credential registered on ${supportedChains.find(c => c.id === chainId)?.name}`);
      setRegisteredChains([...registeredChains, { chainId, txHash: result.data.txHash, status: 'confirmed' }]);
    } catch (error) {
      toast.error('Failed to register credential');
    } finally {
      setIsRegistering(false);
    }
  };

  if (!application.generated_lei) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gem className="h-5 w-5" />
            On-Chain Credential Registry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Credentials must be issued first. Complete LEI/vLEI issuance to register on-chain.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gem className="h-5 w-5 text-purple-600" />
          Register Credentials On-Chain
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wallet Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Wallet Address</label>
          <Input
            type="text"
            placeholder="0x..."
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            disabled={isRegistering}
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500">Enter the wallet address where credentials will be registered</p>
        </div>

        {/* Chain Selection */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Select Blockchain Networks</p>
          <div className="grid grid-cols-2 gap-3">
            {supportedChains.map((chain) => {
              const isRegistered = registeredChains.some(r => r.chainId === chain.id);
              return (
                <button
                  key={chain.id}
                  onClick={() => !isRegistered && handleRegisterCredential(chain.id)}
                  disabled={isRegistering || !walletAddress.trim() || isRegistered}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    isRegistered
                      ? 'border-green-300 bg-green-50 cursor-default'
                      : 'border-purple-200 bg-white hover:border-purple-400 hover:bg-purple-50'
                  } ${isRegistering ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{chain.icon}</span>
                    <span className="font-semibold text-gray-900">{chain.name}</span>
                  </div>
                  {isRegistered ? (
                    <div className="flex items-center gap-1 text-xs text-green-700">
                      <CheckCircle2 className="h-3 w-3" />
                      Registered
                    </div>
                  ) : (
                    <span className="text-xs text-gray-600">Register</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Registered Credentials */}
        {registeredChains.length > 0 && (
          <div className="space-y-3 p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-green-900">Registered Credentials</p>
            <div className="space-y-2">
              {registeredChains.map((reg, idx) => {
                const chain = supportedChains.find(c => c.id === reg.chainId);
                return (
                  <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">{chain?.name}</span>
                    </div>
                    <a
                      href={`https://etherscan.io/tx/${reg.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="p-4 bg-purple-100 border-l-4 border-purple-600 rounded">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-purple-900">
              <p className="font-semibold mb-1">Immutable On-Chain Registry</p>
              <p>Registering credentials on-chain makes them verifiable across all Web3 applications and requires gas fees.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}