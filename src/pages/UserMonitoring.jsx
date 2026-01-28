import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Play, Pause, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import CreateScheduleModal from '../components/monitoring/CreateScheduleModal';
import AMLAlertsTab from '../components/monitoring/AMLAlertsTab';
import KYBAlertsTab from '../components/monitoring/KYBAlertsTab';

export default function UserMonitoring() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [application, setApplication] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        
        if (userData.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);

          const apps = await base44.entities.OnboardingApplication.filter({ 
            organization_id: userData.organization_id,
            status: 'approved'
          });
          setApplication(apps[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserMonitoring')));
  }, []);

  const { data: schedules = [] } = useQuery({
    queryKey: ['user-schedules', user?.organization_id],
    queryFn: () => base44.entities.MonitoringSchedule.filter({ organization_id: user.organization_id }),
    enabled: !!user?.organization_id,
    initialData: []
  });

  const toggleScheduleMutation = useMutation({
    mutationFn: async (schedule) => {
      return base44.entities.MonitoringSchedule.update(schedule.id, {
        status: schedule.status === 'active' ? 'paused' : 'active'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-schedules'] });
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
      queryClient.invalidateQueries({ queryKey: ['user-schedules'] });
      queryClient.invalidateQueries({ queryKey: ['aml-alerts'] });
      queryClient.invalidateQueries({ queryKey: ['kyb-alerts'] });
      toast.success(`Check complete`);
    },
    onError: (error) => {
      toast.error('Monitoring failed: ' + error.message);
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const activeSchedules = schedules.filter(s => s.status === 'active').length;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ongoing Compliance Monitoring</h1>
          <p className="text-gray-600">Continuous surveillance of existing customers - schedule automatic AML/KYB checks to detect changes over time</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Schedules</p>
                  <p className="text-3xl font-bold">{activeSchedules}</p>
                </div>
                <Clock className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Checks</p>
                  <p className="text-3xl font-bold">{schedules.reduce((sum, s) => sum + (s.check_count || 0), 0)}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Alerts</p>
                  <p className="text-3xl font-bold">{schedules.reduce((sum, s) => sum + (s.alert_count || 0), 0)}</p>
                </div>
                <Shield className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedules">
          <TabsList>
            <TabsTrigger value="schedules">Monitoring Schedules</TabsTrigger>
            <TabsTrigger value="aml">AML Alerts</TabsTrigger>
            <TabsTrigger value="kyb">KYB Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="schedules" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Monitoring Schedules</h3>
              {application && (
                <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Schedule
                </Button>
              )}
            </div>

            {schedules.map(schedule => (
              <Card key={schedule.id} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{schedule.entity_name}</h3>
                        <Badge variant={schedule.status === 'active' ? 'default' : 'secondary'}>
                          {schedule.status}
                        </Badge>
                        <Badge variant="outline">{schedule.monitoring_type.replace(/_/g, ' ')}</Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Frequency</p>
                          <p className="font-medium capitalize">{schedule.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Check</p>
                          <p className="font-medium">{getNextCheckIn(schedule)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Checks Run</p>
                          <p className="font-medium">{schedule.check_count || 0}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Alerts</p>
                          <p className="font-medium">{schedule.alert_count || 0}</p>
                        </div>
                      </div>
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
                  <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">No monitoring schedules configured</p>
                  {application && (
                    <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Schedule
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="aml">
            <AMLAlertsTab organizationId={user.organization_id} />
          </TabsContent>

          <TabsContent value="kyb">
            <KYBAlertsTab organizationId={user.organization_id} />
          </TabsContent>
        </Tabs>

        {showCreateModal && (
          <CreateScheduleModal
            open={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            organization={organization}
            application={application}
          />
        )}
      </div>
    </div>
  );
}