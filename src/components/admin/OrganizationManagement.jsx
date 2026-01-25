import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Plus, Settings, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function OrganizationManagement() {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newOrg, setNewOrg] = useState({
    name: '',
    legal_name: '',
    organization_type: 'bank',
    subscription_tier: 'starter',
    contact_email: '',
    country: ''
  });

  const { data: organizations = [], isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list('-created_date')
  });

  const createOrgMutation = useMutation({
    mutationFn: (data) => base44.entities.Organization.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['organizations']);
      setShowCreateForm(false);
      setNewOrg({
        name: '',
        legal_name: '',
        organization_type: 'bank',
        subscription_tier: 'starter',
        contact_email: '',
        country: ''
      });
      toast.success('Organization created successfully');
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, is_active }) => 
      base44.entities.Organization.update(id, { is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries(['organizations']);
      toast.success('Organization status updated');
    }
  });

  const handleCreateOrg = async (e) => {
    e.preventDefault();
    createOrgMutation.mutate(newOrg);
  };

  const getStatusBadge = (org) => {
    if (!org.is_active) return <Badge variant="destructive">Inactive</Badge>;
    if (org.subscription_status === 'trial') return <Badge className="bg-blue-500">Trial</Badge>;
    if (org.subscription_status === 'active') return <Badge className="bg-green-600">Active</Badge>;
    if (org.subscription_status === 'suspended') return <Badge variant="destructive">Suspended</Badge>;
    return <Badge variant="outline">{org.subscription_status}</Badge>;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading organizations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Organizations
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage customer organizations using the TAS platform
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Organization
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Organization Name *</label>
                  <Input
                    value={newOrg.name}
                    onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                    placeholder="ABC Bank"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Legal Name</label>
                  <Input
                    value={newOrg.legal_name}
                    onChange={(e) => setNewOrg({ ...newOrg, legal_name: e.target.value })}
                    placeholder="ABC Bank Inc."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type *</label>
                  <Select
                    value={newOrg.organization_type}
                    onValueChange={(value) => setNewOrg({ ...newOrg, organization_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="credit_union">Credit Union</SelectItem>
                      <SelectItem value="law_firm">Law Firm</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Subscription Tier</label>
                  <Select
                    value={newOrg.subscription_tier}
                    onValueChange={(value) => setNewOrg({ ...newOrg, subscription_tier: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Email *</label>
                  <Input
                    type="email"
                    value={newOrg.contact_email}
                    onChange={(e) => setNewOrg({ ...newOrg, contact_email: e.target.value })}
                    placeholder="admin@abcbank.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={newOrg.country}
                    onChange={(e) => setNewOrg({ ...newOrg, country: e.target.value })}
                    placeholder="United States"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createOrgMutation.isPending}>
                  Create Organization
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{org.name}</div>
                    {org.legal_name && (
                      <div className="text-xs text-slate-500">{org.legal_name}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {org.organization_type.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(org)}</TableCell>
                <TableCell className="capitalize">{org.subscription_tier}</TableCell>
                <TableCell>
                  <div className="text-sm">{org.contact_email}</div>
                  {org.country && (
                    <div className="text-xs text-slate-500">{org.country}</div>
                  )}
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {new Date(org.created_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatusMutation.mutate({
                        id: org.id,
                        is_active: !org.is_active
                      })}
                    >
                      {org.is_active ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {organizations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Organizations Yet</h3>
            <p className="text-slate-600 mb-4">Create your first organization to get started</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Organization
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}