import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Shield, Clock, CheckCircle2, AlertTriangle, Users,
  TrendingUp, Zap, Target, CheckSquare, AlertCircle, BarChart2, Search, DollarSign, FileText
} from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function CaseManagementFeature() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-white/20 text-white border-white/30">Enterprise Feature</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Enterprise Case Management</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-8">
            Automate compliance investigations with intelligent case routing, SLA tracking, and complete audit trails
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Compliance Investigation Challenge</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Alert Overload</p>
                     <p className="text-gray-600 text-sm">Hundreds of AML/KYB alerts pile up without systematic routing</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Manual Workflows</p>
                     <p className="text-gray-600 text-sm">Spreadsheets and emails, no tracking or accountability</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">SLA Breaches</p>
                     <p className="text-gray-600 text-sm">No visibility into investigation timelines or compliance deadlines</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Audit Risk</p>
                     <p className="text-gray-600 text-sm">Missing documentation of decisions and investigation steps</p>
                   </div>
                 </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-[#0044CC] border-l-4 border-l-[#0044CC]">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Real Costs of Manual Case Management</h3>
               <div className="space-y-4 text-sm text-gray-700">
                 <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Average case handling time: 2-5 days</p>
                 <p className="flex items-center gap-2"><Users className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Duplicate work by different analysts: 30-40%</p>
                 <p className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[#0044CC] flex-shrink-0" />SLA miss rate: 15-25%</p>
                 <p className="flex items-center gap-2"><Search className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Incomplete audit trails: Regulatory risk</p>
                 <p className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Compliance team cost per alert: $50-200</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">Intelligent Case Lifecycle Management</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Automate alert-to-resolution workflow with smart routing, SLA tracking, and full audit compliance
          </p>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {[
              { step: '1', title: 'Alert Generated', desc: 'AML/KYB alert triggers automatically' },
              { step: '2', title: 'Case Created', desc: 'Auto-escalate to case queue' },
              { step: '3', title: 'Assigned', desc: 'Route by priority & expertise' },
              { step: '4', title: 'Investigated', desc: 'Collaborative review & notes' },
              { step: '5', title: 'Resolved', desc: 'Decision & audit logging' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border-2 border-blue-200 text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0044CC] to-[#002D66] text-white flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: AlertCircle,
                title: 'Auto-Escalation from Alerts',
                desc: 'AML and KYB alerts automatically create cases with full context and linked evidence.',
                features: ['Instant case creation', 'Full alert context', 'Evidence linking', 'Severity mapping']
              },
              {
                icon: Target,
                title: 'Intelligent Assignment Routing',
                desc: 'Route cases by priority, complexity, and analyst expertise. Distribute workload intelligently.',
                features: ['Priority-based routing', 'Skill-based assignment', 'Load balancing', 'Custom rules']
              },
              {
                icon: Clock,
                title: 'SLA Compliance Tracking',
                desc: 'Monitor time-to-resolution against configurable SLAs. Automatic escalation for at-risk cases.',
                features: ['Deadline tracking', 'Auto-escalation', 'SLA alerts', 'Compliance reporting']
              },
              {
                icon: Users,
                title: 'Collaborative Investigation',
                desc: 'Built-in notes, attachments, and watchers. Track every decision and discussion.',
                features: ['Case notes', 'File attachments', 'Watchers', 'Activity timeline']
              },
              {
                icon: CheckSquare,
                title: 'Flexible Case Status Workflow',
                desc: 'Customizable status stages from new → assigned → in-progress → pending → resolved → closed.',
                features: ['Custom statuses', 'Stage transitions', 'Role-based actions', 'Conditional logic']
              },
              {
                icon: Shield,
                title: 'Complete Audit Trail',
                desc: 'Every action logged with timestamp, user, and details. Regulatory-compliant documentation.',
                features: ['Action logging', 'Timestamps', 'User tracking', 'Export for audit']
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

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Why Case Management Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: '70%',
                title: 'Faster Resolution',
                desc: 'Systematic workflows reduce average case handling from days to hours'
              },
              {
                metric: '95%',
                title: 'SLA Compliance',
                desc: 'Automated escalation prevents deadline breaches and regulatory issues'
              },
              {
                metric: '80%',
                title: 'Less Manual Work',
                desc: 'Auto-routing and intelligent assignment reduce analyst burden significantly'
              }
            ].map((benefit, i) => (
              <Card key={i} className="bg-white border-2 border-blue-200 text-center">
                <CardContent className="pt-8">
                  <p className="text-5xl font-bold text-[#0044CC] mb-3">{benefit.metric}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Who Uses Case Management</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                role: 'Compliance Officers',
                needs: 'Need visibility into all investigations with SLA tracking and escalations',
                solutions: ['Dashboard overview', 'SLA alerts', 'Escalation rules', 'Performance metrics']
              },
              {
                role: 'AML Analysts',
                needs: 'Need organized, prioritized cases with full context and collaboration tools',
                solutions: ['Case queue', 'Priority routing', 'Notes & docs', 'Case history']
              },
              {
                role: 'KYB Investigators',
                needs: 'Need systematic verification workflows with documentation and audit trails',
                solutions: ['Verification checklists', 'Document tracking', 'Audit logging', 'Approval workflows']
              },
              {
                role: 'Compliance Leadership',
                needs: 'Need reports on effectiveness, SLA performance, and regulatory compliance',
                solutions: ['Analytics dashboard', 'SLA reports', 'Compliance exports', 'Performance metrics']
              }
            ].map((useCase, i) => (
              <Card key={i} className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardTitle>{useCase.role}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600 mb-4 font-semibold">{useCase.needs}</p>
                  <ul className="space-y-2">
                    {useCase.solutions.map((sol, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-[#0044CC] flex-shrink-0" />
                        {sol}
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Streamline Your Compliance Investigations</h2>
          <p className="text-lg text-blue-100 mb-10">
            Reduce investigation time by 70%. Meet SLAs consistently. Maintain complete audit trails for regulators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Onboarding')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50 text-lg px-8">
                Enable Case Management <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Schedule Demo
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