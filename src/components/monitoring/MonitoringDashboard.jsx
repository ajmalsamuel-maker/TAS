import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, AlertTriangle, Building2, Clock, Play, Pause, 
  CheckCircle2, XCircle, Calendar, Bell, Eye, TrendingUp 
} from 'lucide-react';
import { toast } from 'sonner';

export default function MonitoringDashboard() {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const queryClient = useQueryClient();

  const { data: schedules = [] } = useQuery({
    queryKey: ['monitoring-schedules'],
    queryFn: () => base44.entities.MonitoringSchedule.list('-created_date'),
    initialData: []
  });

  const { data: amlAlerts = [] } = useQuery({
    queryKey: ['aml-alerts-monitoring'],
    queryFn: () => base44.entities.AMLAlert.list('-created_date', 50),
    initialData: []
  });

  const { data: kybAlerts = [] } = useQuery({
    queryKey: ['kyb-alerts'],
    queryFn: () => base44.entities.KYBAlert.list('-created_date', 50),
    initialData: []
  });

  const toggleScheduleMutation = useMutation({
    mutationFn: async (schedule) => {
      return base44.entities.MonitoringSchedule.update(schedule.id, {
        status: schedule.status === 'active' ? 'paused' : 'active'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['monitoring-schedules']);
      toast.success('Schedule updated');
    }
  });

  const runMonitoringMutation = useMutation({
    mutationFn: async (schedule) => {
      if (schedule.monitoring_type.includes('aml')) {
        return base44.functions.invoke('runAMLMonitoring', { schedule_id: schedule.id });
      } else {
        return base44.functions.invoke('runKYBMonitoring', { schedule_id: schedule.id });
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries(['monitoring-schedules']);
      queryClient.invalidateQueries(['aml-alerts-monitoring']);
      queryClient.invalidateQueries(['kyb-alerts']);
      toast.success(`Check complete: ${result.data.alerts_generated || result.data.changes_detected || 0} alerts generated`);
    },
    onError: (error) => {
      toast.error('Monitoring failed: ' + error.message);
    }
  });

  const activeSchedules = schedules.filter(s => s.status === 'active').length;
  const newAMLAlerts = amlAlerts.filter(a => a.status === 'new').length;
  const newKYBAlerts = kybAlerts.filter(a => a.status === 'new').length;
  const totalAlerts = newAMLAlerts + newKYBAlerts;

  const getNextCheckIn = (schedule) => {
    if (!schedule.next_check_date) return 'Not scheduled';
    const next = new Date(schedule.next_check_date);
    const now = new Date();
    const diff = next - now;
    
    if (diff < 0) return 'Overdue';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Schedules</p>
                <p className="text-3xl font-bold text-gray-900">{activeSchedules}</p>
              </div>
              <Clock className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{totalAlerts}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AML Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{newAMLAlerts}</p>
              </div>
              <Shield className="h-10 w-10 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">KYB Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{newKYBAlerts}</p>
              </div>
              <Building2 className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="schedules">
        <TabsList>
          <TabsTrigger value="schedules">Monitoring Schedules</TabsTrigger>
          <TabsTrigger value="aml-alerts">AML Alerts ({newAMLAlerts})</TabsTrigger>
          <TabsTrigger value="kyb-alerts">KYB Alerts ({newKYBAlerts})</TabsTrigger>
        </TabsList>

        {/* Schedules */}
        <TabsContent value="schedules" className="space-y-4">
          {schedules.map(schedule => (
            <Card key={schedule.id} className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{schedule.entity_name}</h3>
                      <Badge variant={schedule.status === 'active' ? 'default' : 'secondary'}>
                        {schedule.status}
                      </Badge>
                      <Badge variant="outline">{schedule.monitoring_type.replace(/_/g, ' ')}</Badge>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Frequency</p>
                        <p className="font-medium">{schedule.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Check</p>
                        <p className="font-medium">{getNextCheckIn(schedule)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Checks</p>
                        <p className="font-medium">{schedule.check_count || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Alerts Generated</p>
                        <p className="font-medium">{schedule.alert_count || 0}</p>
                      </div>
                    </div>

                    {schedule.entity_lei && (
                      <p className="text-xs text-gray-500 mt-2">LEI: {schedule.entity_lei}</p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => runMonitoringMutation.mutate(schedule)}
                      disabled={runMonitoringMutation.isPending}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleScheduleMutation.mutate(schedule)}
                    >
                      {schedule.status === 'active' ? 
                        <Pause className="h-4 w-4" /> : 
                        <CheckCircle2 className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {schedules.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No monitoring schedules configured</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AML Alerts */}
        <TabsContent value="aml-alerts" className="space-y-4">
          {amlAlerts.map(alert => (
            <Card key={alert.id} className={`border-2 ${
              alert.severity === 'critical' ? 'border-red-500' :
              alert.severity === 'high' ? 'border-orange-500' :
              alert.severity === 'medium' ? 'border-yellow-500' :
              'border-blue-200'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{alert.details?.entity_name}</h3>
                      <Badge className={
                        alert.severity === 'critical' ? 'bg-red-600' :
                        alert.severity === 'high' ? 'bg-orange-600' :
                        alert.severity === 'medium' ? 'bg-yellow-600' :
                        'bg-blue-600'
                      }>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline">{alert.type.replace(/_/g, ' ')}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      Match Score: <span className="font-semibold">{alert.details?.match_score}%</span>
                    </p>

                    {alert.details?.categories && (
                      <div className="flex gap-2 mb-2">
                        {alert.details.categories.map((cat, i) => (
                          <Badge key={i} variant="secondary">{cat}</Badge>
                        ))}
                      </div>
                    )}

                    {alert.details?.notes && (
                      <p className="text-sm text-gray-700 mt-2">{alert.details.notes}</p>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Created {new Date(alert.created_date).toLocaleDateString()}
                    </p>
                  </div>

                  <Badge variant={alert.status === 'new' ? 'default' : 'secondary'}>
                    {alert.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* KYB Alerts */}
        <TabsContent value="kyb-alerts" className="space-y-4">
          {kybAlerts.map(alert => (
            <Card key={alert.id} className={`border-2 ${
              alert.severity === 'critical' ? 'border-red-500' :
              alert.severity === 'high' ? 'border-orange-500' :
              'border-blue-200'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{alert.entity_name}</h3>
                      <Badge className={
                        alert.severity === 'critical' ? 'bg-red-600' :
                        alert.severity === 'high' ? 'bg-orange-600' :
                        'bg-yellow-600'
                      }>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline">{alert.alert_type.replace(/_/g, ' ')}</Badge>
                    </div>

                    {alert.change_details && (
                      <div className="bg-gray-50 p-3 rounded-lg mt-2">
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>{alert.change_details.field_changed}:</strong>
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="line-through text-gray-500">{alert.change_details.old_value}</span>
                          {' → '}
                          <span className="font-semibold">{alert.change_details.new_value}</span>
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Detected {new Date(alert.created_date).toLocaleDateString()}
                    </p>
                  </div>

                  <Badge variant={alert.status === 'new' ? 'default' : 'secondary'}>
                    {alert.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}