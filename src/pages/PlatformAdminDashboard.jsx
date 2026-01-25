import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Server, Users, Shield } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import OrganizationManagement from '../components/admin/OrganizationManagement';
import ProvidersManagement from '../components/admin/ProvidersManagement';
import AuditLogsManagement from '../components/admin/AuditLogsManagement';

export default function PlatformAdminDashboard() {
  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list(),
    initialData: []
  });

  const { data: providers = [] } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.Provider.list(),
    initialData: []
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    initialData: []
  });

  const activeOrgs = organizations.filter(o => o.is_active && o.subscription_status === 'active').length;
  const totalUsers = users.length;
  const activeProviders = providers.filter(p => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Platform Administration</h1>
          <p className="text-gray-600">Manage the TAS platform, organizations, and system settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Organizations"
            value={activeOrgs}
            icon={Building2}
            bgColor="bg-blue-500"
          />
          <StatsCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
            bgColor="bg-green-500"
          />
          <StatsCard
            title="Active Providers"
            value={activeProviders}
            icon={Server}
            bgColor="bg-purple-500"
          />
          <StatsCard
            title="Platform Status"
            value="Healthy"
            icon={Shield}
            bgColor="bg-emerald-500"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList className="bg-white border-2 border-blue-100 p-1">
            <TabsTrigger value="organizations" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Organizations
            </TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Platform Providers
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              System Audit Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organizations">
            <OrganizationManagement />
          </TabsContent>

          <TabsContent value="providers">
            <ProvidersManagement providers={providers} />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLogsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}