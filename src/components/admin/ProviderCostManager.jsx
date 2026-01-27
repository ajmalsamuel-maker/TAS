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
import { DollarSign, Plus, Edit, Trash2, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ProviderCostManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCost, setEditingCost] = useState(null);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    service_type: 'lei_issuance',
    provider_name: '',
    cost_per_unit: '',
    auto_sync_enabled: false,
    api_endpoint: '',
    notes: ''
  });

  const { data: costs = [], isLoading } = useQuery({
    queryKey: ['provider-service-costs'],
    queryFn: () => base44.entities.ProviderServiceCost.list('-created_date', 500)
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.ProviderServiceCost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-service-costs'] });
      toast.success('Provider cost added successfully');
      setShowAddDialog(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ProviderServiceCost.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-service-costs'] });
      toast.success('Provider cost updated successfully');
      setEditingCost(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.ProviderServiceCost.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-service-costs'] });
      toast.success('Provider cost deleted');
    }
  });

  const resetForm = () => {
    setFormData({
      service_type: 'lei_issuance',
      provider_name: '',
      cost_per_unit: '',
      auto_sync_enabled: false,
      api_endpoint: '',
      notes: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      cost_per_unit: parseFloat(formData.cost_per_unit),
      effective_from: new Date().toISOString(),
      is_active: true
    };

    if (editingCost) {
      updateMutation.mutate({ id: editingCost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (cost) => {
    setEditingCost(cost);
    setFormData({
      service_type: cost.service_type,
      provider_name: cost.provider_name,
      cost_per_unit: cost.cost_per_unit.toString(),
      auto_sync_enabled: cost.auto_sync_enabled || false,
      api_endpoint: cost.api_endpoint || '',
      notes: cost.notes || ''
    });
    setShowAddDialog(true);
  };

  const serviceLabels = {
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
              <DollarSign className="h-5 w-5 text-green-600" />
              Provider Service Costs
            </CardTitle>
            <Dialog open={showAddDialog} onOpenChange={(open) => {
              setShowAddDialog(open);
              if (!open) {
                setEditingCost(null);
                resetForm();
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Cost
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingCost ? 'Edit' : 'Add'} Provider Cost</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      <Label>Provider Name</Label>
                      <Input
                        placeholder="e.g., RapidLEI, AMLWatcher"
                        value={formData.provider_name}
                        onChange={(e) => setFormData({...formData, provider_name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Cost Per Unit (USD)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.cost_per_unit}
                      onChange={(e) => setFormData({...formData, cost_per_unit: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Input
                      placeholder="Internal notes about this cost"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="auto-sync"
                      checked={formData.auto_sync_enabled}
                      onChange={(e) => setFormData({...formData, auto_sync_enabled: e.target.checked})}
                    />
                    <Label htmlFor="auto-sync">Enable Auto-Sync from Provider API</Label>
                  </div>
                  {formData.auto_sync_enabled && (
                    <div>
                      <Label>API Endpoint</Label>
                      <Input
                        placeholder="https://api.provider.com/pricing"
                        value={formData.api_endpoint}
                        onChange={(e) => setFormData({...formData, api_endpoint: e.target.value})}
                      />
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCost ? 'Update' : 'Add'} Cost
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
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Cost/Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auto-Sync</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No provider costs configured yet
                  </TableCell>
                </TableRow>
              ) : (
                costs.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell>
                      <Badge variant="outline">{serviceLabels[cost.service_type]}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{cost.provider_name}</TableCell>
                    <TableCell className="font-mono">${cost.cost_per_unit.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={cost.is_active ? 'bg-green-600' : 'bg-gray-400'}>
                        {cost.is_active ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {cost.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {cost.auto_sync_enabled ? (
                        <Badge variant="outline" className="bg-blue-50">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Enabled
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">Manual</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(cost)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(cost.id)}>
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