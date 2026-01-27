import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Building2, ScanFace, CheckCircle2 } from 'lucide-react';

export default function IntegrationsSummary() {
  const integrations = [
    {
      name: 'The KYB',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Business verification across 225+ countries',
      provider: 'TheKYB.com',
      endpoint: 'api.thekyb.com/api',
      functions: [
        {
          action: 'search',
          description: 'Search company by name and country',
          params: ['query', 'country'],
          returns: 'Company registration, officers, beneficial owners, filing history',
          usage: 'base44.functions.invoke("kyb", { action: "search", query: "Company Name", country: "US" })'
        }
      ],
      onboardingUse: [
        'Verify legal business name',
        'Lookup business registry details',
        'Extract officer information',
        'Validate registration certificates',
        'Check beneficial ownership structure'
      ]
    },
    {
      name: 'AML Watcher',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Anti-Money Laundering screening and monitoring',
      provider: 'AMLWatcher.com',
      endpoint: 'api.amlwatcher.com',
      functions: [
        {
          action: 'screen',
          description: 'Screen entity against PEP, Sanctions, and watchlists',
          params: [
            'name (required)',
            'categories (PEP, SIP, Sanctions)',
            'entity_type (Person/Organization)',
            'match_score (threshold)',
            'countries',
            'birth_incorporation_date',
            'unique_identifier'
          ],
          returns: 'Risk level, matches, adverse media, sanctions hits',
          usage: 'base44.functions.invoke("amlWatcher", { action: "screen", name: "Entity Name", categories: ["PEP", "Sanctions"] })'
        }
      ],
      onboardingUse: [
        'Screen business entities for sanctions',
        'Check beneficial owners against PEP lists',
        'Identify politically exposed persons',
        'Detect adverse media mentions',
        'Ongoing monitoring alerts'
      ]
    },
    {
      name: 'Facia',
      icon: ScanFace,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Biometric identity verification and liveness detection',
      provider: 'Facia.ai',
      endpoint: 'api.facia.ai',
      functions: [
        {
          action: 'generateLiveness',
          description: 'Generate liveness detection URL for user verification',
          params: [
            'redirect_url',
            'callback_url',
            'customer_id',
            'customer_email',
            'ttl (optional, default: 60 min)'
          ],
          returns: 'Verification URL and session ID',
          usage: 'base44.functions.invoke("faciaVerification", { action: "generateLiveness", customer_id: "user123", customer_email: "user@example.com", redirect_url: "https://...", callback_url: "https://..." })'
        },
        {
          action: 'faceMatch',
          description: 'Match face photo with ID document',
          params: [
            'faceFrame (image URL)',
            'idFrame (image URL)',
            'clientReference'
          ],
          returns: 'Match score, verification status, confidence level',
          usage: 'base44.functions.invoke("faciaVerification", { action: "faceMatch", faceFrame: "https://...", idFrame: "https://...", clientReference: "ref123" })'
        }
      ],
      onboardingUse: [
        'Verify identity of legal representatives',
        'Liveness detection to prevent spoofing',
        'Face matching with government IDs',
        'Prevent identity fraud',
        'Generate vLEI credentials with verified identity'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">TAS Integration Summary</h1>
          </div>
          <p className="text-gray-600">All external verification services connected and ready for onboarding workflows</p>
        </div>

        {/* Integration Cards */}
        <div className="space-y-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.name} className="overflow-hidden">
                <CardHeader className={`${integration.bgColor} border-b`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                        <Icon className={`h-6 w-6 ${integration.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{integration.name}</CardTitle>
                        <CardDescription className="text-base mt-1">{integration.description}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{integration.provider}</Badge>
                          <Badge variant="outline" className="text-xs font-mono">{integration.endpoint}</Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  {/* Functions */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Available Functions</h3>
                    <div className="space-y-4">
                      {integration.functions.map((func, idx) => (
                        <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="font-mono">{func.action}</Badge>
                            <span className="text-sm text-gray-600">{func.description}</span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3 mt-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Parameters:</p>
                              <ul className="text-xs space-y-1">
                                {func.params.map((param, i) => (
                                  <li key={i} className="text-gray-600">• {param}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Returns:</p>
                              <p className="text-xs text-gray-600">{func.returns}</p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-700 mb-1">Usage Example:</p>
                            <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
                              {func.usage}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Onboarding Use Cases */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">TAS Onboarding Use Cases</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {integration.onboardingUse.map((use, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{use}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Workflow Summary */}
        <Card className="mt-6 border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle>Complete Onboarding Workflow</CardTitle>
            <CardDescription>How all three integrations work together</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-semibold">KYB - Business Verification</p>
                  <p className="text-sm text-gray-600">Search and verify company exists in government registries, extract officers and beneficial owners</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-semibold">AML - Risk Screening</p>
                  <p className="text-sm text-gray-600">Screen business entity and all officers against sanctions lists, PEP databases, and adverse media</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-semibold">Facia - Identity Verification</p>
                  <p className="text-sm text-gray-600">Verify legal representative's identity with liveness detection and face matching, then issue vLEI credentials</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                <div>
                  <p className="font-semibold">LEI & vLEI Issuance</p>
                  <p className="text-sm text-gray-600">Once all verifications pass, generate LEI and issue vLEI credentials to authorized representatives</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}