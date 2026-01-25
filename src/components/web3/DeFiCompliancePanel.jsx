import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Loader, TrendingDown, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function DeFiCompliancePanel({ application, userWallet }) {
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  const [transactionMonitor, setTransactionMonitor] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const defiProtocols = [
    { name: 'Uniswap', riskLevel: 'low', coverage: '98%' },
    { name: 'Aave', riskLevel: 'low', coverage: '99%' },
    { name: 'Curve', riskLevel: 'low', coverage: '96%' },
    { name: 'Lido', riskLevel: 'medium', coverage: '94%' }
  ];

  const handleEnableMonitoring = async () => {
    if (!userWallet) {
      toast.error('Wallet address required');
      return;
    }

    setIsEnabling(true);
    try {
      const result = await base44.functions.invoke('setupDeFiMonitoring', {
        applicationId: application.id,
        walletAddress: userWallet,
        lei: application.generated_lei
      });

      setMonitoringActive(true);
      setTransactionMonitor(result.data);
      toast.success('DeFi monitoring enabled');
    } catch (error) {
      toast.error('Failed to enable monitoring');
    } finally {
      setIsEnabling(false);
    }
  };

  const riskBadgeColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="border-2 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-orange-600" />
          DeFi Compliance Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!monitoringActive ? (
          <>
            <p className="text-sm text-gray-700">
              Monitor all DeFi transactions against your LEI and AML/KYB profile to ensure compliance across protocols.
            </p>

            <Button
              onClick={handleEnableMonitoring}
              disabled={isEnabling || !userWallet}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {isEnabling ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Enabling Monitoring...
                </>
              ) : (
                'Enable DeFi Monitoring'
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Monitoring Status */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="font-semibold text-green-900">Monitoring Active</p>
              </div>
              <p className="text-sm text-green-700">
                Real-time transaction screening enabled for {transactionMonitor?.protocolCount || 0} protocols
              </p>
            </div>

            {/* Supported Protocols */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">Covered Protocols</p>
              <div className="grid grid-cols-2 gap-3">
                {defiProtocols.map((protocol, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm text-gray-900">{protocol.name}</p>
                      <Badge className={riskBadgeColors[protocol.riskLevel]}>
                        {protocol.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">Coverage: {protocol.coverage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Thresholds */}
            <div className="space-y-3 p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">Auto-Block Thresholds</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Risk Score > 75</span>
                  <Badge>Auto-Block</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Sanctioned Counterparty</span>
                  <Badge>Auto-Block</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">High-Risk Jurisdiction</span>
                  <Badge variant="outline">Flag for Review</Badge>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            {recentTransactions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">Recent Transaction Alerts</p>
                <div className="space-y-1">
                  {recentTransactions.slice(0, 3).map((tx, idx) => (
                    <div key={idx} className="p-2 bg-white rounded border border-gray-200 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono">{tx.hash.slice(0, 10)}...</span>
                        <Badge variant={tx.status === 'flagged' ? 'destructive' : 'outline'}>
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setMonitoringActive(false)}
            >
              Disable Monitoring
            </Button>
          </>
        )}

        {/* Info */}
        <div className="p-4 bg-orange-100 border-l-4 border-orange-600 rounded">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-900">
              <p className="font-semibold mb-1">Continuous Screening</p>
              <p>All transactions are screened in real-time against AML lists, sanctions lists, and peer risk assessments.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}