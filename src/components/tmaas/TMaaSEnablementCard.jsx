import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function TMaaSEnablementCard({ organization, onUpdate }) {
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnableTMaaS = async () => {
    setIsEnabling(true);
    try {
      await base44.entities.Organization.update(organization.id, {
        tmaas_enabled: true,
        tmaas_pricing_model: 'per_transaction'
      });
      toast.success('TMaaS enabled successfully!');
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error('Failed to enable TMaaS');
      console.error('Error enabling TMaaS:', error);
    } finally {
      setIsEnabling(false);
    }
  };

  return (
    <Card className="border-2 border-purple-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b-2 border-purple-100">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-purple-600" />
          Transaction Monitoring as a Service (TMaaS)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Status</span>
            {organization?.tmaas_enabled ? (
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Enabled
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
            )}
          </div>

          {/* Features List */}
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-600" />
              Key Features
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Real-time transaction screening against AML/fraud rules</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Automated alert generation and case management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Advanced rule builder with machine learning feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Comprehensive analytics and reporting dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Integration with your existing transaction systems via webhooks</span>
              </li>
            </ul>
          </div>

          {/* Pricing Info */}
          <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Pay-as-you-go pricing</p>
              <p>Per-transaction monitoring with no setup fees. Pricing based on transaction volume.</p>
            </div>
          </div>

          {/* Enable Button */}
          {!organization?.tmaas_enabled && (
            <div className="pt-4 border-t">
              <Button
                onClick={handleEnableTMaaS}
                disabled={isEnabling}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isEnabling ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Enabling TMaaS...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Enable TMaaS for Your Organization
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Once enabled, you can access the TMaaS analytics dashboard and configure transaction monitoring rules.
              </p>
            </div>
          )}

          {organization?.tmaas_enabled && (
            <div className="pt-4 border-t">
              <Link to={createPageUrl('UserTMaaSAnalytics')}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View TMaaS Analytics
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}