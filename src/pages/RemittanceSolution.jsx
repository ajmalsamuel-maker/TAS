import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, CheckCircle, AlertCircle, Globe, Zap, Shield, DollarSign } from 'lucide-react';

export default function RemittanceSolution() {
  const challenges = [
    {
      icon: AlertCircle,
      problem: "False positives flag 15-30% of legitimate transactions",
      solution: "vLEI verification reduces false positives to <1%"
    },
    {
      icon: AlertCircle,
      problem: "High-risk corridors face enhanced scrutiny and delays",
      solution: "LEI-verified corridors = premium tier, instant settlement"
    },
    {
      icon: AlertCircle,
      problem: "De-risking closes accounts in developing markets",
      solution: "vLEI proves entity legitimacy, keeps corridors open"
    }
  ];

  const tiers = [
    {
      name: "Consumer Tier",
      users: "Individual senders",
      kyc: "Basic ID verification",
      limits: "$1K-$10K per transaction",
      fees: "3-7%"
    },
    {
      name: "Business Tier",
      users: "SMEs, freelancers",
      kyc: "Business registration + manual review",
      limits: "$10K-$50K per transaction",
      fees: "2-4%",
      pain: "❌ 2-5 day verification"
    },
    {
      name: "LEI-Verified Tier (NEW)",
      users: "Verified entities",
      kyc: "Automatic via vLEI",
      limits: "Unlimited",
      fees: "0.5-1.5%",
      benefit: "✅ 5-second verification"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-cyan-100 text-cyan-700 border-cyan-300">
              For Money Transfer Operators & Remittance Platforms
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              LEI-Verified Remittance Corridors
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Launch premium B2B remittance with instant entity verification. 
              Reduce false positives by 90%. Keep high-risk corridors profitable.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                  <Send className="mr-2 h-5 w-5" />
                  Request Demo
                </Button>
              </Link>
              <Link to={createPageUrl('Pricing')}>
                <Button size="lg" variant="outline">
                  See Pricing
                </Button>
              </Link>
            </div>
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
                <Card key={idx} className="border-cyan-200">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-red-500 mb-4" />
                    <CardTitle className="text-lg text-slate-900">❌ {item.problem}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2 text-cyan-700 font-semibold">
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
                className={idx === 2 ? "border-cyan-500 border-2 shadow-xl" : "border-slate-200"}
              >
                <CardHeader>
                  {idx === 2 && (
                    <Badge className="mb-2 bg-cyan-600 text-white w-fit">RECOMMENDED</Badge>
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
                    <p className="text-sm text-slate-500">Fees:</p>
                    <p className="font-semibold text-slate-900">{tier.fees}</p>
                  </div>
                  {tier.pain && (
                    <Badge variant="outline" className="text-red-600 border-red-300">
                      {tier.pain}
                    </Badge>
                  )}
                  {tier.benefit && (
                    <Badge className="bg-cyan-100 text-cyan-700 border-cyan-300">
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
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Real-World Example: Nigeria → UK Corridor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Current State</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 40% of Nigerian business transfers flagged</li>
                  <li>• 3-7 day hold for compliance review</li>
                  <li>• Many accounts closed due to "high-risk" profile</li>
                  <li>• Fees: 5-8% due to compliance overhead</li>
                </ul>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-semibold">Sender Experience: Terrible</p>
                  <p className="text-red-600">MTO Profitability: Negative</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-cyan-600 mb-4">✅ With LEI Verification</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• Nigerian business presents vLEI credential</li>
                  <li>• TAS verifies: Registered company, clean AML history</li>
                  <li>• Transaction auto-approved in 5 seconds</li>
                  <li>• Fees: 1.5% (premium tier pricing)</li>
                </ul>
                <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
                  <p className="text-cyan-700 font-semibold">Sender Experience: Excellent</p>
                  <p className="text-cyan-600">MTO Profitability: High</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Badge className="bg-cyan-600 text-white text-lg px-6 py-2">
                <DollarSign className="inline h-5 w-5 mr-2" />
                Keep high-risk corridors profitable with LEI verification
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
            <Card className="border-cyan-200">
              <CardHeader>
                <Zap className="h-10 w-10 text-cyan-600 mb-2" />
                <CardTitle className="text-slate-900">Instant Verification</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                vLEI check = 5 seconds vs 3-5 days manual review
              </CardContent>
            </Card>

            <Card className="border-cyan-200">
              <CardHeader>
                <Shield className="h-10 w-10 text-cyan-600 mb-2" />
                <CardTitle className="text-slate-900">AML Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Continuous monitoring of LEI entities for sanctions/PEP hits
              </CardContent>
            </Card>

            <Card className="border-cyan-200">
              <CardHeader>
                <Globe className="h-10 w-10 text-cyan-600 mb-2" />
                <CardTitle className="text-slate-900">Global Recognition</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                LEI accepted worldwide = no duplicate KYC per corridor
              </CardContent>
            </Card>

            <Card className="border-cyan-200">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-cyan-600 mb-2" />
                <CardTitle className="text-slate-900">Premium Pricing</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Justify higher fees for LEI-verified tier (like Wise Business)
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Business Case
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">90%</div>
              <p className="text-slate-600">Reduction in false positives</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">80%</div>
              <p className="text-slate-600">Lower compliance costs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">3x</div>
              <p className="text-slate-600">Higher profit margins on B2B remittances</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Send className="h-20 w-20 text-cyan-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Launch LEI-Verified Business Remittance
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Wise, Remitly, and leading MTOs are building premium LEI tiers
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              Schedule Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}