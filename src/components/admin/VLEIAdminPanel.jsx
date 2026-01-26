import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, Search, DollarSign, Building2, User } from 'lucide-react';

export default function VLEIAdminPanel() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: vleis = [], isLoading } = useQuery({
    queryKey: ['all-vleis'],
    queryFn: () => base44.entities.vLEICredential.list('-created_date'),
    initialData: []
  });

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => base44.entities.Organization.list(),
    initialData: []
  });

  const orgMap = Object.fromEntries(organizations.map(o => [o.id, o]));

  const filteredVLEIs = vleis.filter(v => 
    v.holder_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.holder_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.role_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orgMap[v.organization_id]?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = vleis.filter(v => v.status === 'active').length * 50; // $50 per vLEI
  const activeCount = vleis.filter(v => v.status === 'active').length;
  const revokedCount = vleis.filter(v => v.status === 'revoked').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600" />
            vLEI Credential Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Total Issued</p>
              <p className="text-3xl font-bold text-purple-700">{vleis.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-700">{activeCount}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Revoked</p>
              <p className="text-3xl font-bold text-red-700">{revokedCount}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Revenue (Active)
              </p>
              <p className="text-3xl font-bold text-blue-700">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-1">$50 per vLEI</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, role, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading credentials...</p>
          ) : filteredVLEIs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No vLEI credentials found</p>
          ) : (
            <div className="space-y-3">
              {filteredVLEIs.map((vlei) => {
                const org = orgMap[vlei.organization_id];
                return (
                  <Card key={vlei.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={vlei.credential_type === 'OOR' ? 'bg-purple-600' : 'bg-cyan-600'}>
                              {vlei.credential_type}
                            </Badge>
                            <Badge variant={vlei.status === 'active' ? 'default' : 'destructive'} 
                              className={vlei.status === 'active' ? 'bg-green-600' : ''}>
                              {vlei.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <DollarSign className="h-3 w-3 mr-1" />
                              $50
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                <p className="font-bold text-gray-900">{org?.name || 'Unknown Org'}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <p className="text-sm text-gray-700">{vlei.holder_name} - {vlei.role_title}</p>
                              </div>
                              <p className="text-xs text-gray-600 ml-6">{vlei.holder_email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Issued by: {vlei.issued_by}</p>
                              <p className="text-xs text-gray-500">
                                Date: {new Date(vlei.created_date).toLocaleDateString()}
                              </p>
                              {vlei.valid_until && (
                                <p className="text-xs text-gray-500">
                                  Expires: {new Date(vlei.valid_until).toLocaleDateString()}
                                </p>
                              )}
                              {vlei.status === 'revoked' && vlei.revocation_reason && (
                                <p className="text-xs text-red-700 mt-1">Revoked: {vlei.revocation_reason}</p>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 font-mono">{vlei.vlei_id}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}