import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function TrendAnalysis({ data }) {
  const [timeRange, setTimeRange] = useState('30');
  const [metric, setMetric] = useState('workflows');

  const getDaysData = (days) => {
    const result = [];
    for (let i = parseInt(days) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      result.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: dateStr
      });
    }
    return result;
  };

  const calculateTrend = (currentData, metric) => {
    const daysData = getDaysData(timeRange);
    
    return daysData.map(day => {
      const dayData = currentData[metric]?.filter(item => 
        item.created_date?.startsWith(day.fullDate)
      ) || [];

      return {
        ...day,
        total: dayData.length,
        completed: dayData.filter(i => i.status === 'completed' || i.status === 'approved').length,
        pending: dayData.filter(i => i.status === 'pending' || i.status === 'submitted').length,
        failed: dayData.filter(i => i.status === 'failed' || i.status === 'rejected').length
      };
    });
  };

  const trendData = calculateTrend(data, metric);
  
  // Calculate growth rate
  const firstWeek = trendData.slice(0, 7).reduce((sum, d) => sum + d.total, 0);
  const lastWeek = trendData.slice(-7).reduce((sum, d) => sum + d.total, 0);
  const growthRate = firstWeek > 0 ? ((lastWeek - firstWeek) / firstWeek * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Metric</label>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workflows">Workflows</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="alerts">AML Alerts</SelectItem>
                  <SelectItem value="fraudAlerts">Fraud Alerts</SelectItem>
                  <SelectItem value="cases">Cases</SelectItem>
                  <SelectItem value="applications">Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="14">Last 14 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="60">Last 60 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Indicator */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {growthRate > 0 ? '+' : ''}{growthRate}%
                </p>
              </div>
              {growthRate > 0 ? (
                <TrendingUp className="h-10 w-10 text-green-600" />
              ) : growthRate < 0 ? (
                <TrendingDown className="h-10 w-10 text-red-600" />
              ) : (
                <Minus className="h-10 w-10 text-gray-400" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Average per Day</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {(trendData.reduce((sum, d) => sum + d.total, 0) / trendData.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Peak Day</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {Math.max(...trendData.map(d => d.total))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base capitalize">{metric} Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0044CC" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0044CC" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#0044CC" 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                name="Total"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Breakdown Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status Distribution Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10B981" name="Completed/Approved" />
              <Line type="monotone" dataKey="pending" stroke="#F59E0B" name="Pending" />
              <Line type="monotone" dataKey="failed" stroke="#EF4444" name="Failed/Rejected" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}