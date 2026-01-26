import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Coins, Plus, TrendingUp, Gift, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function CreditsManager() {
  const queryClient = useQueryClient();
  const [selectedOrg, setSelectedOrg] = useState('');
  const [creditAmount, setCreditAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('promotional');
  const [description, setDescription] = useState('');

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list()
  });

  const { data: creditBalances = [] } = useQuery({
    queryKey: ['creditBalances'],
    queryFn: () => base44.entities.CreditBalance.list()
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['creditTransactions'],
    queryFn: () => base44.entities.CreditTransaction.list('-created_date', 50)
  });

  const addCreditMutation = useMutation({
    mutationFn: async (data) => {
      // Find or create credit balance
      const existingBalance = creditBalances.find(cb => cb.organization_id === data.organization_id);
      
      let newBalance;
      if (existingBalance) {
        const updatedTotal = existingBalance.total_credits + data.amount;
        const updatedAvailable = existingBalance.available_credits + data.amount;
        
        let updates = {
          total_credits: updatedTotal,
          available_credits: updatedAvailable,
          last_updated: new Date().toISOString()
        };

        // Update specific credit type
        if (data.transaction_type === 'promotional') {
          updates.promotional_credits = (existingBalance.promotional_credits || 0) + data.amount;
        } else if (data.transaction_type === 'referral') {
          updates.referral_credits = (existingBalance.referral_credits || 0) + data.amount;
        } else if (data.transaction_type === 'purchase') {
          updates.prepaid_credits = (existingBalance.prepaid_credits || 0) + data.amount;
        }

        await base44.entities.CreditBalance.update(existingBalance.id, updates);
        newBalance = updatedTotal;
      } else {
        const newRecord = {
          organization_id: data.organization_id,
          total_credits: data.amount,
          available_credits: data.amount,
          used_credits: 0,
          promotional_credits: data.transaction_type === 'promotional' ? data.amount : 0,
          referral_credits: data.transaction_type === 'referral' ? data.amount : 0,
          prepaid_credits: data.transaction_type === 'purchase' ? data.amount : 0,
          last_updated: new Date().toISOString()
        };
        await base44.entities.CreditBalance.create(newRecord);
        newBalance = data.amount;
      }

      // Create transaction record
      await base44.entities.CreditTransaction.create({
        organization_id: data.organization_id,
        transaction_type: data.transaction_type,
        amount: data.amount,
        balance_after: newBalance,
        description: data.description
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditBalances'] });
      queryClient.invalidateQueries({ queryKey: ['creditTransactions'] });
      toast.success('Credits added successfully');
      setCreditAmount(0);
      setDescription('');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleAddCredits = () => {
    if (!selectedOrg || creditAmount <= 0) {
      toast.error('Please select organization and enter valid amount');
      return;
    }

    const org = organizations.find(o => o.id === selectedOrg);
    addCreditMutation.mutate({
      organization_id: selectedOrg,
      transaction_type: transactionType,
      amount: creditAmount,
      description: description || `${transactionType} credits added to ${org?.name}`
    });
  };

  const totalCreditsIssued = creditBalances.reduce((sum, cb) => sum + cb.total_credits, 0);
  const totalCreditsUsed = creditBalances.reduce((sum, cb) => sum + cb.used_credits, 0);
  const totalCreditsAvailable = creditBalances.reduce((sum, cb) => sum + cb.available_credits, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Issued</p>
                <p className="text-2xl font-bold">${totalCreditsIssued.toLocaleString()}</p>
              </div>
              <Coins className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Available</p>
                <p className="text-2xl font-bold text-green-600">${totalCreditsAvailable.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Used</p>
                <p className="text-2xl font-bold text-orange-600">${totalCreditsUsed.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Organizations</p>
                <p className="text-2xl font-bold">{creditBalances.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Credits Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Credits to Organization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold">Organization</label>
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Organization</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Credit Type</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="promotional">Promotional</option>
                <option value="referral">Referral</option>
                <option value="purchase">Prepaid Purchase</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                value={creditAmount}
                onChange={(e) => setCreditAmount(parseFloat(e.target.value))}
                placeholder="100.00"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional note"
              />
            </div>
          </div>
          <Button
            onClick={handleAddCredits}
            disabled={addCreditMutation.isPending}
            className="mt-4"
          >
            {addCreditMutation.isPending ? 'Adding...' : 'Add Credits'}
          </Button>
        </CardContent>
      </Card>

      {/* Credit Balances */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Credit Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {creditBalances.map(balance => {
              const org = organizations.find(o => o.id === balance.organization_id);
              return (
                <div key={balance.id} className="border rounded p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{org?.name || 'Unknown Org'}</h4>
                      <div className="grid md:grid-cols-5 gap-4 mt-2 text-sm">
                        <div>
                          <p className="text-gray-600">Total Credits</p>
                          <p className="font-bold">${balance.total_credits.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Available</p>
                          <p className="font-bold text-green-600">${balance.available_credits.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Used</p>
                          <p className="font-bold text-orange-600">${balance.used_credits.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Promotional</p>
                          <p className="font-bold text-blue-600">${(balance.promotional_credits || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Referral</p>
                          <p className="font-bold text-purple-600">${(balance.referral_credits || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {creditBalances.length === 0 && (
              <p className="text-center text-gray-500 py-4">No credit balances yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Credit Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.map(tx => {
              const org = organizations.find(o => o.id === tx.organization_id);
              return (
                <div key={tx.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{org?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-600">{tx.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={tx.amount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{tx.transaction_type}</p>
                  </div>
                  <div className="text-right ml-4 text-sm text-gray-600">
                    Balance: ${tx.balance_after.toFixed(2)}
                  </div>
                </div>
              );
            })}
            {transactions.length === 0 && (
              <p className="text-center text-gray-500 py-4">No transactions yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}