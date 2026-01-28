import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Activity, Shield, AlertTriangle, TrendingUp, Plus, Eye } from 'lucide-react';
import StatsCard from '../dashboard/StatsCard';
import TMaaSConfigForm from './TMaaSConfigForm.jsx';
import TransactionMonitoring from '../transaction/TransactionMonitoring';

export default function TMaaSManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showConfigForm, setShowConfigForm] = useState(false);

  const { data: configs = [] } = useQuery({
    queryKey: ['tmaas-configs'],
    queryFn: () => base44.entities.TMaaSConfig.list(),
    initialData: []
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['tmaas-transactions'],
    queryFn: async () => {
      if (configs.length === 0) return [];
      const allTxs = [];
      for (const config of configs) {
        const txs = await base44.entities.Transaction.filter({ tmaas_config_id: config.id });
        allTxs.push(...txs);
      }
      return allTxs;
    },
    enabled: configs.length > 0,
    initialData: []
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['tmaas-alerts'],
    queryFn: async () => {
      if (configs.length === 0) return [];
      const allAlerts = [];
      for (const config of configs) {
        const als = await base44.entities.TransactionAlert.filter({ tmaas_config_id: config.id });
        allAlerts.push(...als);
      }
      return allAlerts;
    },
    enabled: configs.length > 0,
    initialData: []
  });

  // Calculate metrics
  const totalProcessed = configs.reduce((sum, c) => sum + (c.transactions_processed || 0), 0);
  const totalBlocked = configs.reduce((sum, c) => sum + (c.transactions_blocked || 0), 0);
  const totalFlagged = configs.reduce((sum, c) => sum + (c.transactions_flagged || 0), 0);
  const activeConfigs = configs.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transaction Monitoring as a Service</h2>
        <Button 
          onClick={() => { setShowConfigForm(true); setSelectedConfig(null); }}
          className="bg-[#0044CC] hover:bg-[#002D66]"
        >
          <Plus className="h-4 w-4 mr-2" />
          New TMaaS Config
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Configurations"
          value={activeConfigs}
          icon={Shield}
          bgColor="bg-blue-500"
        />
        <StatsCard
          title="Transactions Processed"
          value={totalProcessed.toLocaleString()}
          icon={Activity}
          bgColor="bg-green-500"
        />
        <StatsCard
          title="Blocked Transactions"
          value={totalBlocked}
          icon={AlertTriangle}
          bgColor="bg-red-500"
        />
        <StatsCard
          title="Flagged for Review"
          value={totalFlagged}
          icon={TrendingUp}
          bgColor="bg-yellow-500"
        />
      </div>

      {/* Config Form Modal */}
      {showConfigForm && (
        <TMaaSConfigForm 
          config={selectedConfig}
          onClose={() => setShowConfigForm(false)}
          onSuccess={() => setShowConfigForm(false)}
        />
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white border-2 border-blue-100 rounded-lg p-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="configs" className="data-[state=active]:bg-[#0044CC] data-[state=active]:text-white">
              Configurations
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Alerts */}
            <Card className="border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {alerts.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No alerts</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {alerts.slice(0, 10).reverse().map((alert) => (
                      <div key={alert.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={
                            alert.severity === 'critical' ? 'bg-red-600' :
                            alert.severity === 'high' ? 'bg-orange-600' :
                            'bg-yellow-600'
                          }>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">{alert.alert_type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{alert.transaction_amount} {alert.transaction_currency}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(alert.created_date).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alert Summary */}
            <Card className="border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle>Alert Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Alerts</span>
                    <span className="text-2xl font-bold text-[#0044CC]">{alerts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">New</span>
                    <span className="text-2xl font-bold">{alerts.filter(a => a.status === 'new').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Under Review</span>
                    <span className="text-2xl font-bold">{alerts.filter(a => a.status === 'under_review').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Resolved</span>
                    <span className="text-2xl font-bold">{alerts.filter(a => a.status === 'resolved').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <TransactionMonitoring transactions={transactions} alerts={alerts} />
        </TabsContent>

        {/* Configurations Tab */}
        <TabsContent value="configs" className="space-y-6">
          {configs.length === 0 ? (
            <Card className="border-2 border-blue-100">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-gray-600 mb-4">No TMaaS configurations yet</p>
                <Button 
                  onClick={() => { setShowConfigForm(true); setSelectedConfig(null); }}
                  className="bg-[#0044CC] hover:bg-[#002D66]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Configuration
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {configs.map((config) => (
                <Card key={config.id} className="border-2 border-blue-100">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{config.service_name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{config.processor_name || 'No processor'}</p>
                      </div>
                      <Badge className={
                        config.status === 'active' ? 'bg-green-600' :
                        config.status === 'testing' ? 'bg-yellow-600' :
                        'bg-gray-600'
                      }>
                        {config.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Transactions Processed</p>
                        <p className="text-2xl font-bold">{config.transactions_processed || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Blocked</p>
                        <p className="text-2xl font-bold text-red-600">{config.transactions_blocked || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Flagged</p>
                        <p className="text-2xl font-bold text-yellow-600">{config.transactions_flagged || 0}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-semibold mb-2">Rules Configuration</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>✓ AML Screening: {config.monitoring_rules?.aml_screening ? 'Enabled' : 'Disabled'}</li>
                        <li>✓ Fraud Detection: {config.monitoring_rules?.fraud_detection ? 'Enabled' : 'Disabled'}</li>
                        <li>✓ Velocity Checks: {config.monitoring_rules?.velocity_checks ? 'Enabled' : 'Disabled'}</li>
                        <li>✓ Amount Threshold: ${config.monitoring_rules?.amount_threshold || 'Not set'}</li>
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => { setSelectedConfig(config); setShowConfigForm(true); }}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}