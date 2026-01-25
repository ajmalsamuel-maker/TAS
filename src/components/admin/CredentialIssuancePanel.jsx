import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck, AlertCircle, Loader, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CredentialIssuancePanel({ application, onCredentialIssued }) {
  const [isIssuing, setIsIssuing] = useState(false);

  const handleIssueCredentials = async () => {
    if (application.status !== 'approved') {
      toast.error('Application must be approved before issuing credentials');
      return;
    }

    setIsIssuing(true);
    try {
      const result = await base44.functions.invoke('issueLEICredentials', {
        applicationId: application.id
      });

      toast.success('Credentials issued successfully');
      onCredentialIssued();
    } catch (error) {
      console.error('Credential issuance error:', error);
      toast.error('Failed to issue credentials');
    } finally {
      setIsIssuing(false);
    }
  };

  const credentialsIssued = !!application.generated_lei && !!application.generated_vlei;

  if (credentialsIssued) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Credentials Issued
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">LEI</p>
            <p className="font-mono font-bold text-green-700">{application.generated_lei}</p>
          </div>
          {application.generated_vlei && (
            <div>
              <p className="text-sm text-gray-600 mb-1">vLEI</p>
              <p className="font-mono text-sm text-green-700 break-all">{application.generated_vlei}</p>
            </div>
          )}
          <p className="text-xs text-gray-500 pt-2">
            Issued on {new Date(application.lei_issued_date).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (application.status !== 'approved') {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <AlertCircle className="h-5 w-5" />
            Credentials Not Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Application must be approved before credentials can be issued. Current status: <Badge variant="outline">{application.status}</Badge>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-blue-600" />
          Manual Credential Issuance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700">
          Application is approved and ready for credential issuance. Click below to manually trigger LEI and vLEI generation.
        </p>
        <Button
          onClick={handleIssueCredentials}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isIssuing}
        >
          {isIssuing ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Issuing Credentials...
            </>
          ) : (
            <>
              <FileCheck className="mr-2 h-4 w-4" />
              Issue LEI & vLEI Credentials
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}