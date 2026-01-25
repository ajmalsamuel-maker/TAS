import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Award, Plus, Send, Download } from 'lucide-react';
import { toast } from 'sonner';

const CREDENTIAL_TEMPLATES = [
  { id: 'employee', name: 'Employee Badge', fields: ['name', 'position', 'department', 'employeeId'] },
  { id: 'membership', name: 'Membership Certificate', fields: ['name', 'membershipLevel', 'validUntil'] },
  { id: 'certification', name: 'Professional Certification', fields: ['name', 'certificationName', 'issuedDate', 'expiryDate'] },
  { id: 'custom', name: 'Custom Credential', fields: [] }
];

export default function CredentialIssuer({ organization }) {
  const [showIssuer, setShowIssuer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [credentialData, setCredentialData] = useState({});
  const [recipientDID, setRecipientDID] = useState('');
  const queryClient = useQueryClient();

  const { data: issuedCredentials = [] } = useQuery({
    queryKey: ['issued-credentials', organization?.id],
    queryFn: async () => {
      if (!organization?.id) return [];
      const creds = await base44.entities.Workflow.filter({
        organization_id: organization.id,
        type: 'credential_verification'
      });
      return creds;
    },
    enabled: !!organization?.id
  });

  const issueCredentialMutation = useMutation({
    mutationFn: async ({ template, data, recipient }) => {
      const credential = {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential', template.name],
        issuer: {
          id: organization.lei || `did:org:${organization.id}`,
          name: organization.name
        },
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: recipient,
          ...data
        },
        proof: {
          type: 'Ed25519Signature2020',
          created: new Date().toISOString(),
          proofPurpose: 'assertionMethod',
          verificationMethod: `${organization.lei}#key-1`,
          jws: `mock_signature_${Date.now()}`
        }
      };

      await base44.entities.Workflow.create({
        organization_id: organization.id,
        type: 'credential_verification',
        status: 'completed',
        result: credential,
        data_passport: credential
      });

      return credential;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['issued-credentials']);
      toast.success('Credential issued successfully');
      setShowIssuer(false);
      setCredentialData({});
      setRecipientDID('');
    }
  });

  const handleIssue = () => {
    if (!selectedTemplate || !recipientDID) {
      toast.error('Please select template and recipient DID');
      return;
    }

    issueCredentialMutation.mutate({
      template: selectedTemplate,
      data: credentialData,
      recipient: recipientDID
    });
  };

  const downloadCredential = (credential) => {
    const blob = new Blob([JSON.stringify(credential.result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credential_${credential.id}.json`;
    a.click();
    toast.success('Credential downloaded');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-5 w-5" />
            Credential Issuer
          </CardTitle>
          <Button size="sm" onClick={() => setShowIssuer(!showIssuer)}>
            <Plus className="h-4 w-4 mr-1" />
            Issue Credential
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Issued</p>
              <p className="text-2xl font-bold text-blue-700">{issuedCredentials.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-700">{issuedCredentials.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Templates</p>
              <p className="text-2xl font-bold text-purple-700">{CREDENTIAL_TEMPLATES.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showIssuer && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-base">Issue New Credential</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Credential Template</label>
              <div className="grid grid-cols-2 gap-3">
                {CREDENTIAL_TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      selectedTemplate?.id === template.id 
                        ? 'border-blue-600 bg-white shadow-md' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <p className="text-sm font-medium">{template.name}</p>
                    <p className="text-xs text-gray-500">{template.fields.length} fields</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedTemplate && (
              <>
                {selectedTemplate.fields.length > 0 && (
                  <div className="bg-white p-4 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium">Credential Data</h3>
                    {selectedTemplate.fields.map(field => (
                      <div key={field}>
                        <label className="text-xs font-medium mb-1 block capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <Input
                          value={credentialData[field] || ''}
                          onChange={(e) => setCredentialData({...credentialData, [field]: e.target.value})}
                          placeholder={`Enter ${field}`}
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {selectedTemplate.id === 'custom' && (
                  <div className="bg-white p-4 rounded-lg">
                    <label className="text-sm font-medium mb-2 block">Custom Data (JSON)</label>
                    <Textarea
                      value={JSON.stringify(credentialData, null, 2)}
                      onChange={(e) => {
                        try {
                          setCredentialData(JSON.parse(e.target.value));
                        } catch {}
                      }}
                      placeholder='{"customField": "value"}'
                      className="font-mono text-xs h-32"
                    />
                  </div>
                )}

                <div className="bg-white p-4 rounded-lg">
                  <label className="text-sm font-medium mb-2 block">Recipient DID</label>
                  <Input
                    value={recipientDID}
                    onChange={(e) => setRecipientDID(e.target.value)}
                    placeholder="did:ethr:0x1234..."
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    The credential will be issued to this decentralized identifier
                  </p>
                </div>

                <Button onClick={handleIssue} className="w-full bg-blue-600">
                  <Send className="h-4 w-4 mr-2" />
                  Issue Credential
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Issued Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          {issuedCredentials.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm">No credentials issued yet</p>
          ) : (
            <div className="space-y-3">
              {issuedCredentials.map(cred => (
                <div key={cred.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">
                        {cred.result?.type?.[1] || 'Credential'}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {cred.result?.credentialSubject?.id?.slice(0, 20) + '...'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      Issued: {new Date(cred.result?.issuanceDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => downloadCredential(cred)}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}