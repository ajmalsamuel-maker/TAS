import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, Loader, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function AMLMonitoringPanel() {
  const [running, setRunning] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');
  const [intervalDays, setIntervalDays] = useState('90');

  const { data: applications = [] } = useQuery({
    queryKey: ['approved-applications'],
    queryFn: () => base44.entities.OnboardingApplication.filter({ status: 'approved' }),
    initialData: []
  });

  const handleRunMonitoring = async () => {
    if (!selectedApp) {
      toast.error('Please select an application');
      return;
    }

    setRunning(true);
    try {
      const response = await base44.functions.invoke('scheduleAmlMonitoring', {
        applicationId: selectedApp,
        interval_days: parseInt(intervalDays)
      });

      if (response.data.success) {
        toast.success('AML monitoring initiated successfully');
      } else {
        toast.error(response.data.message || 'Failed to initiate monitoring');
      }
    } catch (error) {
      toast.error('Failed to run AML monitoring');
    } finally {
      setRunning(false);
    }
  };

  return (
    <Card className="border-2 border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#0044CC]" />
          Manual AML Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Manually trigger AML screening for approved applications to detect sanctions, PEP, or adverse media changes.
        </p>

        <div>
          <Label>Select Application</Label>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="w-full mt-1 rounded-md border border-gray-300 p-2"
          >
            <option value="">Choose an approved application</option>
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.legal_name} - {app.generated_lei || 'LEI Pending'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Monitoring Interval (Days)</Label>
          <Input
            type="number"
            value={intervalDays}
            onChange={(e) => setIntervalDays(e.target.value)}
            placeholder="90"
            min="1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Schedule next check in {intervalDays} days (default: 90)
          </p>
        </div>

        <Button
          onClick={handleRunMonitoring}
          disabled={running || !selectedApp}
          className="bg-[#0044CC] hover:bg-[#002D66] w-full"
        >
          {running ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Running AML Check...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run AML Monitoring Now
            </>
          )}
        </Button>

        <div className="bg-blue-50 p-3 rounded text-sm">
          <p className="font-semibold mb-2">Automated Monitoring Active:</p>
          <ul className="space-y-1 text-gray-700">
            <li className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Quarterly checks via automation (every 90 days)
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-3 w-3" />
              Triggered on application approval
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}