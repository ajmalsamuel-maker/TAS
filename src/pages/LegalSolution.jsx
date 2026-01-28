import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scale, CheckCircle, Clock, Shield, FileCheck, Building, Users } from 'lucide-react';

export default function LegalSolution() {
  const practices = [
    {
      title: "M&A Practices",
      icon: Building,
      pain: "72-hour entity verification delays deal closings",
      solution: "vLEI = instant entity legitimacy proof",
      savings: "$50K per deal"
    },
    {
      title: "Real Estate Closings",
      icon: FileCheck,
      pain: "FinCEN RRE Rule requires beneficial owner verification",
      solution: "LEI auto-discloses UBOs, pre-verified",
      savings: "3x faster closings"
    },
    {
      title: "Trust & Estate",
      icon: Shield,
      pain: "IOLTA account monitoring = manual nightmare",
      solution: "vLEI-tagged transactions = audit-ready trails",
      savings: "90% less compliance overhead"
    }
  ];

  const features = [
    "Client vLEI verification in 5 seconds (vs 3 days manual)",
    "Trust account transactions cryptographically signed",
    "Cross-border deals with mutual LEI recognition",
    "FinCEN RRE Rule compliance built-in (March 2026)",
    "Audit trails accepted by bar associations",
    "Integration with Clio, MyCase, CosmoLex"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-300">
              For Law Firms & Legal Professionals
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              vLEI-Verified Legal Practice
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Close deals 3x faster with cryptographic proof of entity legitimacy. 
              FinCEN RRE Rule compliant. IOLTA monitoring built-in. Bar-approved audit trails.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <Scale className="mr-2 h-5 w-5" />
                  Book Legal Demo
                </Button>
              </Link>
              <Link to={createPageUrl('UserLogin')}>
                <Button size="lg" variant="outline">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Built for Every Practice Area
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {practices.map((practice, idx) => {
              const Icon = practice.icon;
              return (
                <Card key={idx} className="border-amber-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-amber-600 mb-4" />
                    <CardTitle className="text-slate-900">{practice.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-red-600 font-semibold mb-1">❌ Current Pain:</p>
                      <p className="text-slate-600">{practice.pain}</p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-600 font-semibold mb-1">✅ TAS Solution:</p>
                      <p className="text-slate-600">{practice.solution}</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 border-amber-300">
                      {practice.savings}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FinCEN Compliance */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">FinCEN RRE Rule Deadline</h2>
                <p className="text-xl text-slate-600">March 1, 2026 - Are you ready?</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">New Requirements:</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Verify beneficial owners for all real estate transactions</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Report suspicious activity within 30 days</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Maintain audit trails for 5 years</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Screen against OFAC/sanctions lists</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-4">TAS Automates It All:</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Client presents LEI → UBOs auto-disclosed</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Real-time AML screening against global databases</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Cryptographically-signed audit logs</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>One-click SAR filing integration</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
              <p className="text-center text-lg font-semibold text-slate-900">
                🚨 Non-compliance penalty: <span className="text-red-600">Up to $500K per violation + bar suspension</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything Your Practice Needs
            </h2>
            <p className="text-xl text-slate-600">
              Same TAS platform, configured for legal compliance workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-amber-200">
                <CardContent className="flex items-center gap-3 pt-6">
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Users className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Trusted by Leading Law Firms
            </h2>
            <p className="text-xl text-slate-600">
              Am Law 100 firms are moving to LEI-verified client onboarding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">72%</div>
              <p className="text-slate-600">Faster M&A closings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">$2M</div>
              <p className="text-slate-600">Average annual savings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
              <p className="text-slate-600">Bar compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scale className="h-20 w-20 text-amber-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Join BigLaw's Compliance Evolution
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Kirkland & Ellis, Latham & Watkins, and top M&A practices are going LEI-verified
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Schedule Your Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}