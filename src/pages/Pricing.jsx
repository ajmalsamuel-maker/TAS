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
          <h1 className="text-5xl font-bold mb-6">B2B SaaS Pricing</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Multi-tenant workspaces with complete isolation. Each organization gets their own secure environment to manage credential issuance and compliance workflows.
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
                price: '$1,500',
                description: 'Perfect for startups and small teams',
                features: [
                  'Up to 100 LEI issuances/month',
                  '5 team seats',
                  'Basic KYB + AML screening',
                  'Email support',
                  'Standard API rate limits',
                  'Multi-tenant isolation',
                  'Basic workflow automation',
                  'Webhook notifications'
                ],
                cta: 'Start Free Trial'
              },
              {
                tier: 'Business',
                price: '$4,500',
                description: 'For growing organizations',
                features: [
                  'Up to 500 LEI issuances/month',
                  '20 team seats',
                  'Advanced fraud detection',
                  'Custom workflows & policies',
                  'Priority support + Slack channel',
                  'Webhook integrations',
                  '99.5% SLA uptime',
                  'Custom branding options',
                  'Advanced analytics dashboard'
                ],
                cta: 'Get Started',
                highlighted: true
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations at scale',
                features: [
                  'Unlimited LEI issuances',
                  'Unlimited team seats',
                  'Dedicated account manager',
                  'Custom integrations & connectors',
                  'White-label options',
                  '99.9% SLA uptime',
                  'Volume-based discounts',
                  'Dedicated infrastructure',
                  'Regulatory compliance packs',
                  'Custom SLA agreements'
                ],
                cta: 'Contact Sales'
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl ${plan.highlighted ? 'bg-gradient-to-br from-[#0066B3] to-[#004080] text-white shadow-2xl scale-105 border-2 border-blue-300' : 'bg-white text-gray-900 border-2 border-blue-100'} transition-all hover:shadow-2xl`}>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className={plan.highlighted ? 'text-blue-200' : 'text-gray-600'}>/month</span>}
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

          {/* Usage-Based Add-ons */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Usage-Based Add-ons</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { service: 'Extra Verifications', rate: '$15-25 each', desc: 'Additional verifications beyond your tier limit' },
                { service: 'Enhanced AML Checks', rate: '$5-10 each', desc: 'Premium sanctions, PEP, and adverse media screening' },
                { service: 'Facial Biometric Verification', rate: '$3-5 each', desc: 'Liveness detection and identity verification' }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">{item.service}</h4>
                  <p className="text-2xl font-bold text-[#0066B3] mb-2">{item.rate}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
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