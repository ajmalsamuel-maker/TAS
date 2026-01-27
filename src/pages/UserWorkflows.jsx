import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, AlertTriangle, Workflow, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UserWorkflows() {
  const [user, setUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserWorkflows')));
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verification Workflows</h1>
          <p className="text-gray-600">Track your compliance verification workflows and status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Workflows</p>
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
        <div className="mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workflows</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Workflows List */}
        <div className="space-y-4">
          {filteredWorkflows.length > 0 ? (
            filteredWorkflows.map(workflow => (
              <Card key={workflow.id} className="border-2 border-blue-100 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{workflow.name || 'Unnamed Workflow'}</h3>
                        <Badge className={getStatusColor(workflow.status)}>
                          <span className="mr-1">{getStatusIcon(workflow.status)}</span>
                          {workflow.status}
                        </Badge>
                      </div>
                      {workflow.description && (
                        <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                      )}
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
                        <p className="font-semibold text-gray-900 capitalize">{workflow.workflow_type || 'N/A'}</p>
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
                        <p className="text-gray-600 mb-1">Verified</p>
                        <Badge variant={workflow.provenance_verified ? 'default' : 'secondary'}>
                          {workflow.provenance_verified ? 'Yes' : 'No'}
                        </Badge>
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
                <p className="text-gray-600 mb-2">No workflows found</p>
                <p className="text-sm text-gray-500">Your verification workflows will appear here</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}