import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Check, X } from 'lucide-react';

export default function TMaaSTransactions() {
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [selectedTx, setSelectedTx] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: transactions } = useQuery({
    queryKey: ['transactions', user?.organization_id, filters],
    queryFn: () => base44.entities.Transaction.filter(
      { organization_id: user?.organization_id },
      '-created_date',
      500
    ),
    enabled: !!user?.organization_id,
    initialData: []
  });

  const filteredTransactions = transactions?.filter(tx => {
    const statusMatch = filters.status === 'all' || tx.status === filters.status;
    const searchMatch = !filters.search || 
      tx.transaction_id?.includes(filters.search) ||
      tx.from_account?.includes(filters.search) ||
      tx.to_account?.includes(filters.search);
    return statusMatch && searchMatch;
  });

  const updateMutation = useMutation({
    mutationFn: ({ txId, newStatus }) => base44.entities.Transaction.update(txId, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    screening: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    flagged: 'bg-yellow-100 text-yellow-800',
    blocked: 'bg-red-100 text-red-800',
    rejected: 'bg-orange-100 text-orange-800'
  };

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Screened Transactions</h1>
          <p className="text-lg text-gray-600">View and manage all monitored transactions</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Transaction ID, account..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <Select value={filters.status} onValueChange={(val) => setFilters({...filters, status: val})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {filteredTransactions?.length} Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTransactions?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No transactions found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions?.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTx(tx)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <p className="font-bold text-gray-900">{tx.transaction_id}</p>
                        <Badge className={statusColors[tx.status]}>{tx.status?.toUpperCase()}</Badge>
                        {tx.risk_level && (
                          <Badge className={
                            tx.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                            tx.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {tx.risk_level.toUpperCase()} RISK
                          </Badge>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="text-xs text-gray-500">AMOUNT</p>
                          <p className="font-semibold text-gray-900">${tx.amount} {tx.currency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">FROM</p>
                          <p className="font-mono text-gray-900">{tx.from_account}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">TO</p>
                          <p className="font-mono text-gray-900">{tx.to_account}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">TYPE</p>
                          <p className="text-gray-900 capitalize">{tx.type}</p>
                        </div>
                      </div>
                    </div>
                    <Eye className="h-5 w-5 text-gray-400 ml-4" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Transaction Detail</CardTitle>
              <button onClick={() => setSelectedTx(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">TRANSACTION ID</p>
                  <p className="font-mono text-gray-900">{selectedTx.transaction_id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">STATUS</p>
                  <Badge className={statusColors[selectedTx.status]}>{selectedTx.status?.toUpperCase()}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">AMOUNT</p>
                  <p className="text-lg font-bold text-gray-900">${selectedTx.amount} {selectedTx.currency}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">RISK SCORE</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTx.risk_score}/100</p>
                </div>
              </div>

              {/* Screening Results */}
              {selectedTx.screening_results && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Screening Results</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">AML Score:</span>
                      <span className="font-semibold">{selectedTx.screening_results.aml_score || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fraud Score:</span>
                      <span className="font-semibold">{selectedTx.screening_results.fraud_score || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Triggered Rules */}
              {selectedTx.triggered_rules?.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Triggered Rules</h4>
                  <div className="space-y-2">
                    {selectedTx.triggered_rules?.map((rule, idx) => (
                      <div key={idx} className="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded">
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {['pending', 'flagged'].includes(selectedTx.status) && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      updateMutation.mutate({txId: selectedTx.id, newStatus: 'approved'});
                      setSelectedTx(null);
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      updateMutation.mutate({txId: selectedTx.id, newStatus: 'rejected'});
                      setSelectedTx(null);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}