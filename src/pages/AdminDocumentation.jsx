import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Home, Users, Settings, BarChart3, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Admin Documentation</h1>
          <p className="text-lg text-gray-600">Complete guide to managing the Trust Anchor Service platform</p>
          <div className="mt-4 flex gap-2">
            <Badge variant="default">System Admin</Badge>
            <Badge variant="secondary">Complete Reference</Badge>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-blue-600">1. Dashboard Overview</h4>
                <p className="text-sm text-gray-600">System statistics and KPIs</p>
              </button>
              <button className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-blue-600">2. User Management</h4>
                <p className="text-sm text-gray-600">Create, edit, and manage users</p>
              </button>
              <button className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-blue-600">3. Billing System</h4>
                <p className="text-sm text-gray-600">Invoice, plans, and payments</p>
              </button>
              <button className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-blue-600">4. Compliance & AML</h4>
                <p className="text-sm text-gray-600">Workflows and monitoring</p>
              </button>
              <button className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-blue-600">5. Workflow Management</h4>
                <p className="text-sm text-gray-600">Create and manage workflows</p>
              </button>
              <button className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-blue-600">6. Case Management</h4>
                <p className="text-sm text-gray-600">Handle alerts and reviews</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* System Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Architecture Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────────────────────────┐
│                    ADMIN PORTAL                             │
├─────────────────────────────────────────────────────────────┤
│  Dashboard  │  Users  │  Billing  │  Compliance  │  Reports │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   CORE SYSTEMS                              │
├─────────────────────────────────────────────────────────────┤
│  • User Management    • Billing Engine    • Workflow Engine │
│  • AML Screening      • Case Management   • Audit Logs      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  Users  │  Orgs  │  Invoices  │  Workflows  │  Audit Logs   │
└─────────────────────────────────────────────────────────────┘`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Admin Functions Documentation */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Dashboard Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Total Revenue</span>
                      <span className="text-blue-600 font-bold">Sum of all paid invoices</span>
                    </div>
                    <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Pending Amount</span>
                      <span className="text-orange-600 font-bold">Overdue + Issued invoices</span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Active Users</span>
                      <span className="text-purple-600 font-bold">Count of active subscriptions</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Compliance Score</span>
                      <span className="text-green-600 font-bold">Percentage of completed workflows</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Widget Overview</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Widget</th>
                        <th className="p-2 text-left">Data Source</th>
                        <th className="p-2 text-left">Update Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2">Revenue Chart</td>
                        <td className="p-2">Invoice Entity</td>
                        <td className="p-2">Real-time</td>
                      </tr>
                      <tr>
                        <td className="p-2">Active Organizations</td>
                        <td className="p-2">Organization Entity</td>
                        <td className="p-2">Real-time</td>
                      </tr>
                      <tr>
                        <td className="p-2">Workflow Status</td>
                        <td className="p-2">Workflow Entity</td>
                        <td className="p-2">Real-time</td>
                      </tr>
                      <tr>
                        <td className="p-2">AML Alerts</td>
                        <td className="p-2">AMLAlert Entity</td>
                        <td className="p-2">Real-time</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">User Roles & Permissions</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Role</th>
                        <th className="p-2 text-left">Permissions</th>
                        <th className="p-2 text-left">Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2 font-semibold">Admin</td>
                        <td className="p-2">Full system access, user management, billing, compliance</td>
                        <td className="p-2">Platform administrators</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">User</td>
                        <td className="p-2">View own data, submit applications, track workflows</td>
                        <td className="p-2">Regular platform users</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Step-by-Step: Inviting a User</h3>
                  <ol className="space-y-2">
                    <li className="flex gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
                      <span>Navigate to Admin Dashboard → Users section</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
                      <span>Click "Invite User" button</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
                      <span>Enter email address and select role (Admin or User)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
                      <span>Click "Send Invitation" - user receives email with access link</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">5</span>
                      <span>User completes registration and gains access</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Billing System Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Billing Plans (3 Tiers)</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Plan Tier</th>
                        <th className="p-2 text-left">Base Price</th>
                        <th className="p-2 text-left">API Limits</th>
                        <th className="p-2 text-left">Features</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2 font-semibold">Starter</td>
                        <td className="p-2">$99/month</td>
                        <td className="p-2">10K calls</td>
                        <td className="p-2">KYB, Basic AML</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Business</td>
                        <td className="p-2">$299/month</td>
                        <td className="p-2">50K calls</td>
                        <td className="p-2">KYB, AML, LEI, vLEI</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Enterprise</td>
                        <td className="p-2">Custom</td>
                        <td className="p-2">Unlimited</td>
                        <td className="p-2">All features + support</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Invoice Lifecycle</h3>
                  <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`Draft → Issued → Sent → Viewed → Paid
  ↓       ↓       ↓      ↓       ↓
  (Created but not sent to customer)
  (Ready for customer)
  (Email delivered)
  (Customer opened)
  (Payment confirmed)
  
Alternative flows:
  • Issued → Overdue (if not paid by due_date)
  • Any status → Cancelled (if voided)`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Invoice Generation Function</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-sm mb-3"><strong>Function:</strong> generateInvoice (Admin only)</p>
                    <p className="text-sm mb-3"><strong>Inputs:</strong></p>
                    <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                      <li>subscription_id - which subscription to bill</li>
                      <li>billing_period_start - start date</li>
                      <li>billing_period_end - end date</li>
                    </ul>
                    <p className="text-sm mt-3"><strong>Outputs:</strong></p>
                    <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                      <li>invoice_number (auto-generated)</li>
                      <li>total_amount (base + usage + tax)</li>
                      <li>invoice_id for tracking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Compliance & AML Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">AML Alert Types</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Alert Type</th>
                        <th className="p-2 text-left">Severity</th>
                        <th className="p-2 text-left">Action Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2">Sanction Hit</td>
                        <td className="p-2"><Badge variant="destructive">Critical</Badge></td>
                        <td className="p-2">Immediately block and escalate</td>
                      </tr>
                      <tr>
                        <td className="p-2">PEP Match</td>
                        <td className="p-2"><Badge className="bg-orange-100 text-orange-800">High</Badge></td>
                        <td className="p-2">Review and determine risk level</td>
                      </tr>
                      <tr>
                        <td className="p-2">Adverse Media</td>
                        <td className="p-2"><Badge className="bg-yellow-100 text-yellow-800">Medium</Badge></td>
                        <td className="p-2">Verify and assess relevance</td>
                      </tr>
                      <tr>
                        <td className="p-2">High Risk Jurisdiction</td>
                        <td className="p-2"><Badge className="bg-blue-100 text-blue-800">Low</Badge></td>
                        <td className="p-2">Monitor and flag for review</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Workflow Types</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'KYB', desc: 'Know Your Business - verify company details' },
                      { name: 'AML', desc: 'Anti-Money Laundering - screen against lists' },
                      { name: 'DID Verification', desc: 'Verify Digital Identifiers' },
                      { name: 'vLEI Issuance', desc: 'Issue verifiable Legal Entity Identifier' },
                      { name: 'Credential Verification', desc: 'Verify digital credentials' }
                    ].map((wf, i) => (
                      <div key={i} className="p-3 border-l-4 border-blue-600 bg-blue-50">
                        <p className="font-semibold">{wf.name}</p>
                        <p className="text-sm text-gray-600">{wf.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Admin FAQ */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: 'How do I generate invoices in bulk?',
                a: 'Use the "Bulk Invoice Generation" feature in Billing Admin panel. Select date range and it will automatically generate for all active subscriptions.'
              },
              {
                q: 'Can I customize invoice templates?',
                a: 'Yes, in Billing Settings you can customize the invoice header, footer, and CSS styling. Changes apply to all new invoices.'
              },
              {
                q: 'How are usage metrics tracked?',
                a: 'The system automatically tracks KYB verifications, AML screenings, LEI issuances, and API calls per organization per billing period.'
              },
              {
                q: 'What happens if an AML alert is triggered?',
                a: 'Alerts are created and assigned based on severity. Critical alerts automatically create cases for investigation.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(`faq${i}`)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 font-semibold text-left"
                >
                  {faq.q}
                  {expandedSections[`faq${i}`] ? <ChevronDown /> : <ChevronRight />}
                </button>
                {expandedSections[`faq${i}`] && (
                  <div className="p-4 bg-gray-50 border-t text-sm text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDocumentation;