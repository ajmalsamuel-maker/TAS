import React from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { User, Lock, Shield } from 'lucide-react';
import { createPageUrl } from '../utils';

export default function UserLogin() {
  const handleLogin = () => {
    // Check if user is coming from signup/new account flow
    const isNewSignup = new URLSearchParams(window.location.search).get('new') === 'true';
    const redirectTo = isNewSignup ? createPageUrl('Onboarding') : createPageUrl('UserDashboard');
    base44.auth.redirectToLogin(redirectTo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-blue-200">
          {/* Logo Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Portal</h1>
            <p className="text-sm sm:text-base text-gray-600">Access your compliance dashboard</p>
          </div>

          {/* Info Box */}
          <div className="bg-cyan-50 border-l-4 border-cyan-500 p-3 sm:p-4 mb-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">Business User Access</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Login to view your workflows, compliance status, LEI/vLEI credentials, and AML alerts.
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-5 sm:py-6 text-base sm:text-lg rounded-lg"
          >
            <Lock className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
            Login to User Portal
          </Button>

          {/* Features */}
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Dashboard Includes</p>
            {[
              'Compliance status & scores',
              'Workflow monitoring',
              'LEI/vLEI credentials',
              'AML alerts & notifications',
              'Data provenance verification'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Logos */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2 sm:mb-3 text-center">Powered by</p>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/d897e53ec_Certizen-Technology.png"
                alt="Certizen Technology"
                className="h-5 sm:h-6"
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png"
                alt="FTS.Money"
                className="h-5 sm:h-6"
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center mt-4 sm:mt-6 space-y-2">
          <p className="text-xs sm:text-sm text-gray-600">
            Don't have an account?{' '}
            <a href={`${createPageUrl('UserLogin')}?new=true`} className="text-[#0044CC] font-semibold hover:underline">
              Create account & Apply for LEI
            </a>
          </p>
          <a href={createPageUrl('Home')} className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 block">
            ← Back to TAS Website
          </a>
        </div>
      </div>
    </div>
  );
}