import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Rocket, ArrowRight } from 'lucide-react';

export default function CompletionStep({ organization, onComplete }) {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-green-100 rounded-full animate-ping opacity-20"></div>
        </div>
        <CheckCircle2 className="h-24 w-24 mx-auto text-green-600 relative z-10" />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-3">You're All Set! 🎉</h2>
        <p className="text-gray-600 text-lg mb-2">
          Welcome to the TAS Platform, <span className="font-semibold">{organization.name}</span>
        </p>
        <p className="text-gray-500">
          Your organization is now ready to start onboarding businesses and issuing LEI/vLEI credentials
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center justify-center gap-2">
          <Rocket className="h-5 w-5" />
          What's Next?
        </h3>
        <ul className="text-left space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Set up your verification workflows and policies</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Review fraud detection and AML monitoring settings</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Start onboarding your first business client</span>
          </li>
        </ul>
      </div>

      <Button
        onClick={onComplete}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
      >
        Go to Dashboard
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>
    </div>
  );
}