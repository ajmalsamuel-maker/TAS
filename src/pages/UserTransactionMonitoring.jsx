import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { Activity, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TransactionMonitoringConfig from '../components/user/TransactionMonitoringConfig';

export default function UserTransactionMonitoring() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        if (userData?.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserTransactionMonitoring')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Transaction Monitoring as a Service</h1>
            <Badge className="bg-purple-600 text-white">PREMIUM FEATURE</Badge>
          </div>
          <p className="text-gray-600">Real-time transaction screening for merchants and processors</p>
        </div>

        <TransactionMonitoringConfig organization={organization} />
      </div>
    </div>
  );
}