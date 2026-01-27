import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Shield, FileText } from 'lucide-react';

export default function ProfitAnalysisDashboard() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['cost-transactions'],
    queryFn: () => base44.entities.CostTransaction.list('-created_date', 1000)
  });

  if (isLoading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  // Calculate totals
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.total_charged || 0), 0);
  const totalCosts = transactions.reduce((sum, t) => sum + (t.provider_cost || 0), 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

  // By service type
  const byService = transactions.reduce((acc, t) => {
    if (!acc[t.service_type]) {
      acc[t.service_type] = { revenue: 0, cost: 0, count: 0 };
    }
    acc[t.service_type].revenue += t.total_charged || 0;
    acc[t.service_type].cost += t.provider_cost || 0;
    acc[t.service_type].count += 1;
    return acc;
  }, {});

  const serviceLabels = {
    lei_issuance: 'LEI Issuance',
    vlei_issuance: 'vLEI Issuance',
    kyb_verification: 'KYB Verification',
    aml_screening: 'AML Screening',
    facial_verification: 'Facial Verification'
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Costs</p>
                <p className="text-3xl font-bold text-gray-900">${totalCosts.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Net Profit</p>
                <p className="text-3xl font-bold text-gray-900">${totalProfit.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Profit Margin</p>
                <p className="text-3xl font-bold text-gray-900">{profitMargin}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profit Analysis by Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Costs</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(byService).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No transactions recorded yet
                  </TableCell>
                </TableRow>
              ) : (
                Object.entries(byService).map(([service, data]) => {
                  const profit = data.revenue - data.cost;
                  const margin = data.revenue > 0 ? ((profit / data.revenue) * 100).toFixed(1) : 0;
                  return (
                    <TableRow key={service}>
                      <TableCell>
                        <Badge variant="outline">{serviceLabels[service] || service}</Badge>
                      </TableCell>
                      <TableCell>{data.count}</TableCell>
                      <TableCell className="font-mono">${data.revenue.toFixed(2)}</TableCell>
                      <TableCell className="font-mono text-red-600">${data.cost.toFixed(2)}</TableCell>
                      <TableCell className="font-mono text-green-600">${profit.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-600">
                          {margin}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Markup</TableHead>
                <TableHead>Charged</TableHead>
                <TableHead>Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 10).map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="text-sm">{new Date(txn.created_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{serviceLabels[txn.service_type]}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{txn.provider_name}</TableCell>
                  <TableCell className="font-mono text-sm">${txn.provider_cost.toFixed(2)}</TableCell>
                  <TableCell className="font-mono text-sm text-blue-600">+${txn.markup_applied.toFixed(2)}</TableCell>
                  <TableCell className="font-mono text-sm font-medium">${txn.total_charged.toFixed(2)}</TableCell>
                  <TableCell className="font-mono text-sm text-green-600">
                    ${(txn.total_charged - txn.provider_cost).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}