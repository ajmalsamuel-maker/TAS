import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, Shield, Globe, Image, TrendingUp, 
  Users, Activity, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Web3Analytics() {
  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list(),
    initialData: []
  });

  const { data: workflows = [] } = useQuery({
    queryKey: ['all-workflows'],
    queryFn: () => base44.entities.Workflow.list(),
    initialData: []
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['applications'],
    queryFn: () => base44.entities.OnboardingApplication.list(),
    initialData: []
  });

  // Calculate Web3 metrics
  const orgsWithLEI = applications.filter(app => app.generated_lei).length;
  const orgsWithVLEI = applications.filter(app => app.vlei_credential).length;
  const didWorkflows = workflows.filter(w => w.type === 'did_verification').length;
  const credentialWorkflows = workflows.filter(w => w.type === 'credential_verification').length;
  const vleiIssuances = workflows.filter(w => w.type === 'vlei_issuance').length;

  const daoReadyOrgs = orgsWithLEI;
  const defiCompliantOrgs = applications.filter(app => 
    app.status === 'approved' && app.tas_verification_status === 'complete'
  ).length;

  // Charts data
  const chainDistribution = [
    { name: 'Ethereum', value: 45 },
    { name: 'Polygon', value: 28 },
    { name: 'Avalanche', value: 15 },
    { name: 'Arbitrum', value: 12 }
  ];

  const monthlyWeb3Activity = [
    { month: 'Sep', did: 12, vlei: 8, nft: 5 },
    { month: 'Oct', did: 18, vlei: 12, nft: 7 },
    { month: 'Nov', did: 24, vlei: 16, nft: 10 },
    { month: 'Dec', did: 31, vlei: 22, nft: 14 },
    { month: 'Jan', did: 38, vlei: 28, nft: 18 }
  ];

  const COLORS = ['#0044CC', '#7C3AED', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-2 border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{daoReadyOrgs}</p>
            <p className="text-sm text-gray-600">DAO-Ready Organizations</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-5 w-5 text-cyan-600" />
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{defiCompliantOrgs}</p>
            <p className="text-sm text-gray-600">DeFi Compliant</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{didWorkflows}</p>
            <p className="text-sm text-gray-600">DID Verifications</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Image className="h-5 w-5 text-indigo-600" />
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{vleiIssuances}</p>
            <p className="text-sm text-gray-600">vLEI Issuances</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle>Web3 Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyWeb3Activity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="did" stroke="#0044CC" strokeWidth={2} name="DID Verifications" />
                <Line type="monotone" dataKey="vlei" stroke="#7C3AED" strokeWidth={2} name="vLEI Issuances" />
                <Line type="monotone" dataKey="nft" stroke="#10B981" strokeWidth={2} name="NFT Auth" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle>Cross-Chain Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chainDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chainDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <Tabs defaultValue="dao" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dao">DAO Identities</TabsTrigger>
          <TabsTrigger value="defi">DeFi Compliance</TabsTrigger>
          <TabsTrigger value="chains">Cross-Chain</TabsTrigger>
          <TabsTrigger value="nft">NFT Auth</TabsTrigger>
        </TabsList>

        <TabsContent value="dao">
          <Card>
            <CardHeader>
              <CardTitle>DAO Legal Identities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.filter(app => app.generated_lei).slice(0, 10).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <p className="font-semibold text-gray-900">{app.legal_name}</p>
                      <p className="text-sm text-gray-600 font-mono">{app.generated_lei}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                      {app.vlei_credential && (
                        <Badge className="bg-purple-100 text-purple-800">vLEI</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {applications.filter(app => app.generated_lei).length === 0 && (
                  <p className="text-center text-gray-500 py-8">No DAO identities issued yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defi">
          <Card>
            <CardHeader>
              <CardTitle>DeFi Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {organizations.slice(0, 10).map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <div>
                      <p className="font-semibold text-gray-900">{org.name}</p>
                      <p className="text-sm text-gray-600">{org.organization_type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        Compliant
                      </Badge>
                      <Badge variant="outline">KYB+AML</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chains">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Chain Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {chainDistribution.map((chain, idx) => (
                  <div key={chain.name} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{chain.name}</p>
                      <Badge className="bg-blue-100 text-blue-800">{chain.value} orgs</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Universal identity active</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft">
          <Card>
            <CardHeader>
              <CardTitle>NFT Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Image className="h-16 w-16 text-indigo-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">NFT Authentication Ready</p>
                <p className="text-sm text-gray-600 mb-4">
                  Organizations with vLEI credentials can authenticate NFT collections
                </p>
                <div className="flex justify-center gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <p className="text-2xl font-bold text-indigo-900">{orgsWithVLEI}</p>
                    <p className="text-sm text-gray-600">Organizations Ready</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <p className="text-2xl font-bold text-indigo-900">0</p>
                    <p className="text-sm text-gray-600">NFTs Authenticated</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}