import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, CheckCircle2, AlertTriangle, Clock,
  TrendingUp, FileText, Globe, Key
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/dashboard/StatsCard';
import AMLAlertsPanel from '../components/user/AMLAlertsPanel';
import WorkflowStatusPanel from '../components/user/WorkflowStatusPanel';

export default function UserDashboard() {
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

  const completedWorkflows = workflows.filter(w => w.status === 'completed').length;
  const activeAlerts = alerts.filter(a => a.status === 'new').length;
  const complianceScore = workflows.length > 0 ? Math.round((completedWorkflows / workflows.length) * 100) : 100;

  const monthlyData = [
    { month: 'Jan', workflows: 12, alerts: 2 },
    { month: 'Feb', workflows: 18, alerts: 1 },
    { month: 'Mar', workflows: 24, alerts: 3 },
    { month: 'Apr', workflows: 31, alerts: 1 },
    { month: 'May', workflows: 28, alerts: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name || 'User'}
          </h1>
          <p className="text-gray-600">Your compliance dashboard and trust services overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Compliance Score"
            value={`${complianceScore}%`}
            icon={Shield}
            trend="Excellent"
            bgColor="bg-green-500"
          />
          <StatsCard
            title="Workflows Completed"
            value={completedWorkflows}
            icon={CheckCircle2}
            trend="+8 this month"
            bgColor="bg-blue-500"
          />
          <StatsCard
            title="Active Alerts"
            value={activeAlerts}
            icon={AlertTriangle}
            bgColor="bg-yellow-500"
          />
          <StatsCard
            title="LEI Status"
            value={user?.lei ? 'Active' : 'Pending'}
            icon={Key}
            bgColor="bg-purple-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle>Workflow Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="workflows" stroke="#0044CC" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle>AML Alerts by Month</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="alerts" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Credentials Card */}
        <Card className="mb-8 border-2 border-blue-100 shadow-lg bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-[#0044CC]" />
              Your Credentials & Trust Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Legal Entity Identifier</p>
                <p className="font-mono text-lg font-bold text-gray-900">
                  {user?.lei || 'Pending issuance'}
                </p>
                <Badge className="mt-2" variant={user?.lei ? 'default' : 'secondary'}>
                  {user?.lei ? 'Active' : 'Processing'}
                </Badge>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">vLEI Credential (OOR)</p>
                <p className="font-medium text-gray-900">
                  {user?.oor_credential ? 'Issued' : 'Not issued'}
                </p>
                {user?.oor_credential && (
                  <p className="text-xs text-gray-500 mt-1">Official Organizational Role</p>
                )}
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Preferred Language</p>
                <p className="font-medium text-gray-900">
                  {user?.preferred_language?.toUpperCase() || 'EN'}
                </p>
                <Globe className="h-4 w-4 text-gray-400 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflows and Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <WorkflowStatusPanel workflows={workflows} />
          <AMLAlertsPanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
}