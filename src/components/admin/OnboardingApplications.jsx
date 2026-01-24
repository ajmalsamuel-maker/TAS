import React from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function OnboardingApplications({ applications }) {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: async (application) => {
      const generatedLEI = `LEI${Math.random().toString(36).substring(2, 11).toUpperCase()}${Date.now().toString().slice(-9)}`;
      
      await base44.entities.OnboardingApplication.update(application.id, {
        status: 'approved',
        generated_lei: generatedLEI
      });

      await base44.users.inviteUser(application.email, 'user');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Application approved and LEI issued');
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => base44.entities.OnboardingApplication.update(id, { status: 'rejected' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Application rejected');
    }
  });

  const getStatusColor = (status) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'submitted': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-6 w-6 text-[#0044CC]" />
          LEI Onboarding Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium">{app.legal_name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.entity_category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(new Date(app.created_date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {app.status === 'submitted' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveMutation.mutate(app)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectMutation.mutate(app.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {app.status === 'approved' && app.generated_lei && (
                      <span className="text-xs font-mono text-green-700">
                        LEI: {app.generated_lei}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No applications yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}