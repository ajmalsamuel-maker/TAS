import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Download, Eye, Archive, Settings, AlertTriangle, Shield, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

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
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [retentionDays, setRetentionDays] = useState(2555);

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['auditLogs', showArchived],
    queryFn: async () => {
      const query = showArchived ? {} : { is_archived: { $ne: true } };
      return await base44.entities.AuditLog.filter(query, '-created_date', 500);
    },
    initialData: [],
    refetchInterval: 30000
  });

  const { data: settings } = useQuery({
    queryKey: ['auditSettings'],
    queryFn: async () => {
      const result = await base44.entities.AuditSettings.filter({});
      if (result[0]) {
        setRetentionDays(result[0].retention_policy?.default_retention_days || 2555);
      }
      return result[0];
    }
  });

  // Archive mutation
  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data } = await base44.functions.invoke('archiveOldAuditLogs', {});
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
      toast.success(`Archived ${data.archived} logs${data.failed > 0 ? `, ${data.failed} failed` : ''}`);
    },
    onError: (error) => {
      toast.error(error.message || 'Archival failed');
    }
  });

  // Save settings mutation
  const saveSettingsMutation = useMutation({
    mutationFn: async () => {
      const existingSettings = await base44.entities.AuditSettings.filter({});
      const settingsData = {
        retention_policy: {
          default_retention_days: retentionDays,
          category_overrides: {}
        },
        archival_settings: {
          auto_archive_enabled: true,
          archive_storage_type: 'database',
          compress_archives: true
        },
        compliance_standards: [
          { standard: 'SOX', retention_years: 7, notes: 'Sarbanes-Oxley Act requirement' },
          { standard: 'GDPR', retention_years: 6, notes: 'General Data Protection Regulation' },
          { standard: 'GLEIF', retention_years: 7, notes: 'LEI/vLEI credential records' }
        ],
        logging_levels: {
          capture_ip_addresses: true,
          capture_before_after_states: true,
          sign_critical_events: true
        }
      };

      if (existingSettings[0]) {
        return await base44.entities.AuditSettings.update(existingSettings[0].id, settingsData);
      } else {
        return await base44.entities.AuditSettings.create(settingsData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditSettings'] });
      toast.success('Settings saved');
      setSettingsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save settings');
    }
  });

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      (log.actor?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (log.actor_email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (log.event?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.event_type === filterAction;
    const matchesCategory = filterCategory === 'all' || log.event_category === filterCategory;
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    return matchesSearch && matchesAction && matchesCategory && matchesSeverity;
  });

  const uniqueActions = [...new Set(logs.map(log => log.event_type).filter(Boolean))];
  const uniqueCategories = [...new Set(logs.map(log => log.event_category).filter(Boolean))];
  
  const stats = {
    total: logs.filter(l => !l.is_archived).length,
    archived: logs.filter(l => l.is_archived).length,
    critical: logs.filter(l => l.severity === 'critical' && !l.is_archived).length,
    failed: logs.filter(l => l.result === 'failure' && !l.is_archived).length
  };

  const handleExport = () => {
    const csv = [
      ['Timestamp', 'Actor', 'Email', 'Action', 'Details'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp ? format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss') : 'N/A',
        log.actor || '',
        log.actor_email || '',
        log.event || '',
        log.details ? (typeof log.details === 'object' ? JSON.stringify(log.details) : log.details).replace(/,/g, ';') : ''
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
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold">{stats.total.toLocaleString()}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Archived</p>
                <p className="text-2xl font-bold">{stats.archived.toLocaleString()}</p>
              </div>
              <Archive className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Events</p>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failures</p>
                <p className="text-2xl font-bold text-orange-600">{stats.failed}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Master Audit Log</CardTitle>
              <CardDescription>
                Comprehensive system-wide audit trail • Retention: {retentionDays} days ({(retentionDays / 365).toFixed(1)} years)
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2 md:col-span-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by actor, email, or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat?.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>
                      {action?.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={handleExport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                
                <Button 
                  onClick={() => archiveMutation.mutate()}
                  disabled={archiveMutation.isPending}
                  variant="outline"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  {archiveMutation.isPending ? 'Archiving...' : 'Archive Old Logs'}
                </Button>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  className="rounded"
                />
                Show Archived
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log ({filteredLogs.length.toLocaleString()} records)</CardTitle>
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
                    <TableHead>Category</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className={log.is_archived ? 'bg-gray-50' : ''}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {log.created_date ? format(new Date(log.created_date), 'MMM d, HH:mm:ss') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {log.event_category?.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{log.actor}</p>
                          <p className="text-gray-500 text-xs">{log.actor_email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{log.event}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          log.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          log.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {log.severity || 'info'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          log.result === 'failure' ? 'bg-red-100 text-red-800' :
                          log.result === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {log.result || 'success'}
                        </Badge>
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

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Log Configuration</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Retention Policy */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Retention Policy
              </h3>
              <div>
                <label className="text-sm font-medium">Default Retention Period (days)</label>
                <Input
                  type="number"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Current: {(retentionDays / 365).toFixed(1)} years • Logs older than this will be archived
                </p>
              </div>
            </div>

            {/* Compliance Standards */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Compliance Standards Reference
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-medium text-blue-900">Industry Standard Retention Periods:</p>
                <ul className="space-y-1 text-blue-800 ml-4">
                  <li>• <strong>SOX (Sarbanes-Oxley):</strong> 7 years for financial records</li>
                  <li>• <strong>GDPR:</strong> 3-6 years for financial transactions</li>
                  <li>• <strong>HIPAA:</strong> 6 years minimum</li>
                  <li>• <strong>PCI-DSS:</strong> 1 year minimum, 3 years recommended</li>
                  <li>• <strong>GLEIF/LEI:</strong> 5-7 years for identity credential records</li>
                  <li>• <strong>ISO 27001:</strong> Varies by data classification</li>
                </ul>
                <p className="text-xs text-blue-700 mt-3">
                  <strong>Recommendation:</strong> For financial services and LEI operations, maintain 7-year retention (2555 days)
                </p>
              </div>
            </div>

            {/* Archival Settings */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Archive className="h-4 w-4" />
                Archival Settings
              </h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Automatically archive logs after retention period</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Compress archived logs to save storage</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Cryptographically sign critical security events</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => saveSettingsMutation.mutate()}
              disabled={saveSettingsMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saveSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Log Details */}
      {selectedLog && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Log Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Timestamp:</span>
                <p className="text-gray-600">{selectedLog.created_date ? format(new Date(selectedLog.created_date), 'PPpp') : 'N/A'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <p className="text-gray-600">{selectedLog.event_category?.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Actor:</span>
                <p className="text-gray-600">{selectedLog.actor} ({selectedLog.actor_email})</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Event Type:</span>
                <p className="text-gray-600">{selectedLog.event_type}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Severity:</span>
                <Badge className={
                  selectedLog.severity === 'critical' ? 'bg-red-100 text-red-800' :
                  selectedLog.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {selectedLog.severity || 'info'}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-gray-700">Result:</span>
                <Badge className={
                  selectedLog.result === 'failure' ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }>
                  {selectedLog.result || 'success'}
                </Badge>
              </div>
              {selectedLog.entity_type && (
                <div>
                  <span className="font-medium text-gray-700">Entity:</span>
                  <p className="text-gray-600">{selectedLog.entity_type} - {selectedLog.entity_id?.slice(0, 8)}</p>
                </div>
              )}
              {selectedLog.signature && (
                <div>
                  <span className="font-medium text-gray-700">Signature:</span>
                  <p className="text-gray-600 text-xs font-mono truncate">{selectedLog.signature}</p>
                </div>
              )}
              {selectedLog.is_archived && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Archive Info:</span>
                  <p className="text-gray-600">
                    Archived at {format(new Date(selectedLog.archived_at), 'PPpp')}
                    {selectedLog.archive_location && ` • Location: ${selectedLog.archive_location}`}
                  </p>
                </div>
              )}
              {selectedLog.details && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Details:</span>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-60 mt-2">
                    {typeof selectedLog.details === 'object' 
                      ? JSON.stringify(selectedLog.details, null, 2)
                      : selectedLog.details}
                  </pre>
                </div>
              )}
              {selectedLog.before_state && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Before State:</span>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40 mt-2">
                    {JSON.stringify(selectedLog.before_state, null, 2)}
                  </pre>
                </div>
              )}
              {selectedLog.after_state && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">After State:</span>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40 mt-2">
                    {JSON.stringify(selectedLog.after_state, null, 2)}
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