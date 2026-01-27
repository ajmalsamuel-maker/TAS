import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Shield, Settings, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LEIVLEIStats from '../components/admin/LEIVLEIStats';
import IssuedCredentialsList from '../components/admin/IssuedCredentialsList';
import LOUQVIConfig from '../components/admin/LOUQVIConfig';
import CredentialAuditLogs from '../components/admin/CredentialAuditLogs';

export default function LEIVLEIAdmin() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    base44.auth.me().then(userData => {
      if (userData?.role !== 'admin') {
        window.location.href = '/';
      }
      setUser(userData);
      setLoading(false);
    }).catch(() => {
      window.location.href = '/';
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066B3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-[#0066B3]" />
            <h1 className="text-4xl font-bold text-gray-900">LEI & vLEI Administration</h1>
          </div>
          <p className="text-gray-600">Centralized credential issuance management and monitoring</p>
          
          <Card className="mt-4 border-red-300 bg-red-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800">
                    <strong>⚠️ Demo Environment:</strong> This system currently issues DEMO credentials. 
                    Configure real LOU/QVI integrations in the API Configuration tab for production use.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="credentials" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Credentials
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              API Config
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <LEIVLEIStats />
          </TabsContent>

          <TabsContent value="credentials">
            <IssuedCredentialsList />
          </TabsContent>

          <TabsContent value="config">
            <LOUQVIConfig />
          </TabsContent>

          <TabsContent value="audit">
            <CredentialAuditLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}