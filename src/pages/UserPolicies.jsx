import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, FileText, AlertCircle, CheckCircle2, Clock, AlertTriangle, Workflow, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PolicyManager from '../components/policy/PolicyManager';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function UserPolicies() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [showPolicyManager, setShowPolicyManager] = useState(false);
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
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserPolicies')));
  }, []);

  const { data: policies = [] } = useQuery({
    queryKey: ['user-policies', organization?.id],
    queryFn: () => base44.entities.Policy.filter({ organization_id: organization.id }),
    enabled: !!organization?.id,
    initialData: []
  });

  const { data: workflows = [] } = useQuery({
    queryKey: ['user-workflows', user?.email],
    queryFn: () => base44.entities.Workflow.filter({ created_by: user?.email }),
    enabled: !!user?.email,
    initialData: []
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const active = policies.filter(p => p.status === 'active').length;
  const draft = policies.filter(p => p.status === 'draft').length;

  // Workflow history filters
  const filteredWorkflows = statusFilter === 'all' 
    ? workflows 
    : workflows.filter(w => w.status === statusFilter);

  const completed = workflows.filter(w => w.status === 'completed').length;
  const inProgress = workflows.filter(w => w.status === 'in_progress').length;
  const pending = workflows.filter(w => w.status === 'pending').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Workflow className="h-4 w-4" />;
    }
  };

  const getProgressValue = (status) => {
    switch(status) {
      case 'completed': return 100;
      case 'in_progress': return 50;
      case 'pending': return 25;
      default: return 0;
    }
  };

  if (showPolicyManager) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setShowPolicyManager(false)}>
              ← Back to Policies List
            </Button>
          </div>
          <PolicyManager />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Verification Workflows</h1>
            <p className="text-gray-600">Design workflows for new customer onboarding and view execution history</p>
          </div>
          <Button className="bg-blue-600" onClick={() => setShowPolicyManager(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>

        {/* Explanation */}
        <Alert className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <AlertCircle className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-sm text-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <strong>Advanced Workflow Designer</strong>
                  <Badge className="bg-purple-600 text-white text-xs">PREMIUM FEATURE</Badge>
                </div>
                <p className="mb-2">
                  Create custom compliance policies beyond standard onboarding - ideal for businesses with complex screening requirements, A/B testing needs, or transaction monitoring rules.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Standard onboarding</strong> (LEI → KYB → AML → Verification) runs automatically. Use workflows for <strong>advanced scenarios</strong> like high-value transactions, VIP customer paths, or custom fraud detection rules.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="designer" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="designer">Workflow Designer</TabsTrigger>
            <TabsTrigger value="history">Execution History</TabsTrigger>
          </TabsList>

          <TabsContent value="designer" className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
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
                <p className="text-gray-600 mb-2">No verification workflows yet</p>
                <p className="text-sm text-gray-500 mb-4">Create automated workflows to screen new customers and transactions</p>
                <Button className="bg-blue-600" onClick={() => setShowPolicyManager(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Workflow
                </Button>
              </CardContent>
            </Card>
          )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Workflow History Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Executions</p>
                      <p className="text-3xl font-bold">{workflows.length}</p>
                    </div>
                    <Workflow className="h-10 w-10 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-3xl font-bold">{completed}</p>
                    </div>
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-3xl font-bold">{inProgress}</p>
                    </div>
                    <Clock className="h-10 w-10 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-3xl font-bold">{pending}</p>
                    </div>
                    <AlertTriangle className="h-10 w-10 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter */}
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Executions</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Workflow Executions List */}
            <div className="space-y-4">
              {filteredWorkflows.length > 0 ? (
                filteredWorkflows.map(workflow => (
                  <Card key={workflow.id} className="border-2 border-blue-100 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{workflow.type || 'Workflow'}</h3>
                            <Badge className={getStatusColor(workflow.status)}>
                              <span className="mr-1">{getStatusIcon(workflow.status)}</span>
                              {workflow.status || 'pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Progress</p>
                            <span className="text-sm font-semibold text-gray-900">{getProgressValue(workflow.status)}%</span>
                          </div>
                          <Progress value={getProgressValue(workflow.status)} className="h-2" />
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Type</p>
                            <p className="font-semibold text-gray-900 capitalize">{workflow.type || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Provider</p>
                            <p className="font-semibold text-gray-900">{workflow.provider_name || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Created</p>
                            <p className="font-semibold text-gray-900">{new Date(workflow.created_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">User</p>
                            <p className="font-semibold text-gray-900 text-xs">{workflow.user_id || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Workflow className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">No workflow executions found</p>
                    <p className="text-sm text-gray-500">Workflow execution history will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}