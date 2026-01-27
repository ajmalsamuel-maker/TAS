import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Percent, Plus, Edit, Trash2, TrendingUp, Globe, Building } from 'lucide-react';
import { toast } from 'sonner';

export default function MarkupRuleManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    rule_name: '',
    service_type: 'all_services',
    scope: 'global',
    organization_id: '',
    markup_type: 'percentage',
    fixed_markup: '',
    percentage_markup: '',
    priority: '0',
    description: ''
  });

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ['markup-rules'],
    queryFn: () => base44.entities.MarkupRule.list('-priority', 500)
  });

  const { data: organizations = [] } = useQuery({
    queryKey: ['all-organizations'],
    queryFn: () => base44.entities.Organization.list('-created_date', 500)
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.MarkupRule.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markup-rules'] });
      toast.success('Markup rule created successfully');
      setShowAddDialog(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.MarkupRule.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markup-rules'] });
      toast.success('Markup rule updated successfully');
      setEditingRule(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.MarkupRule.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markup-rules'] });
      toast.success('Markup rule deleted');
    }
  });

  const resetForm = () => {
    setFormData({
      rule_name: '',
      service_type: 'all_services',
      scope: 'global',
      organization_id: '',
      markup_type: 'percentage',
      fixed_markup: '',
      percentage_markup: '',
      priority: '0',
      description: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      fixed_markup: formData.fixed_markup ? parseFloat(formData.fixed_markup) : undefined,
      percentage_markup: formData.percentage_markup ? parseFloat(formData.percentage_markup) : undefined,
      priority: parseInt(formData.priority),
      effective_from: new Date().toISOString(),
      is_active: true
    };

    if (editingRule) {
      updateMutation.mutate({ id: editingRule.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setFormData({
      rule_name: rule.rule_name,
      service_type: rule.service_type,
      scope: rule.scope,
      organization_id: rule.organization_id || '',
      markup_type: rule.markup_type,
      fixed_markup: rule.fixed_markup?.toString() || '',
      percentage_markup: rule.percentage_markup?.toString() || '',
      priority: rule.priority?.toString() || '0',
      description: rule.description || ''
    });
    setShowAddDialog(true);
  };

  const serviceLabels = {
    all_services: 'All Services',
    lei_issuance: 'LEI Issuance',
    vlei_issuance: 'vLEI Issuance',
    kyb_verification: 'KYB Verification',
    aml_screening: 'AML Screening',
    facial_verification: 'Facial Verification'
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-blue-600" />
              Markup Rules
            </CardTitle>
            <Dialog open={showAddDialog} onOpenChange={(open) => {
              setShowAddDialog(open);
              if (!open) {
                setEditingRule(null);
                resetForm();
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingRule ? 'Edit' : 'Add'} Markup Rule</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Rule Name</Label>
                    <Input
                      placeholder="e.g., Enterprise Discount, Standard Markup"
                      value={formData.rule_name}
                      onChange={(e) => setFormData({...formData, rule_name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Service Type</Label>
                      <Select value={formData.service_type} onValueChange={(value) => setFormData({...formData, service_type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(serviceLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Scope</Label>
                      <Select value={formData.scope} onValueChange={(value) => setFormData({...formData, scope: value, organization_id: ''})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global (All Organizations)</SelectItem>
                          <SelectItem value="organization">Specific Organization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {formData.scope === 'organization' && (
                    <div>
                      <Label>Organization</Label>
                      <Select value={formData.organization_id} onValueChange={(value) => setFormData({...formData, organization_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizations.map(org => (
                            <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <Label>Markup Type</Label>
                    <Select value={formData.markup_type} onValueChange={(value) => setFormData({...formData, markup_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="both">Both (Fixed + Percentage)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(formData.markup_type === 'fixed' || formData.markup_type === 'both') && (
                      <div>
                        <Label>Fixed Markup (USD)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.fixed_markup}
                          onChange={(e) => setFormData({...formData, fixed_markup: e.target.value})}
                          required={formData.markup_type === 'fixed'}
                        />
                      </div>
                    )}
                    {(formData.markup_type === 'percentage' || formData.markup_type === 'both') && (
                      <div>
                        <Label>Percentage Markup (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          value={formData.percentage_markup}
                          onChange={(e) => setFormData({...formData, percentage_markup: e.target.value})}
                          required={formData.markup_type === 'percentage'}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Priority (Higher = Applied First)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      placeholder="Why this markup exists"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingRule ? 'Update' : 'Create'} Rule
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Markup</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No markup rules configured yet
                  </TableCell>
                </TableRow>
              ) : (
                rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.rule_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{serviceLabels[rule.service_type]}</Badge>
                    </TableCell>
                    <TableCell>
                      {rule.scope === 'global' ? (
                        <Badge className="bg-blue-600"><Globe className="h-3 w-3 mr-1" />Global</Badge>
                      ) : (
                        <Badge className="bg-purple-600"><Building className="h-3 w-3 mr-1" />Org-Specific</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {rule.markup_type === 'fixed' && <span>${rule.fixed_markup}</span>}
                      {rule.markup_type === 'percentage' && <span>{rule.percentage_markup}%</span>}
                      {rule.markup_type === 'both' && <span>${rule.fixed_markup} + {rule.percentage_markup}%</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(rule)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(rule.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}