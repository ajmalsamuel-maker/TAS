import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ArrowRight, Activity, Shield, Zap, TrendingUp, Settings } from 'lucide-react';

export default function UserTMaaS() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: tmaasConfig } = useQuery({
    queryKey: ['tmaaConfig', user?.organization_id],
    queryFn: () => base44.entities.TMaaSConfig.filter({ organization_id: user?.organization_id }),
    enabled: !!user?.organization_id,
    initialData: []
  });

  const config = tmaasConfig?.[0];

  const { data: transactions } = useQuery({
    queryKey: ['transactions', config?.id],
    queryFn: () => base44.entities.Transaction.filter({ organization_id: user?.organization_id }, '-created_date', 100),
    enabled: !!user?.organization_id && config?.status === 'active',
    initialData: []
  });

  const stats = {
    processed: transactions?.length || 0,
    blocked: transactions?.filter(t => t.status === 'blocked').length || 0,
    flagged: transactions?.filter(t => t.status === 'flagged').length || 0,
    approved: transactions?.filter(t => t.status === 'approved').length || 0
  };

  if (!user) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction Monitoring as a Service</h1>
            <p className="text-lg text-gray-600">Monitor transactions with real-time AML screening and fraud detection</p>
          </div>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">TMaaS Not Configured</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Set up transaction monitoring to begin screening transactions in real-time with AML and fraud detection.
              </p>
              <Link to={createPageUrl('TMaaSSetup')}>
                <Button className="bg-[#0044CC] hover:bg-[#002D66]">
                  <Settings className="mr-2 h-4 w-4" />
                  Set Up TMaaS
                </Button>
              </Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction Monitoring Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time monitoring status: <span className={`font-bold ${config?.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{config?.status?.toUpperCase()}</span></p>
        </div>

        {/* Status Alert */}
        {config?.status !== 'active' && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              TMaaS is currently in <strong>{config?.status}</strong> mode. <Link to={createPageUrl('TMaaSSetup')} className="underline font-semibold">Complete setup</Link> to start monitoring.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Processed</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.processed}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Blocked</p>
                  <p className="text-3xl font-bold text-red-600">{stats.blocked}</p>
                </div>
                <Shield className="h-8 w-8 text-red-500 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Flagged</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.flagged}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <Zap className="h-8 w-8 text-green-500 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all cursor-pointer">
            <Link to={createPageUrl('TMaaSRules')}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="h-5 w-5 text-[#0044CC]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Monitoring Rules</h3>
                    <p className="text-sm text-gray-600">Configure AML, fraud, velocity rules</p>
                    <p className="text-xs text-[#0044CC] mt-3 font-semibold">View Rules →</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all cursor-pointer">
            <Link to={createPageUrl('TMaaSTransactions')}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-[#0044CC]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Transactions</h3>
                    <p className="text-sm text-gray-600">View & manage screened transactions</p>
                    <p className="text-xs text-[#0044CC] mt-3 font-semibold">View Transactions →</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all cursor-pointer">
            <Link to={createPageUrl('TMaaSSetup')}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#0044CC]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Configuration</h3>
                    <p className="text-sm text-gray-600">Webhooks, providers, credentials</p>
                    <p className="text-xs text-[#0044CC] mt-3 font-semibold">Edit Config →</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link to={createPageUrl('TMaaSTransactions')}>
                <Button variant="outline" size="sm">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {transactions?.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No transactions yet. Transactions will appear here once you start sending them via webhook.</p>
            ) : (
              <div className="space-y-3">
                {transactions?.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{tx.transaction_id}</p>
                      <p className="text-sm text-gray-600">${tx.amount} {tx.currency}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        tx.status === 'approved' ? 'bg-green-100 text-green-800' :
                        tx.status === 'blocked' ? 'bg-red-100 text-red-800' :
                        tx.status === 'flagged' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {tx.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}