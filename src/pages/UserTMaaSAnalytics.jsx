import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScreeningPerformanceChart from '../components/tmaas/ScreeningPerformanceChart';
import RuleEffectivenessPanel from '../components/tmaas/RuleEffectivenessPanel';
import AlertTrendsChart from '../components/tmaas/AlertTrendsChart';
import RiskExposurePanel from '../components/tmaas/RiskExposurePanel';
import { Download, Filter, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function UserTMaaSAnalytics() {
  const [days, setDays] = useState(30);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Get TMaaS configs
  const { data: configs } = useQuery({
    queryKey: ['tmaas-configs'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.TMaaSConfig.filter({
        organization_id: user.organization_id
      });
    }
  });

  // Get analytics data
   const { data: analyticsData, isLoading } = useQuery({
     queryKey: ['tmaas-analytics', days, selectedConfig],
     queryFn: async () => {
       if (!selectedConfig && !configs?.[0]) return null;
       const configId = selectedConfig?.id || configs?.[0]?.id;
       const response = await base44.functions.invoke('getTMaaSAnalytics', {
         configId,
         timePeriod: days.toString()
       });
       return response.data;
     },
     enabled: !!(selectedConfig || configs?.length)
   });

   const activeConfig = selectedConfig || configs?.[0];
   const currentAnalytics = analyticsData;

  const handleExport = async () => {
    try {
      if (!currentAnalytics) {
        toast.error('No analytics data to export');
        return;
      }

      const csvContent = generateCSV(currentAnalytics);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tmaas-analytics-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
      console.error(error);
    }
  };

  if (!configs || configs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">TMaaS Analytics</h1>
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-gray-600 mb-4">No TMaaS configurations found.</p>
              <p className="text-sm text-gray-500">Set up a TMaaS configuration to view analytics.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TMaaS Analytics</h1>
          <p className="text-gray-600">Monitor screening performance, rule effectiveness, and system-wide risk exposure</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Configuration</label>
            <select
              value={selectedConfig?.id || ''}
              onChange={(e) => {
                const config = configs.find(c => c.id === e.target.value);
                setSelectedConfig(config);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
            >
              {configs.map(config => (
                <option key={config.id} value={config.id}>
                  {config.service_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleExport}
              disabled={isLoading || !currentAnalytics}
              className="bg-[#0066B3] hover:bg-[#004C8C]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-12">
            <Loader className="h-8 w-8 animate-spin text-[#0066B3] mr-3" />
            <span className="text-gray-600">Loading analytics...</span>
          </div>
        )}

        {/* Analytics Tabs */}
        {!isLoading && currentAnalytics && (
          <Tabs defaultValue="screening" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="screening">Screening</TabsTrigger>
              <TabsTrigger value="rules">Rule Effectiveness</TabsTrigger>
              <TabsTrigger value="alerts">Alert Trends</TabsTrigger>
              <TabsTrigger value="enrichment">Enrichment</TabsTrigger>
              <TabsTrigger value="risk">Risk Exposure</TabsTrigger>
            </TabsList>

            {/* Screening Performance */}
            <TabsContent value="screening">
              <ScreeningPerformanceChart data={currentAnalytics.screening_performance} />
            </TabsContent>

            {/* Rule Effectiveness */}
            <TabsContent value="rules">
              <RuleEffectivenessPanel rules={currentAnalytics.rule_effectiveness} />
            </TabsContent>

            {/* Alert Trends */}
            <TabsContent value="alerts">
              <AlertTrendsChart data={currentAnalytics.alert_trends} />
            </TabsContent>

            {/* Enrichment Performance */}
            <TabsContent value="enrichment">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrichment Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'Geo-IP Lookup', enabled: currentAnalytics.enrichment_performance.geo_ip_enabled },
                      { name: 'Domain Reputation', enabled: currentAnalytics.enrichment_performance.domain_rep_enabled },
                      { name: 'Velocity History', enabled: currentAnalytics.enrichment_performance.velocity_enabled },
                      { name: 'Device Fingerprint', enabled: currentAnalytics.enrichment_performance.device_fp_enabled }
                    ].map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{service.name}</span>
                        <Badge variant={service.enabled ? 'default' : 'outline'}>
                          {service.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Avg Processing Time</p>
                      <p className="text-2xl font-bold">{currentAnalytics.enrichment_performance.avg_enrichment_time_ms}ms</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold">{currentAnalytics.enrichment_performance.enrichment_success_rate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data Quality Score</p>
                      <p className="text-2xl font-bold">{currentAnalytics.enrichment_performance.data_quality_score}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Risk Exposure */}
            <TabsContent value="risk">
              <RiskExposurePanel data={currentAnalytics.risk_exposure} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function generateCSV(analytics) {
  const rows = [];
  rows.push('TMaaS Analytics Report');
  rows.push(`Generated: ${new Date().toISOString()}`);
  rows.push('');

  // Screening Performance
  rows.push('SCREENING PERFORMANCE');
  Object.entries(analytics.screening_performance || {}).forEach(([key, value]) => {
    rows.push(`${key},${value}`);
  });
  rows.push('');

  // Rule Effectiveness
  rows.push('RULE EFFECTIVENESS');
  rows.push('Rule Name,Precision,Recall,False Positive Rate,Triggered Count');
  Object.entries(analytics.rule_effectiveness || {}).forEach(([id, rule]) => {
    rows.push(`${rule.name},${rule.precision},${rule.recall},${rule.false_positive_rate},${rule.triggered_count}`);
  });
  rows.push('');

  // Alert Trends
  rows.push('ALERT TRENDS');
  Object.entries(analytics.alert_trends || {}).forEach(([key, value]) => {
    if (typeof value === 'object') {
      rows.push(`${key},"${JSON.stringify(value)}"`);
    } else {
      rows.push(`${key},${value}`);
    }
  });
  rows.push('');

  // Risk Exposure
  rows.push('RISK EXPOSURE');
  Object.entries(analytics.risk_exposure || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      rows.push(`${key},"${JSON.stringify(value)}"`);
    } else {
      rows.push(`${key},${value}`);
    }
  });

  return rows.join('\n');
}