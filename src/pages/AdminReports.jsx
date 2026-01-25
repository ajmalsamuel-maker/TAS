import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  FileText, TrendingUp, BarChart3, Download, 
  Filter, Calendar, PieChart
} from 'lucide-react';
import MetricsOverview from '../components/reports/MetricsOverview';
import ReportBuilder from '../components/reports/ReportBuilder';
import ExportOptions from '../components/reports/ExportOptions';
import TrendAnalysis from '../components/reports/TrendAnalysis';

export default function AdminReports() {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  // Fetch all data for reporting
  const { data: workflows = [] } = useQuery({
    queryKey: ['workflows-reports'],
    queryFn: () => base44.entities.Workflow.list('-created_date', 1000)
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions-reports'],
    queryFn: () => base44.entities.Transaction.list('-created_date', 1000)
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts-reports'],
    queryFn: () => base44.entities.AMLAlert.list('-created_date', 1000)
  });

  const { data: cases = [] } = useQuery({
    queryKey: ['cases-reports'],
    queryFn: () => base44.entities.Case.list('-created_date', 1000)
  });

  const { data: fraudAlerts = [] } = useQuery({
    queryKey: ['fraud-reports'],
    queryFn: () => base44.entities.FraudAlert.list('-created_date', 1000)
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['applications-reports'],
    queryFn: () => base44.entities.OnboardingApplication.list('-created_date', 1000)
  });

  const reportData = {
    workflows,
    transactions,
    alerts,
    cases,
    fraudAlerts,
    applications
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics & Reporting</h1>
            <p className="text-gray-600">Comprehensive insights across all platform modules</p>
          </div>
          <Button 
            onClick={() => setShowExportModal(true)}
            className="bg-[#0066B3] hover:bg-[#004C8C]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Total Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#0044CC]">{workflows.length}</p>
              <p className="text-xs text-green-600 mt-1">
                {workflows.filter(w => w.status === 'completed').length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#0044CC]">{transactions.length}</p>
              <p className="text-xs text-red-600 mt-1">
                {transactions.filter(t => t.status === 'flagged').length} flagged
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">AML Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#0044CC]">{alerts.length}</p>
              <p className="text-xs text-orange-600 mt-1">
                {alerts.filter(a => a.status === 'new').length} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#0044CC]">{cases.length}</p>
              <p className="text-xs text-blue-600 mt-1">
                {cases.filter(c => c.status === 'in_progress').length} in progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Reporting Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border-2 border-blue-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trend Analysis
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              <Filter className="w-4 h-4 mr-2" />
              Custom Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <MetricsOverview data={reportData} />
          </TabsContent>

          <TabsContent value="trends">
            <TrendAnalysis data={reportData} />
          </TabsContent>

          <TabsContent value="custom">
            <ReportBuilder data={reportData} />
          </TabsContent>
        </Tabs>

        {/* Export Modal */}
        {showExportModal && (
          <ExportOptions
            data={reportData}
            onClose={() => setShowExportModal(false)}
          />
        )}
      </div>
    </div>
  );
}