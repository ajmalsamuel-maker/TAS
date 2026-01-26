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
import { COUNTRIES, CONTINENTS, getCountryName, getContinentName } from './countryData';
import { CURRENCIES, TAX_RULES_BY_COUNTRY, getCurrencySymbol } from './currencyData';

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
            <TabsList className="grid grid-cols-4 lg:grid-cols-9 gap-1">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="progressive">Tiers</TabsTrigger>
              <TabsTrigger value="promo">Promos</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
              <TabsTrigger value="discounts">Org Discounts</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="referral">Referrals</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
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
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold">Type</label>
                          <select
                            value={region.region_type}
                            onChange={(e) => {
                              const updated = [...formData.regional_pricing];
                              updated[idx].region_type = e.target.value;
                              updated[idx].region_code = '';
                              updated[idx].region_name = '';
                              setFormData({ ...formData, regional_pricing: updated });
                            }}
                            className="w-full border rounded px-2 py-1 text-sm"
                          >
                            <option value="country">Country</option>
                            <option value="continent">Continent</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold">
                            {region.region_type === 'continent' ? 'Continent' : 'Country'} (ISO Code)
                          </label>
                          <select
                            value={region.region_code}
                            onChange={(e) => {
                              const updated = [...formData.regional_pricing];
                              updated[idx].region_code = e.target.value;
                              if (region.region_type === 'continent') {
                                updated[idx].region_name = getContinentName(e.target.value);
                              } else {
                                updated[idx].region_name = getCountryName(e.target.value);
                              }
                              setFormData({ ...formData, regional_pricing: updated });
                            }}
                            className="w-full border rounded px-2 py-1 text-sm"
                          >
                            <option value="">Select...</option>
                            {region.region_type === 'continent' 
                              ? CONTINENTS.map(c => (
                                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                                ))
                              : COUNTRIES.map(c => (
                                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                                ))
                            }
                          </select>
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
                          <p className="text-xs text-gray-500 mt-1">
                            1.0 = base, 0.8 = 20% off, 1.2 = 20% premium
                          </p>
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

            {/* Progressive Pricing Tiers */}
            <TabsContent value="progressive" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold mb-4">Usage-Based Progressive Pricing</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Define tiered pricing (e.g., 1-100 at $50, 101-500 at $40, 501+ at $35)
                </p>
                <div className="space-y-4">
                  {['vlei_issuance', 'lei_issuance', 'kyb_verification', 'aml_screening'].map(component => {
                    const componentTiers = (formData.progressive_pricing || []).find(p => p.component === component);
                    const tiers = componentTiers?.tiers || [];
                    
                    return (
                      <div key={component} className="border rounded p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold capitalize">
                            {component.replace(/_/g, ' ')}
                          </h4>
                          <Button
                            size="sm"
                            onClick={() => addProgressiveTier(component)}
                            variant="outline"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Tier
                          </Button>
                        </div>
                        
                        {tiers.length > 0 ? (
                          <div className="space-y-2">
                            <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-600">
                              <div>From Qty</div>
                              <div>To Qty (blank = unlimited)</div>
                              <div>Price ($)</div>
                              <div></div>
                            </div>
                            {tiers.map((tier, idx) => (
                              <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                                <Input
                                  type="number"
                                  size="sm"
                                  value={tier.from}
                                  onChange={(e) => updateProgressiveTier(component, idx, 'from', parseInt(e.target.value))}
                                  placeholder="0"
                                />
                                <Input
                                  type="number"
                                  size="sm"
                                  value={tier.to || ''}
                                  onChange={(e) => updateProgressiveTier(component, idx, 'to', e.target.value ? parseInt(e.target.value) : null)}
                                  placeholder="Unlimited"
                                />
                                <Input
                                  type="number"
                                  step="0.01"
                                  size="sm"
                                  value={tier.price}
                                  onChange={(e) => updateProgressiveTier(component, idx, 'price', parseFloat(e.target.value))}
                                  placeholder="50.00"
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeProgressiveTier(component, idx)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-2">
                            No tiers configured - using base component pricing
                          </p>
                        )}
                      </div>
                    );
                  })}
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

            {/* Advanced Features */}
            <TabsContent value="advanced" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Multi-Year Discounts */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">Multi-Year Discounts</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold">2-Year Discount (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.multi_year_discounts?.two_year || 15}
                        onChange={(e) => setFormData({
                          ...formData,
                          multi_year_discounts: {
                            ...formData.multi_year_discounts,
                            two_year: parseFloat(e.target.value)
                          }
                        })}
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">3-Year Discount (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.multi_year_discounts?.three_year || 25}
                        onChange={(e) => setFormData({
                          ...formData,
                          multi_year_discounts: {
                            ...formData.multi_year_discounts,
                            three_year: parseFloat(e.target.value)
                          }
                        })}
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>

                {/* White-Label/Reseller Pricing */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">White-Label/Reseller Pricing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.white_label_pricing?.is_enabled || false}
                        onChange={(e) => setFormData({
                          ...formData,
                          white_label_pricing: {
                            ...formData.white_label_pricing,
                            is_enabled: e.target.checked
                          }
                        })}
                        className="rounded"
                      />
                      <label className="text-sm font-semibold">Enable Wholesale Pricing</label>
                    </div>
                    {formData.white_label_pricing?.is_enabled && (
                      <>
                        <div>
                          <label className="text-sm font-semibold">Wholesale Discount (%)</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.white_label_pricing?.wholesale_discount || 0}
                            onChange={(e) => setFormData({
                              ...formData,
                              white_label_pricing: {
                                ...formData.white_label_pricing,
                                wholesale_discount: parseFloat(e.target.value)
                              }
                            })}
                            placeholder="30"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold">Minimum Monthly Volume</label>
                          <Input
                            type="number"
                            value={formData.white_label_pricing?.minimum_volume || 0}
                            onChange={(e) => setFormData({
                              ...formData,
                              white_label_pricing: {
                                ...formData.white_label_pricing,
                                minimum_volume: parseInt(e.target.value)
                              }
                            })}
                            placeholder="100"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Multi-Currency Support */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">Multi-Currency Support</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.multi_currency_support?.enabled !== false}
                        onChange={(e) => setFormData({
                          ...formData,
                          multi_currency_support: {
                            ...formData.multi_currency_support,
                            enabled: e.target.checked
                          }
                        })}
                        className="rounded"
                      />
                      <label className="text-sm font-semibold">Enable Multi-Currency</label>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Supported Currencies (ISO 4217)</label>
                      <p className="text-xs text-gray-500 mb-2">Select currencies to support</p>
                      <select
                        multiple
                        size="5"
                        value={formData.multi_currency_support?.supported_currencies || ['USD', 'EUR', 'GBP']}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                          setFormData({
                            ...formData,
                            multi_currency_support: {
                              ...formData.multi_currency_support,
                              supported_currencies: selected
                            }
                          });
                        }}
                        className="w-full border rounded px-3 py-2 text-sm"
                      >
                        {CURRENCIES.map(curr => (
                          <option key={curr.code} value={curr.code}>
                            {curr.code} - {curr.name} ({curr.symbol})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                    </div>
                  </div>
                </div>

                {/* Tax Configuration */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">Tax Handling (VAT/GST/Sales Tax)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.tax_configuration?.auto_calculate !== false}
                        onChange={(e) => setFormData({
                          ...formData,
                          tax_configuration: {
                            ...formData.tax_configuration,
                            auto_calculate: e.target.checked,
                            tax_rules: e.target.checked ? TAX_RULES_BY_COUNTRY : []
                          }
                        })}
                        className="rounded"
                      />
                      <label className="text-sm font-semibold">Auto-Calculate Tax by Country (ISO Standards)</label>
                    </div>
                    <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
                      <p className="font-semibold mb-1">Standards Compliance:</p>
                      <ul className="ml-4 space-y-0.5">
                        <li>• EU VAT Directive 2006/112/EC</li>
                        <li>• OECD International VAT/GST Guidelines</li>
                        <li>• ISO 3166-1 country codes</li>
                        <li>• Automatic reverse charge for B2B (EU)</li>
                      </ul>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Covers {TAX_RULES_BY_COUNTRY.length} countries with VAT/GST/Sales Tax rates
                    </p>
                  </div>
                </div>

                {/* Payment Terms */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">Payment Terms</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold">Default Payment Terms</label>
                      <select
                        value={formData.payment_terms?.default_terms || 'immediate'}
                        onChange={(e) => setFormData({
                          ...formData,
                          payment_terms: {
                            ...formData.payment_terms,
                            default_terms: e.target.value
                          }
                        })}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="net_15">Net 15</option>
                        <option value="net_30">Net 30</option>
                        <option value="net_60">Net 60</option>
                        <option value="net_90">Net 90</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Enterprise Payment Terms</label>
                      <select
                        value={formData.payment_terms?.enterprise_terms || 'net_30'}
                        onChange={(e) => setFormData({
                          ...formData,
                          payment_terms: {
                            ...formData.payment_terms,
                            enterprise_terms: e.target.value
                          }
                        })}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="net_30">Net 30</option>
                        <option value="net_60">Net 60</option>
                        <option value="net_90">Net 90</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seasonal Campaigns */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">Seasonal Campaigns</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Recurring campaigns (e.g., Q4 Compliance Rush, Year-End Special)
                  </p>
                  <div className="text-sm text-gray-500">Configure in metadata for now</div>
                </div>
              </div>
            </TabsContent>

            {/* Referral Program */}
            <TabsContent value="referral" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold mb-4">Referral Credit Program</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.referral_program?.is_enabled || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        referral_program: {
                          ...formData.referral_program,
                          is_enabled: e.target.checked
                        }
                      })}
                      className="rounded"
                    />
                    <label className="text-sm font-semibold">Enable Referral Program</label>
                  </div>
                  {formData.referral_program?.is_enabled && (
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-semibold">Credit for Referrer ($)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.referral_program?.credit_amount || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            referral_program: {
                              ...formData.referral_program,
                              credit_amount: parseFloat(e.target.value)
                            }
                          })}
                          placeholder="100"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Credit for Referee ($)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.referral_program?.referee_credit || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            referral_program: {
                              ...formData.referral_program,
                              referee_credit: parseFloat(e.target.value)
                            }
                          })}
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Max Referrals (blank = unlimited)</label>
                        <Input
                          type="number"
                          value={formData.referral_program?.max_referrals || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            referral_program: {
                              ...formData.referral_program,
                              max_referrals: e.target.value ? parseInt(e.target.value) : null
                            }
                          })}
                          placeholder="Unlimited"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Industry-Specific Pricing */}
            <TabsContent value="industry" className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold mb-4">Industry-Specific Pricing</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Special pricing for nonprofits, government, education, healthcare
                </p>
                <div className="space-y-3">
                  {['nonprofit', 'government', 'education', 'healthcare', 'financial_services'].map(industry => (
                    <div key={industry} className="border rounded p-3 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="font-semibold capitalize">{industry.replace('_', ' ')}</div>
                        <div>
                          <label className="text-xs font-semibold">Discount (%)</label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 20"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 mt-2">Configure in metadata for now</p>
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