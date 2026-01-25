import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Shield, Users } from 'lucide-react';

const COLORS = ['#0044CC', '#0066B3', '#00AAFF', '#66CCFF', '#FF6B6B', '#FFA500'];

export default function MetricsOverview({ data }) {
  // Workflow Status Distribution
  const workflowStatusData = [
    { name: 'Completed', value: data.workflows.filter(w => w.status === 'completed').length },
    { name: 'In Progress', value: data.workflows.filter(w => w.status === 'in_progress').length },
    { name: 'Pending', value: data.workflows.filter(w => w.status === 'pending').length },
    { name: 'Failed', value: data.workflows.filter(w => w.status === 'failed').length }
  ];

  // Transaction Risk Distribution
  const transactionRiskData = [
    { name: 'Low', value: data.transactions.filter(t => t.risk_level === 'low').length },
    { name: 'Medium', value: data.transactions.filter(t => t.risk_level === 'medium').length },
    { name: 'High', value: data.transactions.filter(t => t.risk_level === 'high').length },
    { name: 'Critical', value: data.transactions.filter(t => t.risk_level === 'critical').length }
  ];

  // AML Alert Trends (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const alertTrendData = getLast7Days().map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    alerts: data.alerts.filter(a => a.created_date?.startsWith(date)).length,
    fraud: data.fraudAlerts.filter(f => f.created_date?.startsWith(date)).length
  }));

  // Case Resolution Time
  const caseResolutionData = [
    { timeRange: '< 1 day', count: data.cases.filter(c => c.time_to_resolve_hours && c.time_to_resolve_hours < 24).length },
    { timeRange: '1-3 days', count: data.cases.filter(c => c.time_to_resolve_hours && c.time_to_resolve_hours >= 24 && c.time_to_resolve_hours < 72).length },
    { timeRange: '3-7 days', count: data.cases.filter(c => c.time_to_resolve_hours && c.time_to_resolve_hours >= 72 && c.time_to_resolve_hours < 168).length },
    { timeRange: '> 7 days', count: data.cases.filter(c => c.time_to_resolve_hours && c.time_to_resolve_hours >= 168).length }
  ];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Success Rate</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">
                  {data.workflows.length > 0 
                    ? Math.round((data.workflows.filter(w => w.status === 'completed').length / data.workflows.length) * 100)
                    : 0}%
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Clean Transactions</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {data.transactions.length > 0
                    ? Math.round((data.transactions.filter(t => t.status === 'approved').length / data.transactions.length) * 100)
                    : 0}%
                </p>
              </div>
              <Activity className="h-10 w-10 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Alert Response</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">
                  {data.alerts.length > 0
                    ? Math.round((data.alerts.filter(a => a.status !== 'new').length / data.alerts.length) * 100)
                    : 0}%
                </p>
              </div>
              <Shield className="h-10 w-10 text-orange-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Onboarded</p>
                <p className="text-3xl font-bold text-purple-900 mt-1">
                  {data.applications.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <Users className="h-10 w-10 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workflow Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workflowStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workflowStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transaction Risk Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionRiskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0044CC" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alert Trends (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alerts" stroke="#0044CC" name="AML Alerts" />
                <Line type="monotone" dataKey="fraud" stroke="#FF6B6B" name="Fraud Alerts" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseResolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeRange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0066B3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}