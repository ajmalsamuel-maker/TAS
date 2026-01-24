import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, CheckCircle2, AlertCircle, Clock, Link2 } from 'lucide-react';
import { format } from 'date-fns';

export default function WorkflowsOverview({ workflows }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'in_progress': return <Activity className="h-4 w-4 text-blue-600 animate-pulse" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type) => {
    const colors = {
      'kyb': 'bg-purple-100 text-purple-800',
      'aml': 'bg-orange-100 text-orange-800',
      'vlei_issuance': 'bg-blue-100 text-blue-800',
      'did_verification': 'bg-cyan-100 text-cyan-800',
      'credential_verification': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="h-6 w-6 text-[#0044CC]" />
          Workflows Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Provenance</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id} className="hover:bg-blue-50/50">
                  <TableCell>
                    <Badge className={getTypeColor(workflow.type)}>
                      {workflow.type?.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(workflow.status)}
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {workflow.provider_name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                      {workflow.language?.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    {workflow.provenance_chain && workflow.provenance_chain.length > 0 ? (
                      <div className="flex items-center gap-1 text-green-700">
                        <Link2 className="h-4 w-4" />
                        <span className="text-xs">{workflow.provenance_chain.length} steps</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No chain</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(new Date(workflow.created_date), 'MMM d, HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
              {workflows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No workflows yet
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