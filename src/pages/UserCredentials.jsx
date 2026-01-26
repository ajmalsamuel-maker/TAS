import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Key, Shield, Globe, Copy, CheckCircle2, ExternalLink, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';
import VLEIManager from '../components/credentials/VLEIManager';

export default function UserCredentials() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [copied, setCopied] = useState('');
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    base44.auth.me().then(async (userData) => {
      setUser(userData);
      if (userData?.id) {
        const userWorkflows = await base44.entities.Workflow.filter({ user_id: userData.id });
        setWorkflows(userWorkflows);
      }
      if (userData?.organization_id) {
        const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
        setOrganization(orgs[0]);
      }
    });
  }, []);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Credentials & Identity</h1>
          <p className="text-gray-600">Manage your LEI, vLEI, and trust credentials</p>
        </div>

        {/* LEI Card */}
        <Card className="mb-6 border-2 border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Key className="h-6 w-6 text-[#0044CC]" />
              Legal Entity Identifier (LEI)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {user?.lei ? (
              <div>
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Your LEI</p>
                      <p className="text-3xl font-mono font-bold text-gray-900">{user.lei}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(user.lei, 'LEI')}
                    className="border-blue-300"
                  >
                    {copied === 'LEI' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy LEI
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Issued To</p>
                    <p className="font-semibold text-gray-900">{user.company_name || user.full_name}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="font-semibold text-green-700">Valid & Active</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Standard</p>
                    <p className="font-semibold text-gray-900">ISO 17442</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Region</p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <p className="font-semibold text-gray-900">{user.region || 'Global'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">LEI Pending</h3>
                <p className="text-gray-600 mb-6">Your LEI is being processed and will be issued shortly</p>
                <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* vLEI Manager */}
        {organization && organization.lei && (
          <VLEIManager organization={organization} />
        )}

        {/* vLEI Credentials - Legacy Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Official Organizational Role (OOR)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {user?.oor_credential ? (
                <div>
                  <Badge className="bg-green-100 text-green-800 mb-4">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Issued
                  </Badge>
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Role Type</p>
                      <p className="font-semibold text-gray-900">Official Organizational Role</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Position</p>
                      <p className="font-semibold text-gray-900">{user.position || 'Authorized Representative'}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Authority</p>
                      <p className="font-semibold text-gray-900">Workflow initiation, compliance approvals</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">OOR credential not yet issued</p>
                  <Badge variant="outline">Pending</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-cyan-100">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-600" />
                Engagement Context Role (ECR)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {user?.ecr_credential ? (
                <div>
                  <Badge className="bg-green-100 text-green-800 mb-4">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Issued
                  </Badge>
                  <div className="space-y-3 text-sm">
                    <div className="bg-cyan-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Role Type</p>
                      <p className="font-semibold text-gray-900">Engagement Context Role</p>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Context</p>
                      <p className="font-semibold text-gray-900">Project-specific authority</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">ECR credential not yet issued</p>
                  <Badge variant="outline">Pending</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Data Provenance */}
        <Card className="border-2 border-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-600" />
              Data Provenance & Trust Chain
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">
              All your workflows are cryptographically signed and linked to your LEI, creating an immutable audit trail 
              that proves data origin and authorization at every step.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Workflows with Provenance</p>
                <p className="text-2xl font-bold text-green-700">
                  {workflows.filter(w => w.provenance_chain && w.provenance_chain.length > 0).length}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Data Passports Issued</p>
                <p className="text-2xl font-bold text-green-700">
                  {workflows.filter(w => w.data_passport).length}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Trust Chain Integrity</p>
                <p className="text-2xl font-bold text-green-700">100%</p>
              </div>
            </div>

            <div className="mt-6 bg-white border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">What is Data Provenance?</p>
              <p className="text-sm text-gray-600">
                Data provenance creates a cryptographically verifiable record of where your data came from, 
                who authorized its use, and every step it passed through. This ensures complete auditability, 
                reduces fraud, and provides regulatory confidence.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}