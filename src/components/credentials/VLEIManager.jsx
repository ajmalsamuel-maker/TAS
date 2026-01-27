import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, X, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function VLEIManager({ organization }) {
  const [showIssuer, setShowIssuer] = useState(false);
  const [formData, setFormData] = useState({
    credentialType: 'OOR',
    holderName: '',
    holderEmail: '',
    holderDid: '',
    roleTitle: '',
    authorityScope: '',
    validUntil: ''
  });
  const queryClient = useQueryClient();

  const { data: vleis = [], isLoading } = useQuery({
    queryKey: ['vleis', organization?.id],
    queryFn: () => base44.entities.vLEICredential.filter({ organization_id: organization.id }),
    enabled: !!organization?.id,
    initialData: []
  });

  const issueVLEIMutation = useMutation({
    mutationFn: (data) => base44.functions.invoke('issueVLEI', data),
    onSuccess: () => {
      toast.success('vLEI credential issued successfully');
      queryClient.invalidateQueries(['vleis']);
      setShowIssuer(false);
      setFormData({
        credentialType: 'OOR',
        holderName: '',
        holderEmail: '',
        holderDid: '',
        roleTitle: '',
        authorityScope: '',
        validUntil: ''
      });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to issue vLEI');
    }
  });

  const revokeVLEIMutation = useMutation({
    mutationFn: async ({ id, reason }) => {
      await base44.entities.vLEICredential.update(id, {
        status: 'revoked',
        revocation_reason: reason,
        revoked_at: new Date().toISOString()
      });
    },
    onSuccess: () => {
      toast.success('vLEI credential revoked');
      queryClient.invalidateQueries(['vleis']);
    }
  });

  const handleIssue = () => {
    if (!formData.holderName || !formData.holderEmail || !formData.roleTitle) {
      toast.error('Please fill in all required fields');
      return;
    }
    issueVLEIMutation.mutate(formData);
  };

  const downloadCredential = (vlei) => {
    const blob = new Blob([JSON.stringify(vlei.credential_data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${vlei.vlei_id}.json`;
    a.click();
    toast.success('Credential downloaded');
  };

  const activeVLEIs = vleis.filter(v => v.status === 'active');
  const revokedVLEIs = vleis.filter(v => v.status === 'revoked');

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-300 bg-red-50 shadow-lg mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">⚠️ SANDBOX/DEMO CREDENTIALS ONLY</h3>
              <p className="text-sm text-red-800 mb-2">
                This system issues <strong>DEMO vLEI credentials</strong> for testing purposes only. These are NOT real GLEIF credentials.
              </p>
              <p className="text-xs text-red-700">
                Real vLEI credentials require GLEIF's Qualified vLEI Issuer (QVI) infrastructure and cannot be self-issued. 
                For production use, integrate with a GLEIF-accredited issuer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              Demo vLEI Credential Manager
            </CardTitle>
            <Button onClick={() => setShowIssuer(!showIssuer)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Issue vLEI
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Total Issued</p>
              <p className="text-3xl font-bold text-purple-700">{vleis.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-700">{activeVLEIs.length}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Revoked</p>
              <p className="text-3xl font-bold text-red-700">{revokedVLEIs.length}</p>
            </div>
          </div>

          {showIssuer && (
            <Card className="border-2 border-purple-300 bg-purple-50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Issue New vLEI Credential</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Credential Type *</Label>
                  <Select value={formData.credentialType} onValueChange={(v) => setFormData({...formData, credentialType: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OOR">OOR - Official Organizational Role</SelectItem>
                      <SelectItem value="ECR">ECR - Engagement Context Role</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 mt-1">
                    {formData.credentialType === 'OOR' 
                      ? 'For permanent organizational roles (CEO, CFO, Director)' 
                      : 'For temporary project/engagement roles'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Holder Name *</Label>
                    <Input
                      value={formData.holderName}
                      onChange={(e) => setFormData({...formData, holderName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label>Holder Email *</Label>
                    <Input
                      type="email"
                      value={formData.holderEmail}
                      onChange={(e) => setFormData({...formData, holderEmail: e.target.value})}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <Label>Role Title *</Label>
                  <Input
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
                    placeholder="Chief Financial Officer"
                  />
                </div>

                <div>
                  <Label>Authority Scope (optional)</Label>
                  <Textarea
                    value={formData.authorityScope}
                    onChange={(e) => setFormData({...formData, authorityScope: e.target.value})}
                    placeholder="Financial approvals, compliance reporting, regulatory submissions..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Holder DID (optional)</Label>
                  <Input
                    value={formData.holderDid}
                    onChange={(e) => setFormData({...formData, holderDid: e.target.value})}
                    placeholder="did:ethr:0x..."
                  />
                </div>

                <div>
                  <Label>Valid Until (optional)</Label>
                  <Input
                    type="datetime-local"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                  />
                  <p className="text-xs text-gray-600 mt-1">Leave empty for no expiration</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleIssue} className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={issueVLEIMutation.isPending}>
                    {issueVLEIMutation.isPending ? 'Issuing...' : 'Issue Credential'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowIssuer(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading credentials...</p>
          ) : vleis.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No vLEI Credentials Yet</h3>
              <p className="text-gray-600 mb-4">Issue your first OOR or ECR credential to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Issued Credentials</h3>
              {vleis.map((vlei) => (
                <Card key={vlei.id} className={`${vlei.status === 'revoked' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge className={vlei.credential_type === 'OOR' ? 'bg-purple-600' : 'bg-cyan-600'}>
                            {vlei.credential_type}
                          </Badge>
                          <Badge className="bg-red-600">DEMO</Badge>
                          <Badge variant={vlei.status === 'active' ? 'default' : 'destructive'} className={vlei.status === 'active' ? 'bg-green-600' : ''}>
                            {vlei.status === 'active' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                            {vlei.status}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-gray-900">{vlei.holder_name}</h4>
                        <p className="text-sm text-gray-700 font-medium">{vlei.role_title}</p>
                        <p className="text-sm text-gray-600">{vlei.holder_email}</p>
                        <p className="text-xs text-gray-500 mt-2 font-mono">{vlei.vlei_id}</p>
                        {vlei.status === 'revoked' && (
                          <p className="text-xs text-red-700 mt-2">Revoked: {vlei.revocation_reason}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" onClick={() => downloadCredential(vlei)}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        {vlei.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => {
                              const reason = prompt('Reason for revocation:');
                              if (reason) revokeVLEIMutation.mutate({ id: vlei.id, reason });
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}