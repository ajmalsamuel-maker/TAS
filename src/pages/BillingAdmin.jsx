import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Settings, Shield, FileText, FileCheck } from 'lucide-react';
import BillingDashboard from '../components/billing/BillingDashboard';
import BillingSettingsPanel from '../components/billing/BillingSettingsPanel';
import BillingPlansManager from '../components/billing/BillingPlansManager';
import ExportPanel from '../components/billing/ExportPanel';
import AccountingSyncDashboard from '../components/billing/AccountingSyncDashboard';
import CreditsManager from '../components/billing/CreditsManager';
import ReferralManager from '../components/billing/ReferralManager';
import InvoiceTemplateDesigner from '../components/billing/InvoiceTemplateDesigner';
import ProviderCostManager from '../components/admin/ProviderCostManager';
import MarkupRuleManager from '../components/admin/MarkupRuleManager';
import ProfitAnalysisDashboard from '../components/admin/ProfitAnalysisDashboard';
import PriceChangeAlerts from '../components/admin/PriceChangeAlerts';

export default function BillingAdmin() {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    base44.auth.me()
      .then(currentUser => {
        if (currentUser?.role !== 'admin') {
          window.location.href = '/AdminCp';
        }
        setUser(currentUser);
      })
      .catch(() => {
        window.location.href = '/UserLogin';
      });
  }, []);

  const { data: summaryStats } = useQuery({
    queryKey: ['billingSummary'],
    queryFn: async () => {
      const invoices = await base44.entities.Invoice.filter({});
      const plans = await base44.entities.BillingPlan.filter({});
      
      return {
        totalInvoices: invoices.length,
        totalRevenue: invoices
          .filter(i => i.status === 'paid')
          .reduce((sum, i) => sum + (i.total_amount || 0), 0),
        pendingAmount: invoices
          .filter(i => ['issued', 'overdue'].includes(i.status))
          .reduce((sum, i) => sum + (i.total_amount || 0), 0),
        activePlans: plans.filter(p => p.is_active).length
      };
    }
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Billing Administration</h1>
          <p className="text-gray-600">Manage invoices, subscription plans, and accounting integrations</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${summaryStats?.totalRevenue.toFixed(2) || '0'}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Invoices</p>
                  <p className="text-2xl font-bold">${summaryStats?.pendingAmount.toFixed(2) || '0'}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invoices</p>
                  <p className="text-2xl font-bold">{summaryStats?.totalInvoices || 0}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Plans</p>
                  <p className="text-2xl font-bold">{summaryStats?.activePlans || 0}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <div className="bg-white border-2 border-blue-100 rounded-lg p-1 overflow-x-auto">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-1 h-auto bg-transparent w-full">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Plans</TabsTrigger>
            <TabsTrigger value="template" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Template</TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Costs</TabsTrigger>
            <TabsTrigger value="markup" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Markup</TabsTrigger>
            <TabsTrigger value="profit" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Profit</TabsTrigger>
            <TabsTrigger value="prices" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Prices</TabsTrigger>
            <TabsTrigger value="credits" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Credits</TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Referrals</TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Export</TabsTrigger>
            <TabsTrigger value="sync" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Sync</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white text-xs sm:text-sm">Settings</TabsTrigger>
            </TabsList>
            </div>

          <TabsContent value="dashboard">
            <BillingDashboard organizationId="all" />
          </TabsContent>

          <TabsContent value="plans">
            <BillingPlansManager />
          </TabsContent>

          <TabsContent value="template">
            <InvoiceTemplateDesigner />
          </TabsContent>

          <TabsContent value="costs">
            <ProviderCostManager />
          </TabsContent>

          <TabsContent value="markup">
            <MarkupRuleManager />
          </TabsContent>

          <TabsContent value="profit">
            <ProfitAnalysisDashboard />
          </TabsContent>

          <TabsContent value="prices">
            <PriceChangeAlerts />
          </TabsContent>

          <TabsContent value="credits">
            <CreditsManager />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralManager />
          </TabsContent>

          <TabsContent value="export">
            <ExportPanel />
          </TabsContent>

          <TabsContent value="sync">
            <AccountingSyncDashboard />
          </TabsContent>

          <TabsContent value="settings">
            <BillingSettingsPanel />
          </TabsContent>
        </Tabs>

        {/* Info Banner */}
        <Card className="mt-8 bg-blue-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Billing System Guide</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li><Shield className="h-3 w-3 inline mr-2 text-blue-600" /><strong>Dashboard:</strong> View all invoices, revenue, and customer usage</li>
              <li><Shield className="h-3 w-3 inline mr-2 text-blue-600" /><strong>Billing Plans:</strong> Create/edit subscription tiers with custom pricing</li>
              <li><Shield className="h-3 w-3 inline mr-2 text-blue-600" /><strong>Settings:</strong> Configure company info, tax rates, auto-invoicing, and accounting integrations</li>
              <li><Shield className="h-3 w-3 inline mr-2 text-blue-600" /><strong>Usage Tracking:</strong> Automatically track KYB, AML, LEI, and API calls per customer</li>
              <li><Shield className="h-3 w-3 inline mr-2 text-blue-600" /><strong>Accounting Export:</strong> Export to QuickBooks, Xero, Sage, or NetSuite</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}