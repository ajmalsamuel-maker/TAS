import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, CheckCircle, AlertCircle, Globe, Zap, Shield, ArrowRight } from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function RemittanceSolution() {
  const challenges = [
    {
      icon: AlertCircle,
      problem: "High false positive rates flag legitimate business transactions",
      solution: "vLEI verification significantly reduces false positives"
    },
    {
      icon: AlertCircle,
      problem: "Certain corridors face enhanced scrutiny and delays",
      solution: "LEI-verified entities enable premium service tiers"
    },
    {
      icon: AlertCircle,
      problem: "Manual KYB verification creates processing bottlenecks",
      solution: "Automated vLEI verification via TAS Platform"
    }
  ];

  const tiers = [
    {
      name: "Consumer Tier",
      users: "Individual senders",
      kyc: "Basic ID verification",
      limits: "Lower transaction limits",
      fees: "Standard processing"
    },
    {
      name: "Business Tier",
      users: "SMEs, freelancers",
      kyc: "Business registration + manual review",
      limits: "Moderate transaction limits",
      fees: "Manual verification",
      pain: "❌ Multi-day verification"
    },
    {
      name: "LEI-Verified Tier (NEW)",
      users: "Verified entities",
      kyc: "Automatic via vLEI",
      limits: "Higher transaction limits",
      fees: "Instant verification",
      benefit: "✅ Real-time approval"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              TAS Platform for Remittance Providers
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              LEI-Verified Business Remittance
            </h1>
            <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Launch premium B2B remittance services with instant entity verification through the TAS Platform.
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Certizen (GLEIF-Accredited QVI) issues LEI/vLEI credentials via TAS. Dramatically reduce false positives with automated KYB and AML screening.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Onboarding')}>
                <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              Powered by Certizen Technology (GLEIF-Accredited QVI) • Built on TAS Platform
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Remittance Challenges, Solved
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border-2 border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 border-2 border-blue-200">
                      <Icon className="h-6 w-6 text-gray-500" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">{item.problem}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="text-xs font-semibold mb-1 text-gray-700">TAS Solution:</p>
                      <p className="text-sm text-[#0066B3] font-semibold">{item.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Introduce a Premium LEI-Verified Tier
            </h2>
            <p className="text-xl text-slate-600">
              Higher limits, lower fees, instant verification = more revenue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, idx) => (
              <Card 
                key={idx} 
                className={idx === 2 ? "border-[#0066B3] border-2 shadow-xl" : "border-2 border-gray-200"}
              >
                <CardHeader>
                  {idx === 2 && (
                    <Badge className="mb-2 bg-[#0066B3] text-white w-fit">PREMIUM TIER</Badge>
                  )}
                  <CardTitle className="text-slate-900">{tier.name}</CardTitle>
                  <CardDescription>{tier.users}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">KYC Process:</p>
                    <p className="font-semibold text-slate-900">{tier.kyc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Transaction Limits:</p>
                    <p className="font-semibold text-slate-900">{tier.limits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Processing:</p>
                    <p className="font-semibold text-slate-900">{tier.fees}</p>
                  </div>
                  {tier.pain && (
                    <Badge variant="outline" className="text-gray-600 border-gray-300">
                      {tier.pain}
                    </Badge>
                  )}
                  {tier.benefit && (
                    <Badge className="bg-blue-100 text-[#0066B3] border-blue-300">
                      {tier.benefit}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case */}
      <section className="py-20 bg-gradient-to-r from-[#0066B3] to-[#004C8C]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Example: Cross-Border Business Remittance
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Traditional Approach</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• High percentage of legitimate business transfers flagged</li>
                  <li>• Multi-day holds for compliance review</li>
                  <li>• Risk-based account restrictions</li>
                  <li>• Significant compliance overhead</li>
                </ul>
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-700 font-semibold">Result: Delayed processing</p>
                  <p className="text-slate-600">Higher operational costs</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0066B3] mb-4">With TAS Platform</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• Business presents vLEI credential issued by Certizen</li>
                  <li>• TAS verifies: LEI status, KYB data, AML screening</li>
                  <li>• Transaction auto-approved in real-time</li>
                  <li>• Premium service tier enabled</li>
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-[#0066B3] font-semibold">Result: Instant processing</p>
                  <p className="text-blue-600">Lower operational costs</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Badge className="bg-[#0066B3] text-white text-lg px-6 py-2">
                <Shield className="inline h-5 w-5 mr-2" />
                Enable premium corridors with LEI/vLEI verification
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How TAS Powers Remittance
            </h2>
            <p className="text-xl text-slate-600">
              Same platform, optimized for cross-border money movement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-gray-200 hover:border-[#0066B3] transition-all">
              <CardHeader>
                <Zap className="h-10 w-10 text-[#0066B3] mb-2" />
                <CardTitle className="text-slate-900">Instant Verification</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Real-time vLEI checks vs multi-day manual review
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#0066B3] transition-all">
              <CardHeader>
                <Shield className="h-10 w-10 text-[#0066B3] mb-2" />
                <CardTitle className="text-slate-900">AML Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Continuous monitoring of LEI entities for sanctions/PEP hits
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#0066B3] transition-all">
              <CardHeader>
                <Globe className="h-10 w-10 text-[#0066B3] mb-2" />
                <CardTitle className="text-slate-900">Global Recognition</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                LEI accepted worldwide - verify once, use everywhere
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#0066B3] transition-all">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-[#0066B3] mb-2" />
                <CardTitle className="text-slate-900">Premium Service</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Offer enhanced tiers for LEI-verified business customers
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Standards */}
      <StandardsFooter />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Send className="h-20 w-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Launch LEI-Verified Business Remittance
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Enable premium business corridors with TAS Platform
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Powered by Certizen Technology (GLEIF-Accredited QVI)
          </p>
        </div>
      </section>

      {/* Logos Footer */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-4">Powered by</p>
          <div className="flex items-center justify-center gap-12">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/4191d6eef_Untitleddesign5.png"
              alt="Certizen Technology"
              className="h-8"
            />
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png"
              alt="FTS.Money"
              className="h-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
}