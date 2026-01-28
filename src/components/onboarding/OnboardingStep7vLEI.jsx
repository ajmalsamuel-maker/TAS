import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingStep7vLEI({ application, onComplete }) {
  const [isIssuing, setIsIssuing] = useState(false);
  const [vleiIssued, setVleiIssued] = useState(false);
  const [formData, setFormData] = useState({
    credentialType: 'OOR',
    holderName: application?.legal_representative_name || '',
    holderEmail: application?.legal_representative_email || application?.email || '',
    roleTitle: 'Legal Representative',
    authorityScope: ''
  });

  const handleIssue = async () => {
    if (!formData.holderName || !formData.holderEmail || !formData.roleTitle) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsIssuing(true);
    try {
      const result = await base44.functions.invoke('issueVLEI', formData);
      
      if (result.data?.success) {
        // Update application with vLEI details
        await base44.entities.OnboardingApplication.update(application.id, {
          generated_vlei: result.data.vlei_id,
          vlei_credential: result.data.credential
        });
        
        setVleiIssued(true);
        toast.success('vLEI credential issued successfully!');
      } else {
        throw new Error(result.data?.error || 'Failed to issue vLEI');
      }
    } catch (error) {
      toast.error('Failed to issue vLEI: ' + error.message);
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-red-900 mb-2">⚠️ SANDBOX/DEMO ENVIRONMENT</h3>
            <p className="text-xs sm:text-sm text-red-800 mb-2">
              <strong>This system issues DEMO credentials only.</strong> These are NOT real GLEIF LEI or vLEI credentials and have no legal standing.
            </p>
            <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
              <li>Real LEIs can only be issued by GLEIF-accredited Local Operating Units (LOUs)</li>
              <li>Real vLEIs require GLEIF's Qualified vLEI Issuer (QVI) infrastructure</li>
              <li>Demo credentials are for testing and development purposes only</li>
              <li>Do not use these credentials for production or legal purposes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Demo vLEI Credential Issuance</h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              Issue a demo verifiable Legal Entity Identifier (vLEI) credential for the authorized representative. 
              This simulates how a digital credential would cryptographically prove the representative's authority.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
               <div className="bg-white rounded-lg p-2 sm:p-3 border border-purple-200">
                 <p className="text-xs sm:text-sm text-gray-600 mb-1">Entity Name</p>
                 <p className="font-semibold text-xs sm:text-sm text-gray-900">{application?.legal_name}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <p className="text-gray-600 mb-1">LEI</p>
                <p className="font-mono font-semibold text-gray-900">{application?.generated_lei || 'Pending'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!vleiIssued ? (
        <Card className="border-2 border-purple-100">
          <CardContent className="pt-4 sm:pt-6 space-y-4">
            <div>
              <Label className="text-xs sm:text-sm">Credential Type *</Label>
              <Select value={formData.credentialType} onValueChange={(v) => setFormData({...formData, credentialType: v})}>
                <SelectTrigger className="text-xs sm:text-sm mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OOR">OOR - Official Organizational Role</SelectItem>
                  <SelectItem value="ECR">ECR - Engagement Context Role</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-600 mt-1">
                {formData.credentialType === 'OOR' 
                  ? 'For permanent organizational roles (CEO, Legal Representative, Director)' 
                  : 'For temporary project/engagement roles'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label className="text-xs sm:text-sm">Representative Name *</Label>
                <Input
                  value={formData.holderName}
                  onChange={(e) => setFormData({...formData, holderName: e.target.value})}
                  placeholder="John Doe"
                  className="text-sm mt-2"
                  />
              </div>
              <div>
                <Label className="text-xs sm:text-sm">Representative Email *</Label>
                <Input
                  type="email"
                  className="text-sm mt-2"
                  value={formData.holderEmail}
                  onChange={(e) => setFormData({...formData, holderEmail: e.target.value})}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs sm:text-sm">Role Title *</Label>
              <Input
                className="text-sm mt-2"
                value={formData.roleTitle}
                onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
                placeholder="Legal Representative, CEO, Director"
              />
            </div>

            <div>
              <Label className="text-xs sm:text-sm">Authority Scope (optional)</Label>
              <Textarea
                value={formData.authorityScope}
                onChange={(e) => setFormData({...formData, authorityScope: e.target.value})}
                placeholder="e.g., Legal agreements, financial approvals, regulatory submissions..."
                className="text-sm mt-2 h-20 sm:h-24"
              />
              <p className="text-xs text-gray-500 mt-1">Define what actions this credential authorizes</p>
            </div>

            <div className="pt-4 sm:pt-6">
              <Button 
                onClick={handleIssue} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
                disabled={isIssuing || !formData.holderName || !formData.holderEmail || !formData.roleTitle}
              >
                {isIssuing ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Issuing vLEI Credential...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Issue vLEI Credential
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">vLEI Credential Issued Successfully</h3>
                <p className="text-xs sm:text-sm text-gray-600">Verifiable credential has been created and linked to your application</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Credential Type</p>
                  <div className="flex gap-2">
                    <Badge className="bg-purple-600">{formData.credentialType}</Badge>
                    <Badge className="bg-red-600">DEMO</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Status</p>
                  <Badge className="bg-green-600">Active (Sandbox)</Badge>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Holder</p>
                  <p className="font-semibold text-gray-900">{formData.holderName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Role</p>
                  <p className="font-semibold text-gray-900">{formData.roleTitle}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                <strong>Next Steps:</strong> You can manage and view all issued vLEI credentials in your portal under "Credentials" section. 
                The credential can be used for secure authentication and authorization across TAS services.
              </p>
            </div>

            <Button 
              onClick={onComplete} 
              className="w-full bg-green-600 hover:bg-green-700 mt-4"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete Onboarding
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 sm:p-4 rounded">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong>Important:</strong> vLEI credentials are cryptographically signed and can be verified independently. 
            They provide a trust chain linking the individual to the organization through the LEI system. 
            The credential will be stored securely and can be downloaded as a W3C Verifiable Credential.
          </div>
        </div>
      </div>
    </div>
  );
}