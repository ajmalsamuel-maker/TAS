import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Shield, Zap } from 'lucide-react';

export default function MetricsOverview({ metrics }) {
  const monthlyData = [
    { month: 'Jan', applications: 45, completed: 38, approved: 35 },
    { month: 'Feb', applications: 52, completed: 48, approved: 45 },
    { month: 'Mar', applications: 58, completed: 55, approved: 52 },
    { month: 'Apr', applications: 65, completed: 62, approved: 60 },
    { month: 'May', applications: 72, completed: 70, approved: 68 },
    { month: 'Jun', applications: 85, completed: 81, approved: 78 }
  ];

  const kpiMetrics = [
    { label: 'Total Applications', value: metrics?.totalApplications || 412, icon: Users, color: 'bg-blue-500' },
    { label: 'Approval Rate', value: `${metrics?.approvalRate || 85}%`, icon: Shield, color: 'bg-green-500' },
    { label: 'Avg Processing Time', value: metrics?.avgProcessingTime || '2.3 days', icon: Zap, color: 'bg-purple-500' },
    { label: 'Compliance Score', value: `${metrics?.complianceScore || 94}%`, icon: TrendingUp, color: 'bg-amber-500' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {kpiMetrics.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="border-l-4" style={{ borderLeftColor: kpi.color.replace('bg-', '') }}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                  </div>
                  <div className={`${kpi.color} p-3 rounded-lg text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Application Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Application Processing Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#0044CC" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compliance Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { status: 'Draft', count: 45, fill: '#6B7280' },
              { status: 'Submitted', count: 78, fill: '#3B82F6' },
              { status: 'Under Review', count: 92, fill: '#FBBF24' },
              { status: 'Approved', count: 156, fill: '#10B981' },
              { status: 'Rejected', count: 41, fill: '#EF4444' }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0044CC" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Profile Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Low Risk</span>
            <div className="flex items-center gap-2 flex-1 ml-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
              <span className="text-sm font-semibold">65%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Medium Risk</span>
            <div className="flex items-center gap-2 flex-1 ml-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-sm font-semibold">25%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">High Risk</span>
            <div className="flex items-center gap-2 flex-1 ml-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }} />
              </div>
              <span className="text-sm font-semibold">10%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}