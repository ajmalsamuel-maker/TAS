import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp } from 'lucide-react';

export default function KYBAlertsTab({ organizationId }) {
  const { data: alerts = [] } = useQuery({
    queryKey: ['kyb-alerts', organizationId],
    queryFn: () => base44.entities.KYBAlert.filter({ organization_id: organizationId }),
    initialData: []
  });

  const newAlerts = alerts.filter(a => a.status === 'new');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">KYB Change Alerts</h3>
        <Badge>{newAlerts.length} New</Badge>
      </div>

      {alerts.map(alert => (
        <Card key={alert.id} className={`border-2 ${
          alert.severity === 'critical' ? 'border-red-500' :
          alert.severity === 'high' ? 'border-orange-500' :
          'border-blue-200'
        }`}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{alert.entity_name}</h3>
                  <Badge className={
                    alert.severity === 'critical' ? 'bg-red-600' :
                    alert.severity === 'high' ? 'bg-orange-600' :
                    'bg-yellow-600'
                  }>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline">{(alert.alert_type || 'change').replace(/_/g, ' ')}</Badge>
                </div>

                {alert.change_details && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mt-2">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      {alert.change_details.field_changed}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="line-through text-gray-500">{alert.change_details.old_value}</span>
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                      <span className="font-semibold text-gray-900">{alert.change_details.new_value}</span>
                    </div>
                    {alert.change_details.change_date && (
                      <p className="text-xs text-gray-500 mt-1">
                        Change date: {new Date(alert.change_details.change_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {alert.entity_lei && (
                  <p className="text-xs text-gray-500 mt-2">LEI: {alert.entity_lei}</p>
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
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No KYB alerts</p>
            <p className="text-sm text-gray-500">Alerts will appear when company changes are detected</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}