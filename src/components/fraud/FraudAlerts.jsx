import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function FraudAlerts({ alerts }) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const queryClient = useQueryClient();

  const updateAlertMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.FraudAlert.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['fraud-alerts']);
      toast.success('Alert updated');
    }
  });

  const createCaseMutation = useMutation({
    mutationFn: async (alert) => {
      const response = await base44.functions.invoke('createCaseFromAlert', {
        type: 'fraud_alert',
        priority: alert.severity,
        subject: `Fraud Alert: ${alert.fraud_type.replace(/_/g, ' ')}`,
        description: `Fraud detected with ${(alert.confidence_score * 100).toFixed(1)}% confidence\n\nIndicators: ${alert.indicators?.join(', ')}`,
        sla_hours: alert.severity === 'critical' ? 1 : 4
      });
      
      await base44.entities.FraudAlert.update(alert.id, {
        case_id: response.data.case_id,
        status: 'investigating'
      });
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['fraud-alerts']);
      toast.success('Case created');
    }
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Detected</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{alert.fraud_type.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-gray-500">{alert.detection_method}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${alert.confidence_score * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {(alert.confidence_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{alert.risk_score || 0}/100</span>
                </TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{alert.status.replace(/_/g, ' ')}</Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(alert.created_date), 'MMM d, HH:mm')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {!alert.case_id && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => createCaseMutation.mutate(alert)}
                      >
                        Create Case
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateAlertMutation.mutate({
                        id: alert.id,
                        data: { status: 'confirmed' }
                      })}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateAlertMutation.mutate({
                        id: alert.id,
                        data: { status: 'false_positive' }
                      })}
                    >
                      <XCircle className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedAlert && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">Alert Details</h3>
              <Button size="sm" variant="ghost" onClick={() => setSelectedAlert(null)}>
                Close
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Indicators:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(selectedAlert.indicators || []).map((ind, idx) => (
                    <Badge key={idx} variant="outline">{ind}</Badge>
                  ))}
                </div>
              </div>
              {selectedAlert.device_data && (
                <div>
                  <span className="font-medium">Device Data:</span>
                  <pre className="bg-white p-2 rounded text-xs mt-1 overflow-auto">
                    {JSON.stringify(selectedAlert.device_data, null, 2)}
                  </pre>
                </div>
              )}
              {selectedAlert.behavioral_data && (
                <div>
                  <span className="font-medium">Behavioral Analysis:</span>
                  <pre className="bg-white p-2 rounded text-xs mt-1 overflow-auto">
                    {JSON.stringify(selectedAlert.behavioral_data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}