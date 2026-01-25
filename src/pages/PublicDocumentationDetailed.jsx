import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PublicDocumentationDetailed = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Trust Anchor Service Documentation</h1>
          <p className="text-xl text-gray-600 mb-4">Complete Overview for New Users & Enterprise Evaluation</p>
          <div className="flex gap-2 justify-center">
            <Badge variant="default">v1.0</Badge>
            <Badge variant="secondary">Public Guide</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 bg-blue-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "What is TAS?", desc: "Core concept & value proposition" },
                { title: "The Problem & Solution", desc: "Why TAS exists and what it solves" },
                { title: "Features & Capabilities", desc: "Complete feature breakdown" },
                { title: "How It Works", desc: "Step-by-step platform walkthrough" },
                { title: "Use Cases", desc: "Industry-specific applications" },
                { title: "Pricing & Plans", desc: "Subscription tiers and cost breakdown" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-blue-200"
                >
                  <h4 className="font-semibold text-blue-600 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What is TAS */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What is Trust Anchor Service (TAS)?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
              <p className="text-gray-700 mb-4">
                Trust Anchor Service is a global identity verification and compliance platform that solves the critical problem of verifying business legitimacy and identity in the digital economy. By combining Know Your Business (KYB) verification, Anti-Money Laundering (AML) screening, Legal Entity Identifier (LEI) issuance, and Web3-ready credentials, TAS enables organizations to:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Verify business identity globally in minutes, not weeks</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Meet regulatory compliance requirements automatically</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Issue globally-recognized credentials for traditional and blockchain use</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Reduce fraud, AML risk, and compliance costs significantly</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Platform Components</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Component</th>
                    <th className="border p-3 text-left">Description</th>
                    <th className="border p-3 text-left">Output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3 font-semibold">KYB Verification</td>
                    <td className="border p-3">Verify company against business registries worldwide</td>
                    <td className="border p-3">✓ Verified / ✗ Not Found / ⚠ Needs Review</td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="border p-3 font-semibold">AML Screening</td>
                    <td className="border p-3">Real-time screening against 300+ sanctions lists and PEP databases</td>
                    <td className="border p-3">✓ Clear / ⚠ Alert / ✗ Blocked</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="border p-3 font-semibold">LEI Issuance</td>
                    <td className="border p-3">Issue Legal Entity Identifier (20-digit code)</td>
                    <td className="border p-3">LEI Code + Official Certificate</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-3 font-semibold">vLEI Credentials</td>
                    <td className="border p-3">Cryptographically signed blockchain-ready credentials</td>
                    <td className="border p-3">JWT Token + Certificates</td>
                  </tr>
                  <tr className="hover:bg-amber-50">
                    <td className="border p-3 font-semibold">Continuous Monitoring</td>
                    <td className="border p-3">Ongoing surveillance for regulatory/compliance changes</td>
                    <td className="border p-3">Real-time Alerts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">System Architecture at a Glance</h3>
              <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`
End User / Organization
         ↓
┌─────────────────────────────────────┐
│   TAS PLATFORM (React + Tailwind)   │
├─────────────────────────────────────┤
│  • User Portal (Submit applications) │
│  • Admin Portal (Manage platform)    │
│  • REST API (Integrate with systems) │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   VERIFICATION ENGINES              │
├─────────────────────────────────────┤
│  • KYB Engine (Registry checks)      │
│  • AML Screening (300+ lists)        │
│  • Document Verification            │
│  • Compliance Scoring                │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   EXTERNAL INTEGRATIONS             │
├─────────────────────────────────────┤
│  • GLEIF (LEI Issuance Authority)    │
│  • OFAC, UN, EU Sanctions Lists      │
│  • National Business Registries      │
│  • PEP & Adverse Media Databases     │
│  • Payment Processors (Stripe, etc)  │
│  • Accounting Systems (QB, Xero)     │
└─────────────────────────────────────┘
         ↓
End User Receives:
  ✓ Verification Results
  ✓ LEI Code
  ✓ vLEI Credentials
  ✓ Compliance Certificates
    `}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem & Solution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">The Business Problem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded">
                <h3 className="font-semibold text-red-900 mb-4">Traditional Approach</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>❌ Manual KYB verification takes 2-4 weeks</li>
                  <li>❌ Compliance teams spend 40+ hours per customer</li>
                  <li>❌ AML screening fragmented across multiple vendors</li>
                  <li>❌ No unified identity standard across borders</li>
                  <li>❌ Expensive: $2,000-5,000+ per business verified</li>
                  <li>❌ High error rates and false positives</li>
                  <li>❌ No Web3/blockchain integration</li>
                  <li>❌ Regulatory requirements constantly changing</li>
                </ul>
              </div>

              <div className="p-6 bg-green-50 border-l-4 border-green-600 rounded">
                <h3 className="font-semibold text-green-900 mb-4">TAS Solution</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Automated verification in 2-5 hours</li>
                  <li>✓ Compliance automation saves 95% of manual work</li>
                  <li>✓ Unified AML screening platform</li>
                  <li>✓ Global LEI standard (20-digit code)</li>
                  <li>✓ Cost: $99-299/month all-inclusive</li>
                  <li>✓ Accuracy: 99.9%+ with AI/ML</li>
                  <li>✓ Native Web3 credentials (vLEI)</li>
                  <li>✓ Auto-updates for regulatory changes</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
              <h3 className="font-semibold text-blue-900 mb-3">Key Metrics: The Business Case</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-bold text-2xl text-blue-600">95%</p>
                  <p className="text-gray-700">Cost reduction vs. manual processes</p>
                </div>
                <div>
                  <p className="font-bold text-2xl text-blue-600">10x</p>
                  <p className="text-gray-700">Faster verification (hours vs. weeks)</p>
                </div>
                <div>
                  <p className="font-bold text-2xl text-blue-600">120+</p>
                  <p className="text-gray-700">Countries covered with local compliance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">How TAS Works: Step-by-Step</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Company Registration",
                  details: "Submit business details, registry information, and documents via our simple web form"
                },
                {
                  step: 2,
                  title: "Automated KYB Verification",
                  details: "Our system automatically checks 120+ country business registries to verify your company exists and is active"
                },
                {
                  step: 3,
                  title: "AML Screening",
                  details: "Real-time scanning against OFAC, UN, EU sanctions lists, PEP databases, and adverse media sources"
                },
                {
                  step: 4,
                  title: "Document Authentication",
                  details: "AI-powered validation of uploaded documents (certificates, articles of incorporation, etc.)"
                },
                {
                  step: 5,
                  title: "Approval & Issuance",
                  details: "Upon successful verification, receive your 20-digit LEI code and cryptographically signed vLEI credentials"
                },
                {
                  step: 6,
                  title: "Global Use",
                  details: "Use LEI for regulatory reporting, banking, DeFi. Use vLEI for Web3 applications and blockchain integration"
                },
                {
                  step: 7,
                  title: "Continuous Monitoring",
                  details: "Ongoing surveillance for sanctions list updates, adverse media, and regulatory changes"
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">{item.step}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-700">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Industry Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  industry: "🏦 Banking & Finance",
                  uses: ["KYB for business account onboarding", "AML compliance for customer verification", "Trade finance settlement verification"]
                },
                {
                  industry: "💳 Fintech & Payment",
                  uses: ["B2B payment platform verification", "Marketplace seller compliance", "Invoice financing identity checks"]
                },
                {
                  industry: "⛓️ Web3 & DeFi",
                  uses: ["Regulated DeFi protocol governance", "Blockchain ID verification", "DAO member KYC/KYB"]
                },
                {
                  industry: "🚀 Marketplace & E-commerce",
                  uses: ["Seller verification and trust scoring", "B2B supplier validation", "Risk assessment for partnerships"]
                },
                {
                  industry: "🏢 Enterprise & B2B",
                  uses: ["Vendor due diligence", "Supply chain partner verification", "M&A target compliance checking"]
                },
                {
                  industry: "🛡️ Insurance & Risk",
                  uses: ["Underwriting KYB checks", "Fraud prevention", "Claims verification"]
                },
              ].map((item, i) => (
                <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-3">{item.industry}</h4>
                  <ul className="space-y-2 text-sm">
                    {item.uses.map((use, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-blue-600">→</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Pricing & Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm border-collapse mb-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">Plan</th>
                  <th className="border p-3 text-center">Monthly Price</th>
                  <th className="border p-3 text-center">API Calls/mo</th>
                  <th className="border p-3 text-center">LEI Issuance</th>
                  <th className="border p-3 text-center">Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3 font-semibold">Starter</td>
                  <td className="border p-3 text-center">$99</td>
                  <td className="border p-3 text-center">10,000</td>
                  <td className="border p-3 text-center">❌</td>
                  <td className="border p-3 text-center">Email</td>
                </tr>
                <tr className="hover:bg-blue-50 bg-blue-50">
                  <td className="border p-3 font-semibold">Business ⭐</td>
                  <td className="border p-3 text-center">$299</td>
                  <td className="border p-3 text-center">50,000</td>
                  <td className="border p-3 text-center">✓</td>
                  <td className="border p-3 text-center">Email + Chat</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3 font-semibold">Enterprise</td>
                  <td className="border p-3 text-center">Custom</td>
                  <td className="border p-3 text-center">Unlimited</td>
                  <td className="border p-3 text-center">✓</td>
                  <td className="border p-3 text-center">24/7 Phone</td>
                </tr>
              </tbody>
            </table>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <p className="font-semibold mb-2">💰 Affordable</p>
                <p className="text-sm text-gray-700">$99-299/month includes all verification services. No hidden fees.</p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="font-semibold mb-2">📦 All-Inclusive</p>
                <p className="text-sm text-gray-700">KYB, AML screening, documentation, customer support all included.</p>
              </div>
              <div className="p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                <p className="font-semibold mb-2">🎯 Scalable</p>
                <p className="text-sm text-gray-700">Grow from startup to enterprise—pricing adapts to your needs.</p>
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
                q: "How is TAS different from manual KYB processes?",
                a: "TAS automates the entire verification pipeline. What takes 2-4 weeks manually now takes 2-5 hours. Cost: 95% cheaper. Accuracy: 99.9% vs. ~95% for manual processes."
              },
              {
                q: "Which countries do you support?",
                a: "120+ countries including all major economies: US, UK, EU, Canada, Australia, Japan, Singapore, UAE, and more. Each country has local compliance rules built-in."
              },
              {
                q: "How quickly can I get my LEI?",
                a: "Verification is typically 2-5 business days. Upon approval, LEI issuance is immediate. You can use it right away for regulatory reporting and blockchain applications."
              },
              {
                q: "Is TAS compliant with regulations?",
                a: "Yes. We support AML/CFT requirements, GDPR, eIDAS, and local regulations in 120+ countries. All data is encrypted, ISO 27001 certified, and regularly audited."
              },
              {
                q: "Can I use TAS for Web3/blockchain?",
                a: "Absolutely. Our vLEI credentials are cryptographically signed and designed for blockchain, DeFi, and Web3 applications. Integrate with any Ethereum, Solana, or other chain."
              },
              {
                q: "What if we don't pass verification?",
                a: "If alerts are triggered, we create a case for investigation. Our compliance team reviews within 24 hours. Most are false positives easily resolved with documentation."
              },
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
            <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Compliance?</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Join thousands of companies using TAS for automated KYB, AML screening, LEI issuance, and Web3-ready credentials.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Start Free Trial (14 days)
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-semibold">
                Schedule Demo
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Download */}
        <Card className="mb-8 bg-purple-50 border-2 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Download Full Documentation</h3>
                <p className="text-sm text-gray-600">Comprehensive guide with architecture diagrams, workflows, and technical specs</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicDocumentationDetailed;