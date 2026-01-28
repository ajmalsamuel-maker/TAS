import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle } from 'lucide-react';

export default function AMLAlertsTab({ organizationId }) {
  const { data: alerts = [] } = useQuery({
    queryKey: ['aml-alerts', organizationId],
    queryFn: () => base44.entities.AMLAlert.filter({ organization_id: organizationId }),
    initialData: []
  });

  const newAlerts = alerts.filter(a => a.status === 'new');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AML Screening Alerts</h3>
        <Badge>{newAlerts.length} New</Badge>
      </div>

      {alerts.map(alert => (
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
                  <Shield className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">{alert.details?.entity_name}</h3>
                  <Badge className={
                    alert.severity === 'critical' ? 'bg-red-600' :
                    alert.severity === 'high' ? 'bg-orange-600' :
                    alert.severity === 'medium' ? 'bg-yellow-600' :
                    'bg-blue-600'
                  }>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline">{(alert.type || 'alert').replace(/_/g, ' ')}</Badge>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  Match Score: <span className="font-semibold">{alert.details?.match_score}%</span>
                </p>

                {alert.details?.categories && (
                  <div className="flex gap-2 flex-wrap mb-2">
                    {alert.details.categories.map((cat, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{cat}</Badge>
                    ))}
                  </div>
                )}

                {alert.details?.notes && (
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mt-2">{alert.details.notes}</p>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  Detected on {new Date(alert.created_date).toLocaleString()}
                </p>
              </div>

              <Badge variant={alert.status === 'new' ? 'default' : 'secondary'}>
                {alert.status || 'pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}

      {alerts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No AML alerts</p>
            <p className="text-sm text-gray-500">Alerts will appear when sanctions or PEP matches are detected</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}