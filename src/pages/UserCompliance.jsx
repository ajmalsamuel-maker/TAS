import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle2, AlertTriangle, TrendingUp, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function UserCompliance() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: workflows = [] } = useQuery({
    queryKey: ['user-workflows'],
    queryFn: () => base44.entities.Workflow.filter({ user_id: user?.id }),
    enabled: !!user,
    initialData: []
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['user-alerts'],
    queryFn: () => base44.entities.AMLAlert.filter({ user_id: user?.id }),
    enabled: !!user,
    initialData: []
  });

  const completedWorkflows = workflows.filter(w => w.status === 'completed').length;
  const totalWorkflows = workflows.length;
  const complianceScore = totalWorkflows > 0 ? Math.round((completedWorkflows / totalWorkflows) * 100) : 100;
  const activeAlerts = alerts.filter(a => a.status === 'new' || a.status === 'under_review').length;

  const complianceLevel = complianceScore >= 90 ? 'Excellent' : complianceScore >= 70 ? 'Good' : complianceScore >= 50 ? 'Fair' : 'Needs Attention';
  const complianceColor = complianceScore >= 90 ? 'text-green-600' : complianceScore >= 70 ? 'text-blue-600' : complianceScore >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Compliance Overview</h1>
          <p className="text-xs sm:text-base text-gray-600">Monitor your compliance status, risk scores, and regulatory position</p>
        </div>

        {/* Compliance Score Card */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-2xl">Overall Compliance Score</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
              <div>
                <div className={`text-6xl font-bold ${complianceColor}`}>
                  {complianceScore}%
                </div>
                <p className="text-lg text-gray-600 mt-2">{complianceLevel}</p>
              </div>
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <Shield className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <Progress value={complianceScore} className="h-3 mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-900">{totalWorkflows}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedWorkflows}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
                <p className="text-2xl font-bold text-yellow-600">{activeAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Checklist */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#0044CC]" />
              Compliance Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {[
                { item: 'LEI Registration', status: !!user?.lei, required: true },
                { item: 'vLEI Credential (OOR)', status: !!user?.oor_credential, required: true },
                { item: 'KYB Verification', status: workflows.some(w => w.type === 'kyb' && w.status === 'completed'), required: true },
                { item: 'AML Screening', status: workflows.some(w => w.type === 'aml' && w.status === 'completed'), required: true },
                { item: 'DID Verification', status: workflows.some(w => w.type === 'did_verification' && w.status === 'completed'), required: false },
                { item: 'Provenance Chain Verified', status: workflows.some(w => w.data_passport), required: false }
              ].map((check, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {check.status ? (
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-xs sm:text-base text-gray-900">{check.item}</p>
                      {check.required && !check.status && (
                        <p className="text-xs text-red-600">Required for compliance</p>
                      )}
                    </div>
                  </div>
                  <Badge className={check.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                    {check.status ? 'Complete' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-[#0044CC]" />
              Risk Assessment & AML Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {activeAlerts === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">All Clear</h3>
                <p className="text-xs sm:text-base text-gray-600">No active AML alerts or compliance issues detected</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
                    <p className="font-semibold text-xs sm:text-sm text-gray-900">{activeAlerts} Active Alert{activeAlerts !== 1 ? 's' : ''}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">Please review and take action on pending alerts</p>
                </div>

                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="bg-white border-2 border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
                        <span className="font-semibold text-gray-900">
                          {alert.type?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <Badge className={
                        alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.details?.message || 'No details available'}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{format(new Date(alert.created_date), 'MMM d, yyyy HH:mm')}</span>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}