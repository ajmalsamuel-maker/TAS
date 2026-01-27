import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import VLEIManager from '../components/credentials/VLEIManager';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';

export default function VLEIManagement() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        
        if (userData.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        base44.auth.redirectToLogin(createPageUrl('VLEIManagement'));
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Organization Found</h2>
              <p className="text-gray-600">
                You need to complete the onboarding process and have an approved organization before managing vLEI credentials.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Demo vLEI Credential Management</h1>
          <p className="text-gray-600">Issue and manage demo verifiable Legal Entity Identifier credentials for {organization.name}</p>
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm text-red-800">
              <strong>⚠️ Sandbox Environment:</strong> Credentials issued here are for testing only and are not real GLEIF vLEIs.
            </p>
          </div>
        </div>

        <VLEIManager organization={organization} />
      </div>
    </div>
  );
}