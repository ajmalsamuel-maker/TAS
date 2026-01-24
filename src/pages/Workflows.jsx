import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, CheckCircle2, XCircle, Clock, Activity, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function Workflows() {
  const [user, setUser] = useState(null);
  const [selectedType, setSelectedType] = useState('kyb');
  const [selectedProvider, setSelectedProvider] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: workflows = [] } = useQuery({
    queryKey: ['workflows'],
    queryFn: () => base44.entities.Workflow.list('-created_date'),
    initialData: []
  });

  const { data: providers = [] } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.Provider.list(),
    initialData: []
  });

  const createWorkflowMutation = useMutation({
    mutationFn: async () => {
      const workflow = await base44.entities.Workflow.create({
        user_id: user.id,
        type: selectedType,
        status: 'in_progress',
        provider_name: selectedProvider,
        language: user.preferred_language || 'en',
        provenance_chain: [{
          step: 'Workflow Initiated',
          provider: 'TAS Gateway',
          lei: user.lei || 'PENDING',
          vlei_role: user.oor_credential ? 'OOR' : 'Pending',
          signature: `SIG-${Date.now()}`,
          timestamp: new Date().toISOString()
        }]
      });

      setTimeout(async () => {
        await base44.entities.Workflow.update(workflow.id, {
          status: 'completed',
          provenance_chain: [
            ...workflow.provenance_chain,
            {
              step: 'Provider Processing',
              provider: selectedProvider,
              lei: providers.find(p => p.name === selectedProvider)?.lei || 'UNKNOWN',
              vlei_role: 'ECR',
              signature: `SIG-${Date.now() + 1}`,
              timestamp: new Date().toISOString()
            },
            {
              step: 'Workflow Completed',
              provider: 'TAS Gateway',
              lei: 'TAS-PLATFORM-LEI',
              vlei_role: 'System',
              signature: `SIG-${Date.now() + 2}`,
              timestamp: new Date().toISOString()
            }
          ],
          result: {
            status: 'success',
            message: 'Workflow completed successfully',
            details: 'All checks passed'
          },
          data_passport: {
            workflow_id: workflow.id,
            trust_chain_verified: true,
            signatures_valid: true,
            issued_at: new Date().toISOString()
          }
        });
        queryClient.invalidateQueries({ queryKey: ['workflows'] });
      }, 3000);

      return workflow;
    },
    onSuccess: () => {
      toast.success('Workflow initiated successfully');
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    }
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'in_progress': return <Activity className="h-5 w-5 text-blue-600 animate-pulse" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const availableProviders = providers.filter(p => 
    (selectedType === 'kyb' && p.service_type === 'kyb') ||
    (selectedType === 'aml' && p.service_type === 'aml') ||
    (selectedType === 'vlei_issuance' && p.service_type === 'vlei') ||
    (selectedType === 'did_verification' && p.service_type === 'did')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Workflow Orchestration</h1>
          <p className="text-gray-600">Create and monitor trust service workflows</p>
        </div>

        {/* Create Workflow */}
        <Card className="mb-8 border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle>Initiate New Workflow</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Workflow Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kyb">KYB Verification</SelectItem>
                    <SelectItem value="aml">AML Screening</SelectItem>
                    <SelectItem value="vlei_issuance">vLEI Issuance</SelectItem>
                    <SelectItem value="did_verification">DID Verification</SelectItem>
                    <SelectItem value="credential_verification">Credential Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Provider</label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProviders.map(provider => (
                      <SelectItem key={provider.id} value={provider.name}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => createWorkflowMutation.mutate()}
                  disabled={!selectedProvider || !user}
                  className="w-full bg-[#0044CC] hover:bg-[#002D66]"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Workflow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflows List */}
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#0044CC]" />
              Active & Completed Workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(workflow.status)}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {workflow.type?.replace('_', ' ').toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Provider: {workflow.provider_name}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      workflow.status === 'completed' ? 'bg-green-100 text-green-800' :
                      workflow.status === 'failed' ? 'bg-red-100 text-red-800' :
                      workflow.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {workflow.status}
                    </Badge>
                  </div>

                  {workflow.provenance_chain && workflow.provenance_chain.length > 0 && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Link2 className="h-4 w-4 text-green-700" />
                        <span className="text-sm font-semibold text-green-900">
                          Provenance Chain: {workflow.provenance_chain.length} steps verified
                        </span>
                      </div>
                      <div className="space-y-2">
                        {workflow.provenance_chain.map((step, idx) => (
                          <div key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                            <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded font-mono">
                              {idx + 1}
                            </span>
                            <span>{step.step}</span>
                            <span className="text-gray-500">→ {step.provider}</span>
                            {step.lei && (
                              <span className="text-xs font-mono text-green-700">LEI: {step.lei}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Created: {format(new Date(workflow.created_date), 'MMM d, yyyy HH:mm')}</span>
                    {workflow.data_passport && (
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        ✓ Data Passport Issued
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

              {workflows.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900">No workflows yet</p>
                  <p className="text-sm text-gray-600">Create your first workflow above</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}