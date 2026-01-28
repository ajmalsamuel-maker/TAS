import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MetricsOverview from '../components/reports/MetricsOverview';
import TrendAnalysis from '../components/reports/TrendAnalysis';
import ExportOptions from '../components/reports/ExportOptions';
import { BarChart3, TrendingUp, Download, Settings } from 'lucide-react';

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState('metrics');

  const mockMetrics = {
    totalApplications: 412,
    approvalRate: 85,
    avgProcessingTime: '2.3 days',
    complianceScore: 94
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h2>
        <p className="text-gray-600">Monitor platform performance, compliance metrics, and generate reports</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white border-2 border-blue-100 rounded-lg p-1">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 h-auto bg-transparent w-full">
            <TabsTrigger value="metrics" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Metrics Tab */}
        <TabsContent value="metrics">
          <MetricsOverview metrics={mockMetrics} />
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <TrendAnalysis />
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export">
          <ExportOptions />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Default Report Recipients</h3>
                <p className="text-sm text-gray-600 mb-3">Configure who receives scheduled reports automatically</p>
                {/* This would have form inputs for managing recipients */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-600">Report recipients can be configured via email settings in Organization Management</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h3 className="font-semibold text-gray-900">Report Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Include trend analysis in monthly reports</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Include risk analysis in compliance reports</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Include transaction monitoring data</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}