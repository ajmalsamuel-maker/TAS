import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Award, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LEIVLEIStats() {
  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ['all-applications'],
    queryFn: () => base44.entities.OnboardingApplication.list('-created_date', 1000)
  });

  const { data: vleiCredentials = [], isLoading: vleisLoading } = useQuery({
    queryKey: ['all-vleis'],
    queryFn: () => base44.entities.vLEICredential.list('-created_date', 1000)
  });

  const { data: auditLogs = [], isLoading: logsLoading } = useQuery({
    queryKey: ['credential-audit-logs'],
    queryFn: () => base44.entities.AuditLog.filter({ 
      event_type: 'signature_generated' 
    }, '-created_date', 1000)
  });

  if (appsLoading || vleisLoading || logsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066B3]"></div>
      </div>
    );
  }

  // Calculate stats
  const totalLEIsIssued = applications.filter(app => app.generated_lei).length;
  const totalVLEIsIssued = vleiCredentials.length;
  const activeVLEIs = vleiCredentials.filter(v => v.status === 'active').length;
  const revokedVLEIs = vleiCredentials.filter(v => v.status === 'revoked').length;
  
  const approvedApps = applications.filter(app => app.status === 'approved').length;
  const successRate = approvedApps > 0 ? ((totalLEIsIssued / approvedApps) * 100).toFixed(1) : 0;

  // Recent issuances (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentLEIs = applications.filter(app => 
    app.lei_issued_date && new Date(app.lei_issued_date) > thirtyDaysAgo
  ).length;
  const recentVLEIs = vleiCredentials.filter(v => 
    new Date(v.created_date) > thirtyDaysAgo
  ).length;

  const stats = [
    {
      title: 'Total LEIs Issued',
      value: totalLEIsIssued,
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: `+${recentLEIs} this month`,
      trendUp: recentLEIs > 0
    },
    {
      title: 'Total vLEIs Issued',
      value: totalVLEIsIssued,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: `+${recentVLEIs} this month`,
      trendUp: recentVLEIs > 0
    },
    {
      title: 'Active vLEIs',
      value: activeVLEIs,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: `${revokedVLEIs} revoked`,
      trendUp: false
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      trend: `${approvedApps} applications approved`,
      trendUp: successRate > 90
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trendUp ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-xs text-gray-600">{stat.trend}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issuance Activity by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Applications Approved', count: approvedApps, color: 'bg-green-500' },
              { label: 'LEIs Generated', count: totalLEIsIssued, color: 'bg-blue-500' },
              { label: 'vLEIs Active', count: activeVLEIs, color: 'bg-purple-500' },
              { label: 'vLEIs Revoked', count: revokedVLEIs, color: 'bg-red-500' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${Math.min((item.count / Math.max(...[approvedApps, totalLEIsIssued, activeVLEIs, revokedVLEIs])) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}