import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AlertTrendsChart({ data }) {
  if (!data) return null;

  // Format daily trends
  const dailyData = Object.entries(data.by_day || {}).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    alerts: count
  })).slice(-14); // Last 14 days

  const severityData = Object.entries(data.by_severity || {}).map(([severity, count]) => ({
    name: severity.charAt(0).toUpperCase() + severity.slice(1),
    value: count,
    fill: {
      low: '#3b82f6',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626'
    }[severity] || '#6b7280'
  }));

  const typeData = Object.entries(data.by_type || {}).map(([type, count]) => ({
    type,
    count
  }));

  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#dc2626', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Alerts</p>
            <p className="text-3xl font-bold">{data.total_alerts?.toLocaleString() || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Avg per Day</p>
            <p className="text-3xl font-bold">{data.avg_alerts_per_day || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Critical</p>
            <p className="text-3xl font-bold text-red-600">{data.by_severity?.critical || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
            <p className="text-3xl font-bold text-green-600">{data.alert_resolution_rate?.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Trend */}
      {dailyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Alert Trend (Last 14 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="#0066b3" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Severity Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {severityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No severity data</p>
            )}
          </CardContent>
        </Card>

        {/* Alert Types */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts by Type</CardTitle>
          </CardHeader>
          <CardContent>
            {typeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0066b3" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No alert type data</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}