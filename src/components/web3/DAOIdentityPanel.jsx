import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function DAOIdentityPanel({ user }) {
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const daoStatus = user?.lei ? 'active' : 'setup_required';

  return (
    <Card className="border-2 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-purple-600" />
          DAO Legal Identity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {daoStatus === 'active' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                DAO-Ready
              </Badge>
              <Badge variant="outline">ISO 17442 Compliant</Badge>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm font-semibold text-gray-900 mb-2">Legal Entity Identifier</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg text-purple-900">{user.lei}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(user.lei, 'LEI')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-100">
                <p className="text-xs text-gray-600 mb-1">Multi-Sig Support</p>
                <p className="font-semibold text-gray-900">Enabled</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-100">
                <p className="text-xs text-gray-600 mb-1">Governance Authority</p>
                <p className="font-semibold text-gray-900">Verified</p>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              View DAO Credentials
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-purple-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">DAO Identity Not Set Up</h4>
            <p className="text-sm text-gray-600 mb-4">
              Complete your LEI onboarding to enable DAO legal identity features
            </p>
            <Button variant="outline" className="border-purple-300">
              Start Onboarding
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}