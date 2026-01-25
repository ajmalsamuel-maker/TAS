import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2, AlertCircle, Activity } from 'lucide-react';

export default function DeFiCompliancePanel({ workflows = [], alerts = [] }) {
  const amlWorkflows = workflows.filter(w => w.type === 'aml');
  const kybWorkflows = workflows.filter(w => w.type === 'kyb');
  const activeAlerts = alerts.filter(a => a.status === 'new' || a.status === 'under_review');
  
  const complianceScore = workflows.length > 0 
    ? Math.round((workflows.filter(w => w.status === 'completed').length / workflows.length) * 100)
    : 0;

  const isCompliant = complianceScore >= 80 && activeAlerts.length === 0;

  return (
    <Card className="border-2 border-cyan-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-cyan-200">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyan-600" />
          DeFi Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Compliance Score</p>
              <p className="text-3xl font-bold text-gray-900">{complianceScore}%</p>
            </div>
            <Badge className={isCompliant ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
              {isCompliant ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  DeFi Ready
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Action Required
                </>
              )}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
              <p className="text-xs text-gray-600 mb-1">KYB Checks</p>
              <p className="text-2xl font-bold text-cyan-900">{kybWorkflows.length}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
              <p className="text-xs text-gray-600 mb-1">AML Screenings</p>
              <p className="text-2xl font-bold text-cyan-900">{amlWorkflows.length}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-cyan-100">
              <p className="text-xs text-gray-600 mb-1">Active Alerts</p>
              <p className="text-2xl font-bold text-orange-600">{activeAlerts.length}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-cyan-100">
              <p className="text-xs text-gray-600 mb-1">Auto-Monitoring</p>
              <p className="text-sm font-semibold text-green-700">
                <Activity className="h-4 w-4 inline mr-1" />
                Active
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Real-time Monitoring:</strong> Your compliance status is continuously monitored 
              for regulatory changes and suspicious activities.
            </p>
          </div>

          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
            View Compliance Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}