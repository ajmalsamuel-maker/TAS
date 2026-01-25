import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import FraudAlerts from './FraudAlerts';
import FraudModels from './FraudModels';
import DeviceIntelligence from './DeviceIntelligence';

export default function FraudDashboard() {
  const { data: alerts = [] } = useQuery({
    queryKey: ['fraud-alerts'],
    queryFn: () => base44.entities.FraudAlert.list('-created_date', 100),
    initialData: [],
    refetchInterval: 15000
  });

  const { data: models = [] } = useQuery({
    queryKey: ['fraud-models'],
    queryFn: () => base44.entities.FraudModel.list(),
    initialData: []
  });

  const stats = {
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
    activeModels: models.filter(m => m.is_active).length,
    avgConfidence: alerts.length > 0 
      ? (alerts.reduce((sum, a) => sum + (a.confidence_score || 0), 0) / alerts.length * 100).toFixed(1)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold">{stats.totalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600">{stats.criticalAlerts}</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Models</p>
                <p className="text-2xl font-bold">{stats.activeModels}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold">{stats.avgConfidence}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="alerts">
        <TabsList>
          <TabsTrigger value="alerts">Fraud Alerts</TabsTrigger>
          <TabsTrigger value="models">Detection Models</TabsTrigger>
          <TabsTrigger value="devices">Device Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <FraudAlerts alerts={alerts} />
        </TabsContent>

        <TabsContent value="models">
          <FraudModels models={models} />
        </TabsContent>

        <TabsContent value="devices">
          <DeviceIntelligence />
        </TabsContent>
      </Tabs>
    </div>
  );
}