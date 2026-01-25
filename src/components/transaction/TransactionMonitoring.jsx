import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, DollarSign, Clock, Eye } from 'lucide-react';
import TransactionRules from './TransactionRules';
import TransactionDetail from './TransactionDetail';
import { toast } from 'sonner';

export default function TransactionMonitoring() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState('all');

  const queryClient = useQueryClient();

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => base44.entities.Transaction.list('-created_date', 100),
    initialData: [],
    refetchInterval: 10000
  });

  const screenTransactionMutation = useMutation({
    mutationFn: async (transactionId) => {
      const response = await base44.functions.invoke('screenTransaction', {
        transaction_id: transactionId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      toast.success('Transaction screened');
    }
  });

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'flagged') return t.status === 'flagged';
    if (filter === 'high_risk') return t.risk_level === 'high' || t.risk_level === 'critical';
    if (filter === 'pending') return t.status === 'pending' || t.status === 'screening';
    return true;
  });

  const stats = {
    total: transactions.length,
    flagged: transactions.filter(t => t.status === 'flagged').length,
    blocked: transactions.filter(t => t.status === 'blocked').length,
    totalAmount: transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-red-500 text-white';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'screening': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedTransaction) {
    return (
      <TransactionDetail
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    );
  }

  return (
    <Tabs defaultValue="monitoring">
      <TabsList>
        <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
        <TabsTrigger value="rules">Transaction Rules</TabsTrigger>
      </TabsList>

      <TabsContent value="monitoring" className="space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Flagged</p>
                  <p className="text-2xl font-bold text-red-600">{stats.flagged}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Blocked</p>
                  <p className="text-2xl font-bold">{stats.blocked}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold">${(stats.totalAmount / 1000).toFixed(1)}K</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button 
                  size="sm" 
                  variant={filter === 'flagged' ? 'default' : 'outline'}
                  onClick={() => setFilter('flagged')}
                >
                  Flagged
                </Button>
                <Button 
                  size="sm" 
                  variant={filter === 'high_risk' ? 'default' : 'outline'}
                  onClick={() => setFilter('high_risk')}
                >
                  High Risk
                </Button>
                <Button 
                  size="sm" 
                  variant={filter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Flags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">
                      {tx.transaction_id?.substring(0, 12) || tx.id.substring(0, 12)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tx.type}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${tx.amount?.toLocaleString()} {tx.currency}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{tx.counterparty_name || 'N/A'}</p>
                        {tx.counterparty_country && (
                          <p className="text-xs text-gray-500">{tx.counterparty_country}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {tx.risk_level ? (
                        <Badge className={getRiskColor(tx.risk_level)}>
                          {tx.risk_level} ({tx.risk_score || 0})
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(tx.flags || []).slice(0, 2).map((flag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {flag}
                          </Badge>
                        ))}
                        {tx.flags?.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tx.flags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedTransaction(tx)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rules">
        <TransactionRules />
      </TabsContent>
    </Tabs>
  );
}