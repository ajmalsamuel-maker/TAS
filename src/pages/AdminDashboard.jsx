import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Activity, Globe, Shield, TrendingUp, 
  AlertTriangle, CheckCircle2, Server
} from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ProvidersManagement from '../components/admin/ProvidersManagement';
import WorkflowsOverview from '../components/admin/WorkflowsOverview';
import TranslationsManagement from '../components/admin/TranslationsManagement';
import OnboardingApplications from '../components/admin/OnboardingApplications';
import UserManagement from '../components/admin/UserManagement';
import AuditLogsManagement from '../components/admin/AuditLogsManagement';

export default function AdminDashboard() {
  const { data: providers = [] } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.Provider.list(),
    initialData: []
  });

  const { data: workflows = [] } = useQuery({
    queryKey: ['workflows'],
    queryFn: () => base44.entities.Workflow.list(),
    initialData: []
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['aml-alerts'],
    queryFn: () => base44.entities.AMLAlert.list(),
    initialData: []
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['applications'],
    queryFn: () => base44.entities.OnboardingApplication.list(),
    initialData: []
  });

  const activeProviders = providers.filter(p => p.status === 'active').length;
  const completedWorkflows = workflows.filter(w => w.status === 'completed').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'new').length;
  const pendingApplications = applications.filter(a => a.status === 'submitted').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage TAS platform, providers, workflows, and translations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Providers"
            value={activeProviders}
            icon={Server}
            trend="+2 this month"
            bgColor="bg-blue-500"
          />
          <StatsCard
            title="Workflows Completed"
            value={completedWorkflows}
            icon={CheckCircle2}
            trend="+12% vs last week"
            bgColor="bg-green-500"
          />
          <StatsCard
            title="Critical Alerts"
            value={criticalAlerts}
            icon={AlertTriangle}
            bgColor="bg-red-500"
          />
          <StatsCard
            title="Pending Applications"
            value={pendingApplications}
            icon={Users}
            bgColor="bg-purple-500"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="bg-white border-2 border-blue-100 p-1">
            <TabsTrigger value="providers" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Providers
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Applications
            </TabsTrigger>
            <TabsTrigger value="workflows" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Workflows
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="translations" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Translations
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Audit Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers">
            <ProvidersManagement providers={providers} />
          </TabsContent>

          <TabsContent value="applications">
            <OnboardingApplications applications={applications} />
          </TabsContent>

          <TabsContent value="workflows">
            <WorkflowsOverview workflows={workflows} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="translations">
            <TranslationsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}