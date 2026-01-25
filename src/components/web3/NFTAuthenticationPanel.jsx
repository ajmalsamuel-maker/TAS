import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image, Shield, CheckCircle2, FileCheck } from 'lucide-react';

export default function NFTAuthenticationPanel({ user }) {
  const hasVLEI = !!user?.oor_credential;
  const hasLEI = !!user?.lei;
  
  const isEnabled = hasVLEI && hasLEI;

  return (
    <Card className="border-2 border-indigo-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200">
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5 text-indigo-600" />
          NFT Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {isEnabled ? (
            <>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <Shield className="h-4 w-4 mr-1" />
                  vLEI-Backed Authentication
                </Badge>
                <Badge variant="outline">W3C Compliant</Badge>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileCheck className="h-5 w-5 text-indigo-700" />
                  <p className="text-sm font-semibold text-indigo-900">Capabilities</p>
                </div>
                <ul className="space-y-2">
                  {[
                    'Creator identity verification',
                    'Ownership proof with vLEI',
                    'Provenance tracking',
                    'Anti-fraud protection'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-indigo-100">
                  <p className="text-xs text-gray-600 mb-1">NFTs Verified</p>
                  <p className="text-2xl font-bold text-indigo-900">0</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-indigo-100">
                  <p className="text-xs text-gray-600 mb-1">Signature Type</p>
                  <p className="text-xs font-semibold text-gray-900">KERI/ACDC</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg">
                <p className="text-xs text-blue-900">
                  Your vLEI credential provides cryptographic proof of authority for NFT creation and transfers
                </p>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Authenticate NFT Collection
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <Image className="h-12 w-12 text-indigo-300 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">NFT Authentication Unavailable</h4>
              <p className="text-sm text-gray-600 mb-4">
                Requires both LEI and vLEI credentials
              </p>
              <div className="space-y-2 mb-4">
                {!hasLEI && (
                  <Badge variant="outline" className="text-orange-700 border-orange-300">
                    LEI Required
                  </Badge>
                )}
                {!hasVLEI && (
                  <Badge variant="outline" className="text-orange-700 border-orange-300">
                    vLEI Required
                  </Badge>
                )}
              </div>
              <Button variant="outline" className="border-indigo-300">
                Complete Setup
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}