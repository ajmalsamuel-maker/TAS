import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Globe, FileCheck, AlertCircle, ArrowRight, Zap, Shield } from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function TradeFinanceSolution() {
  const challenges = [
    {
      problem: "Letters of Credit require lengthy counterparty verification",
      solution: "Instant vLEI verification streamlines trade approval",
      icon: Clock
    },
    {
      problem: "Trade-Based Money Laundering (TBML) detection is complex and manual",
      solution: "LEI-anchored invoice matching helps detect suspicious patterns",
      icon: AlertCircle
    },
    {
      problem: "Cross-border KYC duplication creates inefficiency",
      solution: "LEI recognized globally - verify once, use everywhere",
      icon: Globe
    }
  ];

  const features = [
    {
      title: "Counterparty vLEI Verification",
      description: "Buyers and sellers present cryptographically-signed entity credentials",
      benefit: "Significantly faster trade approval"
    },
    {
      title: "Smart Contract Escrow",
      description: "Release funds when both parties present valid vLEI signatures",
      benefit: "Enhanced payment security"
    },
    {
      title: "TBML Detection",
      description: "Invoice analysis with LEI-anchored benchmarks",
      benefit: "Flag suspicious patterns automatically"
    },
    {
      title: "Provenance Chains",
      description: "Every document timestamped and signed by vLEI-verified entities",
      benefit: "Audit-ready compliance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              TAS Platform for Trade Finance
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              LEI-Verified Trade Networks
            </h1>
            <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Use the TAS Platform to stop TBML before it happens. Every buyer, seller, and intermediary verified through cryptographic vLEI credentials.
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Powered by Certizen's GLEIF-authorized QVI infrastructure. The future of trusted global trade.
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

      {/* Challenges & Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Trade Finance Challenges, Solved
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border-2 border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-red-500 mb-4" />
                    <CardTitle className="text-lg text-slate-900">❌ {item.problem}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2 text-[#0066B3] font-semibold">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>✅ {item.solution}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Same TAS platform, optimized for trade finance workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-blue-100 text-[#0066B3] border-blue-300">
                    {feature.benefit}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Example */}
      <section className="py-20 bg-gradient-to-r from-[#0066B3] to-[#004C8C]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Real-World Example: Letter of Credit
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Traditional Process</h3>
                <ol className="space-y-3 text-slate-600">
                  <li><strong>Days 1-3:</strong> Manual verification of buyer/seller registrations</li>
                  <li><strong>Days 4-7:</strong> Document exchange and compliance review</li>
                  <li><strong>Days 8-10:</strong> Bank checks both parties</li>
                  <li><strong>Days 11+:</strong> Final approval and fund release</li>
                </ol>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-semibold">Total Time: Multiple days to weeks</p>
                  <p className="text-red-600">High compliance overhead</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-4">✅ TAS vLEI Process</h3>
                <ol className="space-y-3 text-slate-600">
                  <li><strong>Step 1:</strong> Buyer & seller present vLEI credentials</li>
                  <li><strong>Step 2:</strong> Cryptographic verification (instant)</li>
                  <li><strong>Step 3:</strong> KYB & AML checks via TAS Platform</li>
                  <li><strong>Step 4:</strong> Automated approval workflow</li>
                </ol>
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-700 font-semibold">Total Time: Same-day processing</p>
                  <p className="text-emerald-600">Significantly lower overhead</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Badge className="bg-[#0066B3] text-white text-lg px-6 py-2">
                <Zap className="inline h-5 w-5 mr-2" />
                Dramatically faster processing with enhanced security
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <StandardsFooter />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FileCheck className="h-20 w-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Join the LEI-Verified Trade Network
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Leading banks are building the future of compliant trade with TAS Platform
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