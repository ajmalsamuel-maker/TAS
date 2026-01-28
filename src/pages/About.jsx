import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Globe, Lock, Network, Target, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">About TAS Platform</h1>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl">
            B2B SaaS infrastructure enabling businesses to issue LEI/vLEI credentials and automate compliance workflows across corporate, Web3, and supply chain operations
          </p>
        </div>
      </section>

      {/* Industry Solutions Banner */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-y-2 border-blue-200">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Purpose-Built for Your Industry</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Crypto Exchanges', path: 'CryptoSolution' },
              { name: 'Trade Finance', path: 'TradeFinanceSolution' },
              { name: 'Law Firms', path: 'LegalSolution' },
              { name: 'Corporate Services', path: 'CSPSolution' },
              { name: 'Remittance', path: 'RemittanceSolution' }
            ].map((industry, i) => (
              <Link key={i} to={createPageUrl(industry.path)}>
                <Button variant="outline" className="border-[#0066B3] text-[#0066B3] hover:bg-blue-50">
                  {industry.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Objectives */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900">Vision & Technical Objectives</h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#0044CC]">Our Vision</h3>
              <div className="space-y-4">
                {[
                  'Identity infrastructure for any business - banks, DAOs, supply chains, enterprises',
                  'Multi-tenant SaaS model with complete workspace isolation',
                  'Global interoperability via unified API',
                  'Web3-ready trust layer (DID, VCs, vLEI)',
                  'Enable frictionless verification and credential issuance at scale'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="h-3 w-3 text-[#0044CC]" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#0044CC]">Technical Objectives</h3>
              <div className="space-y-4">
                {[
                  'Unified integration framework (API specs, workflow engine)',
                  'Multi-provider support (dynamic routing, failover)',
                  'Regulatory boundaries (no storage/alteration of regulated data)',
                  'Cross-platform connectivity (Web2 + Web3)',
                  'End-to-end data provenance & LEI/vLEI validation'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="h-3 w-3 text-cyan-600" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trusted Provenance */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-4 text-[#0066B3]">Trusted Data Provenance & End-to-End Validation</h3>
            <p className="text-gray-700 mb-6">
              TAS ensures all data used in identity and compliance workflows is <strong>cryptographically traceable</strong> to its source 
              via LEI/vLEI identifiers, creating a verifiable chain of custody from data origin to consumer:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, text: 'Enables full auditability' },
                { icon: Lock, text: 'Reduces fraud' },
                { icon: Network, text: 'Ensures regulatory confidence in digital workflows' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-blue-200">
                  <item.icon className="h-6 w-6 text-[#0066B3] mb-2" />
                  <p className="text-sm font-medium text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Platform Capabilities</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Built for scale, security, and simplicity</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Network,
                title: 'Enterprise-Grade Infrastructure',
                desc: 'Reliable, always-on platform designed for mission-critical operations'
              },
              {
                icon: Globe,
                title: 'Global Scalability',
                desc: 'Seamlessly handles growing volumes across multiple regions worldwide'
              },
              {
                icon: Zap,
                title: 'Intelligent Workflow Automation',
                desc: 'Automate multi-step verification and credential issuance processes'
              },
              {
                icon: Shield,
                title: 'Security & Compliance First',
                desc: 'Bank-level security with encrypted data and regulatory-compliant operations'
              },
              {
                icon: Lock,
                title: 'Universal Data Integration',
                desc: 'Works seamlessly with any provider format through smart data transformation'
              },
              {
                icon: Target,
                title: 'Complete Transparency',
                desc: 'Every credential and verification is traceable to its trusted source'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#0044CC]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web3 & Blockchain */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Web3 & Blockchain Ready</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Bridging traditional legal identity with decentralized operations</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* DAO Legal Setup */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">DAO Legal Identity</h3>
              <p className="text-gray-700 mb-4">
                Enable DAOs to obtain legally recognized LEI credentials while maintaining decentralized governance
              </p>
              <ul className="space-y-2">
                {['LEI issuance for DAOs', 'Legal entity verification', 'Multi-signature authority mapping', 'Compliance automation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DeFi Compliance */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-8 border-2 border-cyan-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">DeFi Compliance</h3>
              <p className="text-gray-700 mb-4">
                Meet regulatory requirements without compromising decentralization
              </p>
              <ul className="space-y-2">
                {['KYB for DeFi protocols', 'AML screening integration', 'Real-time compliance monitoring', 'Regulatory reporting automation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cross-Chain Identity */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Cross-Chain Identity</h3>
              <p className="text-gray-700 mb-4">
                Universal identity that works across any blockchain or traditional system
              </p>
              <ul className="space-y-2">
                {['Blockchain-agnostic LEI credentials', 'Verifiable across all chains', 'Portable digital identity', 'Interoperable with Web2 systems'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* NFT & Digital Asset Authentication */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">NFT Authentication</h3>
              <p className="text-gray-700 mb-4">
                Cryptographically verify entity ownership and authority for digital assets
              </p>
              <ul className="space-y-2">
                {['vLEI-backed ownership proof', 'Creator identity verification', 'Provenance tracking', 'Anti-fraud protection'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* W3C Standards */}
          <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">W3C & Industry Standards Compliance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Decentralized Identifiers (DIDs)',
                  desc: 'W3C standard for self-sovereign identity creation and management'
                },
                {
                  title: 'Verifiable Credentials (VCs)',
                  desc: 'W3C data model for cryptographically secure, tamper-proof credentials'
                },
                {
                  title: 'KERI/ACDC Protocols',
                  desc: 'Key Event Receipt Infrastructure for cryptographic verification and trust chains'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-700 mt-6 text-sm">
              TAS seamlessly bridges traditional LEI-based legal identity with W3C-compliant decentralized identity standards
            </p>
          </div>
        </div>
      </section>

      {/* Regulatory Strategy */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            TAS Regulatory Strategy
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">A clear segregation of duties</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-6 text-gray-900">TAS Responsibilities</h3>
              <ul className="space-y-3">
                {['Routing', 'Workflow Coordination', 'Data Transformation', 'Protocol Standardization'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#0044CC] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Provider Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  'Credential Issuance (Certizen)',
                  'Trust Services (FTS)',
                  'Compliance Decisioning (FTS)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#0066B3] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strategic Value */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h4 className="font-bold text-lg mb-3 text-[#0066B3]">For FTS.Money</h4>
              <p className="text-gray-700">
                Through its TAS service, FTS.Money enhances its platform value by delivering faster onboarding, 
                reduced risk, and stronger cross-border acceptance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <h4 className="font-bold text-lg mb-3 text-[#0066B3]">For Certizen</h4>
              <p className="text-gray-700">
                Positions Certizen Technology as a universal trust anchor for businesses across industries, 
                as well as serving government systems and decentralized ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build with TAS?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join banks, fintechs, DAOs, and enterprises using TAS to automate credential issuance and compliance workflows
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 text-lg px-8">
                Apply for LEI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('UserLogin')}>
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0066B3] text-lg px-8">
                Login to Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Logos Footer */}
      <section className="py-8 sm:py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm text-gray-500 mb-4">Powered by</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/d897e53ec_Certizen-Technology.png"
              alt="Certizen Technology"
              className="h-6 sm:h-8"
            />
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png"
              alt="FTS.Money"
              className="h-6 sm:h-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
}