import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ScreeningPerformanceChart({ data }) {
  if (!data) return null;

  const performanceData = [
    { name: 'Approved', value: data.approved, fill: '#10b981' },
    { name: 'Blocked', value: data.blocked, fill: '#ef4444' },
    { name: 'Flagged', value: data.flagged, fill: '#f59e0b' }
  ];

  const trendData = [
    { name: 'Total', value: data.total_transactions },
    { name: 'Approved', value: data.approved },
    { name: 'Blocked', value: data.blocked },
    { name: 'Flagged', value: data.flagged }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Stats Cards */}
      <div className="md:col-span-2 grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-3xl font-bold">{data.total_transactions?.toLocaleString() || 0}</p>
            <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
            <p className="text-3xl font-bold text-green-600">{data.approval_rate}%</p>
            <p className="text-xs text-gray-500 mt-2">{data.approved?.toLocaleString()} approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Block Rate</p>
            <p className="text-3xl font-bold text-red-600">{data.block_rate}%</p>
            <p className="text-xs text-gray-500 mt-2">{data.blocked?.toLocaleString()} blocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">High Risk</p>
            <p className="text-3xl font-bold text-orange-600">{data.high_risk_rate}%</p>
            <p className="text-xs text-gray-500 mt-2">{data.high_risk_transactions?.toLocaleString()} critical</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Pie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transaction Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Processing Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0066b3" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}