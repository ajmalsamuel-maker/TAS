import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, Shield, Zap, Globe, Lock, 
  Network, CheckCircle2, TrendingUp, Layers,
  Building2, FileCheck, Mail
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')] opacity-5 bg-cover bg-center" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0044CC] rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}} />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Trust Anchor Service
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                A trusted data integrity and provenance layer, serving as a global interoperability gateway connecting identity, compliance, and trust services under one unified technical fabric
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl('Onboarding')}>
                  <Button size="lg" className="bg-[#0066B3] text-white hover:bg-[#004C8C] text-lg px-8 shadow-lg">
                    Apply for LEI <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl('Contact')}>
                  <Button size="lg" variant="outline" className="border-[#0066B3] text-[#0066B3] hover:bg-blue-50 text-lg px-8">
                    Contact Sales
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>ISO Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Enterprise Grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>Global Coverage</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-lg rounded-2xl p-8 border-2 border-blue-200 shadow-2xl">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Single Access Point For:</h3>
                <div className="space-y-3">
                  {['KYB', 'AML', 'LEI/vLEI Issuing', 'DID & Web3'].map((service, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-md transform hover:scale-105 transition-all hover:shadow-lg">
                      <span className="text-lg font-medium text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-700 font-medium">
                  Where all data is cryptographically traceable to its source
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="relative max-w-7xl mx-auto px-6 pb-16 border-t border-gray-200 pt-12">
          <p className="text-gray-500 text-sm mb-8 text-center font-medium">TRUSTED BY LEADING ORGANIZATIONS</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">FinTech Corp</div>
            <div className="text-2xl font-bold text-gray-400">Global Bank</div>
            <div className="text-2xl font-bold text-gray-400">Enterprise Inc</div>
            <div className="text-2xl font-bold text-gray-400">SecureID</div>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-8 text-center font-medium">POWERED BY</p>
            <div className="flex flex-wrap items-center justify-center gap-20">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/4191d6eef_Untitleddesign5.png" 
                alt="Certizen Technology" 
                className="h-8 opacity-60 hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png" 
                alt="FTS.Money" 
                className="h-10 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            The Challenge
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Fragmented Services</h3>
              <p className="text-gray-700">
                Businesses face a complex web of disconnected services for identity (KYB/KYC), compliance (AML), and credentials (vLEI)
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-[#0066B3]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Integration Complexity</h3>
              <p className="text-gray-700">
                Slow onboarding, high integration costs, operational complexity, multiple compliance repositories, difficulty scaling across borders
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200">
              <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-cyan-700" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Our Solution</h3>
              <p className="text-gray-700">
                A unified, verifiable, interoperable layer to connect these ecosystems seamlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-4">
              <Network className="h-4 w-4 text-[#0066B3]" />
              <span className="text-sm font-medium text-[#0066B3]">Unified Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Trust Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for identity verification and compliance in one intelligent gateway
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-blue-100 hover:border-[#0044CC] transition-all hover:shadow-2xl group">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b-2 border-blue-100">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">KYB Verification</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Enterprise-grade business verification powered by Certizen and FTS.Money with global coverage.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Real-time verification in 195+ countries
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    UBO & beneficial ownership checks
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Regulatory compliance automation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 hover:border-[#0044CC] transition-all hover:shadow-2xl group">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b-2 border-blue-100">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0088CC] to-[#0066B3] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Lock className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">AML Screening</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Comprehensive anti-money laundering screening against global databases and watchlists.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Global sanctions & PEP screening
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Adverse media monitoring
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Continuous watchlist updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 hover:border-[#0044CC] transition-all hover:shadow-2xl group">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b-2 border-blue-100">
                <div className="w-14 h-14 bg-gradient-to-br from-[#004C8C] to-[#003366] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <FileCheck className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">vLEI Credentials</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Digital identity credentials based on LEI with cryptographic verification via KERI/ACDC.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Cryptographically verifiable
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    OOR & ECR role credentials
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Automated issuance & revocation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How TAS Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">What it is</h3>
              <p className="text-gray-700">
                A neutral, <strong>technology-only</strong> platform that acts as a global interoperability gateway between identity, compliance, and credentials
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Core Function</h3>
              <p className="text-gray-700">
                Intelligent <strong>API orchestration</strong>, workflow coordination, protocol standardization and data transformation between regulated service providers
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Key Principle</h3>
              <p className="text-gray-700">
                TAS routes and coordinates—it never performs regulated activities itself. All <strong>regulated tasks remain with licensed partners</strong>
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8 text-[#0044CC]">
            Service Bundle Selection
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'KYB, AML',
              'DID-based services',
              'vLEI',
              'Credential Verification Workflows',
              'Custom Trust Workflows'
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all border border-blue-100 hover:border-blue-300">
                <p className="font-semibold text-gray-800">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How it Works - The Orchestration Engine
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: '1',
                title: 'Request Routing',
                desc: 'Client application sends API request to TAS. Platform performs validation, classification, and routing before passing to licensed services',
                color: 'from-[#0066B3] to-[#004080]'
              },
              {
                phase: '2',
                title: 'Parallel Execution',
                desc: 'TAS executes required services (in parallel or sequence), coordinated by workflow automation engine. Automates KYB + AML + vLEI workflows',
                color: 'from-[#0088CC] to-[#0066B3]'
              },
              {
                phase: '3',
                title: 'Response Aggregation',
                desc: 'TAS aggregates results into unified response. Client receives clean, normalized data regardless of provider involvement',
                color: 'from-[#006699] to-[#004C73]'
              },
              {
                phase: '4',
                title: 'Provenance Attestation',
                desc: 'TAS cryptographically signs aggregated result and attaches complete, verifiable provenance record - the data passport',
                color: 'from-[#00556B] to-[#003D4D]'
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all h-full">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white text-2xl font-bold`}>
                    {item.phase}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Use Cases
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">Real-World Applications</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Corporate Use Cases',
                items: ['Vendor Onboarding', 'Partner Integration', 'Credential Issuance', 'Compliance Automation'],
                color: 'from-blue-50 to-blue-100',
                border: 'border-blue-300'
              },
              {
                title: 'Web3 Business Operations',
                items: ['DAO Legal Setup', 'DeFi Compliance', 'Cross-Chain Identity', 'NFT Authentication'],
                color: 'from-cyan-50 to-cyan-100',
                border: 'border-cyan-300'
              },
              {
                title: 'Supply Chain Integration',
                items: ['Verified Identity', 'Automated Compliance', 'Secure Payments', 'Document Verification'],
                color: 'from-slate-50 to-slate-100',
                border: 'border-slate-300'
              }
            ].map((useCase, i) => (
              <div key={i} className={`bg-gradient-to-br ${useCase.color} rounded-xl p-8 border-2 ${useCase.border}`}>
                <h3 className="text-xl font-bold mb-6 text-gray-900">{useCase.title}</h3>
                <div className="space-y-3">
                  {useCase.items.map((item, j) => (
                    <div key={j} className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="font-medium text-gray-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-center mb-8 text-[#0066B3]">TAS Platform Enables</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Network, text: 'Unified API Access' },
              { icon: Zap, text: 'Workflow Automation' },
              { icon: Lock, text: 'Data Transformation' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-full flex items-center justify-center mb-3">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <p className="font-semibold text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            The Business Model - Clear and Compliant
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            A transparent pricing model that reinforces our regulatory neutrality
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: 'Starter',
                price: '$200',
                features: ['Basic API access', 'Standard workflows', 'Shared infrastructure', 'Business-hours support', 'Basic provenance tracking']
              },
              {
                tier: 'Business',
                price: '$800',
                features: ['Advanced workflows', 'Priority routing', '99.5% SLA uptime', '24/7 standard support', 'Enhanced provenance with audit reports'],
                highlighted: true,
                gradientFrom: '#0066B3',
                gradientTo: '#004080'
              },
              {
                tier: 'Enterprise',
                price: '$2,000',
                features: ['Dedicated infrastructure', 'Custom connectors', '99.9% SLA', '24/7 premium support', 'Full provenance with blockchain anchoring']
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-br from-[#0066B3] to-[#004080] text-white shadow-2xl scale-105' : 'bg-gray-50 text-gray-900 border-2 border-blue-100'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-blue-200' : 'text-gray-600'}>/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-cyan-300' : 'text-[#0066B3]'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full mt-8 ${plan.highlighted ? 'bg-white text-[#0066B3] hover:bg-blue-50' : 'bg-[#0066B3] text-white hover:bg-[#004080]'}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the Digital Identity Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            TAS is not just a product; it is essential infrastructure for the future of digital trust
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '⚙️', title: 'Developer documentation and API references' },
              { icon: '📦', title: 'Sandbox testing environment' },
              { icon: '✓', title: 'Integration guides and best practices' },
              { icon: '🤝', title: 'Technical support and community' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20 text-left">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="text-lg">{item.title}</p>
              </div>
            ))}
          </div>

          <Link to={createPageUrl('Onboarding')}>
            <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 text-xl px-12 py-6">
              Start Building with TAS
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}