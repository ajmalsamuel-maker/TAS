import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scale, CheckCircle, Clock, Shield, FileCheck, Building, Users, ArrowRight } from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function LegalSolution() {
  const practices = [
    {
      title: "M&A Practices",
      icon: Building,
      pain: "Entity verification delays deal closings",
      solution: "vLEI provides instant entity legitimacy proof",
      savings: "Faster closings"
    },
    {
      title: "Real Estate Closings",
      icon: FileCheck,
      pain: "New regulations require beneficial owner verification",
      solution: "LEI auto-discloses UBOs through GLEIF Level 2 data",
      savings: "Streamlined compliance"
    },
    {
      title: "Trust & Estate",
      icon: Shield,
      pain: "IOLTA account monitoring requires extensive documentation",
      solution: "vLEI-tagged transactions create audit-ready trails",
      savings: "Reduced compliance overhead"
    }
  ];

  const features = [
    "Rapid client vLEI verification via TAS Platform",
    "Cryptographically-signed transaction trails",
    "Cross-border deals with mutual LEI recognition",
    "Built-in KYB, AML screening, and liveness verification",
    "Comprehensive audit logging",
    "RESTful API for practice management integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              TAS Platform for Law Firms
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              vLEI-Verified Legal Practice
            </h1>
            <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Use the TAS Platform to close deals 3x faster with cryptographic proof of entity legitimacy.
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Certizen (GLEIF-Accredited QVI) issues LEI/vLEI credentials via TAS Platform. Built-in KYB, AML screening, liveness verification, and audit-ready compliance trails.
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
                <Card key={idx} className="border-2 border-gray-200 hover:border-[#0066B3] transition-all hover:shadow-lg">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-[#0066B3] mb-4" />
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
                    <Badge className="bg-blue-100 text-[#0066B3] border-blue-300">
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
      <section className="py-20 bg-gradient-to-r from-[#0066B3] to-[#004C8C]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#0066B3]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Evolving Compliance Requirements</h2>
                <p className="text-xl text-slate-600">Stay ahead of regulatory changes with TAS</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Regulatory Trends:</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Enhanced beneficial ownership verification requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Stricter AML monitoring and reporting obligations</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Extended audit trail retention requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Comprehensive sanctions screening mandates</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0066B3] mb-4">TAS Platform Capabilities:</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>LEI auto-discloses UBOs via GLEIF Level 2 data</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Real-time AML screening against global watchlists</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Cryptographically-signed audit logs</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <span>Automated compliance workflow orchestration</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-center text-sm text-slate-600">
                Note: FinCEN's Residential Real Estate (RRE) Rule effective March 1, 2026, requires beneficial ownership reporting for certain real estate transactions. TAS Platform helps automate compliance workflows.
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
              <Card key={idx} className="border-2 border-gray-200">
                <CardContent className="flex items-center gap-3 pt-6">
                  <CheckCircle className="h-6 w-6 text-[#0066B3] flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Users className="h-16 w-16 text-[#0066B3] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for Modern Legal Practice
            </h2>
            <p className="text-xl text-slate-600">
              Streamline client onboarding with cryptographic entity verification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#0066B3] mb-2">Instant</div>
              <p className="text-slate-600">Entity Verification</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0066B3] mb-2">Global</div>
              <p className="text-slate-600">LEI Recognition</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0066B3] mb-2">Automated</div>
              <p className="text-slate-600">Compliance Workflows</p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <StandardsFooter />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0066B3] via-[#004C8C] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scale className="h-20 w-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Join BigLaw's Compliance Evolution
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Leading M&A practices are adopting LEI-verified client onboarding with TAS Platform
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