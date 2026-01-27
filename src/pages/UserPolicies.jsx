import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UserPolicies() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        if (userData?.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserPolicies')));
  }, []);

  const { data: policies = [] } = useQuery({
    queryKey: ['user-policies', organization?.id],
    queryFn: () => base44.entities.Policy.filter({ organization_id: organization.id }),
    enabled: !!organization?.id,
    initialData: []
  });

  if (!user || !organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const active = policies.filter(p => p.status === 'active').length;
  const draft = policies.filter(p => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Compliance Policies</h1>
            <p className="text-gray-600">Manage custom compliance and verification policies for {organization.name}</p>
          </div>
          <Button className="bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Policy
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Policies</p>
                  <p className="text-3xl font-bold">{policies.length}</p>
                </div>
                <FileText className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-3xl font-bold">{active}</p>
                </div>
                <Shield className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Draft</p>
                  <p className="text-3xl font-bold">{draft}</p>
                </div>
                <FileText className="h-10 w-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policies List */}
        <div className="space-y-4">
          {policies.length > 0 ? (
            policies.map(policy => (
              <Card key={policy.id} className="border-2 border-blue-100 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                        <Badge className={
                          policy.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {policy.status}
                        </Badge>
                      </div>
                      {policy.description && (
                        <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                      )}
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Type</p>
                          <p className="font-semibold text-gray-900 capitalize">{policy.policy_type || 'Custom'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Version</p>
                          <p className="font-semibold text-gray-900">{policy.version || '1.0'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Last Updated</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(policy.updated_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No policies yet</p>
                <p className="text-sm text-gray-500 mb-4">Create custom compliance policies for your organization</p>
                <Button className="bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Policy
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}