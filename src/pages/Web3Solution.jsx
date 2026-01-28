import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Network, Lock, Globe, ArrowRight, Hexagon, Link2, Wallet } from 'lucide-react';

export default function Web3Solution() {
  const solutions = [
    {
      icon: Hexagon,
      title: 'DAO Legal Identity',
      desc: 'Enable DAOs to obtain legally recognized LEI credentials while maintaining decentralized governance',
      features: ['LEI issuance for DAOs', 'Legal entity verification', 'Multi-signature authority mapping', 'Compliance automation']
    },
    {
      icon: Shield,
      title: 'DeFi Compliance',
      desc: 'Meet regulatory requirements without compromising decentralization',
      features: ['KYB for DeFi protocols', 'AML screening integration', 'Real-time compliance monitoring', 'Regulatory reporting automation']
    },
    {
      icon: Link2,
      title: 'Cross-Chain Identity',
      desc: 'Universal identity that works across any blockchain or traditional system',
      features: ['Blockchain-agnostic LEI credentials', 'Verifiable across all chains', 'Portable digital identity', 'Interoperable with Web2 systems']
    },
    {
      icon: Wallet,
      title: 'NFT Authentication',
      desc: 'Cryptographically verify entity ownership and authority for digital assets',
      features: ['vLEI-backed ownership proof', 'Creator identity verification', 'Provenance tracking', 'Anti-fraud protection']
    }
  ];

  const standards = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Web3 & Blockchain Solutions</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Bridging traditional legal identity with decentralized operations. Enable DAOs, DeFi protocols, and blockchain platforms to obtain legally recognized credentials while maintaining decentralization.
          </p>
          <div className="flex gap-4">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#0066B3] transition-colors">
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6">Powered by Certizen Technology & FTS.Money</p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Compliance for Web3</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Legal entity credentials for the decentralized world</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, idx) => (
              <Card key={idx} className="border-2 border-blue-100 hover:border-[#0066B3] transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 border-2 border-blue-200">
                    <solution.icon className="h-7 w-7 text-[#0066B3]" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{solution.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{solution.desc}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#0066B3] rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* W3C Standards */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">W3C & Industry Standards</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Built on open, interoperable standards</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {standards.map((standard, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{standard.title}</h3>
                <p className="text-sm text-gray-600">{standard.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-blue-200 text-center">
            <p className="text-gray-700 text-lg">
              TAS seamlessly bridges traditional LEI-based legal identity with W3C-compliant decentralized identity standards
            </p>
          </div>
        </div>
      </section>

      {/* Use Case: DAO Entity Formation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Use Case: DAO Entity Formation</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Traditional Approach</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• Manual legal entity setup (weeks)</li>
                <li>• Centralized identity management</li>
                <li>• Complex multi-sig authorization</li>
                <li>• Separate Web2/Web3 systems</li>
              </ul>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-700 font-semibold">Result: Slow, fragmented setup</p>
                <p className="text-slate-600">High coordination overhead</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0066B3] mb-4">With TAS Platform</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• DAO applies for LEI via TAS</li>
                <li>• Automated KYB verification</li>
                <li>• vLEI issued to DAO wallet</li>
                <li>• Instant compliance readiness</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-[#0066B3] font-semibold">Result: Same-day legal identity</p>
                <p className="text-blue-600">Unified Web2/Web3 identity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why TAS for Web3</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Regulatory Compliance',
                desc: 'Meet global compliance requirements without sacrificing decentralization'
              },
              {
                icon: Network,
                title: 'Cross-Chain Interoperability',
                desc: 'One identity that works across all blockchains and traditional systems'
              },
              {
                icon: Zap,
                title: 'Instant Verification',
                desc: 'Real-time cryptographic verification of entities and credentials'
              },
              {
                icon: Lock,
                title: 'Privacy-Preserving',
                desc: 'Zero-knowledge proofs and selective disclosure capabilities'
              },
              {
                icon: Globe,
                title: 'Global Recognition',
                desc: 'LEI/vLEI credentials recognized by regulators worldwide'
              },
              {
                icon: Wallet,
                title: 'Web3-Native Integration',
                desc: 'Native wallet support, smart contract compatibility, on-chain verification'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 border-2 border-blue-200">
                  <benefit.icon className="h-6 w-6 text-[#0066B3]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Launch Your Web3 Compliance Stack</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join leading DAOs and DeFi protocols using TAS for legally recognized credentials
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#0066B3] transition-colors">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Logos Footer */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-4">Powered by</p>
          <div className="flex items-center justify-center gap-12">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/d897e53ec_Certizen-Technology.png"
              alt="Certizen Technology"
              className="h-8"
            />
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png"
              alt="FTS.Money"
              className="h-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
}