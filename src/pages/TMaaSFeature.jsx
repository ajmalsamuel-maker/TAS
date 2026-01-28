import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Shield, Activity, TrendingUp, CheckCircle2, AlertTriangle,
  Zap, BarChart3, Lock, Settings, Play, Clock, Users, BarChart2, Search, DollarSign, FileText
} from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function TMaaSFeature() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Transaction Monitoring As A Service</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-8">
            Real-time financial transaction screening with intelligent rule engine, risk scoring, and comprehensive analytics
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50">
                Enable TMaaS <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Pricing')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Manual Review Bottleneck</p>
                     <p className="text-gray-600 text-sm">Every transaction requires manual evaluation, slowing processes</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">False Positives</p>
                     <p className="text-gray-600 text-sm">Generic rules flag legitimate transactions, wasting compliance time</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Missed Risk</p>
                     <p className="text-gray-600 text-sm">Complex fraud patterns require AI analysis, not rule-of-thumb checks</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Compliance Gaps</p>
                     <p className="text-gray-600 text-sm">Manual processes aren't auditable or consistently applied</p>
                   </div>
                 </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-[#0044CC] border-l-4 border-l-[#0044CC]">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Typical Workflow Issues</h3>
               <div className="space-y-4 text-sm text-gray-700">
                 <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Average review time: 4-8 hours per alert</p>
                 <p className="flex items-center gap-2"><BarChart2 className="h-4 w-4 text-[#0044CC] flex-shrink-0" />False positive rate: 70-80% in some systems</p>
                 <p className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Missed suspicious patterns: Complex behavioral analysis impossible</p>
                 <p className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Manual audit trails: Error-prone and incomplete</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">How TMaaS Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Automated real-time screening with intelligent rule engine, machine learning risk scoring, and actionable analytics
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { step: '1', title: 'Transaction Submitted', desc: 'Receive transaction data via webhook with full details' },
              { step: '2', title: 'Rule Engine Evaluation', desc: 'Apply custom AND/OR logic rules in real-time' },
              { step: '3', title: 'Risk Scoring', desc: 'Calculate 0-100 risk score using ML + AML data' },
              { step: '4', title: 'Decision & Action', desc: 'Auto-approve, flag, or block based on thresholds' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-blue-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0044CC] to-[#002D66] text-white flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Settings,
                title: 'Custom Rule Builder',
                desc: 'Create complex rules with AND/OR logic. Screen by amount, country, velocity, device fingerprint, and more.',
                features: ['Drag-drop rule creation', 'Multi-condition logic', 'Real-time testing', 'Version control']
              },
              {
                icon: TrendingUp,
                title: 'Intelligent Risk Scoring',
                desc: 'ML-powered risk calculation combining transaction attributes, historical behavior, and AML databases.',
                features: ['0-100 risk scale', 'Threshold-based decisions', 'Velocity analysis', 'Behavioral patterns']
              },
              {
                icon: CheckCircle2,
                title: 'Auto-Approve/Block',
                desc: 'Set thresholds for automatic approval, flagging, or blocking. Manual review only when needed.',
                features: ['Configurable thresholds', 'Bypass rules', 'Emergency overrides', 'Audit logging']
              },
              {
                icon: Activity,
                title: 'Real-Time Monitoring',
                desc: 'Process every transaction in milliseconds. Full webhook integration with callback notifications.',
                features: ['Sub-second latency', 'Webhook callbacks', 'Async processing', '100% coverage']
              },
              {
                icon: Shield,
                title: 'Data Enrichment',
                desc: 'Automatically enrich transactions with GeoIP, device reputation, and velocity history.',
                features: ['GeoIP lookup', 'Device fingerprinting', 'Velocity tracking', 'Pattern analysis']
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Comprehensive dashboards showing screening performance, rule effectiveness, and trend analysis.',
                features: ['Rule metrics', 'Alert trends', 'Risk exposure', 'Performance KPIs']
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border-2 border-blue-100 hover:border-[#0044CC] transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0044CC] to-[#002D66] rounded-lg flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#0044CC] rounded-full" />
                          {f}
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

      {/* Use Cases */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Who Benefits from TMaaS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Payment Processors',
                desc: 'Screen merchant transactions in real-time. Reduce fraud by 85%+. Meet PCI DSS compliance.',
                metrics: ['Sub-millisecond processing', 'Webhook callbacks', 'API integration']
              },
              {
                title: 'Crypto Exchanges',
                desc: 'Monitor customer deposits/withdrawals 24/7. Detect suspicious patterns instantly.',
                metrics: ['24/7 monitoring', 'AML integration', 'Auto-escalation']
              },
              {
                title: 'Financial Institutions',
                desc: 'Streamline transaction review for compliance. Reduce manual workload by 70%.',
                metrics: ['Case management', 'SLA tracking', 'Audit trails']
              },
              {
                title: 'Fintech Platforms',
                desc: 'Verify transfers between users. Catch money laundering patterns automatically.',
                metrics: ['Custom rules', 'Risk scoring', 'Analytics']
              },
              {
                title: 'Remittance Services',
                desc: 'Screen cross-border payments. Meet FATF AML/CFT requirements globally.',
                metrics: ['Multi-currency', 'Country routing', 'Compliance reporting']
              },
              {
                title: 'Enterprise Treasury',
                desc: 'Monitor vendor payments and wire transfers. Prevent fraud and unauthorized transfers.',
                metrics: ['Internal transfers', 'Vendor screening', 'Approval workflows']
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white border-2 border-blue-200">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{useCase.desc}</p>
                  <ul className="space-y-2">
                    {useCase.metrics.map((m, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0044CC]" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">TMaaS Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                tier: 'Pay Per Transaction',
                price: '$0.10 - $0.50',
                desc: 'per transaction screened',
                features: ['No monthly minimum', 'Auto-scaling', 'Custom rules', 'Full analytics']
              },
              {
                tier: 'Volume Tier',
                price: '$2,500+',
                desc: 'per month, volume-based',
                features: ['100k+ transactions/month', 'Dedicated support', 'Custom SLA', 'Priority API']
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                desc: 'unlimited transactions',
                features: ['Custom pricing', 'Dedicated team', 'White-label', 'Custom integration']
              }
            ].map((plan, i) => (
              <Card key={i} className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardTitle>{plan.tier}</CardTitle>
                  <p className="text-sm text-gray-600">{plan.desc}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-[#0044CC] mb-6">{plan.price}</p>
                  <ul className="space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#0044CC] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Screen Every Transaction?</h2>
          <p className="text-lg text-blue-100 mb-10">
            Enable real-time monitoring with TMaaS. Reduce fraud, meet compliance, and streamline operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50 text-lg px-8">
                Enable TMaaS <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <StandardsFooter />
    </div>
  );
}