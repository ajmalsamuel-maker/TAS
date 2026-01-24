import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

const ACTION_ICONS = {
  user_invited: '👤',
  user_role_changed: '🔐',
  user_deleted: '🗑️',
  translation_added: '🌍',
  translation_updated: '✏️',
  translation_deleted: '🗑️',
  provider_status_changed: '📊',
  workflow_started: '▶️',
  workflow_completed: '✅',
  application_approved: '✔️',
  application_rejected: '❌'
};

const ACTION_COLORS = {
  user_invited: 'bg-blue-100 text-blue-800',
  user_role_changed: 'bg-purple-100 text-purple-800',
  user_deleted: 'bg-red-100 text-red-800',
  translation_added: 'bg-green-100 text-green-800',
  translation_updated: 'bg-yellow-100 text-yellow-800',
  translation_deleted: 'bg-red-100 text-red-800',
  provider_status_changed: 'bg-indigo-100 text-indigo-800',
  workflow_started: 'bg-blue-100 text-blue-800',
  workflow_completed: 'bg-green-100 text-green-800',
  application_approved: 'bg-green-100 text-green-800',
  application_rejected: 'bg-red-100 text-red-800'
};

export default function AuditLogsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: () => base44.entities.AuditLog.list('-timestamp', 100),
    initialData: [],
    refetchInterval: 30000
  });

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.event === filterAction;
    return matchesSearch && matchesAction;
  });

  const uniqueActions = [...new Set(logs.map(log => log.event))];

  const handleExport = () => {
    const csv = [
      ['Timestamp', 'Actor', 'Email', 'Action', 'Details'].join(','),
      ...filteredLogs.map(log => [
        format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        log.actor,
        log.actor_email,
        log.event,
        log.details ? log.details.replace(/,/g, ';') : ''
      ].map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Track all administrative actions and user activities</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 md:col-span-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by actor, email, or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>
                      {action.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleExport} variant="outline" className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading audit logs...</p>
          ) : filteredLogs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No audit logs found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{log.actor}</p>
                          <p className="text-gray-500 text-xs">{log.actor_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${ACTION_COLORS[log.event] || 'bg-gray-100 text-gray-800'}`}>
                          {ACTION_ICONS[log.event]} {log.event.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {log.details ? (
                          <span title={log.details}>{log.details}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedLog && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Log Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Timestamp:</span>
                <p className="text-gray-600">{format(new Date(selectedLog.timestamp), 'PPpp')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Actor:</span>
                <p className="text-gray-600">{selectedLog.actor} ({selectedLog.actor_email})</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Action:</span>
                <p className="text-gray-600">{selectedLog.event.replace(/_/g, ' ')}</p>
              </div>
              {selectedLog.details && (
                <div>
                  <span className="font-medium text-gray-700">Details:</span>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40 mt-2">
                    {JSON.stringify(JSON.parse(selectedLog.details), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}