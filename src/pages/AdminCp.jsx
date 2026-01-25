import React from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';
import { createPageUrl } from '../utils';

export default function AdminCp() {
  const handleLogin = () => {
    base44.auth.redirectToLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-100">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0044CC] to-[#002D66] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
            <p className="text-gray-600">TAS Platform Administration</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-[#0044CC] p-4 mb-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-[#0044CC] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Administrator Access Only</p>
                <p className="text-xs text-gray-600">
                  This portal is restricted to TAS platform administrators. You must have admin credentials to proceed.
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-[#0044CC] to-[#002D66] hover:from-[#002D66] hover:to-[#001A40] text-white py-6 text-lg"
          >
            <Lock className="mr-2 h-5 w-5" />
            Login as Administrator
          </Button>

          {/* Features */}
          <div className="mt-8 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Admin Features</p>
            {[
              'Manage service providers',
              'Approve LEI applications',
              'Monitor platform workflows',
              'Manage translations (i18n)',
              'View analytics & metrics'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-[#0044CC] rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Logos */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 text-center">Powered by</p>
            <div className="flex items-center justify-center gap-6">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/d897e53ec_Certizen-Technology.png"
                alt="Certizen Technology"
                className="h-6"
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png"
                alt="FTS.Money"
                className="h-6"
              />
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href={createPageUrl('Home')} className="text-sm text-blue-200 hover:text-white">
            ← Back to TAS Website
          </a>
        </div>
      </div>
    </div>
  );
}