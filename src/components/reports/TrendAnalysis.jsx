import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function TrendAnalysis() {
  const [selectedMetric, setSelectedMetric] = useState('applications');

  const trendData = {
    applications: [
      { week: 'W1', value: 45, threshold: 40 },
      { week: 'W2', value: 52, threshold: 45 },
      { week: 'W3', value: 48, threshold: 50 },
      { week: 'W4', value: 62, threshold: 55 },
      { week: 'W5', value: 71, threshold: 60 },
      { week: 'W6', value: 85, threshold: 65 }
    ],
    alerts: [
      { week: 'W1', value: 8, threshold: 10 },
      { week: 'W2', value: 12, threshold: 10 },
      { week: 'W3', value: 15, threshold: 10 },
      { week: 'W4', value: 14, threshold: 10 },
      { week: 'W5', value: 11, threshold: 10 },
      { week: 'W6', value: 9, threshold: 10 }
    ],
    amlScreening: [
      { week: 'W1', hits: 3, passRate: 97 },
      { week: 'W2', hits: 5, passRate: 95 },
      { week: 'W3', hits: 2, passRate: 98 },
      { week: 'W4', hits: 4, passRate: 96 },
      { week: 'W5', hits: 1, passRate: 99 },
      { week: 'W6', hits: 3, passRate: 97 }
    ]
  };

  const metrics = [
    { key: 'applications', label: 'Applications Submitted', color: '#0044CC' },
    { key: 'alerts', label: 'Alerts Generated', color: '#EF4444' },
    { key: 'amlScreening', label: 'AML Pass Rate', color: '#10B981' }
  ];

  const data = trendData[selectedMetric];
  const currentValue = data[data.length - 1].value;
  const previousValue = data[Math.max(0, data.length - 2)].value;
  const trend = currentValue > previousValue ? 'up' : 'down';
  const percentChange = Math.round(((currentValue - previousValue) / previousValue) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Trend Analysis</CardTitle>
            <div className="flex gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === metric.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trend Indicator */}
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Week Performance</p>
              <p className="text-3xl font-bold text-gray-900">{currentValue}</p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
              trend === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {trend === 'up' ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="font-semibold">{Math.abs(percentChange)}%</span>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                fill="#0044CC" 
                stroke="#0044CC"
                fillOpacity={0.3}
              />
              {data[0].threshold && (
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#FBBF24" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Threshold"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>

          {/* Insights */}
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900 text-sm">Key Insights</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Peak activity in Week 6 with {currentValue} {selectedMetric === 'alerts' ? 'alerts' : 'applications'}</li>
              <li>Consistent growth trend over the past 6 weeks</li>
              <li>{trend === 'up' ? 'Upward' : 'Downward'} momentum with {percentChange}% {trend === 'up' ? 'increase' : 'decrease'}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}