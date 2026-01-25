import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Users, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function CaseAssignmentUI({ alert, orgId, onAssignmentChange }) {
  const [assignee, setAssignee] = useState(alert?.assigned_to || '');
  const [notes, setNotes] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['teamMembers', orgId],
    queryFn: async () => {
      const users = await base44.entities.User.filter({ organization_id: orgId, role: 'admin' });
      return users || [];
    },
    enabled: !!orgId
  });

  const handleAssign = async () => {
    if (!assignee) {
      toast.error('Please select an investigator');
      return;
    }

    setIsAssigning(true);
    try {
      await base44.entities.Case.create({
        organization_id: orgId,
        type: 'aml_alert',
        priority: alert.severity,
        status: 'assigned',
        subject: `AML Alert: ${alert.type}`,
        description: `Alert ID: ${alert.id}\nType: ${alert.type}\nSeverity: ${alert.severity}\n\nNotes: ${notes}`,
        assigned_to: assignee,
        assigned_at: new Date().toISOString(),
        assigned_by: 'system',
        related_entity_type: 'AMLAlert',
        related_entity_id: alert.id,
        sla_due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

      toast.success(`Alert assigned to ${assignee}`);
      setNotes('');
      onAssignmentChange();
    } catch (error) {
      toast.error('Failed to assign alert');
    } finally {
      setIsAssigning(false);
    }
  };

  if (alert?.assigned_to) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assigned to {alert.assigned_to}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          Assign Investigation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Alert Type</p>
          <Badge>{alert.type}</Badge>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Assign to Investigator</p>
          <Select value={assignee} onValueChange={setAssignee}>
            <SelectTrigger disabled={isLoading || isAssigning}>
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <div className="p-2 text-sm text-gray-500">Loading team members...</div>
              ) : (
                teamMembers?.map((member) => (
                  <SelectItem key={member.id} value={member.email}>
                    {member.full_name} ({member.email})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Investigation Notes</p>
          <Textarea
            placeholder="Add notes about why this alert requires investigation..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-20"
            disabled={isAssigning}
          />
        </div>

        <Button
          onClick={handleAssign}
          className="w-full bg-amber-600 hover:bg-amber-700"
          disabled={isAssigning || !assignee}
        >
          {isAssigning ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Assigning...
            </>
          ) : (
            'Assign Case'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}