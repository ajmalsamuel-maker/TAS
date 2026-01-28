import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Camera, Loader, ScanFace } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingStep6Facia({ formData, onVerificationComplete }) {
  const [initiating, setInitiating] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState(null);
  const [verified, setVerified] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const handleInitiateFacialVerification = async () => {
    setInitiating(true);
    try {
      const redirectUrl = window.location.origin + '/complete-verification';
      const callbackUrl = window.location.origin + '/api/facia-callback';
      
      const result = await base44.functions.invoke('faciaVerification', {
        action: 'generateLiveness',
        customer_id: formData.email,
        customer_email: formData.email,
        redirect_url: redirectUrl,
        callback_url: callbackUrl,
        ttl: 60
      });

      if (result.data?.data?.url) {
        setVerificationUrl(result.data.data.url);
        setSessionId(result.data.data.session_id);
        toast.success('Verification link generated');
        
        // Open in new window
        window.open(result.data.data.url, '_blank', 'width=800,height=900');
      } else {
        toast.error('Failed to generate verification link');
      }
    } catch (error) {
      toast.error('Failed to initiate verification: ' + error.message);
    } finally {
      setInitiating(false);
    }
  };

  const handleMarkAsVerified = () => {
    setVerified(true);
    toast.success('Facial verification complete!');
    if (onVerificationComplete) {
      onVerificationComplete(sessionId);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <ScanFace className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">Final Step: Identity Verification</h3>
            <p className="text-xs sm:text-sm text-purple-800">
              Before your LEI and vLEI credentials are issued, we need to verify your identity with a liveness test. This is a regulatory requirement.
            </p>
          </div>
        </div>
      </div>

      {!verificationUrl && !verified && (
        <Card className="p-6 sm:p-8 border-2 border-purple-100 text-center">
          <Camera className="h-12 sm:h-16 w-12 sm:w-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Ready for Verification?</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-6">
            Click below to start your liveness verification. A new window will open with the verification interface.
          </p>
          
          <Button
            onClick={handleInitiateFacialVerification}
            disabled={initiating}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {initiating ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Preparing Verification...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-5 w-5" />
                Start Facial Verification
              </>
            )}
          </Button>
        </Card>
      )}

      {verificationUrl && !verified && (
        <Card className="p-4 sm:p-6 border-2 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Verification Window Opened</h3>
              <p className="text-xs sm:text-sm text-amber-800 mb-4">
                A verification window has been opened in a new tab. Please complete the liveness test there.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => window.open(verificationUrl, '_blank')}
              className="w-full"
            >
              Re-open Verification Window
            </Button>
            
            <Button
              onClick={handleMarkAsVerified}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              I've Completed Verification
            </Button>
          </div>

          <p className="text-xs text-gray-600 mt-4 text-center break-all">
            Session ID: {sessionId}
          </p>
        </Card>
      )}

      {verified && (
        <Card className="p-6 sm:p-8 border-2 border-green-200 bg-green-50 text-center">
          <CheckCircle2 className="h-12 sm:h-16 w-12 sm:w-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-2">Verification Complete!</h3>
          <p className="text-xs sm:text-sm text-green-800">
            Your identity has been verified. You can now proceed with application submission.
          </p>
        </Card>
      )}

      {/* What to Expect */}
      <Card className="p-4 sm:p-6 border-2 border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">What to Expect:</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs sm:text-sm flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-xs sm:text-sm text-gray-900">Video Capture</p>
                <p className="text-xs sm:text-sm text-gray-600">Your device camera will capture your face (30-60 seconds)</p>
              </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">2</div>
            <div>
              <p className="font-medium text-gray-900">Follow Instructions</p>
              <p className="text-sm text-gray-600">Simple movements like nodding or looking at points on screen</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">3</div>
            <div>
              <p className="font-medium text-gray-900">Instant Processing</p>
              <p className="text-sm text-gray-600">Results processed immediately with AI</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Requirements */}
      <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Requirements:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Good lighting
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Webcam or device camera enabled
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Clear view of your face (no glasses/hats)
          </li>
        </ul>
      </div>

      {/* Privacy Note */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-200">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong>Privacy:</strong> Facial data is processed securely and deleted after verification per data protection regulations.
        </p>
      </div>
    </div>
  );
}