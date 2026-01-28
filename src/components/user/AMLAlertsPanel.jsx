import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function AMLAlertsPanel({ alerts }) {
  const getSeverityColor = (severity) => {
    const colors = {
      'low': 'bg-blue-100 text-blue-800 border-blue-200',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'high': 'bg-orange-100 text-orange-800 border-orange-200',
      'critical': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'resolved': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'under_review': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b-2 border-orange-100">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          AML Alerts & Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">No Active Alerts</p>
            <p className="text-sm text-gray-600">Your compliance status is clean</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <span className="font-semibold text-gray-900">
                      {(alert.type || 'alert').replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)} variant="outline">
                    {alert.severity}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {alert.details?.message || 'Alert details not available'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{format(new Date(alert.created_date), 'MMM d, yyyy HH:mm')}</span>
                  <Badge variant="outline" className="text-xs">
                    {(alert.status || 'pending').replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}