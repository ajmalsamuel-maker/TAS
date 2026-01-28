import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, TrendingUp, Users, Zap, Lock, Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/50">
              For Crypto Exchanges & Digital Asset Platforms
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              LEI/vLEI-Verified<br />Institutional Crypto
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Be the first exchange to offer cryptographically-verified entity trading. 
              Reduce compliance costs by 90% with automated vLEI verification.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Request Demo
                </Button>
              </Link>
              <Link to={createPageUrl('UserLogin')}>
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-950">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              How Crypto Exchanges Use TAS
            </h2>
            <p className="text-xl text-blue-300">
              Same platform, configured for institutional-grade crypto compliance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <Card key={idx} className="bg-slate-900/50 border-blue-500/30">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-blue-400 mb-4" />
                    <CardTitle className="text-white">{useCase.title}</CardTitle>
                    <CardDescription className="text-blue-300">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-blue-200">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
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
      <section className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            The vLEI Advantage
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                    ✗
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Traditional KYC</h3>
                    <p className="text-blue-300">
                      Screen "ABC Hedge Fund" → 50 name matches → 3 hours manual review → 
                      30% false positives → regulatory risk
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">TAS vLEI Verification</h3>
                    <p className="text-blue-300">
                      ABC presents vLEI → Cryptographic signature verified → LEI active status checked → 
                      5-second approval → Zero false positives
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white">Result: 90% Cost Reduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-blue-200">
                <div className="flex justify-between">
                  <span>Manual Review Time:</span>
                  <span className="font-semibold text-white">3 hours → 5 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>False Positives:</span>
                  <span className="font-semibold text-white">30% → 0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Team Size:</span>
                  <span className="font-semibold text-white">20 FTE → 2 FTE</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Savings:</span>
                  <span className="font-semibold text-green-400">$2M+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="h-20 w-20 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Launch LEI-Verified Institutional Trading
          </h2>
          <p className="text-xl text-blue-300 mb-8">
            Join Gemini, Kraken, and leading exchanges building the future of compliant crypto
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}