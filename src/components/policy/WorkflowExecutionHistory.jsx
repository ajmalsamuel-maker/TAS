import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function WorkflowExecutionHistory({ executions = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Execution History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {executions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No executions yet</p>
        ) : (
          <div className="space-y-3">
            {executions.map((execution) => (
              <div key={execution.id} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {execution.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      {new Date(execution.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <Badge className={getStatusColor(execution.status)}>
                    {execution.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Duration: {execution.duration}ms</p>
                  <p>Nodes executed: {execution.nodesExecuted}</p>
                  {execution.decision && (
                    <p className="flex items-center gap-1">
                      Decision: <ArrowRight className="h-3 w-3" /> {execution.decision}
                    </p>
                  )}
                </div>
                {execution.error && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                    {execution.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}