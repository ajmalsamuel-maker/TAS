import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Shield, Lock, CheckCircle2, AlertTriangle,
  Archive, Zap, Eye, FileCheck, TrendingUp, BarChart3
} from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function AuditComplianceFeature() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-white/20 text-white border-white/30">Compliance & Audit</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Enterprise Audit & Compliance Logging</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-8">
            Cryptographically-signed audit trails with 7-year retention and regulatory compliance mapping
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50">
                Enable Audit Logging <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Talk to Compliance Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Landscape */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">Modern Compliance Challenges</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Regulated organizations face unprecedented audit demands across multiple frameworks
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { standard: 'SOX', desc: 'Financial controls & transparency', retention: '7 years' },
              { standard: 'GDPR', desc: 'Personal data & privacy', retention: 'As needed' },
              { standard: 'HIPAA', desc: 'Healthcare data security', retention: '6 years' },
              { standard: 'PCI-DSS', desc: 'Payment card industry', retention: '1 year active' }
            ].map((item, i) => (
              <Card key={i} className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-2xl font-bold text-[#0044CC] mb-2">{item.standard}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                  <p className="text-xs text-gray-500">Retention: <span className="font-semibold">{item.retention}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-200">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-3">The Audit Burden</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>❌ Average audit preparation time: 2-4 weeks</li>
                  <li>❌ Manual log gathering from multiple systems</li>
                  <li>❌ Gap analysis during audits (critical findings)</li>
                  <li>❌ Incomplete audit trails can lead to compliance failures</li>
                  <li>❌ Failed audits cost $500k+ in penalties and remediation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">Automated Audit-Ready Logging</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Continuous compliance monitoring with automatic evidence collection and compliance reporting
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: 'Real-Time Event Capture',
                desc: 'Every system action logged automatically with user, timestamp, IP, and full context'
              },
              {
                icon: Lock,
                title: 'Cryptographic Security',
                desc: 'Events digitally signed to prevent tampering. SHA-256 hashing with tamper detection.'
              },
              {
                icon: Archive,
                title: 'Intelligent Archival',
                desc: 'Automatic retention by compliance standard. Compress old logs. Export in audit format.'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="bg-white border-2 border-blue-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004C8C] rounded-lg flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Audit Logging Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: '15+ Event Categories',
                desc: 'Comprehensive event classification',
                items: ['Authentication events', 'Data access', 'Data modifications', 'System configuration', 'Compliance decisions', 'Integration events']
              },
              {
                icon: Lock,
                title: 'Cryptographic Signatures',
                desc: 'Tamper-proof event recording',
                items: ['SHA-256 hashing', 'Digital signatures', 'Signature verification', 'Chain-of-custody', 'Tamper alerts', 'Evidence chain']
              },
              {
                icon: TrendingUp,
                title: 'State Tracking',
                desc: 'Before & after data snapshots',
                items: ['Before state capture', 'After state capture', 'Diff analysis', 'Change history', 'Rollback audit', 'Impact analysis']
              },
              {
                icon: FileCheck,
                title: 'Compliance Mapping',
                desc: 'Automatic compliance flagging',
                items: ['SOX tagging', 'GDPR flagging', 'HIPAA classification', 'PCI-DSS marking', 'FATF AML/CFT', 'Custom standards']
              },
              {
                icon: Archive,
                title: 'Retention Management',
                desc: '7-year default with customization',
                items: ['7-year retention', 'Compression', 'Cold storage', 'Auto-archival', 'Legal hold', 'Custom policies']
              },
              {
                icon: BarChart3,
                title: 'Audit Reporting',
                desc: 'Export for compliance auditors',
                items: ['CSV export', 'PDF reports', 'Search & filter', 'Timeline views', 'Compliance summaries', 'Auditor dashboards']
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border-2 border-blue-100 hover:border-[#0044CC] transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0066B3] to-[#004C8C] rounded-lg flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <p className="text-sm text-gray-600 font-normal">{feature.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#0044CC] rounded-full" />
                          {item}
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

      {/* Compliance Framework Matrix */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Compliance Standards Covered</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gradient-to-r from-[#0044CC] to-[#002D66] text-white">
                <tr>
                  <th className="border p-3 text-left">Standard</th>
                  <th className="border p-3 text-center">Retention</th>
                  <th className="border p-3 text-center">Audit Trail</th>
                  <th className="border p-3 text-center">Signed Events</th>
                  <th className="border p-3 text-left">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { std: 'SOX (Sarbanes-Oxley)', ret: '7 years', trail: '✅', signed: '✅', coverage: 'Financial transactions, system access, data changes' },
                  { std: 'GDPR', ret: 'As needed', trail: '✅', signed: '✅', coverage: 'Personal data access, processing, deletion, consent' },
                  { std: 'HIPAA', ret: '6 years', trail: '✅', signed: '✅', coverage: 'Healthcare data access, modifications, user activity' },
                  { std: 'PCI-DSS', ret: '1 year', trail: '✅', signed: '✅', coverage: 'Payment data handling, access logs, security events' },
                  { std: 'ISO 27001', ret: '7 years', trail: '✅', signed: '✅', coverage: 'Information security, access control, risk management' },
                  { std: 'FATF AML/CFT', ret: '5 years', trail: '✅', signed: '✅', coverage: 'Compliance decisions, screening, investigations' }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="border p-3 font-semibold text-gray-900">{row.std}</td>
                    <td className="border p-3 text-center text-gray-700">{row.ret}</td>
                    <td className="border p-3 text-center">{row.trail}</td>
                    <td className="border p-3 text-center">{row.signed}</td>
                    <td className="border p-3 text-gray-700">{row.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Why Automated Audit Logging Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                metric: '80%',
                title: 'Faster Audit Prep',
                desc: 'Automatic log collection reduces preparation from weeks to days'
              },
              {
                icon: Shield,
                metric: '99.9%',
                title: 'Compliance Rate',
                desc: 'Continuous monitoring catches issues before auditors do'
              },
              {
                icon: CheckCircle2,
                metric: '0',
                title: 'Audit Failures',
                desc: 'Complete, signed audit trail eliminates compliance findings'
              }
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Card key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <CardContent className="pt-8 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0044CC] to-[#002D66] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-4xl font-bold text-[#0044CC] mb-2">{benefit.metric}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Pass Your Next Audit with Confidence</h2>
          <p className="text-lg text-blue-100 mb-10">
            Automated audit logging with compliance mapping and cryptographic security. Zero failed audits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50 text-lg px-8">
                Enable Audit Logging <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Contact Compliance Team
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