import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileText, Award, Shield } from 'lucide-react';

export default function CredentialAuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: auditLogs = [], isLoading } = useQuery({
    queryKey: ['credential-audit-logs'],
    queryFn: () => base44.entities.AuditLog.list('-created_date', 500)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066B3]"></div>
      </div>
    );
  }

  // Filter logs related to credential issuance
  const credentialLogs = auditLogs.filter(log => 
    log.event.toLowerCase().includes('lei') || 
    log.event.toLowerCase().includes('vlei') ||
    log.event.toLowerCase().includes('credential') ||
    log.event_type === 'signature_generated' ||
    log.event_type === 'workflow_completed'
  );

  // Apply search filter
  const filteredLogs = credentialLogs.filter(log =>
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.actor && log.actor.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (log.actor_lei && log.actor_lei.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getEventIcon = (event) => {
    if (event.toLowerCase().includes('lei') && !event.toLowerCase().includes('vlei')) {
      return <Award className="h-4 w-4 text-blue-600" />;
    }
    if (event.toLowerCase().includes('vlei')) {
      return <Shield className="h-4 w-4 text-purple-600" />;
    }
    return <FileText className="h-4 w-4 text-gray-600" />;
  };

  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case 'signature_generated':
        return 'bg-blue-600';
      case 'workflow_completed':
        return 'bg-green-600';
      case 'workflow_started':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Credential Issuance Audit Trail</span>
            <Badge variant="outline" className="text-lg">
              {filteredLogs.length} Entries
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by event, actor, or LEI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>LEI</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(log.created_date).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getEventIcon(log.event)}
                          <span className="text-sm">{log.event}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEventTypeColor(log.event_type)}>
                          {log.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {log.actor || '-'}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.actor_lei || '-'}
                      </TableCell>
                      <TableCell className="text-sm">
                        {log.actor_vlei_role || '-'}
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