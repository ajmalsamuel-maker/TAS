import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Award, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IssuedCredentialsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ['all-applications'],
    queryFn: () => base44.entities.OnboardingApplication.list('-created_date', 1000)
  });

  const { data: vleiCredentials = [], isLoading: vleisLoading } = useQuery({
    queryKey: ['all-vleis'],
    queryFn: () => base44.entities.vLEICredential.list('-created_date', 1000)
  });

  if (appsLoading || vleisLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066B3]"></div>
      </div>
    );
  }

  // Combine LEIs and vLEIs
  const credentials = [
    ...applications
      .filter(app => app.generated_lei)
      .map(app => ({
        type: 'LEI',
        id: app.generated_lei,
        holder: app.legal_name,
        email: app.email,
        issued_date: app.lei_issued_date,
        status: 'active',
        organization_id: app.organization_id
      })),
    ...vleiCredentials.map(vlei => ({
      type: 'vLEI',
      id: vlei.vlei_id,
      holder: vlei.holder_name,
      email: vlei.holder_email,
      issued_date: vlei.created_date,
      status: vlei.status,
      credential_type: vlei.credential_type,
      organization_id: vlei.organization_id
    }))
  ];

  // Apply filters
  const filteredCredentials = credentials.filter(cred => {
    const matchesSearch = 
      cred.holder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' || 
      cred.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Issued Credentials</span>
            <Badge variant="outline" className="text-lg">
              {filteredCredentials.length} Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, credential ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="LEI">LEI Only</SelectItem>
                <SelectItem value="vLEI">vLEI Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Credential ID</TableHead>
                  <TableHead>Holder</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Issued Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCredentials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No credentials found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCredentials.map((cred, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Badge className={cred.type === 'LEI' ? 'bg-blue-600' : 'bg-purple-600'}>
                          {cred.type === 'LEI' ? <Award className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
                          {cred.type}
                          {cred.credential_type && ` (${cred.credential_type})`}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{cred.id}</TableCell>
                      <TableCell className="font-medium">{cred.holder}</TableCell>
                      <TableCell className="text-sm text-gray-600">{cred.email}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(cred.issued_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={cred.status === 'active' ? 'default' : 'destructive'}
                          className={cred.status === 'active' ? 'bg-green-600' : ''}
                        >
                          {cred.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}