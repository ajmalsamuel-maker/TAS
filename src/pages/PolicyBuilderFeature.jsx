import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Shield, Zap, Layers, CheckCircle2, AlertTriangle,
  BarChart3, Workflow, Code, Settings, Play, TrendingUp, Clock, Users, BarChart2, DollarSign, FileText
} from 'lucide-react';
import StandardsFooter from '@/components/standards/StandardsFooter';

export default function PolicyBuilderFeature() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-white/20 text-white border-white/30">Advanced Builder</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Visual Policy & Workflow Builder</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-8">
            Design complex compliance workflows without code. No-code builder with A/B testing and real-time analytics
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl('UserPolicies')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50">
                Design Your Workflow <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                See Demo
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Code-Centric Problem</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Every Change = Code Deploy</p>
                     <p className="text-gray-600 text-sm">Adjusting workflow rules requires engineering work and deployment delays</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Testing is Slow</p>
                     <p className="text-gray-600 text-sm">New workflow variations require QA cycles and staging deployments</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">Compliance Can't Iterate</p>
                     <p className="text-gray-600 text-sm">Non-technical teams can't test regulatory ideas independently</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <AlertTriangle className="h-6 w-6 text-[#0044CC] flex-shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">No A/B Testing</p>
                     <p className="text-gray-600 text-sm">Can't run workflow variants to optimize approval rates</p>
                   </div>
                 </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-[#0044CC] border-l-4 border-l-[#0044CC]">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Real Costs of Code-Based Workflows</h3>
               <div className="space-y-4 text-sm text-gray-700">
                 <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Average workflow change: 2-3 weeks (request → code → QA → deploy)</p>
                 <p className="flex items-center gap-2"><Users className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Requires 3+ teams (business, engineering, QA)</p>
                 <p className="flex items-center gap-2"><BarChart2 className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Can't test regulatory ideas (A/B testing requires code changes)</p>
                 <p className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Regulatory agility: Poor (slow response to new requirements)</p>
                 <p className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-[#0044CC] flex-shrink-0" />Average workflow change cost: $5,000+</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">Visual Workflow Designer</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Drag-drop policy builder for non-technical teams. Test, deploy, and optimize in minutes
          </p>

          <div className="bg-white rounded-lg p-8 border-2 border-blue-200 mb-12">
            <p className="text-center text-gray-600 mb-6">
              <em>Imagine designing KYB workflows, AML approval processes, and risk-based rules without writing a single line of code...</em>
            </p>
            <div className="flex justify-center">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#0044CC] to-[#002D66] text-white rounded-lg">
                Visual workflow builder comes with pre-built compliance nodes
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Layers, title: 'Pre-built Nodes', desc: 'KYB check, AML screen, risk calc' },
              { icon: Workflow, title: 'Drag & Drop', desc: 'Connect nodes with visual logic' },
              { icon: Play, title: 'Test Mode', desc: 'Run workflows on sample data' },
              { icon: TrendingUp, title: 'Real-time Analytics', desc: 'See performance metrics live' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="bg-white border-2 border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0044CC] to-[#002D66] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.desc}</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Builder Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Workflow,
                title: 'Visual Policy Designer',
                desc: 'Drag-drop interface to design compliance workflows. Connect nodes with conditional logic.',
                features: ['Drag-drop nodes', 'Conditional branches', 'Loop support', 'Error handling', 'Documentation']
              },
              {
                icon: Layers,
                title: 'Pre-built Node Library',
                desc: 'Compliance-focused nodes ready to use: KYB, AML, risk scoring, approval gates.',
                features: ['KYB verification', 'AML screening', 'Risk scoring', 'Approval gates', 'Case creation', 'Custom nodes']
              },
              {
                icon: Code,
                title: 'Custom Logic Nodes',
                desc: 'For advanced flows, add custom logic without leaving the builder.',
                features: ['JavaScript support', 'Custom functions', 'API calls', 'Data transformation', 'Conditional logic']
              },
              {
                icon: Settings,
                title: 'Version Control & Templates',
                desc: 'Save versions, create templates, and reuse workflows across teams.',
                features: ['Version history', 'Template library', 'Rollback support', 'Change tracking', 'Diff viewer']
              },
              {
                icon: BarChart3,
                title: 'Real-Time Execution Analytics',
                desc: 'Monitor workflow execution with detailed metrics on approval rates, speed, and drop-off.',
                features: ['Execution metrics', 'Approval rates', 'Processing time', 'Drop-off analysis', 'Bottleneck detection']
              },
              {
                icon: Zap,
                title: 'A/B Testing Framework',
                desc: 'Run policy variants simultaneously. Compare approval rates, speed, and compliance outcomes.',
                features: ['Variant routing', 'Split testing', 'Performance comparison', 'Auto-winner selection', 'Statistical significance']
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Workflow Examples</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Risk-Based KYB Flow',
                desc: 'Route verification based on country and entity type. High-risk entities get manual review.',
                steps: ['Check country risk', 'Get entity type', 'Entity high-risk?', 'Manual review or auto-approve', 'Create case if needed']
              },
              {
                title: 'AML Approval Workflow',
                desc: 'Multi-stage approval process with escalation and investigation assignment.',
                steps: ['Screen transaction', 'Calculate risk score', 'Score > threshold?', 'Analyst review', 'Manager approval', 'Create case']
              },
              {
                title: 'Continuous Monitoring Trigger',
                desc: 'Schedule recurring AML/KYB checks. Auto-escalate if changes detected.',
                steps: ['Check schedule', 'Run AML check', 'Changes detected?', 'Score risk level', 'Notify team', 'Create alert']
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardTitle>{useCase.title}</CardTitle>
                  <p className="text-sm text-gray-600 font-normal mt-2">{useCase.desc}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="space-y-2">
                    {useCase.steps.map((step, j) => (
                      <li key={j} className="flex gap-3 text-sm text-gray-700">
                        <span className="font-bold text-[#0044CC] flex-shrink-0">{j + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Business Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: '10x',
                title: 'Faster Changes',
                desc: 'Deploy workflow changes in minutes instead of weeks'
              },
              {
                metric: '90%',
                title: 'Less Engineering',
                desc: 'Compliance teams can design and test independently'
              },
              {
                metric: '30%',
                title: 'Better Outcomes',
                desc: 'A/B testing optimizes approval rates and compliance scores'
              }
            ].map((benefit, i) => (
              <Card key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                <CardContent className="pt-8 text-center">
                  <p className="text-5xl font-bold text-[#0044CC] mb-2">{benefit.metric}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0044CC] via-[#002D66] to-[#001A40] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Design Your First Compliance Workflow</h2>
          <p className="text-lg text-blue-100 mb-10">
            No code required. Drag-drop interface. Deploy in minutes. A/B test outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('UserPolicies')}>
              <Button size="lg" className="bg-white text-[#0044CC] hover:bg-blue-50 text-lg px-8">
                Open Builder <ArrowRight className="ml-2 h-5 w-5" />
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