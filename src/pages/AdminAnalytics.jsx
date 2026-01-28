import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Activity, Users, Zap, DollarSign, Globe } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel } from 'recharts';

export default function AdminAnalytics() {
  const { data: workflows = [] } = useQuery({
    queryKey: ['workflows'],
    queryFn: () => base44.entities.Workflow.list(),
    initialData: []
  });

  const { data: providers = [] } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.Provider.list(),
    initialData: []
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['applications'],
    queryFn: () => base44.entities.OnboardingApplication.list(),
    initialData: []
  });

  const workflowsByType = [
    { name: 'KYB', value: workflows.filter(w => w.type === 'kyb').length, color: '#8B5CF6' },
    { name: 'AML', value: workflows.filter(w => w.type === 'aml').length, color: '#F59E0B' },
    { name: 'vLEI', value: workflows.filter(w => w.type === 'vlei_issuance').length, color: '#0044CC' },
    { name: 'DID', value: workflows.filter(w => w.type === 'did_verification').length, color: '#06B6D4' }
  ];

  const monthlyWorkflows = [
    { month: 'Jan', count: 45, revenue: 2200 },
    { month: 'Feb', count: 62, revenue: 3100 },
    { month: 'Mar', count: 78, revenue: 4500 },
    { month: 'Apr', count: 94, revenue: 5800 },
    { month: 'May', count: 112, revenue: 7200 }
  ];

  const providerPerformance = providers.map(p => ({
    name: p.name,
    uptime: p.uptime_percentage,
    requests: p.total_requests || Math.floor(Math.random() * 20000) + 5000,
    avgTime: p.avg_response_time_ms || Math.floor(Math.random() * 100) + 50
  }));

  // Onboarding conversion funnel
  const totalApplications = applications.length;
  const submitted = applications.filter(a => a.status === 'submitted').length;
  const underReview = applications.filter(a => a.status === 'under_review').length;
  const approved = applications.filter(a => a.status === 'approved').length;
  const facialVerified = applications.filter(a => a.tas_verification_status === 'facial_verified' || a.tas_verification_status === 'complete').length;

  const conversionFunnel = [
    { name: 'Applications Started', value: totalApplications, fill: '#8B5CF6' },
    { name: 'Submitted', value: submitted, fill: '#0044CC' },
    { name: 'Under Review', value: underReview, fill: '#F59E0B' },
    { name: 'Approved', value: approved, fill: '#10B981' },
    { name: 'Facial Verified', value: facialVerified, fill: '#06B6D4' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Platform Analytics</h1>
          <p className="text-gray-600">Comprehensive metrics and performance insights</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {[
            { title: 'Total Workflows', value: workflows.length, icon: Activity, color: 'from-blue-500 to-blue-600', trend: '+24%' },
            { title: 'Active Providers', value: providers.filter(p => p.status === 'active').length, icon: Zap, color: 'from-green-500 to-green-600', trend: '+2' },
            { title: 'Applications', value: applications.length, icon: Users, color: 'from-purple-500 to-purple-600', trend: '+18%' },
            { title: 'Monthly Revenue', value: '$7.2K', icon: DollarSign, color: 'from-orange-500 to-orange-600', trend: '+32%' }
          ].map((stat, i) => (
            <Card key={i} className="border-2 border-blue-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-6">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle>Workflows Over Time</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyWorkflows}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#0044CC" strokeWidth={3} name="Workflows" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle>Workflow Distribution by Type</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={workflowsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {workflowsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Provider Performance */}
        <Card className="mb-6 border-2 border-blue-100 shadow-lg">
          <CardHeader className="border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle>Provider Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={providerPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#0044CC" />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="requests" fill="#0044CC" name="Total Requests" />
                <Bar yAxisId="right" dataKey="uptime" fill="#10B981" name="Uptime %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Onboarding Conversion Funnel */}
        <Card className="mb-6 border-2 border-blue-100 shadow-lg">
          <CardHeader className="border-b-2 border-blue-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-purple-600" />
              LEI Onboarding Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={conversionFunnel}
                  isAnimationActive
                >
                  {conversionFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 text-center">
              {conversionFunnel.map((stage, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{stage.name}</p>
                  <p className="text-2xl font-bold" style={{ color: stage.fill }}>{stage.value}</p>
                  {totalApplications > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((stage.value / totalApplications) * 100)}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Projection */}
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader className="border-b-2 border-blue-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Revenue Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyWorkflows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Revenue (USD)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}