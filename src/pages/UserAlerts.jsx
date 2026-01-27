import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Building2, AlertTriangle, CheckCircle2, Clock, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AMLAlertsTab from '../components/monitoring/AMLAlertsTab';
import KYBAlertsTab from '../components/monitoring/KYBAlertsTab';

export default function UserAlerts() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('all');

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        if (userData?.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserAlerts')));
  }, []);

  const { data: amlAlerts = [] } = useQuery({
    queryKey: ['user-aml-alerts', user?.organization_id],
    queryFn: () => base44.entities.AMLAlert.filter({ organization_id: user.organization_id }),
    enabled: !!user?.organization_id,
    initialData: []
  });

  const { data: kybAlerts = [] } = useQuery({
    queryKey: ['user-kyb-alerts', user?.organization_id],
    queryFn: () => base44.entities.KYBAlert.filter({ organization_id: user.organization_id }),
    enabled: !!user?.organization_id,
    initialData: []
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const activeAMLAlerts = amlAlerts.filter(a => a.status === 'new').length;
  const activeKYBAlerts = kybAlerts.filter(a => a.status === 'new').length;
  const totalAlerts = amlAlerts.length + kybAlerts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Compliance Alerts</h1>
          <p className="text-gray-600">Monitor AML and KYB alerts</p>
        </div>

        {/* Alert Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Alerts</p>
                  <p className="text-3xl font-bold">{totalAlerts}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active AML</p>
                  <p className="text-3xl font-bold">{activeAMLAlerts}</p>
                </div>
                <Shield className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active KYB</p>
                  <p className="text-3xl font-bold">{activeKYBAlerts}</p>
                </div>
                <Building2 className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold">{totalAlerts - activeAMLAlerts - activeKYBAlerts}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Tabs */}
        <Tabs defaultValue="aml" className="bg-white rounded-lg border-2 border-blue-100 shadow-lg">
          <TabsList className="border-b">
            <TabsTrigger value="aml" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              AML Alerts ({activeAMLAlerts})
            </TabsTrigger>
            <TabsTrigger value="kyb" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              KYB Alerts ({activeKYBAlerts})
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="aml">
              <AMLAlertsTab organizationId={user.organization_id} />
            </TabsContent>

            <TabsContent value="kyb">
              <KYBAlertsTab organizationId={user.organization_id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}