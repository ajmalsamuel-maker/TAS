import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function BillingPlansManager() {
  const queryClient = useQueryClient();
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tier: 'starter',
    base_price: 0,
    api_calls_limit: 0,
    is_active: true
  });

  // Fetch plans
  const { data: plans, isLoading } = useQuery({
    queryKey: ['billingPlans'],
    queryFn: () => base44.entities.BillingPlan.filter({})
  });

  // Create/Update plan
  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (editingPlan?.id) {
        return base44.entities.BillingPlan.update(editingPlan.id, data);
      } else {
        return base44.entities.BillingPlan.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billingPlans'] });
      toast.success(editingPlan ? 'Plan updated' : 'Plan created');
      setFormData({
        name: '',
        tier: 'starter',
        base_price: 0,
        api_calls_limit: 0,
        is_active: true
      });
      setEditingPlan(null);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  // Delete plan
  const deleteMutation = useMutation({
    mutationFn: (planId) => base44.entities.BillingPlan.delete(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billingPlans'] });
      toast.success('Plan deleted');
    }
  });

  if (isLoading) {
    return <div className="text-center py-8"><Loader className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card className="bg-blue-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle>{editingPlan ? 'Edit Plan' : 'Create New Plan'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Plan Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Starter Plan"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Tier</label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({...formData, tier: e.target.value})}
                className="w-full border rounded px-3 py-2"
              >
                <option value="starter">Starter</option>
                <option value="business">Business</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Base Price (USD/month)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.base_price}
                onChange={(e) => setFormData({...formData, base_price: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">API Calls Limit</label>
              <Input
                type="number"
                value={formData.api_calls_limit}
                onChange={(e) => setFormData({...formData, api_calls_limit: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Overage Price (per call)</label>
              <Input
                type="number"
                step="0.001"
                value={formData.overage_price_per_call || 0}
                onChange={(e) => setFormData({...formData, overage_price_per_call: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Annual Discount (%)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.discount_percentage || 0}
                onChange={(e) => setFormData({...formData, discount_percentage: parseFloat(e.target.value)})}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              className="rounded"
            />
            <label className="text-sm">Active</label>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => saveMutation.mutate(formData)}
              disabled={saveMutation.isPending}
              className="flex-1"
            >
              {saveMutation.isPending ? 'Saving...' : (editingPlan ? 'Update Plan' : 'Create Plan')}
            </Button>
            {editingPlan && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingPlan(null);
                  setFormData({
                    name: '',
                    tier: 'starter',
                    base_price: 0,
                    api_calls_limit: 0,
                    is_active: true
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plans List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Existing Plans</h3>
        {plans?.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold">{plan.name}</h4>
                    {plan.is_active ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Price:</strong> ${plan.base_price}/month</p>
                    <p><strong>API Calls:</strong> {plan.api_calls_limit.toLocaleString()} included</p>
                    <p><strong>Overage:</strong> ${plan.overage_price_per_call}/call</p>
                    {plan.discount_percentage > 0 && (
                      <p><strong>Annual Discount:</strong> {plan.discount_percentage}%</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingPlan(plan);
                      setFormData(plan);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMutation.mutate(plan.id)}
                    disabled={deleteMutation.isPending}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}