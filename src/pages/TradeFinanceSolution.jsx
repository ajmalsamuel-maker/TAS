import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ship, CheckCircle, Clock, DollarSign, Globe, FileCheck, AlertCircle } from 'lucide-react';

export default function TradeFinanceSolution() {
  const challenges = [
    {
      problem: "Letters of Credit take 5-10 days to verify counterparties",
      solution: "Instant vLEI verification = same-day approval",
      icon: Clock
    },
    {
      problem: "Trade-Based Money Laundering (TBML) costs banks $1.6T annually",
      solution: "LEI-anchored invoice matching detects over/under invoicing",
      icon: AlertCircle
    },
    {
      problem: "Cross-border KYC duplication wastes resources",
      solution: "LEI recognized globally = one KYB, infinite reuse",
      icon: Globe
    }
  ];

  const features = [
    {
      title: "Counterparty vLEI Verification",
      description: "Buyers and sellers present cryptographically-signed entity credentials",
      benefit: "95% faster trade approval"
    },
    {
      title: "Smart Contract Escrow",
      description: "Release funds only when both parties present valid vLEI signatures",
      benefit: "Zero payment fraud"
    },
    {
      title: "TBML Detection",
      description: "AI-powered invoice analysis with LEI-anchored pricing benchmarks",
      benefit: "Flag suspicious trades in real-time"
    },
    {
      title: "Provenance Chains",
      description: "Every document timestamped and signed by vLEI-verified entities",
      benefit: "Audit-ready compliance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-300">
              For Trade Finance Platforms & Banks
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              LEI-Verified Trade Networks
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Stop TBML before it happens. Every buyer, seller, and intermediary verified through 
              GLEIF-authorized vLEI credentials. The future of trusted global trade.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Ship className="mr-2 h-5 w-5" />
                  Request Trade Demo
                </Button>
              </Link>
              <Link to={createPageUrl('Pricing')}>
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
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
                <Card key={idx} className="border-emerald-200">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-red-500 mb-4" />
                    <CardTitle className="text-lg text-slate-900">❌ {item.problem}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2 text-emerald-700 font-semibold">
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
              <Card key={idx} className="border-emerald-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                    {feature.benefit}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Example */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Real-World Example: Letter of Credit
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Traditional Process</h3>
                <ol className="space-y-3 text-slate-600">
                  <li><strong>Day 1-3:</strong> Manual verification of buyer/seller registrations</li>
                  <li><strong>Day 4-6:</strong> Paper document exchange and review</li>
                  <li><strong>Day 7-8:</strong> Bank compliance checks both parties</li>
                  <li><strong>Day 9-10:</strong> Final approval and fund release</li>
                </ol>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-semibold">Total Time: 10 days</p>
                  <p className="text-red-600">Cost: $5,000+ in fees</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-4">✅ TAS vLEI Process</h3>
                <ol className="space-y-3 text-slate-600">
                  <li><strong>Hour 1:</strong> Buyer & seller present vLEI credentials</li>
                  <li><strong>Hour 2:</strong> Cryptographic verification (5 seconds each)</li>
                  <li><strong>Hour 3:</strong> Smart contract auto-approves terms</li>
                  <li><strong>Hour 4:</strong> Funds released to escrow</li>
                </ol>
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-700 font-semibold">Total Time: 4 hours</p>
                  <p className="text-emerald-600">Cost: $50 verification fee</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Badge className="bg-emerald-600 text-white text-lg px-6 py-2">
                <DollarSign className="inline h-5 w-5 mr-2" />
                99% Cost Reduction, 60x Faster
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FileCheck className="h-20 w-20 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Join the LEI-Verified Trade Network
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            TradeIX, Marco Polo members, and leading banks are building the future of compliant trade
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}