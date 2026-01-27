import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertCircle, AlertTriangle, CheckCircle2, Clock, 
  Filter, Eye, Check, Trash2, RefreshCw 
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function ProviderAlertsPanel() {
  const [filterStatus, setFilterStatus] = useState('active');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [acknowledgeNote, setAcknowledgeNote] = useState('');

  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery({
    queryKey: ['provider-alerts', filterStatus],
    queryFn: async () => {
      const allAlerts = await base44.entities.ProviderAlert.list();
      return filterStatus === 'all' 
        ? allAlerts 
        : allAlerts.filter(a => a.status === filterStatus);
    }
  });

  const { mutate: acknowledgeAlert, isPending: isAcknowledging } = useMutation({
    mutationFn: async (alertId) => {
      const user = await base44.auth.me();
      return await base44.entities.ProviderAlert.update(alertId, {
        status: 'acknowledged',
        acknowledged_by: user.email,
        acknowledged_at: new Date().toISOString(),
        resolution_notes: acknowledgeNote
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-alerts'] });
      setSelectedAlert(null);
      setAcknowledgeNote('');
    }
  });

  const { mutate: resolveAlert, isPending: isResolving } = useMutation({
    mutationFn: async (alertId) => {
      const user = await base44.auth.me();
      return await base44.entities.ProviderAlert.update(alertId, {
        status: 'resolved',
        acknowledged_by: user.email,
        resolved_at: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-alerts'] });
    }
  });

  const getAlertIcon = (alertType) => {
    return alertType === 'provider_offline' 
      ? AlertCircle 
      : AlertTriangle;
  };

  const getAlertColor = (severity) => {
    return severity === 'critical' 
      ? 'text-red-600 bg-red-50' 
      : 'text-yellow-600 bg-yellow-50';
  };

  const activeAlerts = alerts?.filter(a => a.status === 'active') || [];
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{activeAlerts.length}</div>
              <p className="text-sm text-gray-600 mt-1">Active Alerts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700">{criticalCount}</div>
              <p className="text-sm text-gray-600 mt-1">Critical</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {alerts?.filter(a => a.status === 'acknowledged').length || 0}
              </div>
              <p className="text-sm text-gray-600 mt-1">Acknowledged</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {alerts?.filter(a => a.status === 'resolved').length || 0}
              </div>
              <p className="text-sm text-gray-600 mt-1">Resolved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['active', 'acknowledged', 'resolved', 'all'].map(status => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            <Filter className="h-4 w-4 mr-2" />
            {status}
          </Button>
        ))}
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Provider Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading alerts...</p>
          ) : alerts?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No alerts found</p>
          ) : (
            <div className="space-y-3">
              {alerts.map(alert => {
                const Icon = getAlertIcon(alert.alert_type);
                const isOffline = alert.alert_type === 'provider_offline';
                
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-sm">
                              {alert.provider_name}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {alert.service_type}
                            </Badge>
                            <Badge 
                              className={`text-xs ${
                                alert.status === 'active'
                                  ? 'bg-red-100 text-red-800'
                                  : alert.status === 'acknowledged'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {alert.status}
                            </Badge>
                          </div>
                          
                          <p className="text-xs mt-2">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {format(new Date(alert.alert_time), 'MMM dd, yyyy HH:mm:ss')}
                          </p>

                          {alert.details && (
                            <div className="text-xs text-gray-700 mt-2 space-y-1">
                              <p>Status: <strong>{alert.details.status}</strong></p>
                              <p>Uptime: <strong>{alert.details.uptime}%</strong></p>
                              <p>Failures: <strong>{alert.details.consecutive_failures}</strong></p>
                            </div>
                          )}

                          {alert.acknowledged_at && (
                            <p className="text-xs text-gray-600 mt-2">
                              Acknowledged by {alert.acknowledged_by} at{' '}
                              {format(new Date(alert.acknowledged_at), 'MMM dd, HH:mm')}
                            </p>
                          )}
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedAlert(alert)}
                            className="ml-2 flex-shrink-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              {alert.provider_name} Alert
                            </DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs font-semibold text-gray-600">
                                  Alert Type
                                </Label>
                                <p className="text-sm mt-1 capitalize">
                                  {alert.alert_type.replace(/_/g, ' ')}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs font-semibold text-gray-600">
                                  Severity
                                </Label>
                                <Badge className={alert.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}>
                                  {alert.severity}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-xs font-semibold text-gray-600">
                                  Service
                                </Label>
                                <p className="text-sm mt-1">{alert.service_type}</p>
                              </div>
                              <div>
                                <Label className="text-xs font-semibold text-gray-600">
                                  Status
                                </Label>
                                <Badge className="text-xs capitalize">
                                  {alert.status}
                                </Badge>
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs font-semibold text-gray-600">
                                Alert Time
                              </Label>
                              <p className="text-sm mt-1">
                                {format(new Date(alert.alert_time), 'PPpp')}
                              </p>
                            </div>

                            {alert.details && (
                              <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-xs">
                                  <div className="space-y-1">
                                    <p>Current Status: {alert.details.status}</p>
                                    <p>Uptime: {alert.details.uptime}%</p>
                                    <p>Consecutive Failures: {alert.details.consecutive_failures}</p>
                                    <p>Last Check: {alert.details.last_health_check || 'Never'}</p>
                                  </div>
                                </AlertDescription>
                              </Alert>
                            )}

                            {alert.notified_admins?.length > 0 && (
                              <div>
                                <Label className="text-xs font-semibold text-gray-600">
                                  Notified Admins
                                </Label>
                                <div className="text-xs mt-1 space-y-1">
                                  {alert.notified_admins.map(email => (
                                    <p key={email} className="text-gray-700">• {email}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {alert.status === 'active' && (
                              <div>
                                <Label className="text-xs font-semibold text-gray-600">
                                  Acknowledgment Notes (Optional)
                                </Label>
                                <Input
                                  placeholder="Add notes before acknowledging..."
                                  value={acknowledgeNote}
                                  onChange={(e) => setAcknowledgeNote(e.target.value)}
                                  className="mt-2 text-sm"
                                />
                              </div>
                            )}

                            <div className="flex gap-2 pt-4 border-t">
                              {alert.status === 'active' && (
                                <Button
                                  onClick={() => acknowledgeAlert(alert.id)}
                                  disabled={isAcknowledging}
                                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  {isAcknowledging ? 'Acknowledging...' : 'Acknowledge'}
                                </Button>
                              )}
                              
                              {alert.status !== 'resolved' && (
                                <Button
                                  onClick={() => resolveAlert(alert.id)}
                                  disabled={isResolving}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  {isResolving ? 'Resolving...' : 'Resolve'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}