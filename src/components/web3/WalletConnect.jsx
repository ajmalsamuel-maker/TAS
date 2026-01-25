import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Wallet, Link as LinkIcon, CheckCircle, XCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

const WALLET_TYPES = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '💼' },
  { id: 'phantom', name: 'Phantom', icon: '👻' }
];

const DID_METHODS = [
  { id: 'did:ethr', name: 'Ethereum DID', description: 'Ethereum-based decentralized identifier' },
  { id: 'did:web', name: 'Web DID', description: 'Domain-based DID' },
  { id: 'did:key', name: 'Key DID', description: 'Cryptographic key-based DID' },
  { id: 'did:ion', name: 'ION DID', description: 'Bitcoin-anchored DID' }
];

export default function WalletConnect({ user }) {
  const [showConnect, setShowConnect] = useState(false);
  const [customDID, setCustomDID] = useState('');
  const [selectedDIDMethod, setSelectedDIDMethod] = useState('did:ethr');
  const queryClient = useQueryClient();

  const { data: connections = [] } = useQuery({
    queryKey: ['web3-connections', user?.id],
    queryFn: async () => {
      const userData = await base44.auth.me();
      return userData.web3_connections || [];
    },
    enabled: !!user
  });

  const connectWalletMutation = useMutation({
    mutationFn: async ({ walletType, address }) => {
      const userData = await base44.auth.me();
      const existing = userData.web3_connections || [];
      
      await base44.auth.updateMe({
        web3_connections: [...existing, {
          id: `${walletType}_${Date.now()}`,
          type: 'wallet',
          provider: walletType,
          address,
          connectedAt: new Date().toISOString(),
          verified: false
        }]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['web3-connections']);
      toast.success('Wallet connected successfully');
      setShowConnect(false);
    }
  });

  const connectDIDMutation = useMutation({
    mutationFn: async ({ did, method }) => {
      const userData = await base44.auth.me();
      const existing = userData.web3_connections || [];
      
      await base44.auth.updateMe({
        web3_connections: [...existing, {
          id: `did_${Date.now()}`,
          type: 'did',
          did,
          method,
          connectedAt: new Date().toISOString(),
          verified: false
        }]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['web3-connections']);
      toast.success('DID connected successfully');
      setCustomDID('');
    }
  });

  const disconnectMutation = useMutation({
    mutationFn: async (connectionId) => {
      const userData = await base44.auth.me();
      const updated = (userData.web3_connections || []).filter(c => c.id !== connectionId);
      await base44.auth.updateMe({ web3_connections: updated });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['web3-connections']);
      toast.success('Connection removed');
    }
  });

  const simulateWalletConnect = async (walletType) => {
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    await connectWalletMutation.mutateAsync({ walletType, address: mockAddress });
  };

  const handleConnectDID = () => {
    if (!customDID) {
      toast.error('Please enter a DID');
      return;
    }
    connectDIDMutation.mutate({ did: customDID, method: selectedDIDMethod });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connected Wallets & DIDs
          </CardTitle>
          <Button size="sm" onClick={() => setShowConnect(!showConnect)}>
            <LinkIcon className="h-4 w-4 mr-1" />
            Connect New
          </Button>
        </CardHeader>
        <CardContent>
          {connections.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No wallets or DIDs connected</p>
              <p className="text-xs mt-1">Connect your Web3 identity to unlock features</p>
            </div>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {conn.type === 'wallet' ? conn.provider : conn.method}
                      </span>
                      <Badge variant={conn.verified ? 'default' : 'secondary'} className="text-xs">
                        {conn.verified ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {conn.verified ? 'Verified' : 'Unverified'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {conn.type === 'wallet' ? conn.address?.slice(0, 16) + '...' : conn.did?.slice(0, 30) + '...'}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(conn.type === 'wallet' ? conn.address : conn.did)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Connected {new Date(conn.connectedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => disconnectMutation.mutate(conn.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showConnect && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-base">Connect Wallet or DID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Connect Wallet</h3>
              <div className="grid grid-cols-2 gap-3">
                {WALLET_TYPES.map(wallet => (
                  <button
                    key={wallet.id}
                    onClick={() => simulateWalletConnect(wallet.id)}
                    className="p-4 border rounded-lg hover:bg-white hover:shadow-md transition-all text-left"
                  >
                    <div className="text-2xl mb-2">{wallet.icon}</div>
                    <p className="text-sm font-medium">{wallet.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm font-medium mb-3">Connect Existing DID</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">DID Method</label>
                  <select
                    value={selectedDIDMethod}
                    onChange={(e) => setSelectedDIDMethod(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                  >
                    {DID_METHODS.map(method => (
                      <option key={method.id} value={method.id}>
                        {method.name} - {method.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">DID String</label>
                  <Input
                    value={customDID}
                    onChange={(e) => setCustomDID(e.target.value)}
                    placeholder="did:ethr:0x1234..."
                    className="text-sm"
                  />
                </div>
                <Button onClick={handleConnectDID} className="w-full">
                  Connect DID
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}