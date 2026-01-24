import React from 'react';
import { AlertCircle, CheckCircle2, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function OnboardingStep5() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Final Step: Liveness Verification</h3>
            <p className="text-sm text-amber-800">
              Before your LEI and vLEI credentials are issued, we need to verify your identity with a quick liveness test. This is a security measure required by regulatory standards.
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6 border-2 border-blue-100">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">What to Expect:</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Video Capture</p>
                <p className="text-sm text-gray-600">Your device will open a video camera for facial capture (30-60 seconds)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Natural Movements</p>
                <p className="text-sm text-gray-600">Follow simple instructions like nodding or looking at specific points</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Instant Processing</p>
                <p className="text-sm text-gray-600">Verification results are processed immediately</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">After Verification</h3>
            <p className="text-sm text-green-800">
              Once verified, your LEI and vLEI credentials will be automatically generated and issued. You'll receive a confirmation email with your credentials and can begin using TAS services immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">Requirements:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Good lighting
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Webcam or device camera
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Clear view of your face
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Quiet environment (microphone recommended)
          </li>
        </ul>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <p className="text-sm text-gray-700">
          <strong>Privacy Note:</strong> Your facial data is processed securely and is not stored permanently. It is only used for this verification process and then securely deleted in accordance with data protection regulations.
        </p>
      </div>
    </div>
  );
}