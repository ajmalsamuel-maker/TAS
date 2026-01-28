import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, CheckCircle2, AlertTriangle, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UserCases() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        if (userData?.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserCases')));
  }, []);

  const { data: cases = [] } = useQuery({
    queryKey: ['user-cases', user?.email],
    queryFn: () => base44.entities.Case.filter({ assigned_to: user?.email }),
    enabled: !!user?.email,
    initialData: []
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const filteredCases = statusFilter === 'all' 
    ? cases 
    : cases.filter(c => c.status === statusFilter);

  const open = cases.filter(c => c.status === 'open').length;
  const inReview = cases.filter(c => c.status === 'under_review').length;
  const resolved = cases.filter(c => c.status === 'resolved').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'resolved': return <CheckCircle2 className="h-4 w-4" />;
      case 'under_review': return <Clock className="h-4 w-4" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Compliance Cases</h1>
          <p className="text-gray-600">Cases assigned to you for investigation and resolution</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cases</p>
                  <p className="text-3xl font-bold">{cases.length}</p>
                </div>
                <Briefcase className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open</p>
                  <p className="text-3xl font-bold">{open}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Review</p>
                  <p className="text-3xl font-bold">{inReview}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold">{resolved}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.length > 0 ? (
            filteredCases.map(caseItem => (
              <Card key={caseItem.id} className="border-2 border-blue-100 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{caseItem.case_number}</h3>
                        <Badge className={getStatusColor(caseItem.status)}>
                          <span className="mr-1">{getStatusIcon(caseItem.status)}</span>
                          {caseItem.status || 'new'}
                        </Badge>
                        {caseItem.priority && (
                          <Badge variant="outline" className={
                            caseItem.priority === 'high' ? 'border-red-300' :
                            caseItem.priority === 'medium' ? 'border-yellow-300' :
                            'border-green-300'
                          }>
                            {caseItem.priority} priority
                          </Badge>
                        )}
                      </div>
                      {caseItem.description && (
                        <p className="text-sm text-gray-600 mb-3">{caseItem.description}</p>
                      )}
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Type</p>
                          <p className="font-semibold text-gray-900 capitalize">{caseItem.case_type || 'Investigation'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Created</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(caseItem.created_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Entity</p>
                          <p className="font-semibold text-gray-900">{caseItem.entity_name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Days Open</p>
                          <p className="font-semibold text-gray-900">
                            {Math.floor((new Date() - new Date(caseItem.created_date)) / (1000 * 60 * 60 * 24))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No cases assigned</p>
                <p className="text-sm text-gray-500">Cases will appear here when they are assigned to you</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}