import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';

export default function TransactionRules() {
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rule_type: 'amount_threshold',
    severity: 'medium',
    action: 'flag',
    is_active: true,
    auto_create_case: false,
    conditions: {}
  });

  const queryClient = useQueryClient();

  const { data: rules = [] } = useQuery({
    queryKey: ['transaction-rules'],
    queryFn: () => base44.entities.TransactionRule.list('-created_date'),
    initialData: []
  });

  const createRuleMutation = useMutation({
    mutationFn: (data) => base44.entities.TransactionRule.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['transaction-rules']);
      setShowForm(false);
      resetForm();
      toast.success('Rule created');
    }
  });

  const updateRuleMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TransactionRule.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['transaction-rules']);
      setShowForm(false);
      setEditingRule(null);
      resetForm();
      toast.success('Rule updated');
    }
  });

  const deleteRuleMutation = useMutation({
    mutationFn: (id) => base44.entities.TransactionRule.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['transaction-rules']);
      toast.success('Rule deleted');
    }
  });

  const toggleRuleStatus = (rule) => {
    updateRuleMutation.mutate({
      id: rule.id,
      data: { is_active: !rule.is_active }
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      rule_type: 'amount_threshold',
      severity: 'medium',
      action: 'flag',
      is_active: true,
      auto_create_case: false,
      conditions: {}
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRule) {
      updateRuleMutation.mutate({ id: editingRule.id, data: formData });
    } else {
      createRuleMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction Monitoring Rules</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Configure automated rules for transaction screening and risk detection
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            New Rule
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Rule Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Select
                  value={formData.rule_type}
                  onValueChange={(v) => setFormData({ ...formData, rule_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount_threshold">Amount Threshold</SelectItem>
                    <SelectItem value="velocity">Velocity Check</SelectItem>
                    <SelectItem value="geographic">Geographic Risk</SelectItem>
                    <SelectItem value="watchlist">Watchlist Match</SelectItem>
                    <SelectItem value="pattern">Pattern Detection</SelectItem>
                    <SelectItem value="behavioral">Behavioral Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />

              <div className="grid md:grid-cols-3 gap-4">
                <Select
                  value={formData.severity}
                  onValueChange={(v) => setFormData({ ...formData, severity: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={formData.action}
                  onValueChange={(v) => setFormData({ ...formData, action: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flag">Flag for Review</SelectItem>
                    <SelectItem value="block">Block Transaction</SelectItem>
                    <SelectItem value="review">Manual Review</SelectItem>
                    <SelectItem value="alert">Send Alert</SelectItem>
                  </SelectContent>
                </Select>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.auto_create_case}
                    onChange={(e) => setFormData({ ...formData, auto_create_case: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Auto-create case</span>
                </label>
              </div>

              {/* Rule-specific conditions */}
              <div className="border-t pt-4">
                <p className="font-semibold text-sm mb-3">Rule Conditions</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.rule_type === 'amount_threshold' && (
                    <>
                      <Input
                        type="number"
                        placeholder="Minimum Amount"
                        value={formData.conditions.amount_min || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, amount_min: parseFloat(e.target.value) }
                        })}
                      />
                      <Input
                        type="number"
                        placeholder="Maximum Amount"
                        value={formData.conditions.amount_max || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, amount_max: parseFloat(e.target.value) }
                        })}
                      />
                    </>
                  )}
                  {formData.rule_type === 'velocity' && (
                    <>
                      <Input
                        type="number"
                        placeholder="Transaction Count"
                        value={formData.conditions.transaction_count || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, transaction_count: parseInt(e.target.value) }
                        })}
                      />
                      <Input
                        type="number"
                        placeholder="Time Window (minutes)"
                        value={formData.conditions.time_window_minutes || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, time_window_minutes: parseInt(e.target.value) }
                        })}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingRule ? 'Update' : 'Create'} Rule
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setEditingRule(null);
                  resetForm();
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-xs text-gray-500">{rule.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{rule.rule_type.replace(/_/g, ' ')}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      rule.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      rule.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      rule.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {rule.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{rule.action}</TableCell>
                  <TableCell>
                    <Badge className={rule.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rule.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{rule.trigger_count || 0}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleRuleStatus(rule)}
                      >
                        {rule.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteRuleMutation.mutate(rule.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}