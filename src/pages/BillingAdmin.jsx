import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Settings, Shield, FileText } from 'lucide-react';
import BillingDashboard from '../components/billing/BillingDashboard';
import BillingSettingsPanel from '../components/billing/BillingSettingsPanel';
import BillingPlansManager from '../components/billing/BillingPlansManager';
import ExportPanel from '../components/billing/ExportPanel';
import AccountingSyncDashboard from '../components/billing/AccountingSyncDashboard';
import CreditsManager from '../components/billing/CreditsManager';
import ReferralManager from '../components/billing/ReferralManager';
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
        <div className="grid md:grid-cols-4 gap-4 mb-8">
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
          <TabsList className="grid grid-cols-3 lg:grid-cols-10">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="costs">Provider Costs</TabsTrigger>
            <TabsTrigger value="markup">Markup Rules</TabsTrigger>
            <TabsTrigger value="profit">Profit Analysis</TabsTrigger>
            <TabsTrigger value="prices">Price Alerts</TabsTrigger>
            <TabsTrigger value="credits">Credits</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="sync">Sync Status</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BillingDashboard organizationId="all" />
          </TabsContent>

          <TabsContent value="plans">
            <BillingPlansManager />
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