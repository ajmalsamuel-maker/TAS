import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Check, AlertTriangle, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function TMaaSRules() {
  const [user, setUser] = useState(null);
  const [rules, setRules] = useState([]);
  const [showAddRule, setShowAddRule] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [newRule, setNewRule] = useState({
    name: '',
    type: 'velocity',
    condition: 'greater_than',
    value: '',
    action: 'flag',
    enabled: true
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: transactionRules } = useQuery({
    queryKey: ['transactionRules', user?.organization_id],
    queryFn: () => base44.entities.TransactionRule?.filter({ organization_id: user?.organization_id }) || [],
    enabled: !!user?.organization_id,
    initialData: []
  });

  // Update local rules when data changes
  useEffect(() => {
    if (transactionRules) setRules(transactionRules);
  }, [transactionRules]);

  const createRuleMutation = useMutation({
    mutationFn: (ruleData) => base44.entities.TransactionRule?.create({
      ...ruleData,
      organization_id: user?.organization_id
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactionRules'] });
      toast.success('Rule created');
      setNewRule({ name: '', type: 'velocity', condition: 'greater_than', value: '', action: 'flag', enabled: true });
      setShowAddRule(false);
    }
  });

  const updateRuleMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TransactionRule?.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactionRules'] });
      toast.success('Rule updated');
      setEditingRule(null);
    }
  });

  const deleteRuleMutation = useMutation({
    mutationFn: (ruleId) => base44.entities.TransactionRule?.delete(ruleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactionRules'] });
      toast.success('Rule deleted');
    }
  });

  const handleSaveRule = () => {
    if (!newRule.name || !newRule.value) {
      toast.error('Fill in all required fields');
      return;
    }
    createRuleMutation.mutate(newRule);
  };

  const typeDescriptions = {
    velocity: 'Transactions per time period',
    amount: 'Single transaction amount threshold',
    country: 'High-risk country screening',
    pattern: 'Unusual transaction patterns'
  };

  const actionColors = {
    auto_approve: 'bg-green-100 text-green-800',
    flag: 'bg-yellow-100 text-yellow-800',
    auto_block: 'bg-red-100 text-red-800'
  };

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Monitoring Rules</h1>
            <p className="text-lg text-gray-600">Configure rules for automated screening decisions</p>
          </div>
          <Button onClick={() => setShowAddRule(true)} className="bg-[#0044CC] hover:bg-[#002D66]">
            <Plus className="mr-2 h-4 w-4" />
            New Rule
          </Button>
        </div>

        {/* Add Rule Form */}
        {showAddRule && (
          <Card className="mb-8 border-2 border-blue-300">
            <CardHeader className="bg-blue-50">
              <CardTitle>Create New Rule</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Rule Name *</label>
                  <Input
                    placeholder="e.g., High Volume Check"
                    value={newRule.name}
                    onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Rule Type *</label>
                  <Select value={newRule.type} onValueChange={(val) => setNewRule({...newRule, type: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="velocity">Velocity (transactions per hour)</SelectItem>
                      <SelectItem value="amount">Amount Threshold</SelectItem>
                      <SelectItem value="country">High-Risk Country</SelectItem>
                      <SelectItem value="pattern">Unusual Pattern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Condition *</label>
                  <Select value={newRule.condition} onValueChange={(val) => setNewRule({...newRule, condition: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greater_than">Greater Than</SelectItem>
                      <SelectItem value="less_than">Less Than</SelectItem>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Value *</label>
                  <Input
                    placeholder="e.g., 5, 10000, USD"
                    value={newRule.value}
                    onChange={(e) => setNewRule({...newRule, value: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Action *</label>
                  <Select value={newRule.action} onValueChange={(val) => setNewRule({...newRule, action: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto_approve">Auto-Approve</SelectItem>
                      <SelectItem value="flag">Flag for Review</SelectItem>
                      <SelectItem value="auto_block">Auto-Block</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="flex items-center gap-3 mt-8">
                    <input
                      type="checkbox"
                      checked={newRule.enabled}
                      onChange={(e) => setNewRule({...newRule, enabled: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-gray-900">Enable Rule</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={handleSaveRule}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={createRuleMutation.isPending}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Create Rule
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddRule(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rules List */}
        <div className="space-y-4">
          {rules?.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Zap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No rules configured yet</p>
                <Button onClick={() => setShowAddRule(true)} className="bg-[#0044CC] hover:bg-[#002D66]">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Rule
                </Button>
              </CardContent>
            </Card>
          ) : (
            rules?.map((rule) => (
              <Card key={rule.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{rule.name}</h3>
                        {rule.enabled ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{typeDescriptions[rule.type] || rule.type}</p>
                      
                      <div className="grid sm:grid-cols-4 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-500 mb-1">TYPE</p>
                          <p className="font-semibold text-gray-900 capitalize">{rule.type}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-500 mb-1">CONDITION</p>
                          <p className="font-semibold text-gray-900 capitalize">{rule.condition?.replace('_', ' ')}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-500 mb-1">VALUE</p>
                          <p className="font-semibold text-gray-900">{rule.value}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-500 mb-1">ACTION</p>
                          <Badge className={actionColors[rule.action]}>{rule.action?.replace('_', ' ').toUpperCase()}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setEditingRule(rule)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteRuleMutation.mutate(rule.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              How Rules Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <p>
              <strong>Velocity Rules:</strong> Monitor the number of transactions from an account within a specified timeframe. Trigger when exceeded.
            </p>
            <p>
              <strong>Amount Rules:</strong> Flag or block transactions based on their value. Useful for setting thresholds for manual review.
            </p>
            <p>
              <strong>Country Rules:</strong> Automatically screen transactions involving high-risk jurisdictions against your compliance policies.
            </p>
            <p>
              <strong>Pattern Rules:</strong> Detect anomalous behavior like sudden account changes or unusual transaction sequences.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}