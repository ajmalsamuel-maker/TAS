import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, TrendingUp, Users, Zap, Lock, Globe, ArrowRight, Building2 } from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function CryptoSolution() {
  const useCases = [
    {
      title: "Institutional Trading Tier",
      description: "vLEI-verified accounts for hedge funds, family offices, and corporate treasuries",
      icon: TrendingUp,
      benefits: ["Auto-approve large transactions", "Reduced compliance overhead", "Premium fee structure"]
    },
    {
      title: "On-Chain Entity Verification",
      description: "Link blockchain addresses to verified LEI entities via DIDs",
      icon: Lock,
      benefits: ["Smart contract vLEI checks", "Transparent beneficial ownership", "Regulatory compliance"]
    },
    {
      title: "Cross-Border Settlement",
      description: "LEI-anchored OTC trades with cryptographic proof of counterparty legitimacy",
      icon: Globe,
      benefits: ["Instant entity verification", "Reduced settlement risk", "Audit-ready trails"]
    }
  ];

  const stats = [
    { label: "False Positive Reduction", value: "90%", icon: CheckCircle },
    { label: "Faster KYB Processing", value: "95%", icon: Zap },
    { label: "Institutional Clients", value: "500+", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              TAS Platform for Crypto Exchanges
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              LEI/vLEI-Verified<br />Institutional Crypto Trading
            </h1>
            <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Use the TAS Platform to issue LEI/vLEI credentials and enable cryptographically-verified entity trading.
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Powered by Certizen's QVI infrastructure. Reduce compliance costs by 90% with automated vLEI verification.
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

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="h-12 w-12 text-[#0066B3] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Crypto Exchanges Use TAS Platform
            </h2>
            <p className="text-xl text-gray-600">
              Same core platform, configured for institutional-grade crypto compliance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <Card key={idx} className="border-2 border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004080] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-gray-900">{useCase.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            The vLEI Advantage
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                    ✗
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional KYC</h3>
                    <p className="text-gray-600">
                      Screen "ABC Hedge Fund" → 50 name matches → 3 hours manual review → 
                      30% false positives → regulatory risk
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">TAS vLEI Verification</h3>
                    <p className="text-gray-600">
                      ABC presents vLEI → Cryptographic signature verified → LEI active status checked → 
                      5-second approval → Zero false positives
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#0066B3]">
              <CardHeader>
                <CardTitle className="text-gray-900">Result: 90% Cost Reduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Manual Review Time:</span>
                  <span className="font-semibold text-gray-900">3 hours → 5 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>False Positives:</span>
                  <span className="font-semibold text-gray-900">30% → 0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Team Size:</span>
                  <span className="font-semibold text-gray-900">20 FTE → 2 FTE</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Savings:</span>
                  <span className="font-semibold text-green-600">$2M+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Standards */}
      <StandardsFooter />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="h-20 w-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Launch LEI-Verified Institutional Trading
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join leading exchanges building the future of compliant crypto with TAS Platform
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