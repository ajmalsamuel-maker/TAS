import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit2, Trash2, Loader, DollarSign, Percent, Globe, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function BillingPlansManager() {
  const queryClient = useQueryClient();
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tier: 'starter',
    base_price: 0,
    api_calls_limit: 0,
    is_active: true,
    component_pricing: {
      lei_issuance: 0,
      vlei_issuance: 50,
      kyb_verification: 0,
      aml_screening: 0,
      document_verification: 0,
      api_call: 0
    },
    promotional_pricing: {
      is_active: false
    },
    regional_pricing: [],
    organization_discounts: []
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: ['billingPlans'],
    queryFn: () => base44.entities.BillingPlan.filter({})
  });

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list()
  });

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
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (planId) => base44.entities.BillingPlan.delete(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billingPlans'] });
      toast.success('Plan deleted');
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      tier: 'starter',
      base_price: 0,
      api_calls_limit: 0,
      is_active: true,
      component_pricing: {
        lei_issuance: 0,
        vlei_issuance: 50,
        kyb_verification: 0,
        aml_screening: 0,
        document_verification: 0,
        api_call: 0
      },
      promotional_pricing: {
        is_active: false
      },
      regional_pricing: [],
      organization_discounts: []
    });
    setEditingPlan(null);
  };

  const addRegionalPricing = () => {
    setFormData({
      ...formData,
      regional_pricing: [
        ...(formData.regional_pricing || []),
        {
          region_type: 'country',
          region_code: '',
          region_name: '',
          price_multiplier: 1.0
        }
      ]
    });
  };

  const removeRegionalPricing = (index) => {
    const updated = [...(formData.regional_pricing || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, regional_pricing: updated });
  };

  const addOrgDiscount = () => {
    setFormData({
      ...formData,
      organization_discounts: [
        ...(formData.organization_discounts || []),
        {
          organization_id: '',
          organization_name: '',
          discount_percentage: 0,
          reason: ''
        }
      ]
    });
  };

  const removeOrgDiscount = (index) => {
    const updated = [...(formData.organization_discounts || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, organization_discounts: updated });
  };

  if (isLoading) {
    return <div className="text-center py-8"><Loader className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle>{editingPlan ? 'Edit Plan' : 'Create New Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="components">Component Pricing</TabsTrigger>
              <TabsTrigger value="promo">Promotions</TabsTrigger>
              <TabsTrigger value="regional">Regional Pricing</TabsTrigger>
              <TabsTrigger value="discounts">Organization Discounts</TabsTrigger>
            </TabsList>

            {/* Basic Info */}
            <TabsContent value="basic" className="space-y-4">
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
                <label className="text-sm">Plan Active</label>
              </div>
            </TabsContent>

            {/* Component Pricing */}
            <TabsContent value="components" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Service Component Pricing
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">LEI Issuance Price ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.component_pricing?.lei_issuance || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        component_pricing: {
                          ...formData.component_pricing,
                          lei_issuance: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">vLEI Issuance Price ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.component_pricing?.vlei_issuance || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        component_pricing: {
                          ...formData.component_pricing,
                          vlei_issuance: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">KYB Verification ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.component_pricing?.kyb_verification || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        component_pricing: {
                          ...formData.component_pricing,
                          kyb_verification: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">AML Screening ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.component_pricing?.aml_screening || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        component_pricing: {
                          ...formData.component_pricing,
                          aml_screening: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Document Verification ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.component_pricing?.document_verification || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        component_pricing: {
                          ...formData.component_pricing,
                          document_verification: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">API Call Price ($)</label>
                    <Input
                      type="number"
                      step="0.001"
                      value={formData.component_pricing?.api_call || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        component_pricing: {
                          ...formData.component_pricing,
                          api_call: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Promotional Pricing */}
            <TabsContent value="promo" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-orange-600" />
                  Time-Limited Promotion
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.promotional_pricing?.is_active || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        promotional_pricing: {
                          ...formData.promotional_pricing,
                          is_active: e.target.checked
                        }
                      })}
                      className="rounded"
                    />
                    <label className="text-sm font-semibold">Active Promotion</label>
                  </div>
                  {formData.promotional_pricing?.is_active && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold">Start Date</label>
                        <Input
                          type="datetime-local"
                          value={formData.promotional_pricing?.start_date?.substring(0, 16) || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            promotional_pricing: {
                              ...formData.promotional_pricing,
                              start_date: e.target.value
                            }
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">End Date</label>
                        <Input
                          type="datetime-local"
                          value={formData.promotional_pricing?.end_date?.substring(0, 16) || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            promotional_pricing: {
                              ...formData.promotional_pricing,
                              end_date: e.target.value
                            }
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Discount Percentage (%)</label>
                        <Input
                          type="number"
                          step="0.1"
                          value={formData.promotional_pricing?.discount_percentage || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            promotional_pricing: {
                              ...formData.promotional_pricing,
                              discount_percentage: parseFloat(e.target.value)
                            }
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Promo Code (optional)</label>
                        <Input
                          value={formData.promotional_pricing?.promo_code || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            promotional_pricing: {
                              ...formData.promotional_pricing,
                              promo_code: e.target.value
                            }
                          })}
                          placeholder="e.g., LAUNCH2026"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-semibold">Description</label>
                        <Input
                          value={formData.promotional_pricing?.description || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            promotional_pricing: {
                              ...formData.promotional_pricing,
                              description: e.target.value
                            }
                          })}
                          placeholder="e.g., New Year Launch Special"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Regional Pricing */}
            <TabsContent value="regional" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Regional Pricing Rules
                  </h3>
                  <Button size="sm" onClick={addRegionalPricing}>
                    <Plus className="h-4 w-4 mr-1" /> Add Region
                  </Button>
                </div>
                <div className="space-y-3">
                  {(formData.regional_pricing || []).map((region, idx) => (
                    <div key={idx} className="border rounded p-3 bg-gray-50">
                      <div className="grid md:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs font-semibold">Type</label>
                          <select
                            value={region.region_type}
                            onChange={(e) => {
                              const updated = [...formData.regional_pricing];
                              updated[idx].region_type = e.target.value;
                              setFormData({ ...formData, regional_pricing: updated });
                            }}
                            className="w-full border rounded px-2 py-1 text-sm"
                          >
                            <option value="country">Country</option>
                            <option value="continent">Continent</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold">Code</label>
                          <Input
                            size="sm"
                            value={region.region_code}
                            onChange={(e) => {
                              const updated = [...formData.regional_pricing];
                              updated[idx].region_code = e.target.value;
                              setFormData({ ...formData, regional_pricing: updated });
                            }}
                            placeholder="US, EU, CN"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold">Name</label>
                          <Input
                            size="sm"
                            value={region.region_name}
                            onChange={(e) => {
                              const updated = [...formData.regional_pricing];
                              updated[idx].region_name = e.target.value;
                              setFormData({ ...formData, regional_pricing: updated });
                            }}
                            placeholder="United States"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold">Price Multiplier</label>
                          <Input
                            size="sm"
                            type="number"
                            step="0.01"
                            value={region.price_multiplier}
                            onChange={(e) => {
                              const updated = [...formData.regional_pricing];
                              updated[idx].price_multiplier = parseFloat(e.target.value);
                              setFormData({ ...formData, regional_pricing: updated });
                            }}
                            placeholder="1.0"
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeRegionalPricing(idx)}
                        className="mt-2 text-red-600"
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Remove
                      </Button>
                    </div>
                  ))}
                  {(!formData.regional_pricing || formData.regional_pricing.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">No regional pricing rules</p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Organization Discounts */}
            <TabsContent value="discounts" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Percent className="h-5 w-5 text-purple-600" />
                    Individual Organization Discounts
                  </h3>
                  <Button size="sm" onClick={addOrgDiscount}>
                    <Plus className="h-4 w-4 mr-1" /> Add Discount
                  </Button>
                </div>
                <div className="space-y-3">
                  {(formData.organization_discounts || []).map((discount, idx) => (
                    <div key={idx} className="border rounded p-3 bg-gray-50">
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold">Organization</label>
                          <select
                            value={discount.organization_id}
                            onChange={(e) => {
                              const org = organizations.find(o => o.id === e.target.value);
                              const updated = [...formData.organization_discounts];
                              updated[idx].organization_id = e.target.value;
                              updated[idx].organization_name = org?.name || '';
                              setFormData({ ...formData, organization_discounts: updated });
                            }}
                            className="w-full border rounded px-2 py-1 text-sm"
                          >
                            <option value="">Select Organization</option>
                            {organizations.map(org => (
                              <option key={org.id} value={org.id}>{org.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold">Discount (%)</label>
                          <Input
                            size="sm"
                            type="number"
                            step="0.1"
                            value={discount.discount_percentage}
                            onChange={(e) => {
                              const updated = [...formData.organization_discounts];
                              updated[idx].discount_percentage = parseFloat(e.target.value);
                              setFormData({ ...formData, organization_discounts: updated });
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold">Reason</label>
                          <Input
                            size="sm"
                            value={discount.reason}
                            onChange={(e) => {
                              const updated = [...formData.organization_discounts];
                              updated[idx].reason = e.target.value;
                              setFormData({ ...formData, organization_discounts: updated });
                            }}
                            placeholder="Partner, Early Adopter"
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeOrgDiscount(idx)}
                        className="mt-2 text-red-600"
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Remove
                      </Button>
                    </div>
                  ))}
                  {(!formData.organization_discounts || formData.organization_discounts.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">No organization-specific discounts</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => saveMutation.mutate(formData)}
              disabled={saveMutation.isPending}
              className="flex-1"
            >
              {saveMutation.isPending ? 'Saving...' : (editingPlan ? 'Update Plan' : 'Create Plan')}
            </Button>
            {editingPlan && (
              <Button variant="outline" onClick={resetForm}>
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
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    {plan.is_active ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                    {plan.promotional_pricing?.is_active && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <Tag className="h-3 w-3 mr-1" />
                        Promo Active
                      </Badge>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Base Price:</strong> ${plan.base_price}/month</p>
                      <p><strong>API Calls:</strong> {plan.api_calls_limit?.toLocaleString()} included</p>
                    </div>
                    <div>
                      <p><strong>LEI Issuance:</strong> ${plan.component_pricing?.lei_issuance || 0}</p>
                      <p><strong>vLEI Issuance:</strong> ${plan.component_pricing?.vlei_issuance || 0}</p>
                      <p><strong>KYB Verification:</strong> ${plan.component_pricing?.kyb_verification || 0}</p>
                      <p><strong>AML Screening:</strong> ${plan.component_pricing?.aml_screening || 0}</p>
                    </div>
                  </div>
                  {plan.regional_pricing?.length > 0 && (
                    <p className="text-xs text-blue-700 mt-2">
                      <Globe className="h-3 w-3 inline mr-1" />
                      {plan.regional_pricing.length} regional pricing rule(s)
                    </p>
                  )}
                  {plan.organization_discounts?.length > 0 && (
                    <p className="text-xs text-purple-700 mt-1">
                      <Percent className="h-3 w-3 inline mr-1" />
                      {plan.organization_discounts.length} organization discount(s)
                    </p>
                  )}
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