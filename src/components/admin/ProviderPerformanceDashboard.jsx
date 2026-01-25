import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Zap } from 'lucide-react';

export default function ProviderPerformanceDashboard({ providers = [] }) {
  const performanceData = [
    { provider: 'Certizen', uptime: 99.98, responseTime: 245 },
    { provider: 'FTS AML', uptime: 99.95, responseTime: 312 },
    { provider: 'FTS KYB', uptime: 99.92, responseTime: 378 },
    { provider: 'FACIA', uptime: 99.88, responseTime: 156 },
    { provider: 'Onfido', uptime: 99.85, responseTime: 423 }
  ];

  const uptimeHistory = [
    { date: 'Jan 20', uptime: 99.9 },
    { date: 'Jan 21', uptime: 99.92 },
    { date: 'Jan 22', uptime: 99.94 },
    { date: 'Jan 23', uptime: 99.96 },
    { date: 'Jan 24', uptime: 99.95 },
    { date: 'Jan 25', uptime: 99.97 }
  ];

  const getStatusColor = (uptime) => {
    if (uptime >= 99.9) return 'bg-green-100 text-green-800';
    if (uptime >= 99.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Provider Health Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        {performanceData.map((p, idx) => (
          <Card key={idx} className="border-l-4 border-blue-500">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-2">{p.provider}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Uptime</p>
                  <p className="text-lg font-bold text-gray-900">{p.uptime}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Response</p>
                  <p className="text-sm font-semibold text-gray-700">{p.responseTime}ms</p>
                </div>
                <Badge className={`text-xs ${getStatusColor(p.uptime)}`}>
                  {p.uptime >= 99.9 ? 'Excellent' : 'Good'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Uptime Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Provider Uptime Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="provider" angle={-45} textAnchor="end" height={100} />
              <YAxis domain={[99.8, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="uptime" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Response Time Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Average Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData.sort((a, b) => a.responseTime - b.responseTime)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="provider" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}ms`} />
              <Bar dataKey="responseTime" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Uptime History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Platform Uptime Trend (6 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={uptimeHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[99.8, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="uptime" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* SLA Status */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
            <span className="text-sm font-medium text-gray-900">Monthly Uptime Target</span>
            <Badge className="bg-green-100 text-green-800">99.5% ✓</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
            <span className="text-sm font-medium text-gray-900">Current Month Performance</span>
            <Badge className="bg-green-100 text-green-800">99.95% (Exceeded)</Badge>
          </div>
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded">
            All integrated providers are meeting or exceeding SLA commitments. No incidents reported in the last 30 days.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}