import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Shield, Lock, Globe, Building2, Zap, FileCheck, ShieldAlert, Fingerprint } from 'lucide-react';
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

  const MermaidDiagram = ({ chart }) => {
    const containerRef = React.useRef(null);
    const diagramId = React.useRef(Math.random().toString(36).substr(2, 9));

    useEffect(() => {
      const loadAndRender = async () => {
        if (!window.mermaid) {
          return;
        }
        
        try {
          window.mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'default',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true }
          });
          
          if (containerRef.current && chart) {
            const result = await window.mermaid.render(`diagram-${diagramId.current}`, chart);
            containerRef.current.innerHTML = result.svg;
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
              svg.style.maxWidth = '100%';
              svg.style.height = 'auto';
              svg.style.minHeight = '400px';
            }
          }
        } catch (err) {
          console.error('Mermaid error:', err);
        }
      };

      if (!window.mermaid) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.async = true;
        script.onload = loadAndRender;
        document.head.appendChild(script);
      } else {
        loadAndRender();
      }
    }, [chart]);

    return (
      <div className="flex justify-center my-8 bg-white p-8 rounded-lg border border-gray-200 overflow-x-auto">
        <div ref={containerRef} className="w-full" style={{ minHeight: '400px' }} />
      </div>
    );
  };

  const SectionHeader = ({ title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
    >
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {expandedSections[section] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Trust Anchor Service</h1>
          <h2 className="text-3xl text-gray-700 mb-4">Global Platform for Business Identity & Compliance</h2>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="default">Public Documentation</Badge>
            <Badge variant="secondary">Learn More</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
            <Badge className="bg-blue-100 text-blue-800">For Everyone</Badge>
          </div>
          <p className="text-gray-600 mt-4">Comprehensive guide to what TAS is and how it works</p>
        </div>

        {/* What is TAS */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="What is Trust Anchor Service?" section="whatisitas" />
          </CardHeader>
          {expandedSections.whatisitas && (
            <CardContent className="space-y-6 text-gray-700">
              <div>
                <p className="leading-relaxed mb-4">
                  Trust Anchor Service (TAS) is a global identity and compliance platform that enables businesses to verify identity, screen against regulatory risks, and issue digital credentials recognized by regulators, financial institutions, and blockchain networks worldwide. Rather than juggling multiple vendors for KYB, AML, LEI issuance, and Web3 credentials, TAS provides a unified system with a single API.
                </p>

                <p className="leading-relaxed mb-6">
                  Think of TAS as your business's "passport office" for the digital economy. Just as a government issues passports that are recognized internationally, TAS issues Legal Entity Identifiers (LEI) and verifiable Web3 credentials (vLEI) that are trusted globally. These credentials prove your business is legitimate, complies with regulations, and is safe to do business with.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <p className="font-bold">Who Uses TAS?</p>
                    </div>
                    <p className="text-sm">Banks, payment processors, fintech companies, insurance firms, enterprises, and DeFi protocols seeking to verify business identity and ensure compliance globally.</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-indigo-600" />
                      <p className="font-bold">Global Reach</p>
                    </div>
                    <p className="text-sm">Verification across 120+ countries with country-specific compliance rules, 300+ sanctions databases, and regulatory intelligence.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">The Four Core Pillars</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <p className="font-bold text-blue-900">1. Know Your Business (KYB)</p>
                    </div>
                    <p className="text-sm">Verify company legitimacy using official business registries. Confirm incorporation, ownership, and regulatory status instantly.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-5 w-5 text-blue-600" />
                      <p className="font-bold text-blue-900">2. Anti-Money Laundering (AML)</p>
                    </div>
                    <p className="text-sm">Screen against 300+ sanctions lists, PEP databases, and adverse media. Identify and block high-risk entities automatically.</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="h-5 w-5 text-indigo-600" />
                      <p className="font-bold text-indigo-900">3. LEI Issuance</p>
                    </div>
                    <p className="text-sm">Issue unique Global Legal Entity Identifiers recognized by regulators and financial institutions worldwide.</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Fingerprint className="h-5 w-5 text-indigo-600" />
                      <p className="font-bold text-indigo-900">4. Web3 Credentials</p>
                    </div>
                    <p className="text-sm">Issue blockchain-ready vLEI credentials for DeFi protocols, NFT ecosystems, and self-sovereign identity.</p>
                  </div>
                </div>
              </div>

              <MermaidDiagram 
                chart={`graph LR
                  A["Submit"] B["KYB"] C["AML"] D["Check"]
                  E["LEI"] F["vLEI"]

                  A --> B
                  B --> C
                  C --> D
                  D --> E
                  E --> F

                  style A fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style B fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style C fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style D fill:#fff3e0,stroke:#0066B3,stroke-width:2px
                  style E fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style F fill:#e3f2fd,stroke:#0066B3,stroke-width:2px`}
              />
            </CardContent>
          )}
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="How It Works" section="howitworks" />
          </CardHeader>
          {expandedSections.howitworks && (
            <CardContent className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-lg font-bold mb-4">The Verification Process</h3>
                <p className="mb-6 leading-relaxed">
                  When you submit your business for verification, TAS orchestrates a multi-stage automated process. Within 2-5 hours, your company is verified against global databases, screened for regulatory risk, and issued credentials. Here's exactly what happens:
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-bold text-blue-900 mb-1">Submission & Data Validation</h4>
                      <p className="text-sm">You submit your company name, registration number, country, and beneficial owner information. TAS validates the data and checks for completeness.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-bold text-blue-900 mb-1">KYB Verification (30 mins typical)</h4>
                      <p className="text-sm">Automated lookup in official business registries (Companies House, SIREN, ROC, etc.) to verify incorporation, entity status, address, and ownership structure. 90% of businesses pass this stage automatically.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-bold text-indigo-900 mb-1">AML Screening (15 mins typical)</h4>
                      <p className="text-sm">Real-time check against OFAC, UN, EU sanctions lists, PEP databases, and adverse media. If matches are found, they're scored by confidence. Most matches are false positives and automatically resolved.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-bold text-indigo-900 mb-1">Manual Review (if needed)</h4>
                      <p className="text-sm">High-confidence AML matches are escalated to human investigators who verify using additional sources. This typically takes 1-3 business days.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm">5</div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-1">LEI & vLEI Issuance</h4>
                      <p className="text-sm">Upon approval, your Legal Entity Identifier is registered with GLEIF. Your vLEI credential is cryptographically signed and blockchain-ready immediately.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm">6</div>
                    <div>
                      <h4 className="font-bold text-blue-900 mb-1">Continuous Monitoring</h4>
                      <p className="text-sm">After issuance, TAS monitors your business 24/7 for regulatory changes, sanctions updates, and compliance status degradation.</p>
                    </div>
                  </div>
                </div>
              </div>

              <MermaidDiagram 
                chart={`graph TB
                  A["Submit<br/>Application"]
                  B["KYB Check<br/>Registries"]
                  C["AML Screen<br/>Sanctions"]
                  D{"Manual<br/>Review?"}
                  E["Investigator<br/>Review"]
                  F["Approved"]
                  G["Credentials<br/>Issued"]
                  H["Monitoring"]

                  A --> B
                  B --> C
                  C --> D
                  D -->|No| F
                  D -->|Yes| E
                  E --> F
                  F --> G
                  G --> H

                  style A fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style B fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style C fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style D fill:#fff3e0,stroke:#0066B3,stroke-width:2px
                  style E fill:#fff3e0,stroke:#0066B3,stroke-width:2px
                  style F fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style G fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style H fill:#e3f2fd,stroke:#0066B3,stroke-width:2px`}
              />
            </CardContent>
          )}
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Who Benefits from TAS" section="usecases" />
          </CardHeader>
          {expandedSections.usecases && (
            <CardContent className="space-y-6 text-gray-700">
              <p className="leading-relaxed">
                TAS serves multiple industries and use cases. Whether you're a bank opening accounts, a fintech integrating compliance, or a blockchain protocol issuing identity, TAS provides the infrastructure.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <p className="font-bold text-blue-900">Banks & Financial Institutions</p>
                  </div>
                  <p className="text-sm">Streamline KYB/AML for account opening. Move from weeks to hours. Meet regulatory requirements automatically.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <p className="font-bold text-blue-900">Payment & Fintech</p>
                  </div>
                  <p className="text-sm">Verify merchants instantly via API. Reduce fraud. Meet PCI DSS compliance. Enable faster merchant onboarding.</p>
                </div>

                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-5 w-5 text-indigo-600" />
                    <p className="font-bold text-indigo-900">DeFi & Web3 Protocols</p>
                  </div>
                  <p className="text-sm">Issue vLEI credentials for DAO governance, institutional DeFi, and blockchain identity. Bridge traditional and crypto finance.</p>
                </div>

                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-5 w-5 text-indigo-600" />
                    <p className="font-bold text-indigo-900">Enterprise & Supply Chain</p>
                  </div>
                  <p className="text-sm">Verify suppliers globally. Manage vendor compliance. Reduce counterparty risk.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <p className="font-bold text-blue-900">Insurance & Risk</p>
                  </div>
                  <p className="text-sm">Underwrite faster with verified identity data. Reduce fraud. Speed up claims processing.</p>
                </div>

                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="h-5 w-5 text-indigo-600" />
                    <p className="font-bold text-indigo-900">Legal & Compliance</p>
                  </div>
                  <p className="text-sm">Automate due diligence. Reduce manual document review by 80%. Cut legal costs dramatically.</p>
                </div>
              </div>

              <MermaidDiagram 
                chart={`graph TB
                  A["TAS Platform<br/>Identity &<br/>Compliance"]

                  B["Banks<br/>Account<br/>opening"]
                  C["Fintech<br/>Merchant<br/>verify"]
                  D["DeFi<br/>Web3<br/>identity"]
                  E["Enterprise<br/>Vendor<br/>verify"]
                  F["Insurance<br/>Underwriting"]
                  G["Legal<br/>Due diligence"]

                  A --> B
                  A --> C
                  A --> D
                  A --> E
                  A --> F
                  A --> G

                  style A fill:#0066B3,color:#fff,stroke-width:2px
                  style B fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style C fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style D fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style E fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style F fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                  style G fill:#e3f2fd,stroke:#0066B3,stroke-width:2px`}
              />
            </CardContent>
          )}
        </Card>

        {/* Key Features */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Key Features" section="features" />
          </CardHeader>
          {expandedSections.features && (
            <CardContent className="space-y-6 text-gray-700">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3 text-left">What It Does</th>
                    <th className="border p-3 text-left">Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3 font-semibold">KYB Verification</td>
                    <td className="border p-3">Check business registries in 120+ countries for company legitimacy</td>
                    <td className="border p-3">Know who you're dealing with. Reduce fraud by 95%.</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3 font-semibold">AML Screening</td>
                    <td className="border p-3">Screen against 300+ sanctions, PEP, and adverse media databases</td>
                    <td className="border p-3">Ensure regulatory compliance. Block high-risk entities instantly.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3 font-semibold">LEI Issuance</td>
                    <td className="border p-3">Issue unique 20-char identifiers recognized globally by regulators</td>
                    <td className="border p-3">Enable bank accounts, trading, and regulatory reporting worldwide.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3 font-semibold">vLEI Credentials</td>
                    <td className="border p-3">Cryptographically signed Web3-ready digital credentials</td>
                    <td className="border p-3">Use in blockchain, DeFi, NFTs, and smart contracts.</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3 font-semibold">Continuous Monitoring</td>
                    <td className="border p-3">24/7 surveillance of business compliance status</td>
                    <td className="border p-3">Get instant alerts if regulatory status changes.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3 font-semibold">REST API</td>
                    <td className="border p-3">Integrate verification into your application</td>
                    <td className="border p-3">Embed KYB/AML directly into your workflows.</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3 font-semibold">Webhooks</td>
                    <td className="border p-3">Real-time notifications when verification completes</td>
                    <td className="border p-3">Update customer status automatically as soon as approved.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3 font-semibold">Case Management</td>
                    <td className="border p-3">Investigation workflow for alerts requiring human review</td>
                    <td className="border p-3">Track and resolve compliance issues with audit trail.</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          )}
        </Card>

        {/* Pricing */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Subscription Plans" section="pricing" />
          </CardHeader>
          {expandedSections.pricing && (
            <CardContent className="space-y-6 text-gray-700">
              <p className="leading-relaxed">
                TAS pricing is transparent with no hidden fees. Pay for what you use. All plans include 24/7 infrastructure with 99.5%+ uptime.
              </p>

              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="border p-3 text-left">Metric</th>
                    <th className="border p-3 text-center">Starter</th>
                    <th className="border p-3 text-center">Business</th>
                    <th className="border p-3 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3 font-semibold">Monthly Price</td>
                    <td className="border p-3 text-center font-bold">$99</td>
                    <td className="border p-3 text-center font-bold">$299</td>
                    <td className="border p-3 text-center font-bold">Custom</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3">KYB Verifications</td>
                    <td className="border p-3 text-center">50/month</td>
                    <td className="border p-3 text-center">200/month</td>
                    <td className="border p-3 text-center">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3">Per Verification Cost</td>
                    <td className="border p-3 text-center">$1.98</td>
                    <td className="border p-3 text-center">$1.50</td>
                    <td className="border p-3 text-center">Negotiated</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3">LEI Issuance</td>
                    <td className="border p-3 text-center">❌</td>
                    <td className="border p-3 text-center">✅ Included</td>
                    <td className="border p-3 text-center">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3">Continuous Monitoring</td>
                    <td className="border p-3 text-center">❌</td>
                    <td className="border p-3 text-center">✅ 6 months</td>
                    <td className="border p-3 text-center">✅ Unlimited</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border p-3">API Access</td>
                    <td className="border p-3 text-center">❌</td>
                    <td className="border p-3 text-center">✅</td>
                    <td className="border p-3 text-center">✅</td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="border p-3">Support</td>
                    <td className="border p-3 text-center">Email</td>
                    <td className="border p-3 text-center">Chat + Email</td>
                    <td className="border p-3 text-center">24/7 Phone</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          )}
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Frequently Asked Questions" section="faq" />
          </CardHeader>
          {expandedSections.faq && (
            <CardContent className="space-y-4">
              {[
                {
                  q: 'How long does verification take?',
                  a: 'Most verifications complete within 2-5 hours. KYB checks typically finish in 30 minutes, AML screening in 15 minutes. Manual review (if needed) takes 1-3 business days.'
                },
                {
                  q: 'How many countries does TAS support?',
                  a: 'TAS supports business verification in 120+ countries with country-specific compliance rules. You can verify companies from any jurisdiction.'
                },
                {
                  q: 'What happens if I have an AML alert?',
                  a: 'If a match is found during AML screening, our team investigates to determine if it\'s a genuine risk or false positive. Most are false positives due to name similarities. If confirmed as a genuine risk, we help you manage the compliance workflow.'
                },
                {
                  q: 'Can I use vLEI credentials in smart contracts?',
                  a: 'Yes! vLEI credentials are issued as W3C Verifiable Credentials and can be presented to smart contracts on any blockchain. They\'re recognized by DeFi protocols, DAOs, and NFT platforms.'
                },
                {
                  q: 'Is my data secure?',
                  a: 'Absolutely. TAS is PCI DSS Level 1 certified with bank-grade encryption. All data is encrypted in transit and at rest. We maintain strict multi-tenant isolation so your data is never accessible to other customers.'
                },
                {
                  q: 'How do I get started?',
                  a: 'Sign up for free at the top of this page. You\'ll get instant access to the platform and can submit your first verification immediately. No credit card required.'
                }
              ].map((faq, i) => (
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(`faq${i}`)}
                    className="w-full p-4 flex items-center justify-between hover:bg-blue-50 font-semibold text-left"
                  >
                    {faq.q}
                    {expandedSections[`faq${i}`] ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  {expandedSections[`faq${i}`] && (
                    <div className="p-4 bg-blue-50 border-t text-sm text-gray-700">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Standards & Compliance */}
        <Card className="mb-8 bg-slate-900 text-white">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Standards & Compliance</h3>
              <div className="space-y-3 text-sm">
                <p><strong>Identity Standards:</strong> LEI (ISO 17442), vLEI (Verifiable Legal Entity Identifier), GLEIF-registered credentials</p>
                <p><strong>Cryptography:</strong> KERI (Key Event Receipt Infrastructure), ACDC (Authentic Chained Data Containers), W3C Verifiable Credentials</p>
                <p><strong>Compliance Frameworks:</strong> FATF AML/CFT, GDPR, SOX, FinCEN regulations, OFAC sanctions, PEP screening</p>
                <p><strong>Security Standards:</strong> ISO/IEC 27001 (Information Security), PCI DSS Level 1, Bank-grade encryption</p>
                <p><strong>Data Standards:</strong> ISO 3166-1 (Country codes), ISO 20275 (Entity Legal Forms), ISO 4217 (Currency codes), ISO 8601 (Dates)</p>
                <p><strong>Web3 & Blockchain:</strong> W3C Verifiable Credentials, ACDC cryptographic signing, Multi-chain compatibility</p>
                <p className="text-xs mt-4 border-t border-slate-700 pt-4">TAS is certified for multi-tenant SaaS compliance with strict regulatory oversight. All data processing adheres to international standards and maintains continuous compliance audits.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gray-900 text-white">
          <CardContent className="pt-6">
            <div className="text-sm space-y-3">
              <p><strong>Document Version:</strong> 1.0</p>
              <p><strong>Last Updated:</strong> January 25, 2026</p>
              <p><strong>Classification:</strong> Public</p>
              <p><strong>Target Audience:</strong> Everyone</p>
              <p className="text-xs mt-4 border-t border-gray-700 pt-4">© 2026 FTS.Money & Certizen Technologies. Public documentation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicDocumentation;