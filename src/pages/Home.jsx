import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, Shield, Zap, Globe, Lock, 
  Network, CheckCircle2, Layers, Building2, FileCheck, Mail
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
                Enterprise Identity & Compliance Platform
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed">
                Multi-tenant B2B SaaS platform for LEI/vLEI issuance, KYB verification, and automated compliance workflows
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Purpose-built for banks, fintechs, DAOs, supply chains, and enterprises
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl('Onboarding')}>
                  <Button size="lg" className="bg-[#0066B3] text-white hover:bg-[#004C8C] text-lg px-8 shadow-lg">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
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
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Enterprise Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>Global Coverage</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white backdrop-blur-lg rounded-xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Core Capabilities</h3>
                <div className="space-y-2.5">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3.5 border border-blue-100">
                    <span className="text-base font-semibold text-gray-900">KYB Verification</span>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3.5 border border-blue-100">
                    <span className="text-base font-semibold text-gray-900">AML Screening</span>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3.5 border border-blue-100">
                    <span className="text-base font-semibold text-gray-900">vLEI Issuance</span>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3.5 border border-blue-100">
                    <span className="text-base font-semibold text-gray-900">DID Management</span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-gray-600 font-medium border-t pt-4">
                  All delivered through a unified API with complete multi-tenant isolation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Powered By Section */}
        <div className="relative max-w-7xl mx-auto px-6 pb-12 border-t border-gray-200 pt-12">
          <div>
            <p className="text-gray-500 text-sm mb-8 text-center font-medium">Powered by</p>
            <div className="flex flex-wrap items-center justify-center gap-20">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/4191d6eef_Untitleddesign5.png" 
                alt="Certizen Technology" 
                className="h-6 opacity-50 hover:opacity-80 transition-opacity"
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

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Why TAS Platform?
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Skip months of integration work. Get enterprise-grade identity infrastructure in minutes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Multi-Tenant Isolation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Each organization gets a completely isolated workspace with dedicated data storage and access controls
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Network className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Unified API</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                One API for KYB, AML, vLEI, and DID services - no need to integrate with multiple providers
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Deploy in Minutes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pre-built workflows, fraud detection, and compliance automation ready out of the box
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Complete Identity & Compliance Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to onboard businesses, verify identities, and issue credentials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-lg flex items-center justify-center mb-3">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">KYB Verification</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4">
                  Global business verification with UBO checks and regulatory compliance automation
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    195+ country coverage
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Real-time verification
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Automated compliance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0088CC] to-[#0066B3] rounded-lg flex items-center justify-center mb-3">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">AML Screening</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive sanctions, PEP, and adverse media screening with continuous monitoring
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Global watchlist coverage
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Adverse media tracking
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Real-time updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#004C8C] to-[#003366] rounded-lg flex items-center justify-center mb-3">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">vLEI Credentials</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4">
                  LEI-based digital identity credentials with KERI/ACDC cryptographic verification
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Cryptographic validation
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    OOR & ECR roles
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0066B3] flex-shrink-0" />
                    Automated lifecycle
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Set up your workspace in minutes and start issuing credentials immediately
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Create Workspace',
                desc: 'Sign up and configure your isolated multi-tenant environment'
              },
              {
                step: '2',
                title: 'Invite Team',
                desc: 'Add team members with role-based access controls'
              },
              {
                step: '3',
                title: 'Configure Workflows',
                desc: 'Set up KYB, AML, and credential issuance policies'
              },
              {
                step: '4',
                title: 'Start Onboarding',
                desc: 'Begin verifying businesses and issuing vLEI credentials'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-[#0066B3] flex items-center justify-center mb-4 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
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
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">
            B2B SaaS Pricing
          </h2>
          <p className="text-base text-center text-gray-600 mb-12">
            Multi-tenant workspaces with complete data isolation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: 'Starter',
                price: '$1,500',
                features: ['Up to 100 LEI issuances/month', '5 team seats', 'Basic KYB + AML', 'Email support']
              },
              {
                tier: 'Business',
                price: '$4,500',
                features: ['Up to 500 LEI issuances/month', '20 team seats', 'Advanced fraud detection', 'Priority support + Slack', '99.5% SLA'],
                highlighted: true
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                features: ['Unlimited issuances', 'Unlimited seats', 'Dedicated account manager', 'White-label options', '99.9% SLA']
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-br from-[#0066B3] to-[#004080] text-white shadow-2xl scale-105' : 'bg-gray-50 text-gray-900 border-2 border-blue-100'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className={plan.highlighted ? 'text-blue-200' : 'text-gray-600'}>/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-cyan-300' : 'text-[#0066B3]'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={createPageUrl(plan.tier === 'Enterprise' ? 'Contact' : 'Onboarding')}>
                  <Button className={`w-full ${plan.highlighted ? 'bg-white text-[#0066B3] hover:bg-blue-50' : 'bg-[#0066B3] text-white hover:bg-[#004080]'}`}>
                    {plan.tier === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to={createPageUrl('Pricing')}>
              <Button variant="outline" size="lg" className="border-[#0066B3] text-[#0066B3] hover:bg-blue-50">
                View Full Pricing Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Identity Infrastructure for Modern Business
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Banks, fintechs, DAOs, and supply chains trust TAS to automate compliance and credential issuance
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Globe, title: 'Developer documentation and API references' },
              { icon: Layers, title: 'Sandbox testing environment' },
              { icon: CheckCircle2, title: 'Integration guides and best practices' },
              { icon: Mail, title: 'Technical support and community' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20 text-left">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-lg">{item.title}</p>
                </div>
              );
            })}
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