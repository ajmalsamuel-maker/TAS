import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDocumentationDetailed = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Documentation</h1>
          <p className="text-lg text-gray-600">Comprehensive Reference Guide for Trust Anchor Service Administrators</p>
          <div className="flex gap-2 mt-4">
            <Badge variant="default">v1.0</Badge>
            <Badge variant="secondary">Complete Reference</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
          </div>
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="system">System Architecture</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* System Architecture */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Architecture Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Complete System Architecture</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto mb-6">
                    <pre className="whitespace-pre-wrap">{"╔════════════════════════════════════════════════════════════════════╗"}
║                         PRESENTATION LAYER                         ║
╠════════════════════════════════════════════════════════════════════╣
║  Admin Portal │ User Portal │ Public Website │ Mobile Responsive  ║
║  (React UI)   │  (React UI) │   Marketing    │  (Tailwind CSS)    ║
╚════════════════════════════════════════════════════════════════════╝
                              ↓
╔════════════════════════════════════════════════════════════════════╗
║                      APPLICATION LAYER                             ║
╠════════════════════════════════════════════════════════════════════╣
║  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐               ║
║  │ Admin       │  │ User         │  │ Billing     │               ║
║  │ Functions   │  │ Functions    │  │ Engine      │               ║
║  └─────────────┘  └──────────────┘  └─────────────┘               ║
║  ┌──────────────────┐  ┌──────────────────┐                        ║
║  │ Workflow Engine  │  │ Compliance       │                        ║
║  │ - KYB            │  │ - AML Screening  │                        ║
║  │ - AML            │  │ - Case Mgmt      │                        ║
║  │ - LEI/vLEI       │  │ - Alerts         │                        ║
║  └──────────────────┘  └──────────────────┘                        ║
╚════════════════════════════════════════════════════════════════════╝
                              ↓
╔════════════════════════════════════════════════════════════════════╗
║                        INTEGRATION LAYER                           ║
╠════════════════════════════════════════════════════════════════════╣
║  External APIs  │ Payment Processors │ Accounting Systems         ║
║  - GLEIF (LEI)  │ - Stripe           │ - QuickBooks              ║
║  - AML Providers│ - Square           │ - Xero                    ║
║  - Registries   │ - PayPal           │ - Sage                    ║
║  - Government   │ - Adyen            │ - NetSuite                ║
╚════════════════════════════════════════════════════════════════════╝
                              ↓
╔════════════════════════════════════════════════════════════════════╗
║                      DATABASE LAYER (Base44)                      ║
╠════════════════════════════════════════════════════════════════════╣
║  Users │ Organizations │ Invoices │ Workflows │ AML Alerts        ║
║  Cases │ PaymentRecords│ Compliance Events    │ Audit Logs        ║
╚════════════════════════════════════════════════════════════════════╝
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Entity Relationships</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
Organization (1) ─── (N) User
    │
    ├── (1) ─── (N) Subscription
    │           │
    │           ├── (1) ─── (N) Invoice
    │           │           │
    │           │           └── (1) ─── (N) PaymentRecord
    │           │
    │           └── (1) ─── (N) UsageMetrics
    │
    ├── (1) ─── (N) Workflow
    │           │
    │           ├── (1) ─── (N) AMLAlert
    │           │
    │           └── (1) ─── (N) AuditLog
    │
    ├── (1) ─── (N) OnboardingApplication
    │
    ├── (1) ─── (N) Case
    │           │
    │           └── (1) ─── (N) CaseNote
    │
    └── (1) ─── (1) BillingSettings
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Flow Diagram</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
User Submits Application
         ↓
   OnboardingApplication Entity Created
         ↓
   System Triggers Workflows
     ↙        ↓        ↘
   KYB      AML     Document Verification
    ↓        ↓            ↓
  Result → Alert → Case Created (if needed)
    ↓        ↓            ↓
   Store    Store       Track
    ↓        ↓            ↓
  Audit Log  Audit Log  Audit Log
    ↓        ↓            ↓
  ← ─ ─ ─ ─ ─ Update Dashboard ─ ─ ─ ─ ─
         ↓
   Generate Invoice (if approved)
         ↓
   Issue LEI/vLEI Credentials
         ↓
   Update Compliance Score
    `}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard & Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Performance Indicators (KPIs)</h3>
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-3 text-left">Metric</th>
                        <th className="border p-3 text-left">Description</th>
                        <th className="border p-3 text-left">Calculation</th>
                        <th className="border p-3 text-left">Update Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Total Revenue</td>
                        <td className="border p-3">All revenue collected this period</td>
                        <td className="border p-3 font-mono text-xs">SUM(invoices WHERE status='paid')</td>
                        <td className="border p-3">Real-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Pending Amount</td>
                        <td className="border p-3">Outstanding payments</td>
                        <td className="border p-3 font-mono text-xs">SUM(invoices WHERE status IN ('issued', 'overdue'))</td>
                        <td className="border p-3">Real-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Active Subscriptions</td>
                        <td className="border p-3">Count of active customer subscriptions</td>
                        <td className="border p-3 font-mono text-xs">COUNT(subscriptions WHERE status='active')</td>
                        <td className="border p-3">Real-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Compliance Score</td>
                        <td className="border p-3">Percentage of orgs with completed workflows</td>
                        <td className="border p-3 font-mono text-xs">(completed_workflows / total_workflows) × 100</td>
                        <td className="border p-3">Real-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">AML Alerts</td>
                        <td className="border p-3">Critical compliance alerts requiring action</td>
                        <td className="border p-3 font-mono text-xs">COUNT(alerts WHERE status='new' OR 'under_review')</td>
                        <td className="border p-3">Real-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Avg Processing Time</td>
                        <td className="border p-3">Average time to complete workflows</td>
                        <td className="border p-3 font-mono text-xs">AVG(completed_date - initiated_date)</td>
                        <td className="border p-3">Daily</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Dashboard Workflow</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
Admin Accesses Dashboard
         ↓
System Fetches Data (Real-time queries)
         ├── Invoice.filter({}) → Total Revenue
         ├── Subscription.list() → Active Plans
         ├── Workflow.filter({status:'completed'}) → Compliance Score
         ├── AMLAlert.filter({severity:'critical'}) → Critical Alerts
         └── Organization.list() → Total Organizations
         ↓
Display KPI Cards with Visual Indicators
         ├── Green (Positive) ✓
         ├── Orange (Caution) ⚠
         └── Red (Critical) ✗
         ↓
User Can Drill Into Details
         └── Click on card → View detailed breakdown
    `}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing System Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing Cycle Workflow</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
Month Start (Day 1)
         ↓
Calculate Subscription Base Fee
         ├── Lookup: subscription.tier → BillingPlan
         ├── Lookup: billing_cycle → monthly/quarterly/annual
         └── Apply discounts if applicable
         ↓
Track Usage Metrics Throughout Month
         ├── KYB verifications: workflow events
         ├── AML screenings: workflow events
         ├── LEI issuances: workflow events
         ├── API calls: system logs
         └── Store in UsageMetrics entity
         ↓
Day before month end
         └── Calculate usage overage charges
             └── (usage - included_limit) × overage_price_per_call
         ↓
Month End (Day 30/31)
         ├── Combine:
         │   ├── Base subscription fee
         │   ├── Usage overage charges
         │   └── Add-on charges
         ↓
Generate Invoice
         ├── Create Invoice record
         ├── Set status = 'draft'
         ├── Line items array
         ├── Calculate subtotal
         ├── Apply tax based on country
         └── Set total_amount
         ↓
Issue Invoice (status = 'issued')
         ├── Set due_date = today + payment_terms_days
         ├── Increment invoice_next_number
         └── Store export data
         ↓
Send via Email (Auto if enabled)
         ├── Render PDF
         ├── Send to organization email
         └── Status = 'sent'
         ↓
Payment Due Date Approaches
         ├── Day -3: Send reminder
         ├── Day 0: Mark as 'overdue' if not paid
         └── Day +30: Escalate to collections
         ↓
Payment Received
         ├── Create PaymentRecord
         ├── Update Invoice status = 'paid'
         ├── Mark as reconciled
         └── Update financial reports
    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Subscription Plans Matrix</h3>
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
                        <td className="border p-3 font-semibold">API Call Limit</td>
                        <td className="border p-3 text-center">10,000/mo</td>
                        <td className="border p-3 text-center">50,000/mo</td>
                        <td className="border p-3 text-center">Unlimited</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Overage Price per Call</td>
                        <td className="border p-3 text-center">$0.01</td>
                        <td className="border p-3 text-center">$0.005</td>
                        <td className="border p-3 text-center">Negotiated</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">KYB Verification</td>
                        <td className="border p-3 text-center">✓</td>
                        <td className="border p-3 text-center">✓</td>
                        <td className="border p-3 text-center">✓</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">AML Screening</td>
                        <td className="border p-3 text-center">Basic</td>
                        <td className="border p-3 text-center">Full</td>
                        <td className="border p-3 text-center">Full</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">LEI Issuance</td>
                        <td className="border p-3 text-center">✗</td>
                        <td className="border p-3 text-center">✓</td>
                        <td className="border p-3 text-center">✓</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">vLEI Credentials</td>
                        <td className="border p-3 text-center">✗</td>
                        <td className="border p-3 text-center">✓</td>
                        <td className="border p-3 text-center">✓</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Support Level</td>
                        <td className="border p-3 text-center">Email</td>
                        <td className="border p-3 text-center">Email + Chat</td>
                        <td className="border p-3 text-center">Phone + Dedicated</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">SLA Guarantee</td>
                        <td className="border p-3 text-center">99.5%</td>
                        <td className="border p-3 text-center">99.9%</td>
                        <td className="border p-3 text-center">99.99%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Invoice Lifecycle State Machine</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
                    ┌─────────┐
                    │ Draft   │ (Initial state, not sent to customer)
                    └────┬────┘
                         │ (admin clicks "issue")
                         ↓
                    ┌─────────────┐
                    │ Issued      │ (Ready to send, set due date)
                    └────┬────────┘
                         │ (admin clicks "send email")
                         ↓
                    ┌─────────────┐
                    │ Sent        │ (Email delivered to customer)
                    └────┬────────┘
                         │ (customer opens email)
                         ↓
                    ┌─────────────┐
                    │ Viewed      │ (Customer viewed invoice)
                    └────┬────────┘
                         │ (payment received AND amount matches)
                         ↓
                    ┌─────────────┐
                    │ Paid ✓      │ (FINAL: Payment reconciled)
                    └─────────────┘

                    ALTERNATIVE FLOWS:
                    ┌──────────────┐
                    │ Any Status   │
                    └──────┬───────┘
                           │ (admin clicks "cancel")
                           ↓
                    ┌──────────────┐
                    │ Cancelled    │ (FINAL: Void invoice)
                    └──────────────┘

                    ┌──────────────┐
                    │ Issued/Sent  │
                    │ /Viewed      │
                    └──────┬───────┘
                           │ (due_date passed)
                           ↓
                    ┌──────────────┐
                    │ Overdue ⚠    │ (Payment past due)
                    └──────┬───────┘
                           │ (payment received)
                           ↓
                    ┌──────────────┐
                    │ Paid ✓       │ (Late payment reconciled)
                    └──────────────┘
    `}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Workflow Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Workflow Execution Pipeline</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
User Initiates Onboarding Application
         ↓
System Creates OnboardingApplication Record
         ├── status = 'draft'
         ├── Store: legal_name, address, registry_country
         └── Store: entity_legal_form, unique_business_id
         ↓
Admin Reviews Application
         └── Clicks "Submit for Verification"
         ↓
WORKFLOW PIPELINE EXECUTION
         ├─→ [Workflow 1: KYB]
         │   ├── Verify against business registry
         │   ├── Check incorporation date
         │   ├── Validate registry_country + unique_business_id
         │   ├── Create AuditLog entry
         │   └── Store result in Workflow record
         │
         ├─→ [Workflow 2: AML Screening]
         │   ├── Screen company name against OFAC, UN, EU lists
         │   ├── Screen beneficial owners (if available)
         │   ├── Check PEP databases
         │   ├── If HIT → Create AMLAlert (severity level)
         │   ├── Create AuditLog entry
         │   └── Store result in Workflow record
         │
         └─→ [Workflow 3: Document Verification]
             ├── Validate uploaded documents
             ├── Check signatures if required
             ├── Create AuditLog entry
             └── Store result in Workflow record
         ↓
Aggregate Results
         ├── All workflows passed? → Status = 'approved'
         ├── Any alerts? → Create Case for investigation
         └── Failed workflow? → Status = 'rejected'
         ↓
IF APPROVED:
         ├─→ Generate LEI (via GLEIF integration)
         │   └── Create vLEI credentials (cryptographically signed)
         │
         ├─→ Create Invoice for this service
         │   └── Add line item: "LEI Issuance: $X"
         │
         └─→ Update OnboardingApplication.status = 'approved'
             ├── Store: generated_lei
             ├── Store: generated_vlei
             └── Store: lei_issued_date
         ↓
IF ALERTS:
         ├─→ Create Case automatically
         │   ├── case_type = 'aml_alert'
         │   ├── priority = alert.severity
         │   └── status = 'new'
         │
         ├─→ Assign to compliance team
         │   └── Notify via email
         │
         └─→ Await resolution
             ├── Admin reviews details
             ├── Add notes to case
             └── Click "Resolve" → Re-enable workflows
         ↓
AUDIT TRAIL COMPLETE
         └── Every step logged with:
             ├── timestamp
             ├── actor (system or admin)
             ├── action (workflow_started, result_stored, etc.)
             └── details (what changed)
    `)</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">AML Alert Management</h3>
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-3 text-left">Alert Type</th>
                        <th className="border p-3 text-left">Severity</th>
                        <th className="border p-3 text-left">Action</th>
                        <th className="border p-3 text-left">Resolution Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-red-50">
                        <td className="border p-3 font-semibold">Sanction Hit</td>
                        <td className="border p-3"><Badge variant="destructive">CRITICAL</Badge></td>
                        <td className="border p-3">Immediately block all transactions, escalate</td>
                        <td className="border p-3">< 24 hours</td>
                      </tr>
                      <tr className="hover:bg-orange-50">
                        <td className="border p-3 font-semibold">PEP Match</td>
                        <td className="border p-3"><Badge className="bg-orange-100 text-orange-800">HIGH</Badge></td>
                        <td className="border p-3">Create case, review identity, determine if same person</td>
                        <td className="border p-3">2-3 days</td>
                      </tr>
                      <tr className="hover:bg-yellow-50">
                        <td className="border p-3 font-semibold">Adverse Media</td>
                        <td className="border p-3"><Badge className="bg-yellow-100 text-yellow-800">MEDIUM</Badge></td>
                        <td className="border p-3">Review news article, verify relevance and currency</td>
                        <td className="border p-3">3-5 days</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border p-3 font-semibold">High Risk Jurisdiction</td>
                        <td className="border p-3"><Badge className="bg-blue-100 text-blue-800">LOW</Badge></td>
                        <td className="border p-3">Flag for review, apply enhanced due diligence</td>
                        <td className="border p-3">5-7 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Case Management Workflow</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
Alert Triggered
         ↓
Auto-Create Case (if critical) OR Manual Creation
         ├── case_number = AUTO (e.g., CASE-20260125-001)
         ├── type = alert_type
         ├── priority = alert.severity
         ├── status = 'new'
         └── related_entity = Organization/User
         ↓
ASSIGN & INVESTIGATE
         ├── Assign to compliance officer (assigned_to)
         ├── Send notification email
         ├── Officer reviews application data
         └── Officer reviews alert details
         ↓
ADD NOTES & EVIDENCE
         ├── Officer adds CaseNote entries
         ├── Each note is timestamped + authored
         ├── Notes can include file attachments
         └── Internal notes only (not visible to customer)
         ↓
MAKE DETERMINATION
         ├── False Positive?
         │   └── Set: resolution_action = 'approved'
         │       └── Resume customer workflows
         │
         ├── Confirmed Risk?
         │   └── Set: resolution_action = 'rejected'
         │       └── Block account, notify customer
         │
         └── Need More Info?
             └── Set: status = 'pending_info'
                 └── Send message to customer
         ↓
RESOLVE
         ├── Set status = 'resolved'
         ├── Record: resolved_by (who), resolved_at (when)
         ├── Calculate: time_to_resolve_hours
         └── Archive case
         ↓
UPDATE SLA
         └── Track if resolution was within SLA
             ├── Critical: < 2 hours
             ├── High: < 1 day
             ├── Medium: < 3 days
             └── Low: < 5 days
    `)</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Download Options */}
        <Card className="mt-8 bg-blue-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Export Documentation</h3>
                <p className="text-sm text-gray-600">Download comprehensive guides in multiple formats</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDocumentationDetailed;