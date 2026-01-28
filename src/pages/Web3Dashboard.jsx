import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Boxes, Sparkles } from 'lucide-react';
import DAOIdentityPanel from '../components/web3/DAOIdentityPanel';
import DeFiCompliancePanel from '../components/web3/DeFiCompliancePanel';
import CrossChainIdentityPanel from '../components/web3/CrossChainIdentityPanel';
import NFTAuthenticationPanel from '../components/web3/NFTAuthenticationPanel';
import WalletConnect from '../components/web3/WalletConnect';
import CredentialIssuer from '../components/web3/CredentialIssuer';

export default function Web3Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me()
  });

  const { data: organization } = useQuery({
    queryKey: ['user-organization', user?.organization_id],
    queryFn: async () => {
      if (!user?.organization_id) return null;
      const orgs = await base44.entities.Organization.filter({ id: user.organization_id });
      return orgs[0];
    },
    enabled: !!user?.organization_id
  });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Boxes className="h-8 sm:h-10 w-8 sm:w-10 text-[#0044CC]" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Web3 Operations</h1>
          </div>
          <p className="text-xs sm:text-base text-gray-600">Manage DAO identity, DeFi compliance, cross-chain credentials, and NFT authentication</p>
        </div>

        {/* W3C Standards Banner */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-200 bg-gradient-to-r from-[#0044CC]/5 via-blue-50 to-slate-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">W3C Standards Compliant</h3>
                <p className="text-sm text-gray-700 mb-3">
                  TAS bridges traditional LEI-based legal identity with W3C-compliant decentralized identity standards
                </p>
                <div className="flex flex-wrap gap-2">
                       <Badge className="bg-[#0044CC]/10 text-[#0044CC]">Decentralized Identifiers (DIDs)</Badge>
                       <Badge className="bg-[#002D66]/10 text-[#002D66]">Verifiable Credentials (VCs)</Badge>
                       <Badge className="bg-blue-100 text-blue-800">KERI/ACDC Protocols</Badge>
                       <Badge className="bg-blue-100 text-blue-800">ISO 17442 LEI</Badge>
                     </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="wallets" className="space-y-4 sm:space-y-6">
          <div className="bg-white border-2 border-blue-100 rounded-lg p-1 overflow-x-auto">
            <TabsList className="bg-white flex-wrap h-auto w-max sm:w-auto sm:grid sm:grid-cols-3 gap-1">
              <TabsTrigger value="wallets" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
                Wallets & DIDs
              </TabsTrigger>
              <TabsTrigger value="credentials" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
                Credential Issuer
              </TabsTrigger>
              <TabsTrigger value="dao" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
                DAO Identity
              </TabsTrigger>
              <TabsTrigger value="defi" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
                DeFi Compliance
              </TabsTrigger>
              <TabsTrigger value="crosschain" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
                Cross-Chain
              </TabsTrigger>
              <TabsTrigger value="nft" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
                NFT Auth
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="wallets">
            <WalletConnect user={user} />
          </TabsContent>

          <TabsContent value="credentials">
            <CredentialIssuer organization={organization} />
          </TabsContent>

          <TabsContent value="dao">
            <DAOIdentityPanel user={user} />
          </TabsContent>

          <TabsContent value="defi">
            <DeFiCompliancePanel workflows={workflows} alerts={alerts} />
          </TabsContent>

          <TabsContent value="crosschain">
            <CrossChainIdentityPanel user={user} />
          </TabsContent>

          <TabsContent value="nft">
            <NFTAuthenticationPanel user={user} />
          </TabsContent>
        </Tabs>

        {/* TAS Integrated Services Banner */}
        <Card className="mt-6 sm:mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader className="border-b-2 border-green-200 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">TAS Integrated Services</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm text-gray-700 mb-4">
              All Web3 operations are powered by TAS-integrated service providers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-2 sm:p-3 border border-green-200">
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">LEI & vLEI Issuance</p>
                <p className="text-xs text-gray-600 mt-1">Powered by Certizen</p>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3 border border-green-200">
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">AML/KYB Verification</p>
                <p className="text-xs text-gray-600 mt-1">Powered by FTS.Money</p>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3 border border-green-200">
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">Compliance Monitoring</p>
                <p className="text-xs text-gray-600 mt-1">Integrated via TAS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Architecture */}
        <Card className="mt-4 sm:mt-6 border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Technical Architecture</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-purple-100">
                <h4 className="font-bold text-purple-900 mb-2 text-sm sm:text-base">Identity Layer</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  LEI-based legal identity with W3C DID/VC compliance
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• ISO 17442 LEI standard</li>
                  <li>• GLEIF vLEI credentials</li>
                  <li>• Self-sovereign identity</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2 text-sm sm:text-base">Cryptographic Trust</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  KERI/ACDC protocols for verification
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Key Event Receipt Infrastructure</li>
                  <li>• Authentic Chained Data Containers</li>
                  <li>• Immutable audit trails</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-green-100">
                <h4 className="font-bold text-green-900 mb-2 text-sm sm:text-base">Interoperability</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
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