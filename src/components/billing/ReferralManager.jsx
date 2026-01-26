import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Share2, Gift, TrendingUp, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ReferralManager() {
  const queryClient = useQueryClient();
  const [referrerEmail, setReferrerEmail] = useState('');
  const [refereeEmail, setRefereeEmail] = useState('');
  const [creditAmount, setCreditAmount] = useState(100);

  const { data: referrals = [] } = useQuery({
    queryKey: ['referrals'],
    queryFn: () => base44.entities.Referral.list('-created_date')
  });

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list()
  });

  const createReferralMutation = useMutation({
    mutationFn: async (data) => {
      // Generate unique referral code
      const referralCode = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      return await base44.entities.Referral.create({
        ...data,
        referral_code: referralCode,
        status: 'pending'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast.success('Referral created');
      setReferrerEmail('');
      setRefereeEmail('');
    }
  });

  const creditReferralMutation = useMutation({
    mutationFn: async (referral) => {
      // Award credits to both parties
      const referrerOrg = organizations.find(o => o.id === referral.referrer_organization_id);
      const refereeOrg = organizations.find(o => o.id === referral.referee_organization_id);

      if (referrerOrg) {
        // Add credits to referrer
        await base44.entities.CreditTransaction.create({
          organization_id: referral.referrer_organization_id,
          transaction_type: 'referral',
          amount: referral.credit_amount,
          description: `Referral credit for referring ${referral.referee_email}`,
          reference_id: referral.id
        });
      }

      if (refereeOrg && referral.referee_credit_amount) {
        // Add credits to referee
        await base44.entities.CreditTransaction.create({
          organization_id: referral.referee_organization_id,
          transaction_type: 'referral',
          amount: referral.referee_credit_amount,
          description: `Welcome credit from referral by ${referral.referrer_email}`,
          reference_id: referral.id
        });
      }

      // Update referral status
      await base44.entities.Referral.update(referral.id, {
        status: 'credited',
        credited_at: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      queryClient.invalidateQueries({ queryKey: ['creditBalances'] });
      toast.success('Referral credits awarded');
    }
  });

  const handleCreateReferral = () => {
    if (!referrerEmail || !refereeEmail) {
      toast.error('Please enter both emails');
      return;
    }

    const referrerOrg = organizations.find(o => o.created_by === referrerEmail || o.admin_email === referrerEmail);
    
    if (!referrerOrg) {
      toast.error('Referrer organization not found');
      return;
    }

    createReferralMutation.mutate({
      referrer_organization_id: referrerOrg.id,
      referrer_email: referrerEmail,
      referee_email: refereeEmail,
      credit_amount: creditAmount,
      referee_credit_amount: creditAmount / 2
    });
  };

  const pendingReferrals = referrals.filter(r => r.status === 'pending');
  const completedReferrals = referrals.filter(r => r.status === 'completed');
  const creditedReferrals = referrals.filter(r => r.status === 'credited');

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{referrals.length}</p>
              </div>
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{pendingReferrals.length}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedReferrals.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Credited</p>
                <p className="text-2xl font-bold text-purple-600">{creditedReferrals.length}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Referral */}
      <Card>
        <CardHeader>
          <CardTitle>Record New Referral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold">Referrer Email</label>
              <Input
                type="email"
                value={referrerEmail}
                onChange={(e) => setReferrerEmail(e.target.value)}
                placeholder="referrer@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Referee Email</label>
              <Input
                type="email"
                value={refereeEmail}
                onChange={(e) => setRefereeEmail(e.target.value)}
                placeholder="newcustomer@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Credit Amount ($)</label>
              <Input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(parseFloat(e.target.value))}
                placeholder="100"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleCreateReferral}
                disabled={createReferralMutation.isPending}
                className="w-full"
              >
                {createReferralMutation.isPending ? 'Creating...' : 'Create Referral'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Card>
        <CardHeader>
          <CardTitle>All Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referrals.map(referral => {
              const referrerOrg = organizations.find(o => o.id === referral.referrer_organization_id);
              const refereeOrg = organizations.find(o => o.id === referral.referee_organization_id);
              
              return (
                <div key={referral.id} className="border rounded p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={
                          referral.status === 'credited' ? 'bg-green-100 text-green-800' :
                          referral.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }>
                          {referral.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{referral.referral_code}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Referrer</p>
                          <p className="font-semibold">{referrerOrg?.name || referral.referrer_email}</p>
                          <p className="text-xs text-gray-500">{referral.referrer_email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Referee</p>
                          <p className="font-semibold">{refereeOrg?.name || referral.referee_email}</p>
                          <p className="text-xs text-gray-500">{referral.referee_email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Credit Amount</p>
                          <p className="font-bold text-green-600">${referral.credit_amount}</p>
                        </div>
                        {referral.credited_at && (
                          <div>
                            <p className="text-gray-600">Credited On</p>
                            <p className="text-xs">{new Date(referral.credited_at).toLocaleDateString()}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {referral.status === 'completed' && (
                      <Button
                        size="sm"
                        onClick={() => creditReferralMutation.mutate(referral)}
                        disabled={creditReferralMutation.isPending}
                      >
                        Award Credits
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            {referrals.length === 0 && (
              <p className="text-center text-gray-500 py-4">No referrals yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}