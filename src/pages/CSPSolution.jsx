import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, CheckCircle, Zap, Globe, Award, TrendingUp, Rocket } from 'lucide-react';

export default function CSPSolution() {
  const useCases = [
    {
      title: "Automated vLEI Issuance",
      description: "Issue LEI + vLEI to every company you form automatically",
      icon: Zap,
      benefit: "New revenue stream: $50-$200 per credential"
    },
    {
      title: "Become a QVI (Qualified vLEI Issuer)",
      description: "TAS white-labels GLEIF-authorized issuance infrastructure",
      icon: Award,
      benefit: "Market differentiation vs competitors"
    },
    {
      title: "Multi-Jurisdiction Compliance",
      description: "One platform for all entity formations - Delaware, BVI, Singapore, etc.",
      icon: Globe,
      benefit: "Reduce operational complexity"
    }
  ];

  const platforms = [
    { name: "Stripe Atlas", volume: "10K+ companies/year", opportunity: "Add vLEI to every startup formation" },
    { name: "Firstbase.io", volume: "5K+ companies/year", opportunity: "Premium vLEI tier = $299 upsell" },
    { name: "CSC Global", volume: "Millions managed", opportunity: "Retrofit LEI to existing entities" },
    { name: "Ogier", volume: "Offshore specialist", opportunity: "BVI/Cayman vLEI compliance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-300">
              For Corporate Service Providers & Formation Platforms
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Become a vLEI Issuer
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Turn entity formation into a credential issuance business. Issue GLEIF-authorized 
              vLEIs to every company you form. New revenue, market differentiation, future-proof compliance.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Rocket className="mr-2 h-5 w-5" />
                  Become a QVI
                </Button>
              </Link>
              <Link to={createPageUrl('Pricing')}>
                <Button size="lg" variant="outline">
                  See Economics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            The vLEI Opportunity for CSPs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <Card key={idx} className="border-indigo-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-indigo-600 mb-4" />
                    <CardTitle className="text-slate-900">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300">
                      {useCase.benefit}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <TrendingUp className="h-12 w-12 text-indigo-600" />
              <h2 className="text-3xl font-bold text-slate-900">The Economics</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Traditional CSP Model:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Entity formation: $500-$2,000</li>
                  <li>• Registered agent: $100-$300/year</li>
                  <li>• Annual filings: $200-$500/year</li>
                  <li className="pt-4 font-semibold text-slate-900">
                    Total Annual Revenue per Entity: $800-$3,800
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">CSP + vLEI Model:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• All traditional services ✓</li>
                  <li>• <span className="text-indigo-600 font-semibold">+ LEI issuance: $150-$300</span></li>
                  <li>• <span className="text-indigo-600 font-semibold">+ vLEI credential: $100-$200/year</span></li>
                  <li>• <span className="text-indigo-600 font-semibold">+ ECR credentials: $50 per employee</span></li>
                  <li className="pt-4 font-semibold text-indigo-600">
                    Total Annual Revenue per Entity: $1,200-$4,850
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
              <p className="text-center text-2xl font-bold text-indigo-900">
                📈 30-50% Revenue Increase per Entity
              </p>
              <p className="text-center text-slate-600 mt-2">
                Plus: Market differentiation, client retention, regulatory future-proofing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Perfect for Digital Formation Platforms
            </h2>
            <p className="text-xl text-slate-600">
              API-native, white-label vLEI issuance in your brand
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map((platform, idx) => (
              <Card key={idx} className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">{platform.name}</CardTitle>
                  <CardDescription className="text-lg">{platform.volume}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2 text-indigo-700">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{platform.opportunity}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            From Formation to vLEI in 3 Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Entity Formed</h3>
              <p className="text-slate-600">
                Client submits formation request via your platform (Stripe Atlas, Firstbase, etc.)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">TAS Auto-Issues LEI/vLEI</h3>
              <p className="text-slate-600">
                API triggers TAS → LEI requested from GLEIF → vLEI credential generated → Signed by your QVI
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Client Receives Credentials</h3>
              <p className="text-slate-600">
                Digital wallet with LEI + vLEI delivered → Ready to use for banking, compliance, trade
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Badge className="bg-indigo-600 text-white text-lg px-6 py-3">
              <Zap className="inline h-5 w-5 mr-2" />
              Entire process: 24-48 hours (vs weeks for manual LEI application)
            </Badge>
          </div>
        </div>
      </section>

      {/* CSP Act 2024 */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="border-purple-200">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <Award className="h-10 w-10 text-purple-600" />
                <CardTitle className="text-2xl text-slate-900">Regulatory Driver: CSP Act 2024</CardTitle>
              </div>
              <CardDescription className="text-lg">
                New regulations require CSPs to verify beneficial ownership and report to FinCEN
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                <strong>Challenge:</strong> Manual UBO verification is expensive and error-prone
              </p>
              <p className="text-indigo-700 font-semibold">
                <strong>Solution:</strong> LEI automatically discloses UBOs through GLEIF's Level 2 data
              </p>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-slate-900">
                  Every entity with LEI = pre-verified beneficial ownership = instant CSP Act compliance
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Building2 className="h-20 w-20 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Launch Your vLEI Issuance Service
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join CSC, Ogier, and leading CSPs building the future of entity formation
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Become a QVI Partner
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}