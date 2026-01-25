import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';

const AdminDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Trust Anchor Service</h1>
          <p className="text-xl text-gray-600 mb-1">Complete Technical Infrastructure & System Design</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="default">v1.0</Badge>
            <Badge variant="secondary">Admin Reference</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
            <Badge className="bg-amber-100 text-amber-800">Internal - Technical Teams</Badge>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 bg-blue-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                '1. Executive Summary',
                '2. System Architecture',
                '3. Multi-Tenancy Model',
                '4. Workflow Management',
                '5. Billing System',
                '6. Compliance & Monitoring',
                '7. Security Architecture',
                '8. Performance Metrics',
                '9. Database Design',
                '10. Disaster Recovery',
              ].map((item, i) => (
                <button key={i} className="text-left px-4 py-2 hover:bg-blue-100 rounded transition-colors text-blue-900">
                  {item}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Platform Overview</h3>
              <p className="text-gray-700 mb-4">
                Trust Anchor Service (TAS) is a globally-compliant business identity and compliance verification platform that automates Know Your Business (KYB) verification, Anti-Money Laundering (AML) screening, Legal Entity Identifier (LEI) issuance, and blockchain-ready credential generation across 120+ countries.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mt-4">
                <p className="font-semibold mb-3">Key Capabilities:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span><span>Automated KYB verification (2-5 hours vs 2-4 weeks)</span></li>
                  <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span><span>Real-time AML screening against 300+ sanctions lists</span></li>
                  <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span><span>LEI issuance via GLEIF integration</span></li>
                  <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span><span>Cryptographically signed vLEI credentials for Web3</span></li>
                  <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span><span>Continuous compliance monitoring</span></li>
                  <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span><span>Multi-country regulatory compliance</span></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Architecture Philosophy</h3>
              <p className="text-gray-700 mb-4">
                TAS is designed on three core principles: efficiency, security, and scalability. Every component supports multi-tenancy from the database layer to API gateway, enabling cost-effective global deployment while maintaining strict data isolation and PCI DSS Level 1 compliance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">System Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Complete System Architecture</h3>
              <div className="bg-slate-100 p-6 rounded-lg overflow-x-auto">
                <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed">
{`╔═══════════════════════════════════════════════════════════════════╗
║                     PRESENTATION LAYER                            ║
╠═══════════════════════════════════════════════════════════════════╣
║  Admin Portal │ User Portal │ Public Website │ Mobile Apps        ║
║  (React UI)   │  (React UI) │   (Marketing)  │ (Tailwind CSS)     ║
╚═══════════════════════════════════════════════════════════════════╝
                              ↓
╔═══════════════════════════════════════════════════════════════════╗
║                    APPLICATION LAYER                              ║
╠═══════════════════════════════════════════════════════════════════╣
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             ║
║  │ Verification │  │ Billing      │  │ Compliance   │             ║
║  │ Engine       │  │ Engine       │  │ Engine       │             ║
║  └──────────────┘  └──────────────┘  └──────────────┘             ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │  Workflow Orchestration (KYB, AML, LEI, vLEI, Monitoring) │   ║
║  └────────────────────────────────────────────────────────────┘   ║
╚═══════════════════════════════════════════════════════════════════╝
                              ↓
╔═══════════════════════════════════════════════════════════════════╗
║                    INTEGRATION LAYER                              ║
╠═══════════════════════════════════════════════════════════════════╣
║  Registry APIs  │ Sanction Lists │ Payment Processors             ║
║  - 120+ Country │ - OFAC, UN, EU │ - Stripe, Square              ║
║    Registries   │ - PEP Database │ - PayPal, Adyen               ║
║  - GLEIF (LEI)  │ - News Sources │ Accounting Systems            ║
╚═══════════════════════════════════════════════════════════════════╝
                              ↓
╔═══════════════════════════════════════════════════════════════════╗
║                    DATABASE LAYER (Base44)                        ║
╠═══════════════════════════════════════════════════════════════════╣
║  Users │ Organizations │ Workflows │ Invoices │ AML Alerts       ║
║  Cases │ PaymentRecords│ Compliance Events    │ Audit Logs       ║
╚═══════════════════════════════════════════════════════════════════╝`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Entity Relationship Model</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Entity</th>
                    <th className="border p-3 text-left">Purpose</th>
                    <th className="border p-3 text-left">Relationships</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Organization</td>
                    <td className="border p-3">Business entity being verified</td>
                    <td className="border p-3">1:N to Users, Workflows, Cases</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">OnboardingApplication</td>
                    <td className="border p-3">Business registration submission</td>
                    <td className="border p-3">1:N Workflows per application</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Workflow</td>
                    <td className="border p-3">KYB, AML, Document verification tasks</td>
                    <td className="border p-3">1:N AML Alerts, Audit Logs</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Invoice</td>
                    <td className="border p-3">Billing record for services</td>
                    <td className="border p-3">1:N PaymentRecords</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Case</td>
                    <td className="border p-3">Compliance investigation</td>
                    <td className="border p-3">1:N CaseNotes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Workflow Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Verification Workflow Pipeline</h3>
              <div className="bg-slate-100 p-6 rounded-lg overflow-x-auto">
                <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed">
{`Application Submitted
    ↓
Admin Reviews & Approves
    ↓
PARALLEL WORKFLOW EXECUTION
    ├─→ KYB Verification (2-4 hours)
    │   ├─ Check business registries (120+ countries)
    │   ├─ Verify incorporation date
    │   ├─ Validate business ID
    │   └─ Status: ⏳ In Progress → ✓ Passed / ✗ Failed
    │
    ├─→ AML Screening (2-4 hours)
    │   ├─ Screen against OFAC/UN/EU lists
    │   ├─ Check PEP databases
    │   ├─ Search adverse media
    │   └─ Result: ✓ Clear / ⚠ Alert / ✗ Blocked
    │
    └─→ Document Verification (1-2 hours)
        ├─ Validate uploaded documents
        ├─ Check signatures if required
        └─ Status: ✓ Verified / ⚠ Resubmit Needed
    ↓
AGGREGATE RESULTS
    ├─ All passed? → Status = 'approved'
    ├─ Any alerts? → Create Case for investigation
    └─ Failed? → Status = 'rejected'
    ↓
IF APPROVED:
    ├─ Generate LEI via GLEIF
    ├─ Create vLEI credentials
    └─ Create Invoice for service
    ↓
IF ALERTS:
    ├─ Auto-create Case
    ├─ Assign to compliance team
    └─ Notify via email
    ↓
AUDIT TRAIL COMPLETE
    └─ Every step logged with: timestamp, actor, action, details`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Workflow Status Reference</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Status</th>
                    <th className="border p-3 text-left">Meaning</th>
                    <th className="border p-3 text-left">Duration</th>
                    <th className="border p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">pending</td>
                    <td className="border p-3">Waiting for admin initiation</td>
                    <td className="border p-3">Variable</td>
                    <td className="border p-3">Admin must submit</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">in_progress</td>
                    <td className="border p-3">Currently being processed</td>
                    <td className="border p-3">2-4 hours</td>
                    <td className="border p-3">Monitor progress</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-3 font-semibold">completed</td>
                    <td className="border p-3">Successfully verified</td>
                    <td className="border p-3">Immediate</td>
                    <td className="border p-3">Approve & issue LEI</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="border p-3 font-semibold">alert</td>
                    <td className="border p-3">Potential issue identified</td>
                    <td className="border p-3">2-5 days</td>
                    <td className="border p-3">Create investigation case</td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="border p-3 font-semibold">failed</td>
                    <td className="border p-3">Verification failed</td>
                    <td className="border p-3">Immediate</td>
                    <td className="border p-3">Reject & notify user</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Billing System */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Billing System Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3 text-center">Starter</th>
                    <th className="border p-3 text-center">Business</th>
                    <th className="border p-3 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Base Monthly Price</td>
                    <td className="border p-3 text-center">$99</td>
                    <td className="border p-3 text-center">$299</td>
                    <td className="border p-3 text-center">Custom</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">KYB Verifications/mo</td>
                    <td className="border p-3 text-center">50</td>
                    <td className="border p-3 text-center">Unlimited</td>
                    <td className="border p-3 text-center">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">AML Screening Level</td>
                    <td className="border p-3 text-center">Basic</td>
                    <td className="border p-3 text-center">Full</td>
                    <td className="border p-3 text-center">Full+</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">LEI Issuance</td>
                    <td className="border p-3 text-center">❌</td>
                    <td className="border p-3 text-center">✅</td>
                    <td className="border p-3 text-center">✅</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">vLEI Credentials</td>
                    <td className="border p-3 text-center">❌</td>
                    <td className="border p-3 text-center">✅</td>
                    <td className="border p-3 text-center">✅</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Continuous Monitoring</td>
                    <td className="border p-3 text-center">❌</td>
                    <td className="border p-3 text-center">✅</td>
                    <td className="border p-3 text-center">✅</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Support</td>
                    <td className="border p-3 text-center">Email</td>
                    <td className="border p-3 text-center">Email + Chat</td>
                    <td className="border p-3 text-center">24/7 Phone</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Invoice Lifecycle</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <p className="font-semibold">Draft</p>
                  <p className="text-gray-600">Initial state - not sent to customer</p>
                </div>
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <p className="font-semibold">Issued</p>
                  <p className="text-gray-600">Ready to send - due date calculated (30 days)</p>
                </div>
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <p className="font-semibold">Sent</p>
                  <p className="text-gray-600">Email delivered to customer</p>
                </div>
                <div className="p-3 bg-amber-50 rounded border-l-4 border-amber-600">
                  <p className="font-semibold">Overdue</p>
                  <p className="text-gray-600">Payment past due date - auto-marked if unpaid</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-600">
                  <p className="font-semibold">Paid</p>
                  <p className="text-gray-600">FINAL - Payment received and reconciled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Compliance & Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">AML Alert Management</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Alert Type</th>
                    <th className="border p-3 text-left">Severity</th>
                    <th className="border p-3 text-left">Action Required</th>
                    <th className="border p-3 text-left">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-red-50">
                    <td className="border p-3 font-semibold">Sanction Hit</td>
                    <td className="border p-3"><Badge variant="destructive">CRITICAL</Badge></td>
                    <td className="border p-3">Immediately block, escalate</td>
                    <td className="border p-3">&lt; 2 hours</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="border p-3 font-semibold">PEP Match</td>
                    <td className="border p-3"><Badge className="bg-orange-100 text-orange-800">HIGH</Badge></td>
                    <td className="border p-3">Create case, review identity</td>
                    <td className="border p-3">&lt; 1 day</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-3 font-semibold">Adverse Media</td>
                    <td className="border p-3"><Badge className="bg-yellow-100 text-yellow-800">MEDIUM</Badge></td>
                    <td className="border p-3">Verify relevance, assess risk</td>
                    <td className="border p-3">&lt; 3 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Case Management Workflow</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                  <div>
                    <p className="font-semibold">Alert Triggered</p>
                    <p className="text-gray-600">System auto-creates case if critical severity</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                  <div>
                    <p className="font-semibold">Assignment</p>
                    <p className="text-gray-600">Assign to compliance officer, send notification</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                  <div>
                    <p className="font-semibold">Investigation</p>
                    <p className="text-gray-600">Officer reviews data, adds notes and evidence</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                  <div>
                    <p className="font-semibold">Determination</p>
                    <p className="text-gray-600">Approve (false positive), Reject (confirmed risk), or request more info</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">5</span>
                  <div>
                    <p className="font-semibold">Resolution</p>
                    <p className="text-gray-600">Mark resolved, record decision, track SLA compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Performance & Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Targets</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Metric</th>
                    <th className="border p-3 text-center">Target</th>
                    <th className="border p-3 text-center">Current</th>
                    <th className="border p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border p-3 font-semibold">Uptime SLA</td>
                    <td className="border p-3 text-center">99.95%</td>
                    <td className="border p-3 text-center">99.98%</td>
                    <td className="border p-3 text-center">✓ Met</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-3 font-semibold">P50 Latency</td>
                    <td className="border p-3 text-center">&lt; 100ms</td>
                    <td className="border p-3 text-center">45ms</td>
                    <td className="border p-3 text-center">✓ Met</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-3 font-semibold">P99 Latency</td>
                    <td className="border p-3 text-center">&lt; 500ms</td>
                    <td className="border p-3 text-center">185ms</td>
                    <td className="border p-3 text-center">✓ Met</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-3 font-semibold">Error Rate</td>
                    <td className="border p-3 text-center">&lt; 0.1%</td>
                    <td className="border p-3 text-center">0.02%</td>
                    <td className="border p-3 text-center">✓ Met</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Infrastructure Specification</h3>
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Component</th>
                    <th className="border p-3 text-left">Technology</th>
                    <th className="border p-3 text-left">Configuration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Frontend</td>
                    <td className="border p-3">React 18 + TypeScript</td>
                    <td className="border p-3">Tailwind CSS, Shadcn/UI</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Backend</td>
                    <td className="border p-3">Node.js + Deno</td>
                    <td className="border p-3">Serverless functions, REST API</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Database</td>
                    <td className="border p-3">PostgreSQL</td>
                    <td className="border p-3">Multi-AZ, 30-day backups, PITR</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Cache</td>
                    <td className="border p-3">Redis</td>
                    <td className="border p-3">Session storage, rate limiting</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">Security</td>
                    <td className="border p-3">SSL/TLS, AES-256 encryption</td>
                    <td className="border p-3">PCI DSS Level 1 compliant</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gray-100 border-gray-300">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Document Version:</strong> 1.0</p>
              <p><strong>Last Updated:</strong> January 25, 2026</p>
              <p><strong>Classification:</strong> Internal - Technical Teams</p>
              <p><strong>Owner:</strong> Platform Engineering</p>
              <p className="text-xs mt-4">© 2026 FTS.Money & Certizen Technologies. Internal use only.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDocumentation;