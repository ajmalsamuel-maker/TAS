import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Boxes, Sparkles } from 'lucide-react';
import DAOIdentityPanel from '../components/web3/DAOIdentityPanel';
import DeFiCompliancePanel from '../components/web3/DeFiCompliancePanel';
import CrossChainIdentityPanel from '../components/web3/CrossChainIdentityPanel';
import NFTAuthenticationPanel from '../components/web3/NFTAuthenticationPanel';

export default function Web3Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: workflows = [] } = useQuery({
    queryKey: ['user-workflows'],
    queryFn: () => base44.entities.Workflow.filter({ user_id: user?.id }),
    enabled: !!user,
    initialData: []
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['user-alerts'],
    queryFn: () => base44.entities.AMLAlert.filter({ user_id: user?.id }),
    enabled: !!user,
    initialData: []
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Boxes className="h-10 w-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Web3 Operations</h1>
          </div>
          <p className="text-gray-600">Manage DAO identity, DeFi compliance, cross-chain credentials, and NFT authentication</p>
        </div>

        {/* W3C Standards Banner */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">W3C Standards Compliant</h3>
                <p className="text-sm text-gray-700 mb-3">
                  TAS bridges traditional LEI-based legal identity with W3C-compliant decentralized identity standards
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Decentralized Identifiers (DIDs)</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Verifiable Credentials (VCs)</Badge>
                  <Badge className="bg-indigo-100 text-indigo-800">KERI/ACDC Protocols</Badge>
                  <Badge className="bg-green-100 text-green-800">ISO 17442 LEI</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <DAOIdentityPanel user={user} />
          <DeFiCompliancePanel workflows={workflows} alerts={alerts} />
          <CrossChainIdentityPanel user={user} />
          <NFTAuthenticationPanel user={user} />
        </div>

        {/* Technical Architecture */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
            <CardTitle>Technical Architecture</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 border-2 border-purple-100">
                <h4 className="font-bold text-purple-900 mb-2">Identity Layer</h4>
                <p className="text-sm text-gray-600 mb-3">
                  LEI-based legal identity with W3C DID/VC compliance
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• ISO 17442 LEI standard</li>
                  <li>• GLEIF vLEI credentials</li>
                  <li>• Self-sovereign identity</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Cryptographic Trust</h4>
                <p className="text-sm text-gray-600 mb-3">
                  KERI/ACDC protocols for verification
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Key Event Receipt Infrastructure</li>
                  <li>• Authentic Chained Data Containers</li>
                  <li>• Immutable audit trails</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-green-100">
                <h4 className="font-bold text-green-900 mb-2">Interoperability</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Universal identity across Web2 and Web3
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Blockchain-agnostic</li>
                  <li>• Cross-chain compatible</li>
                  <li>• Traditional system integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}