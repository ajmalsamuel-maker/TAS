import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, CheckCircle } from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">B2B SaaS Pricing</h1>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
            Multi-tenant workspaces with complete isolation. LEI/vLEI issuance, KYB verification, AML screening, and liveness detection - all in one platform.
          </p>
        </div>
      </section>

      {/* Industry Solutions Banner */}
      <section className="py-8 bg-white border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-600 mb-4">Industry-specific solutions available:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Crypto', path: 'CryptoSolution' },
              { name: 'Trade Finance', path: 'TradeFinanceSolution' },
              { name: 'Legal', path: 'LegalSolution' },
              { name: 'CSP', path: 'CSPSolution' },
              { name: 'Remittance', path: 'RemittanceSolution' }
            ].map((industry, i) => (
              <Link key={i} to={createPageUrl(industry.path)}>
                <Button variant="ghost" size="sm" className="text-[#0066B3] hover:bg-blue-50 text-xs">
                  {industry.name} →
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Subscription Plans</h2>
            <p className="text-lg text-gray-600">Access to TAS Platform + pay-as-you-go for credentials and verifications</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              {
                tier: 'Starter',
                price: '$1,500',
                description: 'Perfect for startups and small teams',
                features: [
                  '5 team seats',
                  'Basic KYB + AML screening',
                  'Email support',
                  'Standard API rate limits',
                  'Multi-tenant isolation',
                  'Basic workflow automation',
                  'Webhook notifications',
                  'Pay-per-use credentials'
                ],
                cta: 'Start Free Trial'
              },
              {
                tier: 'Business',
                price: '$4,500',
                description: 'For growing organizations',
                features: [
                  '20 team seats',
                  'Advanced fraud detection',
                  'Custom workflows & policies',
                  'Priority support + Slack channel',
                  'Webhook integrations',
                  '99.5% SLA uptime',
                  'Custom branding options',
                  'Advanced analytics dashboard',
                  'Volume discounts on credentials'
                ],
                cta: 'Get Started',
                highlighted: true
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations at scale',
                features: [
                  'Unlimited team seats',
                  'Dedicated account manager',
                  'Custom integrations & connectors',
                  'White-label options',
                  '99.9% SLA uptime',
                  'Custom volume pricing',
                  'Dedicated infrastructure',
                  'Regulatory compliance packs',
                  'Custom SLA agreements',
                  'Priority feature requests'
                ],
                cta: 'Contact Sales'
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl ${plan.highlighted ? 'bg-gradient-to-br from-[#0066B3] to-[#004080] text-white shadow-2xl lg:scale-105 border-2 border-blue-300' : 'bg-white text-gray-900 border-2 border-blue-100'} transition-all hover:shadow-2xl`}>
                  <div className="p-4 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.tier}</h3>
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className={`text-xs sm:text-sm ${plan.highlighted ? 'text-blue-200' : 'text-gray-600'}`}>/month</span>}
                  </div>
                  <p className={`text-xs sm:text-sm mb-6 sm:mb-8 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>

                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs sm:text-sm">
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

          {/* Usage-Based Pricing */}
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border-2 border-blue-100 mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 text-center">Pay-As-You-Go Credentials & Verifications</h3>
            <p className="text-center text-gray-600 mb-8">All plans use usage-based pricing for credential issuance and verification services</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {[
                { service: 'LEI Issuance', rate: 'Market rate', desc: 'Initial LEI credential (via Certizen QVI)', note: 'Annual renewal: Market rate' },
                { service: 'vLEI Credential (OOR)', rate: 'Market rate', desc: 'Organization role credential', note: 'Annual renewal: Market rate' },
                { service: 'vLEI Credential (ECR)', rate: 'Market rate', desc: 'Employee role credential per person', note: 'Annual renewal: Market rate' },
                { service: 'KYB Verification', rate: '$15-25', desc: 'Company verification check', note: 'Per verification' },
                { service: 'AML Screening', rate: '$5-10', desc: 'Sanctions, PEP, adverse media', note: 'Per screening' },
                { service: 'Liveness Detection', rate: '$3-5', desc: 'Facial biometric verification', note: 'Per verification' },
                { service: 'Ongoing Monitoring', rate: '$10-20', desc: 'Continuous AML/KYB monitoring', note: 'Per entity/month' }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 sm:p-6 border border-blue-200">
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2">{item.service}</h4>
                  <p className="text-xl sm:text-2xl font-bold text-[#0066B3] mb-2">{item.rate}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{item.desc}</p>
                  <p className="text-xs text-gray-500 italic">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Solutions */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Industry-Specific Solutions</h3>
            <p className="text-center text-gray-600 mb-8">Same platform, optimized workflows for your industry</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Crypto Exchanges', path: 'CryptoSolution', features: ['Institutional KYB', 'vLEI-verified trading tiers', 'On-chain entity verification'] },
                { name: 'Trade Finance', path: 'TradeFinanceSolution', features: ['Counterparty vLEI verification', 'TBML detection', 'Smart contract escrow'] },
                { name: 'Law Firms', path: 'LegalSolution', features: ['Client verification', 'M&A due diligence', 'Trust account monitoring'] },
                { name: 'Corporate Services', path: 'CSPSolution', features: ['Formation + LEI/vLEI', 'UBO verification', 'Multi-jurisdiction support'] },
                { name: 'Remittance', path: 'RemittanceSolution', features: ['Premium B2B corridors', 'Instant entity verification', 'AML compliance'] }
              ].map((solution, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#0066B3] transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{solution.name}</h4>
                  <ul className="space-y-2 mb-4">
                    {solution.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#0066B3] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl(solution.path)}>
                    <Button variant="outline" size="sm" className="w-full border-[#0066B3] text-[#0066B3] hover:bg-blue-50">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* Standards & Compliance */}
      <StandardsFooter />

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