import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function RuleEffectivenessPanel({ rules }) {
  if (!rules || Object.keys(rules).length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-500">
          No rules evaluated yet
        </CardContent>
      </Card>
    );
  }

  const rulesArray = Object.entries(rules).map(([id, rule]) => ({
    id,
    name: rule.name,
    precision: parseFloat(rule.precision) || 0,
    recall: parseFloat(rule.recall) || 0,
    fpr: parseFloat(rule.false_positive_rate) || 0,
    tp: rule.true_positives,
    fp: rule.false_positives,
    triggered: rule.triggered_count,
    feedback: rule.feedback_samples
  }));

  // Sort by precision descending
  const sortedRules = rulesArray.sort((a, b) => b.precision - a.precision);

  const metricsData = sortedRules.map(rule => ({
    name: rule.name.substring(0, 15) + (rule.name.length > 15 ? '...' : ''),
    Precision: rule.precision,
    Recall: rule.recall,
    'False Positive Rate': rule.fpr
  }));

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg Precision</p>
            <p className="text-3xl font-bold">
              {(rulesArray.reduce((sum, r) => sum + r.precision, 0) / rulesArray.length).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">True positive accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg Recall</p>
            <p className="text-3xl font-bold">
              {(rulesArray.reduce((sum, r) => sum + r.recall, 0) / rulesArray.length).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">Alert detection rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg FPR</p>
            <p className="text-3xl font-bold text-orange-600">
              {(rulesArray.reduce((sum, r) => sum + r.fpr, 0) / rulesArray.length).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">False positive rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rule Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Precision" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="Recall" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="False Positive Rate" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Rule Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rule Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedRules.map((rule) => (
              <div key={rule.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{rule.name}</p>
                    <p className="text-xs text-gray-600">ID: {rule.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={rule.precision > 80 ? 'bg-green-50' : 'bg-orange-50'}>
                      {rule.precision.toFixed(1)}% Precision
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-3 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Triggered</p>
                    <p className="font-semibold">{rule.triggered}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs text-gray-600">True Positives</p>
                    <p className="font-semibold">{rule.tp}</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <p className="text-xs text-gray-600">False Positives</p>
                    <p className="font-semibold">{rule.fp}</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Recall</p>
                    <p className="font-semibold">{rule.recall.toFixed(1)}%</p>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Feedback</p>
                    <p className="font-semibold">{rule.feedback} samples</p>
                  </div>
                </div>

                {rule.precision < 70 && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 flex gap-2">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>Low precision. Consider collecting more feedback or adjusting thresholds.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}