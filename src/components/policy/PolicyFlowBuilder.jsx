import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Play, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function PolicyFlowBuilder({ organization }) {
  const [policyName, setPolicyName] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [nodes, setNodes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const availableNodes = [
    { type: 'kyb_check', label: 'KYB Verification', color: 'bg-blue-100' },
    { type: 'aml_screening', label: 'AML Screening', color: 'bg-red-100' },
    { type: 'facial_verification', label: 'Facial Verification', color: 'bg-purple-100' },
    { type: 'decision', label: 'Decision Gate', color: 'bg-yellow-100' },
    { type: 'webhook', label: 'Webhook Call', color: 'bg-green-100' },
    { type: 'notification', label: 'Send Notification', color: 'bg-indigo-100' }
  ];

  const addNode = (nodeType) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: nodeType,
      label: availableNodes.find(n => n.type === nodeType)?.label,
      config: {}
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
  };

  const handleSavePolicy = async () => {
    if (!policyName.trim()) {
      toast.error('Please enter a policy name');
      return;
    }

    if (nodes.length === 0) {
      toast.error('Policy must have at least one step');
      return;
    }

    setIsSaving(true);
    try {
      await base44.functions.invoke('createCustomPolicy', {
        organizationId: organization.id,
        name: policyName,
        description: policyDescription,
        workflow_definition: {
          nodes: nodes,
          edges: [] // In production, define connections between nodes
        }
      });

      toast.success('Policy saved successfully');
      setPolicyName('');
      setPolicyDescription('');
      setNodes([]);
    } catch (error) {
      toast.error('Failed to save policy');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestPolicy = async () => {
    if (nodes.length === 0) {
      toast.error('Add at least one workflow step');
      return;
    }

    setIsExecuting(true);
    try {
      await base44.functions.invoke('testWorkflowExecution', {
        organizationId: organization.id,
        workflowDefinition: {
          nodes: nodes,
          edges: []
        }
      });

      toast.success('Policy test completed successfully');
    } catch (error) {
      toast.error('Policy test failed');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Policy Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Create Custom Verification Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Policy Name
            </label>
            <Input
              type="text"
              placeholder="e.g., Enhanced KYB for Finance"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Description
            </label>
            <Input
              type="text"
              placeholder="Describe what this policy does..."
              value={policyDescription}
              onChange={(e) => setPolicyDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Workflow Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Node Library */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Available Steps</p>
            <div className="grid grid-cols-2 gap-2">
              {availableNodes.map((node) => (
                <Button
                  key={node.type}
                  onClick={() => addNode(node.type)}
                  variant="outline"
                  className="justify-start text-left h-auto py-2"
                >
                  <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{node.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Workflow Canvas */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg min-h-64 border-2 border-dashed border-gray-300">
            {nodes.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-center">
                <div>
                  <p className="text-gray-500 text-sm mb-2">No steps added yet</p>
                  <p className="text-xs text-gray-400">Click a step type above to add to workflow</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {nodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className={`p-3 rounded-lg border-2 flex items-center justify-between ${
                      availableNodes.find(n => n.type === node.type)?.color
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        {idx + 1}. {node.label}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {node.type === 'kyb_check' && 'Verify business registration'}
                        {node.type === 'aml_screening' && 'Screen against sanctions lists'}
                        {node.type === 'facial_verification' && 'Perform liveness test'}
                        {node.type === 'decision' && 'Approve or reject based on criteria'}
                        {node.type === 'webhook' && 'Call external webhook endpoint'}
                        {node.type === 'notification' && 'Send notification to user'}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeNode(node.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleTestPolicy}
          disabled={nodes.length === 0 || isExecuting}
          variant="outline"
          className="flex-1"
        >
          {isExecuting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Test Policy
            </>
          )}
        </Button>
        <Button
          onClick={handleSavePolicy}
          disabled={!policyName.trim() || nodes.length === 0 || isSaving}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {isSaving ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Policy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}