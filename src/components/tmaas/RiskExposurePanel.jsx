import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export default function RiskExposurePanel({ data }) {
  if (!data) return null;

  const riskDistribution = [
    { name: 'Critical', value: data.critical_transactions, fill: '#dc2626' },
    { name: 'High', value: data.high_transactions, fill: '#ef4444' },
    { name: 'Medium', value: data.medium_transactions, fill: '#f59e0b' },
    { name: 'Low', value: data.low_transactions, fill: '#10b981' }
  ];

  const volumeData = [
    { name: 'Critical', volume: (data.critical_volume / 1000000).toFixed(2), fill: '#dc2626' },
    { name: 'High', volume: (data.high_volume / 1000000).toFixed(2), fill: '#ef4444' }
  ];

  const topCountries = (data.high_risk_countries || []).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Critical Transactions</p>
            <p className="text-3xl font-bold text-red-600">{data.critical_transactions?.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Volume: ${(data.critical_volume / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">High Risk</p>
            <p className="text-3xl font-bold text-orange-600">{data.high_transactions?.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Volume: ${(data.high_volume / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Avg Risk Score</p>
            <p className="text-3xl font-bold">{data.avg_risk_score}/100</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">AML Hit Rate</p>
            <p className="text-3xl font-bold">{data.aml_hit_rate?.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume by Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Volume (Millions)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="volume" fill="#0066b3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* High Risk Countries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Top Risk Jurisdictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topCountries.length > 0 ? (
            <div className="space-y-3">
              {topCountries.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{item.country}</p>
                    <p className="text-xs text-gray-600">{item.count} transactions</p>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-2 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-600"
                        style={{
                          width: `${(item.count / topCountries[0].count * 100).toFixed(0)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No high-risk jurisdictions detected</p>
          )}
        </CardContent>
      </Card>

      {/* Detection Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Detection Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">AML Hit Rate</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${Math.min(data.aml_hit_rate || 0, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{data.aml_hit_rate?.toFixed(1)}%</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Fraud Detection Rate</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: `${Math.min(data.fraud_detection_rate || 0, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{data.fraud_detection_rate?.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}