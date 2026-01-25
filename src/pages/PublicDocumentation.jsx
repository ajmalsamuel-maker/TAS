import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Shield, Zap, Users, TrendingUp, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PublicDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Trust Anchor Service</h1>
          <p className="text-2xl text-gray-600 mb-6">
            Global Interoperability Gateway for Identity, Compliance & Trust
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Verify business legitimacy, screen against sanctions, issue digital identities, and enable blockchain-based trust—all in one integrated platform.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              Get Started Free
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
              Request Demo
            </button>
          </div>
        </div>

        {/* What is TAS */}
        <Card className="mb-8 border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle className="text-2xl">What is Trust Anchor Service?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Trust Anchor Service (TAS) is a comprehensive platform that solves the critical problem of verifying business identity and legitimacy in today's digital economy. Whether you're a fintech, bank, insurer, or enterprise, TAS provides:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">🏢 Business Identity Verification (KYB)</p>
                <p className="text-sm text-gray-700">Verify company legitimacy using global business registries and official databases</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="font-semibold text-red-900 mb-2">🚨 Anti-Money Laundering (AML)</p>
                <p className="text-sm text-gray-700">Screen against international sanction lists, PEP databases, and adverse media</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-900 mb-2">🎫 Legal Entity Identifiers (LEI)</p>
                <p className="text-sm text-gray-700">Issue and manage unique identifiers recognized globally for regulatory compliance</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">⛓️ Web3 Credentials (vLEI)</p>
                <p className="text-sm text-gray-700">Issue verifiable blockchain credentials for DeFi, NFTs, and self-sovereign identity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-l-4 border-l-red-600">
            <CardHeader>
              <CardTitle>The Problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span className="text-sm text-gray-700">Manual verification is slow, costly, and error-prone</span>
              </div>
              <div className="flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span className="text-sm text-gray-700">No unified system for global compliance checking</span>
              </div>
              <div className="flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span className="text-sm text-gray-700">Regulatory fragmentation across countries and industries</span>
              </div>
              <div className="flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span className="text-sm text-gray-700">Digital identity not recognized in blockchain/Web3 contexts</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-600">
            <CardHeader>
              <CardTitle>Our Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">Automated verification in minutes, not weeks</span>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">Single API for all compliance and identity needs</span>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">120+ country support with local compliance rules</span>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">Web3-ready credentials for DeFi, NFTs, and blockchain</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Core Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">KYB Verification</h4>
                    <p className="text-sm text-gray-600">Verify companies against official business registries worldwide. Access incorporation dates, ownership details, and regulatory status.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Lock className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">AML Screening</h4>
                    <p className="text-sm text-gray-600">Real-time screening against 300+ sanctions lists, PEP databases, and adverse media sources.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Globe className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">LEI Management</h4>
                    <p className="text-sm text-gray-600">Issue and manage Legal Entity Identifiers recognized by regulators and financial institutions globally.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">vLEI Credentials</h4>
                    <p className="text-sm text-gray-600">Issue blockchain-ready credentials for Web3, DeFi integration, and self-sovereign identity applications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Monitoring</h4>
                    <p className="text-sm text-gray-600">Continuous monitoring and alerting for regulatory changes affecting your customers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Case Management</h4>
                    <p className="text-sm text-gray-600">Built-in workflow for investigating and resolving alerts and compliance issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Company Onboarding</h4>
                  <p className="text-sm text-gray-700">Submit your business details, registry information, and supporting documents</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Automated Verification</h4>
                  <p className="text-sm text-gray-700">Our system verifies your company against global registries and compliance databases automatically</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Approval & Issuance</h4>
                  <p className="text-sm text-gray-700">Upon approval, receive your LEI and vLEI credentials (typically 2-5 business days)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
                <div>
                  <h4 className="font-semibold mb-1">Use Globally</h4>
                  <p className="text-sm text-gray-700">Use your credentials for regulatory compliance, banking, blockchain, and Web3 applications</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">🏦 Financial Services</h4>
                <p className="text-sm text-gray-700">Meet KYB/AML requirements for onboarding business customers, reduce fraud, and ensure regulatory compliance</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">🌐 Fintech & APIs</h4>
                <p className="text-sm text-gray-700">Integrate KYB/AML verification into your platform via REST API. Real-time verification results in seconds.</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">⛓️ Web3 & DeFi</h4>
                <p className="text-sm text-gray-700">Enable regulated DeFi protocols and blockchain applications with verified business identity credentials</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">🏢 Enterprise Supply Chain</h4>
                <p className="text-sm text-gray-700">Verify suppliers and business partners globally with compliance assurance</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">📊 Risk Management</h4>
                <p className="text-sm text-gray-700">Monitor customers and counterparties for regulatory changes and emerging risks</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">🔐 Insurance & AML</h4>
                <p className="text-sm text-gray-700">Streamline KYB processes and reduce insurance fraud with verified business credentials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold mb-2">Starter</h4>
                <p className="text-3xl font-bold text-blue-600 mb-1">$99<span className="text-sm text-gray-600">/mo</span></p>
                <p className="text-sm text-gray-600 mb-4">Perfect for small businesses</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 10K API calls/month</li>
                  <li>✓ KYB Verification</li>
                  <li>✓ Basic AML Screening</li>
                  <li>✓ Email Support</li>
                </ul>
              </div>
              <div className="border-2 border-blue-600 rounded-lg p-6 shadow-lg bg-blue-50">
                <div className="mb-2">
                  <Badge className="bg-blue-600">Most Popular</Badge>
                </div>
                <h4 className="text-lg font-semibold mb-2">Business</h4>
                <p className="text-3xl font-bold text-blue-600 mb-1">$299<span className="text-sm text-gray-600">/mo</span></p>
                <p className="text-sm text-gray-600 mb-4">For growing companies</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 50K API calls/month</li>
                  <li>✓ Full KYB & AML</li>
                  <li>✓ LEI Issuance</li>
                  <li>✓ vLEI Credentials</li>
                  <li>✓ Phone Support</li>
                </ul>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold mb-2">Enterprise</h4>
                <p className="text-3xl font-bold text-blue-600 mb-1">Custom</p>
                <p className="text-sm text-gray-600 mb-4">For large organizations</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unlimited API calls</li>
                  <li>✓ All features</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ SLA guarantee</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: 'How is TAS different from other KYB/AML providers?',
                a: 'TAS is the only platform that unifies KYB, AML, LEI, and Web3 credentials in one system. We also provide 120+ country compliance support and blockchain-ready credentials—unique in the industry.'
              },
              {
                q: 'What databases do you check?',
                a: 'We check global business registries (Companies House, SIREN, etc.), OFAC sanctions lists, UN lists, EU sanctions, PEP databases, and adverse media sources. Complete coverage in 120+ countries.'
              },
              {
                q: 'How quickly can I get my LEI?',
                a: 'Verification typically takes 2-5 business days. LEI issuance happens immediately upon approval. Use your credentials right away.'
              },
              {
                q: 'Is TAS compliant with regulations?',
                a: 'Yes. We support AML/CFT compliance, GDPR, eIDAS, and local regulations in 120+ countries. All data is encrypted and securely stored.'
              },
              {
                q: 'Can I use TAS for Web3?',
                a: 'Absolutely! Our vLEI credentials are specifically designed for blockchain and DeFi use. Issue Web3-ready credentials and integrate with any smart contract platform.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(`faq${i}`)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 font-semibold text-left"
                >
                  {faq.q}
                  {expandedSections[`faq${i}`] ? <ChevronDown /> : <ChevronRight />}
                </button>
                {expandedSections[`faq${i}`] && (
                  <div className="p-4 bg-gray-50 border-t text-sm text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="pt-8">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6">
              Join thousands of companies using TAS for global compliance and digital identity.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-semibold">
                Schedule Demo
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicDocumentation;