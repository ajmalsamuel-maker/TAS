import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function CreateScheduleModal({ open, onClose, organization, application }) {
  const [formData, setFormData] = useState({
    monitoring_type: 'aml_watchlist',
    frequency: 'quarterly',
    alert_threshold: 80,
    notify_emails: '',
    auto_escalate: false
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const nextCheck = new Date();
      if (data.frequency === 'daily') nextCheck.setDate(nextCheck.getDate() + 1);
      else if (data.frequency === 'weekly') nextCheck.setDate(nextCheck.getDate() + 7);
      else if (data.frequency === 'monthly') nextCheck.setMonth(nextCheck.getMonth() + 1);
      else nextCheck.setMonth(nextCheck.getMonth() + 3);

      return base44.entities.MonitoringSchedule.create({
        organization_id: organization.id,
        application_id: application.id,
        monitoring_type: data.monitoring_type,
        frequency: data.frequency,
        status: 'active',
        entity_name: application.legal_name,
        entity_lei: application.generated_lei,
        next_check_date: nextCheck.toISOString(),
        monitoring_config: {
          alert_threshold: data.alert_threshold,
          notify_emails: data.notify_emails.split(',').map(e => e.trim()).filter(Boolean),
          auto_escalate: data.auto_escalate
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-schedules'] });
      toast.success('Monitoring schedule created');
      onClose();
    },
    onError: (error) => {
      toast.error('Failed to create schedule: ' + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Monitoring Schedule</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Entity</Label>
            <Input value={application?.legal_name} disabled />
          </div>

          <div>
            <Label>Monitoring Type</Label>
            <Select value={formData.monitoring_type} onValueChange={(v) => setFormData({...formData, monitoring_type: v})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aml_watchlist">AML Watchlist</SelectItem>
                <SelectItem value="aml_adverse_media">AML Adverse Media</SelectItem>
                <SelectItem value="kyb_company_changes">KYB Company Changes</SelectItem>
                <SelectItem value="kyb_beneficial_ownership">KYB Beneficial Ownership</SelectItem>
                <SelectItem value="combined">Combined (AML + KYB)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Frequency</Label>
            <Select value={formData.frequency} onValueChange={(v) => setFormData({...formData, frequency: v})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly (Recommended)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Alert Threshold (%)</Label>
            <Input
              type="number"
              min="50"
              max="100"
              value={formData.alert_threshold}
              onChange={(e) => setFormData({...formData, alert_threshold: parseInt(e.target.value)})}
            />
            <p className="text-xs text-gray-500 mt-1">Match score threshold for generating alerts</p>
          </div>

          <div>
            <Label>Notification Emails (comma-separated)</Label>
            <Input
              type="text"
              placeholder="email1@example.com, email2@example.com"
              value={formData.notify_emails}
              onChange={(e) => setFormData({...formData, notify_emails: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="auto_escalate"
              checked={formData.auto_escalate}
              onCheckedChange={(checked) => setFormData({...formData, auto_escalate: checked})}
            />
            <Label htmlFor="auto_escalate" className="cursor-pointer">
              Auto-escalate high-risk findings
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending} className="flex-1 bg-blue-600">
              Create Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}