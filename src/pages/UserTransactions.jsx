import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UserTransactions() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        if (userData?.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserTransactions')));
  }, []);

  const { data: transactions = [] } = useQuery({
    queryKey: ['user-transactions', organization?.id],
    queryFn: () => base44.entities.Transaction.filter({ organization_id: organization.id }),
    enabled: !!organization?.id,
    initialData: []
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);

  const totalTransactions = transactions.length;
  const flaggedTransactions = transactions.filter(t => t.status === 'flagged').length;
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction Monitoring</h1>
          <p className="text-gray-600">Monitor and manage transaction compliance</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="text-3xl font-bold">{totalTransactions}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold">${(totalAmount / 1000).toFixed(1)}K</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Flagged</p>
                  <p className="text-3xl font-bold">{flaggedTransactions}</p>
                </div>
                <ArrowUpRight className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-100">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Amount</p>
                <p className="text-2xl font-bold">${(totalAmount / (totalTransactions || 1)).toFixed(0)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <Card key={transaction.id} className="border-2 border-blue-100 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {transaction.transaction_type === 'inbound' ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-red-600" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {transaction.counterparty || 'Unknown'} - ${transaction.amount?.toFixed(2)}
                        </h3>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{transaction.description || 'No description'}</p>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Type</p>
                          <p className="font-semibold text-gray-900 capitalize">{transaction.transaction_type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Currency</p>
                          <p className="font-semibold text-gray-900">{transaction.currency || 'USD'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(transaction.created_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Risk Score</p>
                          <p className="font-semibold text-gray-900">{transaction.risk_score || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No transactions found</p>
                <p className="text-sm text-gray-500">Your transactions will appear here once monitoring is active</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}