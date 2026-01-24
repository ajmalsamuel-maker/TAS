import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Shield, Zap, Globe, Lock, 
  Network, CheckCircle2, TrendingUp, Layers
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')] opacity-10 bg-cover bg-center" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Trust Anchor Service
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                A trusted data integrity and provenance layer, serving as a global interoperability gateway connecting identity, compliance, and trust services under one unified technical fabric
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl('Onboarding')}>
                  <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50 text-lg px-8">
                    Start Onboarding <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-blue-200">
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
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Single Access Point For:</h3>
                <div className="space-y-3">
                  {['KYB', 'AML', 'LEI/vLEI Issuing', 'DID & Web3'].map((service, i) => (
                    <div key={i} className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur rounded-lg p-4 border border-white/10 transform hover:scale-105 transition-all">
                      <span className="text-lg font-medium">{service}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-blue-100">
                  Where all data is cryptographically traceable to its source
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Powered By */}
        <div className="relative max-w-7xl mx-auto px-6 pb-16">
          <p className="text-blue-200 text-sm mb-4">Powered by</p>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-2xl font-bold">CERTIZEN <span className="text-cyan-300">TECHNOLOGY</span></div>
            <div className="text-2xl font-bold">fts.m<span className="text-cyan-400">♡</span>ney</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            The Problem - A Fragmented Digital World
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">The Challenge</h3>
              <p className="text-gray-700">
                Businesses face a complex web of disconnected services for identity (KYB/KYC), compliance (AML), and credentials (vLEI)
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✖️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">The Result</h3>
              <p className="text-gray-700">
                Slow onboarding, high integration costs, operational complexity, multiple compliance repositories, difficulty scaling across borders
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">The Opportunity</h3>
              <p className="text-gray-700">
                A unified, verifiable, interoperable layer to connect these ecosystems seamlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            The Solution - TAS
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-[#0044CC]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">What it is</h3>
              <p className="text-gray-700">
                A neutral, <strong>technology-only</strong> platform that acts as a global interoperability gateway between identity, compliance, and credentials
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Core Function</h3>
              <p className="text-gray-700">
                Intelligent <strong>API orchestration</strong>, workflow coordination, protocol standardization and data transformation between regulated service providers
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
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
                color: 'from-blue-500 to-blue-600'
              },
              {
                phase: '2',
                title: 'Parallel Execution',
                desc: 'TAS executes required services (in parallel or sequence), coordinated by workflow automation engine. Automates KYB + AML + vLEI workflows',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                phase: '3',
                title: 'Response Aggregation',
                desc: 'TAS aggregates results into unified response. Client receives clean, normalized data regardless of provider involvement',
                color: 'from-purple-500 to-purple-600'
              },
              {
                phase: '4',
                title: 'Provenance Attestation',
                desc: 'TAS cryptographically signs aggregated result and attaches complete, verifiable provenance record - the data passport',
                color: 'from-pink-500 to-pink-600'
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
                border: 'border-blue-200'
              },
              {
                title: 'Web3 Business Operations',
                items: ['DAO Legal Setup', 'DeFi Compliance', 'Cross-Chain Identity', 'NFT Authentication'],
                color: 'from-cyan-50 to-cyan-100',
                border: 'border-cyan-200'
              },
              {
                title: 'Supply Chain Integration',
                items: ['Verified Identity', 'Automated Compliance', 'Secure Payments', 'Document Verification'],
                color: 'from-purple-50 to-purple-100',
                border: 'border-purple-200'
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
            <h3 className="text-2xl font-bold text-center mb-8 text-[#0044CC]">TAS Platform Enables</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Network, text: 'Unified API Access' },
                { icon: Zap, text: 'Workflow Automation' },
                { icon: Lock, text: 'Data Transformation' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <item.icon className="h-8 w-8 text-[#0044CC]" />
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
                highlighted: true
              },
              {
                tier: 'Enterprise',
                price: '$2,000',
                features: ['Dedicated infrastructure', 'Custom connectors', '99.9% SLA', '24/7 premium support', 'Full provenance with blockchain anchoring']
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-br from-[#0044CC] to-[#002D66] text-white shadow-2xl scale-105' : 'bg-gray-50 text-gray-900 border-2 border-gray-200'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-blue-200' : 'text-gray-600'}>/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-cyan-300' : 'text-green-600'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full mt-8 ${plan.highlighted ? 'bg-white text-[#0044CC] hover:bg-blue-50' : 'bg-[#0044CC] text-white hover:bg-[#002D66]'}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white">
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
            <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50 text-xl px-12 py-6">
              Start Building with TAS
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}