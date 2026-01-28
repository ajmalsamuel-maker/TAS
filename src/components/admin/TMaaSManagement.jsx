import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity, DollarSign, Shield, TrendingUp, Users, BarChart } from 'lucide-react';
import { toast } from 'sonner';

export default function TMaaSManagement() {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const queryClient = useQueryClient();

  const { data: organizations = [] } = useQuery({
    queryKey: ['admin-organizations'],
    queryFn: () => base44.asServiceRole.entities.Organization.list(),
    initialData: []
  });

  const { data: tmaasConfigs = [] } = useQuery({
    queryKey: ['tmaas-configs'],
    queryFn: () => base44.asServiceRole.entities.TMaaSConfig.list(),
    initialData: []
  });

  const toggleTMaaSMutation = useMutation({
    mutationFn: async ({ orgId, enabled }) => {
      return base44.asServiceRole.entities.Organization.update(orgId, {
        tmaas_enabled: enabled
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-organizations'] });
      toast.success('TMaaS status updated');
    }
  });

  const enabledOrgs = organizations.filter(o => o.tmaas_enabled);
  const totalTransactions = tmaasConfigs.reduce((sum, c) => sum + (c.transactions_processed || 0), 0);
  const totalBlocked = tmaasConfigs.reduce((sum, c) => sum + (c.transactions_blocked || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Monitoring as a Service (TMaaS)</h2>
        <p className="text-gray-600">Enable and configure transaction monitoring for organizations</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enabled Orgs</p>
                <p className="text-3xl font-bold">{enabledOrgs.length}</p>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-3xl font-bold">{totalTransactions.toLocaleString()}</p>
              </div>
              <Activity className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked</p>
                <p className="text-3xl font-bold">{totalBlocked}</p>
              </div>
              <Shield className="h-10 w-10 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Block Rate</p>
                <p className="text-3xl font-bold">
                  {totalTransactions > 0 ? ((totalBlocked / totalTransactions) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <BarChart className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations List */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizations.map(org => {
              const orgConfig = tmaasConfigs.find(c => c.organization_id === org.id);
              
              return (
                <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{org.name}</h3>
                      <Badge variant={org.tmaas_enabled ? 'default' : 'secondary'}>
                        {org.tmaas_enabled ? 'TMaaS Enabled' : 'Disabled'}
                      </Badge>
                      {org.subscription_tier && (
                        <Badge variant="outline" className="capitalize">
                          {org.subscription_tier}
                        </Badge>
                      )}
                    </div>
                    
                    {orgConfig && (
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Configurations</p>
                          <p className="font-semibold">{tmaasConfigs.filter(c => c.organization_id === org.id).length}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Transactions</p>
                          <p className="font-semibold">{(orgConfig.transactions_processed || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Blocked</p>
                          <p className="font-semibold text-red-600">{orgConfig.transactions_blocked || 0}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Pricing</p>
                          <p className="font-semibold capitalize">{org.tmaas_pricing_model || 'N/A'}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={org.tmaas_enabled || false}
                        onCheckedChange={(enabled) => 
                          toggleTMaaSMutation.mutate({ orgId: org.id, enabled })
                        }
                      />
                      <Label className="text-sm">
                        {org.tmaas_enabled ? 'Enabled' : 'Disabled'}
                      </Label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}