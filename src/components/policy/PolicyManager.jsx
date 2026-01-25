import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, Edit, Trash2, Play, Pause, Copy, TrendingUp, 
  FlaskConical, Archive, CheckCircle, Clock 
} from 'lucide-react';
import { toast } from 'sonner';
import PolicyFlowBuilder from './PolicyFlowBuilder';
import ScheduleWorkflowModal from './ScheduleWorkflowModal';

export default function PolicyManager() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [schedulingPolicy, setSchedulingPolicy] = useState(null);
  const [newPolicyData, setNewPolicyData] = useState({
    name: '',
    type: 'identity_verification',
    description: ''
  });

  const queryClient = useQueryClient();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: () => base44.entities.Policy.list('-created_date'),
    initialData: []
  });

  const createPolicyMutation = useMutation({
    mutationFn: (data) => base44.entities.Policy.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['policies']);
      toast.success('Policy created successfully');
      setShowBuilder(false);
      setNewPolicyData({ name: '', type: 'identity_verification', description: '' });
    }
  });

  const updatePolicyMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Policy.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['policies']);
      toast.success('Policy updated successfully');
      setShowBuilder(false);
      setEditingPolicy(null);
    }
  });

  const deletePolicyMutation = useMutation({
    mutationFn: (id) => base44.entities.Policy.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['policies']);
      toast.success('Policy deleted');
    }
  });

  const togglePolicyStatus = async (policy) => {
    const newStatus = policy.status === 'active' ? 'paused' : 'active';
    await updatePolicyMutation.mutateAsync({
      id: policy.id,
      data: { status: newStatus }
    });
  };

  const duplicatePolicy = async (policy) => {
    await createPolicyMutation.mutateAsync({
      ...policy,
      name: `${policy.name} (Copy)`,
      status: 'draft',
      id: undefined,
      created_date: undefined
    });
  };

  const handleSaveWorkflow = (workflowDefinition) => {
    if (editingPolicy) {
      updatePolicyMutation.mutate({
        id: editingPolicy.id,
        data: { workflow_definition: workflowDefinition }
      });
    } else {
      createPolicyMutation.mutate({
        ...newPolicyData,
        workflow_definition: workflowDefinition,
        status: 'draft'
      });
    }
  };

  const enableABTesting = async (policy) => {
    const variantB = await createPolicyMutation.mutateAsync({
      ...policy,
      name: `${policy.name} - Variant B`,
      status: 'draft',
      id: undefined
    });

    await updatePolicyMutation.mutateAsync({
      id: policy.id,
      data: {
        ab_testing_enabled: true,
        ab_test_config: {
          variant_a_percentage: 50,
          variant_b_id: variantB.id
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showBuilder) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPolicy ? `Edit Policy: ${editingPolicy.name}` : 'Create New Policy'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!editingPolicy && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Input
                  placeholder="Policy Name"
                  value={newPolicyData.name}
                  onChange={(e) => setNewPolicyData({ ...newPolicyData, name: e.target.value })}
                />
                <Select
                  value={newPolicyData.type}
                  onValueChange={(value) => setNewPolicyData({ ...newPolicyData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="identity_verification">Identity Verification</SelectItem>
                    <SelectItem value="fraud_detection">Fraud Detection</SelectItem>
                    <SelectItem value="aml_screening">AML Screening</SelectItem>
                    <SelectItem value="kyb_verification">KYB Verification</SelectItem>
                    <SelectItem value="transaction_monitoring">Transaction Monitoring</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Description"
                  value={newPolicyData.description}
                  onChange={(e) => setNewPolicyData({ ...newPolicyData, description: e.target.value })}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <PolicyFlowBuilder
          initialWorkflow={editingPolicy?.workflow_definition}
          onSave={handleSaveWorkflow}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => {
            setShowBuilder(false);
            setEditingPolicy(null);
          }}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Policy Management</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Create and manage no-code verification workflows with A/B testing
            </p>
          </div>
          <Button onClick={() => setShowBuilder(true)} className="bg-[#0066B3] hover:bg-[#004C8C]">
            <Plus className="w-4 h-4 mr-2" />
            New Policy
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading policies...</p>
          ) : policies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No policies created yet</p>
              <Button onClick={() => setShowBuilder(true)}>
                Create Your First Policy
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>A/B Testing</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{policy.name}</p>
                        <p className="text-xs text-gray-500">{policy.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {policy.type.replace(/_/g, ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(policy.status)}>
                        {policy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <p className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          {policy.approval_rate ? `${policy.approval_rate}%` : 'N/A'} approval
                        </p>
                        <p className="text-gray-500">
                          {policy.execution_count || 0} executions
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {policy.ab_testing_enabled ? (
                        <Badge className="bg-purple-100 text-purple-800">
                          <FlaskConical className="w-3 h-3 mr-1" />
                          Testing
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => enableABTesting(policy)}
                          disabled={policy.status !== 'active'}
                        >
                          Enable A/B Test
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingPolicy(policy);
                            setShowBuilder(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePolicyStatus(policy)}
                        >
                          {policy.status === 'active' ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => duplicatePolicy(policy)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSchedulingPolicy(policy);
                            setScheduleModalOpen(true);
                          }}
                          title="Schedule workflow"
                        >
                          <Clock className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deletePolicyMutation.mutate(policy.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* A/B Testing Results */}
      {policies.some(p => p.ab_testing_enabled) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">A/B Testing Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policies.filter(p => p.ab_testing_enabled).map(policy => (
                <div key={policy.id} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">{policy.name}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-xs font-semibold text-blue-900 mb-2">Variant A (Original)</p>
                      <div className="space-y-1 text-sm">
                        <p>Traffic: {policy.ab_test_config?.variant_a_percentage || 50}%</p>
                        <p>Approval Rate: {policy.approval_rate || 0}%</p>
                        <p>Executions: {policy.execution_count || 0}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="text-xs font-semibold text-purple-900 mb-2">Variant B (Test)</p>
                      <div className="space-y-1 text-sm">
                        <p>Traffic: {100 - (policy.ab_test_config?.variant_a_percentage || 50)}%</p>
                        <p className="text-gray-500">Configure variant to see results</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedule Workflow Modal */}
      {schedulingPolicy && (
        <ScheduleWorkflowModal
          open={scheduleModalOpen}
          onClose={() => {
            setScheduleModalOpen(false);
            setSchedulingPolicy(null);
          }}
          policyId={schedulingPolicy.id}
          policyName={schedulingPolicy.name}
        />
      )}
    </div>
  );
}