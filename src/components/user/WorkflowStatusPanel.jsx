import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function WorkflowStatusPanel({ workflows }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'in_progress': return <Activity className="h-5 w-5 text-blue-600 animate-pulse" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProgress = (status) => {
    switch(status) {
      case 'completed': return 100;
      case 'in_progress': return 60;
      case 'failed': return 0;
      default: return 20;
    }
  };

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#0044CC]" />
          My Workflows & Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {workflows.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">No Workflows Yet</p>
            <p className="text-sm text-gray-600">Your workflows will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(workflow.status)}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {workflow.type?.replace('_', ' ').toUpperCase()}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Provider: {workflow.provider_name || 'TAS Platform'}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(workflow.status)}>
                    {workflow.status}
                  </Badge>
                </div>

                <Progress value={getProgress(workflow.status)} className="h-2 mb-3" />

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{format(new Date(workflow.created_date), 'MMM d, yyyy HH:mm')}</span>
                  {workflow.provenance_chain && (
                    <span className="text-green-700 font-medium">
                      ✓ Provenance verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}