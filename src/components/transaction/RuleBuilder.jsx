import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const ATTRIBUTES = [
  { value: 'amount', label: 'Transaction Amount' },
  { value: 'country', label: 'Counterparty Country' },
  { value: 'velocity', label: 'Velocity (24h count)' },
  { value: 'risk_score', label: 'Risk Score' },
  { value: 'currency', label: 'Currency' },
  { value: 'transaction_type', label: 'Transaction Type' },
  { value: 'counterparty_name', label: 'Counterparty Name' },
  { value: 'ip_address', label: 'IP Address Risk' },
];

const OPERATORS = [
  { value: 'greater_than', label: 'Greater Than (>)' },
  { value: 'less_than', label: 'Less Than (<)' },
  { value: 'equals', label: 'Equals (=)' },
  { value: 'contains', label: 'Contains' },
  { value: 'in_list', label: 'In List' },
  { value: 'between', label: 'Between' },
  { value: 'matches_pattern', label: 'Regex Pattern' },
];

const ACTIONS = [
  { value: 'auto_approve', label: 'Auto Approve' },
  { value: 'auto_block', label: 'Auto Block' },
  { value: 'escalate_to_case', label: 'Escalate to Case' },
  { value: 'flag', label: 'Flag for Review' },
  { value: 'require_additional_verification', label: 'Require Additional Verification' },
];

const ENRICHMENT_OPTIONS = [
  { value: 'geo_ip', label: 'Geo-IP Lookup' },
  { value: 'domain_reputation', label: 'Domain Reputation' },
  { value: 'device_fingerprint', label: 'Device Fingerprinting' },
  { value: 'velocity_history', label: 'Velocity History' },
];

export default function RuleBuilder({ rule, onClose, onSave }) {
  const [ruleData, setRuleData] = useState({
    name: rule?.name || '',
    description: rule?.description || '',
    rule_type: rule?.rule_type || 'simple',
    conditions: rule?.conditions || [{ attribute: '', operator: '', value: '' }],
    logic: rule?.logic || 'AND',
    automated_actions: rule?.automated_actions || { action_type: '', escalation_priority: 'medium' },
    data_enrichment: rule?.data_enrichment || [],
    priority: rule?.priority || 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const org = await base44.auth.me();
      const submitData = {
        ...ruleData,
        organization_id: org.organization_id
      };

      if (rule?.id) {
        await base44.entities.TransactionRule.update(rule.id, submitData);
        toast.success('Rule updated');
      } else {
        await base44.entities.TransactionRule.create(submitData);
        toast.success('Rule created');
      }

      queryClient.invalidateQueries({ queryKey: ['transaction-rules'] });
      onSave?.();
    } catch (error) {
      toast.error('Failed to save rule');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCondition = () => {
    setRuleData(prev => ({
      ...prev,
      conditions: [...prev.conditions, { attribute: '', operator: '', value: '' }]
    }));
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...ruleData.conditions];
    newConditions[index][field] = value;
    setRuleData(prev => ({ ...prev, conditions: newConditions }));
  };

  const removeCondition = (index) => {
    setRuleData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <Card className="w-full max-w-3xl border-2 border-blue-100 my-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 flex flex-row items-center justify-between">
          <CardTitle>{rule?.id ? 'Edit Rule' : 'Create Transaction Rule'}</CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rule Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rule Name *</label>
                <Input
                  placeholder="e.g., Block High Risk Jurisdictions"
                  value={ruleData.name}
                  onChange={(e) => setRuleData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  placeholder="What does this rule detect?"
                  value={ruleData.description}
                  onChange={(e) => setRuleData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Rule Type */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rule Type</h3>
            <div className="flex gap-4">
              {['simple', 'complex'].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rule_type"
                    value={type}
                    checked={ruleData.rule_type === type}
                    onChange={(e) => setRuleData(prev => ({ ...prev, rule_type: e.target.value }))}
                  />
                  <span className="capitalize font-medium">{type}</span>
                  <span className="text-xs text-gray-600">
                    {type === 'simple' ? '(single condition)' : '(multiple conditions)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Conditions</h3>
              <Button size="sm" onClick={addCondition} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Condition
              </Button>
            </div>

            {ruleData.rule_type === 'complex' && ruleData.conditions.length > 1 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <label className="block text-sm font-medium mb-2">Logic:</label>
                <select
                  value={ruleData.logic}
                  onChange={(e) => setRuleData(prev => ({ ...prev, logic: e.target.value }))}
                  className="w-full md:w-48 px-3 py-2 border rounded-lg"
                >
                  <option value="AND">ALL conditions must match (AND)</option>
                  <option value="OR">ANY condition matches (OR)</option>
                </select>
              </div>
            )}

            <div className="space-y-3">
              {ruleData.conditions.map((condition, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex gap-2 items-center">
                    {idx > 0 && <Badge>{ruleData.logic}</Badge>}
                    <span className="text-sm text-gray-600">Condition {idx + 1}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-3">
                    <select
                      value={condition.attribute}
                      onChange={(e) => updateCondition(idx, 'attribute', e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select attribute</option>
                      {ATTRIBUTES.map(attr => (
                        <option key={attr.value} value={attr.value}>{attr.label}</option>
                      ))}
                    </select>

                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select operator</option>
                      {OPERATORS.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>

                    <Input
                      placeholder="Value"
                      value={condition.value}
                      onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                    />
                  </div>

                  {ruleData.conditions.length > 1 && (
                    <button
                      onClick={() => removeCondition(idx)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="h-4 w-4 inline mr-1" />
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Automated Action */}
          <div>
            <h3 className="text-lg font-semibold mb-4">When Rule Triggers</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Action Type *</label>
                <select
                  value={ruleData.automated_actions.action_type}
                  onChange={(e) => setRuleData(prev => ({
                    ...prev,
                    automated_actions: { ...prev.automated_actions, action_type: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select action</option>
                  {ACTIONS.map(action => (
                    <option key={action.value} value={action.value}>{action.label}</option>
                  ))}
                </select>
              </div>

              {['escalate_to_case', 'flag'].includes(ruleData.automated_actions.action_type) && (
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <select
                    value={ruleData.automated_actions.escalation_priority || 'medium'}
                    onChange={(e) => setRuleData(prev => ({
                      ...prev,
                      automated_actions: { ...prev.automated_actions, escalation_priority: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Data Enrichment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Enrichment</h3>
            <p className="text-sm text-gray-600 mb-3">Select external data sources to enrich transactions</p>
            <div className="space-y-2">
              {ENRICHMENT_OPTIONS.map(option => (
                <label key={option.value} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={ruleData.data_enrichment.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRuleData(prev => ({
                          ...prev,
                          data_enrichment: [...prev.data_enrichment, option.value]
                        }));
                      } else {
                        setRuleData(prev => ({
                          ...prev,
                          data_enrichment: prev.data_enrichment.filter(v => v !== option.value)
                        }));
                      }
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-2">Evaluation Priority</label>
            <Input
              type="number"
              min="1"
              max="100"
              value={ruleData.priority}
              onChange={(e) => setRuleData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
            />
            <p className="text-xs text-gray-600 mt-1">Lower number = higher priority (evaluated first)</p>
          </div>
        </CardContent>

        {/* Actions */}
        <div className="border-t p-6 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#0044CC] hover:bg-[#002D66]"
            disabled={isLoading || !ruleData.name || !ruleData.automated_actions.action_type}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Rule'}
          </Button>
        </div>
      </Card>
    </div>
  );
}