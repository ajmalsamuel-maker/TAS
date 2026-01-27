import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, Clock, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export default function AccountingSyncDashboard() {
  const [selectedIntegration, setSelectedIntegration] = useState('all');

  // Fetch sync logs
  const { data: syncLogs = [], isLoading } = useQuery({
    queryKey: ['syncLogs', selectedIntegration],
    queryFn: async () => {
      const query = selectedIntegration !== 'all' 
        ? { integration_key: selectedIntegration }
        : {};
      return await base44.entities.SyncLog.filter(query, '-created_date', 100);
    }
  });

  // Fetch billing settings for integration info
  const { data: settings } = useQuery({
    queryKey: ['billingSettings'],
    queryFn: async () => {
      const result = await base44.entities.BillingSettings.filter({});
      return result[0];
    }
  });

  // Calculate stats
  const stats = {
    total: syncLogs.length,
    success: syncLogs.filter(log => log.status === 'success').length,
    failed: syncLogs.filter(log => log.status === 'failed').length,
    pending: syncLogs.filter(log => log.status === 'pending').length,
  };

  const successRate = stats.total > 0 
    ? ((stats.success / stats.total) * 100).toFixed(1) 
    : 0;

  // Group logs by sync_id for batch operations
  const syncBatches = syncLogs.reduce((acc, log) => {
    if (!acc[log.sync_id]) {
      acc[log.sync_id] = {
        sync_id: log.sync_id,
        timestamp: log.created_date,
        integration: log.integration_key,
        logs: []
      };
    }
    acc[log.sync_id].logs.push(log);
    return acc;
  }, {});

  const batches = Object.values(syncBatches).sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Syncs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">{stats.success}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">{successRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Card>
        <CardHeader>
          <CardTitle>Sync History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="batches">
            <TabsList className="mb-4">
              <TabsTrigger value="batches">Batch Syncs</TabsTrigger>
              <TabsTrigger value="individual">Individual Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="batches">
              <div className="space-y-3">
                {batches.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No sync history yet</p>
                ) : (
                  batches.map((batch) => {
                    const batchSuccess = batch.logs.filter(l => l.status === 'success').length;
                    const batchFailed = batch.logs.filter(l => l.status === 'failed').length;
                    
                    return (
                      <div key={batch.sync_id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {batch.integration}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                {format(new Date(batch.timestamp), 'MMM dd, yyyy HH:mm')}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                                {batchSuccess} succeeded
                              </span>
                              {batchFailed > 0 && (
                                <span className="flex items-center gap-1 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  {batchFailed} failed
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge className={batchFailed === 0 ? 'bg-green-600' : 'bg-yellow-600'}>
                            {batchFailed === 0 ? 'Complete' : 'Partial'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </TabsContent>

            <TabsContent value="individual">
              <div className="space-y-2">
                {syncLogs.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No sync logs yet</p>
                ) : (
                  syncLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        {log.status === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                        {log.status === 'failed' && <XCircle className="h-5 w-5 text-red-600" />}
                        {log.status === 'pending' && <Clock className="h-5 w-5 text-yellow-600" />}
                        
                        <div>
                          <p className="font-medium text-sm">
                            {log.entity_type} - {log.entity_id?.slice(0, 8)}
                          </p>
                          <p className="text-xs text-gray-600">
                            {format(new Date(log.created_date), 'MMM dd, HH:mm')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {log.integration_key}
                        </Badge>
                        {log.error_message && (
                          <div className="text-xs text-red-600 max-w-xs truncate">
                            {log.error_message}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Active Integrations Health */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {settings?.accounting_integrations?.filter(i => i.is_connected).map((integration) => {
              const integrationLogs = syncLogs.filter(l => l.integration_key === integration.system);
              const recentLogs = integrationLogs.slice(0, 10);
              const recentSuccess = recentLogs.filter(l => l.status === 'success').length;
              const health = recentLogs.length > 0 ? (recentSuccess / recentLogs.length) * 100 : 100;

              return (
                <div key={integration.system} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{integration.system}</p>
                    <p className="text-sm text-gray-600">
                      Last sync: {integration.last_sync 
                        ? format(new Date(integration.last_sync), 'MMM dd, yyyy HH:mm')
                        : 'Never'
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">Health: {health.toFixed(0)}%</p>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full ${
                            health >= 80 ? 'bg-green-600' : 
                            health >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${health}%` }}
                        />
                      </div>
                    </div>
                    {health < 80 && (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}