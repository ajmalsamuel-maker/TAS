import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core orchestration capabilities.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                tier: 'Starter',
                price: '$200',
                description: 'Perfect for startups and small businesses',
                features: [
                  'Basic API access',
                  'Standard workflows',
                  'Shared infrastructure',
                  'Basic provenance tracking',
                  '99% uptime SLA',
                  'Business-hours email support',
                  'Up to 10,000 API calls/month'
                ],
                cta: 'Start Free Trial'
              },
              {
                tier: 'Business',
                price: '$800',
                description: 'For growing companies with compliance needs',
                features: [
                  'Advanced workflows',
                  'Priority routing',
                  '99.5% uptime SLA',
                  'Enhanced provenance with audit reports',
                  'Higher request quotas',
                  '24/7 standard support',
                  'Up to 100,000 API calls/month',
                  'Custom workflow templates'
                ],
                cta: 'Get Started',
                highlighted: true
              },
              {
                tier: 'Enterprise',
                price: '$2,000',
                description: 'For large organizations requiring full control',
                features: [
                  'Dedicated infrastructure',
                  'Custom connectors',
                  '99.9% uptime SLA',
                  'Full provenance with blockchain anchoring',
                  'Enterprise analytics',
                  '24/7 premium support',
                  'Unlimited API calls',
                  'Dedicated account manager',
                  'Regulatory compliance packs'
                ],
                cta: 'Contact Sales'
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl ${plan.highlighted ? 'bg-gradient-to-br from-[#0066B3] to-[#004080] text-white shadow-2xl scale-105 border-2 border-blue-300' : 'bg-white text-gray-900 border-2 border-blue-100'} transition-all hover:shadow-2xl`}>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className={plan.highlighted ? 'text-blue-200' : 'text-gray-600'}>/month</span>
                  </div>
                  <p className={`text-sm mb-8 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-cyan-300' : 'text-[#0066B3]'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={createPageUrl('Onboarding')}>
                    <Button className={`w-full ${plan.highlighted ? 'bg-white text-[#0066B3] hover:bg-blue-50' : 'bg-[#0066B3] text-white hover:bg-[#004080]'}`}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Usage-Based Fees */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Usage-Based Technical Fees</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Service Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: 'API Routing', rate: '$0.50 per 1,000 requests', desc: 'Routing, security validation, protocol translation' },
                    { service: 'Workflow Execution Steps', rate: '$0.10 per step', desc: 'Identity, AML, KYB, vLEI, and DID workflows' },
                    { service: 'Data Transformation', rate: '$0.05 per MB', desc: 'Format normalization, schema alignment' },
                    { service: 'Provenance Attestation & Data Passport', rate: '$0.25 per workflow', desc: 'Cryptographic finalization, audit trail generation' }
                  ].map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-blue-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{item.service}</td>
                      <td className="py-4 px-4 text-[#0066B3] font-semibold">{item.rate}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Provider Fees Notice */}
          <div className="mt-12 bg-blue-50 border-l-4 border-[#0066B3] p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Regulated Provider Fees</h4>
            <p className="text-sm text-gray-700 mb-4">
              The following services are billed separately by licensed providers:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="font-semibold text-gray-900">Certizen Technology</p>
                <p className="text-gray-600">vLEI issuance, DID creation, trust credentialing</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="font-semibold text-gray-900">FTS AML</p>
                <p className="text-gray-600">AML screening, PEP/sanctions checks</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="font-semibold text-gray-900">FTS KYB</p>
                <p className="text-gray-600">KYB verification, UBO checks, business scoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-4">Powered by</p>
          <div className="flex items-center justify-center gap-12 text-gray-600">
            <p className="text-sm font-medium hover:text-[#0066B3] transition-colors cursor-pointer">Certizen Technology</p>
            <p className="text-sm font-medium hover:text-[#0066B3] transition-colors cursor-pointer">FTS.Money</p>
          </div>
        </div>
      </section>
    </div>
  );
}