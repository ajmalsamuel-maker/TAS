import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserDocumentationDetailed = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Documentation</h1>
          <p className="text-lg text-gray-600">Comprehensive Guide to Using Trust Anchor Service</p>
          <div className="flex gap-2 mt-4">
            <Badge variant="default">v1.0</Badge>
            <Badge variant="secondary">User Guide</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
          </div>
        </div>

        <Tabs defaultValue="onboarding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Onboarding */}
          <TabsContent value="onboarding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Onboarding Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Onboarding Process Overview</h3>
                  <p className="text-gray-700 mb-4">
                    The onboarding process guides you through a 5-phase journey to register your business and obtain your Legal Entity Identifier (LEI). The entire process typically takes 30-45 minutes, with verification taking 2-5 business days.
                  </p>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{"User clicks \"Start Onboarding\""}
         ↓
PHASE 1: COMPANY INFORMATION (5-10 min)
         ├── Legal name (as registered)
         ├── Website URL
         ├── Business email
         ├── Entity type (LLC, Corporation, etc.)
         └── Brief description
         ↓
PHASE 2: REGISTRY INFORMATION (10-15 min)
         ├── Select country (where registered)
         ├── Enter unique business ID:
         │   ├── US: EIN (Employer ID Number)
         │   ├── UK: Company Registration Number
         │   ├── EU: VAT Number or national ID
         │   ├── Others: Specific to country
         ├── Select entity legal form
         └── Confirm creation date
         ↓
PHASE 3: REPRESENTATIVES (5 min)
         ├── Legal Representative
         │   ├── Full name
         │   ├── Email
         │   ├── Phone
         │   ├── Title/Position
         │
         └── Primary Contact Person
             ├── Name
             ├── Email
             ├── Phone
             ├── Department
             └── Position
         ↓
PHASE 4: ADDRESSES (5 min)
         ├── Registered Legal Address
         │   ├── Street
         │   ├── City
         │   ├── State/Province
         │   ├── Postal Code
         │   └── Country
         │
         └── Headquarters Address (if different)
             └── Same structure as legal
         ↓
PHASE 5: DOCUMENT UPLOAD (10-15 min)
         ├── Business Registration Certificate
         │   ├── Required format: PDF, JPG, PNG
         │   ├── File size: < 10MB
         │   └── Must be recent (< 1 year old)
         │
         ├── Articles of Incorporation
         │   ├── Format: PDF
         │   └── Shows ownership structure
         │
         ├── Proof of Address (utility bill or official letter)
         │   ├── Format: PDF, JPG
         │   └── Must show company name + address
         │
         └── Additional Documents (optional)
             ├── Tax registration certificate
             ├── Business license
             └── Any government-issued documents
         ↓
REVIEW & SUBMIT (2-3 min)
         ├── Review all entered information
         ├── Confirm documents are clear
         ├── Accept Terms & Conditions
         └── Click "Submit for Verification"
         ↓
APPLICATION SUBMITTED
         ├── Receive confirmation email
         ├── Application status = "submitted"
         └── Await admin verification (2-5 business days)
    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Field Requirements by Country</h3>
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-3 text-left">Country</th>
                        <th className="border p-3 text-left">Business ID Name</th>
                        <th className="border p-3 text-left">Format</th>
                        <th className="border p-3 text-left">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3">United States</td>
                        <td className="border p-3">EIN (Employer ID Number)</td>
                        <td className="border p-3">XX-XXXXXXX</td>
                        <td className="border p-3">12-3456789</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3">United Kingdom</td>
                        <td className="border p-3">Company Registration Number</td>
                        <td className="border p-3">8 digits</td>
                        <td className="border p-3">12345678</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3">Germany</td>
                        <td className="border p-3">HR Number (Handelsregister)</td>
                        <td className="border p-3">Variable</td>
                        <td className="border p-3">HRA 123456</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3">France</td>
                        <td className="border p-3">SIRET Number</td>
                        <td className="border p-3">14 digits</td>
                        <td className="border p-3">12345678901234</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3">EU (General)</td>
                        <td className="border p-3">VAT Number</td>
                        <td className="border p-3">Country Code + ID</td>
                        <td className="border p-3">DE123456789</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3">Canada</td>
                        <td className="border p-3">Business Number (BN)</td>
                        <td className="border p-3">9 digits + 2 characters</td>
                        <td className="border p-3">123456789RC0001</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Common Issues & Solutions</h3>
                  <div className="space-y-3">
                    <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                      <p className="font-semibold mb-2">❌ "Document rejected - unclear copy"</p>
                      <p className="text-sm text-gray-700">Make sure your scan is clear (150+ DPI). All text must be readable. Photos are acceptable if well-lit.</p>
                    </div>
                    <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                      <p className="font-semibold mb-2">❌ "Business ID not found"</p>
                      <p className="text-sm text-gray-700">Double-check the format for your country. Remove spaces and special characters unless required. Example: use "12-3456789" not "12 3456789".</p>
                    </div>
                    <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                      <p className="font-semibold mb-2">❌ "Verification failed - name mismatch"</p>
                      <p className="text-sm text-gray-700">The legal name must match EXACTLY with your business registry. Use the official registered name, not a trading name.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows */}
          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Workflow Execution Pipeline (User Perspective)</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
Application Submitted
         ↓
Admin Reviews & Approves
         ↓
AUTOMATIC WORKFLOW SEQUENCE BEGINS
         │
         ├─→ WORKFLOW 1: KYB (Know Your Business) (2-4 hours)
         │   ├── System checks your business against registries
         │   ├── Verifies:
         │   │   ├── Company exists and is active
         │   │   ├── Registered name matches
         │   │   ├── Business ID is valid
         │   │   ├── Creation/incorporation date
         │   │   ├── Current status (active/dissolved/suspended)
         │   │   └── Directors/owners if available
         │   ├── Status: ⏳ In Progress → ✓ Passed OR ✗ Failed
         │   │
         │   └── ✓ If Passed: Move to next workflow
         │       ✗ If Failed: Contact support for assistance
         │
         ├─→ WORKFLOW 2: AML Screening (2-4 hours)
         │   ├── Comprehensive compliance checks:
         │   │   ├── OFAC (US Sanctions List)
         │   │   ├── UN Security Council Lists
         │   │   ├── EU Sanctions Lists
         │   │   ├── Country-specific sanctions
         │   │   ├── PEP (Politically Exposed Person) Database
         │   │   └── Adverse Media Search
         │   │
         │   ├── Result Scenarios:
         │   │   ├── ✓ Clear (No matches): Proceed
         │   │   ├── ⚠ Alert (Potential match): Case created
         │   │   └── ✗ Blocked (Confirmed match): Account restricted
         │   │
         │   └── If Alert Created:
         │       ├── Our team investigates (2-3 days)
         │       ├── Determine if false positive or real risk
         │       ├── You may be asked for additional info
         │       └── Once resolved, workflows resume
         │
         └─→ WORKFLOW 3: Document Verification (1-2 hours)
             ├── Validate uploaded documents
             ├── Check: Quality, authenticity, current status
             ├── Verify: All required signatures present
             ├── Status: ✓ Verified OR ⚠ Needs Resubmission
             │
             └── ✓ All 3 Workflows Passed!
    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Understanding Workflow Statuses</h3>
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-3 text-left">Status</th>
                        <th className="border p-3 text-left">Icon</th>
                        <th className="border p-3 text-left">Meaning</th>
                        <th className="border p-3 text-left">Timeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">Pending</td>
                        <td className="border p-3">⏱️</td>
                        <td className="border p-3">Waiting to be initiated by admin</td>
                        <td className="border p-3">N/A</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border p-3 font-semibold">In Progress</td>
                        <td className="border p-3">⏳</td>
                        <td className="border p-3">Currently being processed by our system or team</td>
                        <td className="border p-3">2-4 hours</td>
                      </tr>
                      <tr className="hover:bg-green-50">
                        <td className="border p-3 font-semibold">Completed</td>
                        <td className="border p-3">✅</td>
                        <td className="border p-3">Successfully finished. Results available in dashboard</td>
                        <td className="border p-3">Varies</td>
                      </tr>
                      <tr className="hover:bg-orange-50">
                        <td className="border p-3 font-semibold">Alert</td>
                        <td className="border p-3">⚠️</td>
                        <td className="border p-3">Potential issue identified. Case created for review</td>
                        <td className="border p-3">2-5 days</td>
                      </tr>
                      <tr className="hover:bg-red-50">
                        <td className="border p-3 font-semibold">Failed</td>
                        <td className="border p-3">❌</td>
                        <td className="border p-3">Verification failed. Contact support</td>
                        <td className="border p-3">Immediate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credentials */}
          <TabsContent value="credentials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>LEI & vLEI Credentials Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">What is LEI (Legal Entity Identifier)?</h3>
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 space-y-3">
                    <p><strong>Definition:</strong> A unique 20-digit code that globally identifies your legal entity. Issued by authorized LEI issuers under the Global Legal Entity Identifier Foundation (GLEIF).</p>
                    <p><strong>Structure:</strong> XXXXXXXXXXXXXXXXXX (20 alphanumeric characters)</p>
                    <p><strong>Example:</strong> 5493001KJTIIGC8Y1R12</p>
                    <p><strong>Validity:</strong> 1 year (must be renewed annually, usually automatic)</p>
                    <p><strong>Cost:</strong> Included in Business/Enterprise subscription ($100/year renewal after first year)</p>
                    <p><strong>Uses:</strong></p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      <li>Regulatory reporting (EMIR, Dodd-Frank, etc.)</li>
                      <li>Banking and financial transactions</li>
                      <li>Securities trading</li>
                      <li>Derivatives reporting</li>
                      <li>Trade finance</li>
                      <li>Business identity verification</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">What is vLEI (Verifiable LEI)?</h3>
                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600 space-y-3">
                    <p><strong>Definition:</strong> A cryptographically signed credential that proves your LEI is authentic and provides additional identity information for digital interactions.</p>
                    <p><strong>Issuer:</strong> GLEIF-authorized vLEI Issuer (OOR - Official Organizational Role)</p>
                    <p><strong>Format:</strong> JSON Web Token (JWT) with cryptographic signatures</p>
                    <p><strong>Verification:</strong> Anyone can verify it's authentic by checking the digital signature</p>
                    <p><strong>Uses:</strong></p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      <li>Web3 and blockchain applications</li>
                      <li>DeFi (Decentralized Finance) protocols</li>
                      <li>Smart contract verification</li>
                      <li>Self-sovereign identity systems</li>
                      <li>Regulated blockchain applications</li>
                      <li>Digital signatures</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Credentials Dashboard & Download</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
Your Credentials Page Layout:
┌─────────────────────────────────────────────────────┐
│ Your Credentials                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ [✓] LEI Code                              [View]  │
│     Legal Entity Identifier               [Copy] │
│     Status: Active                        [Share] │
│     Code: 5493001KJTIIGC8Y1R12                    │
│     Issued: 2026-01-20                            │
│     Expires: 2027-01-20                           │
│                                                     │
│ [✓] vLEI Credential                       [Download] │
│     Verifiable LEI (Cryptographically Signed)       │
│     Status: Active                        [View]     │
│     Format: JSON Web Token (JWT)          [Details]  │
│     Issued: 2026-01-20                             │
│     Uses: Web3, DeFi, Blockchain                   │
│                                                     │
│ [✓] OOR Certificate                       [Download] │
│     Official Organizational Role                    │
│     Issued: 2026-01-20                             │
│     Authority: GLEIF                               │
│                                                     │
│ [ℹ] Your Compliance Score                         │
│     92% - Excellent Standing                       │
│     All credentials valid and current              │
│                                                     │
└─────────────────────────────────────────────────────┘

Credential Download Files:
  • vlei_credential.json (for blockchain integration)
  • vlei_credential.pem (for certificate systems)
  • lei_registration.pdf (official document)
  • oor_certificate.pdf (organizational role proof)
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
                <CardTitle>Compliance Monitoring & Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">What is Your Compliance Score?</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-600">
                    <p className="mb-4">Your Compliance Score is calculated based on:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="font-bold text-green-600">35%</span>
                        <span>Onboarding Completion (all phases submitted)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-green-600">30%</span>
                        <span>Verification Workflows (KYB, AML, Documents)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-green-600">20%</span>
                        <span>AML Screening Results (no alerts or resolved)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-green-600">10%</span>
                        <span>Documentation Currency (updated within last year)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-green-600">5%</span>
                        <span>Active Credentials (valid LEI/vLEI)</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm">
                      <strong>Score Range:</strong> 0-100% <br/>
                      <strong>Good Standing:</strong> 80%+ <br/>
                      <strong>Excellent:</strong> 90%+
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">AML Alert Response Guide</h3>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-red-600 bg-red-50">
                      <h4 className="font-semibold mb-2">🚨 CRITICAL: Sanction Hit</h4>
                      <p className="text-sm mb-3">Your organization matches a government sanctions list</p>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>IMMEDIATELY contact our support team</li>
                        <li>Do NOT conduct any transactions</li>
                        <li>Prepare explanation/evidence that it's a false match</li>
                        <li>Example: "Our company has same name but different registry number"</li>
                        <li>Our compliance team reviews within 24 hours</li>
                      </ol>
                    </div>

                    <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                      <h4 className="font-semibold mb-2">⚠️ HIGH: PEP Match</h4>
                      <p className="text-sm mb-3">Company director/owner matches a PEP (Politically Exposed Person) database</p>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Contact our compliance team</li>
                        <li>Provide clarification: "This John Smith is not the PEP"</li>
                        <li>May require: ID documents, certificate of good conduct</li>
                        <li>Resolution typical: 2-3 business days</li>
                      </ol>
                    </div>

                    <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50">
                      <h4 className="font-semibold mb-2">⚠️ MEDIUM: Adverse Media</h4>
                      <p className="text-sm mb-3">Negative news article about your company</p>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Our team reviews the article</li>
                        <li>Determines relevance and currency</li>
                        <li>May contact you for explanation</li>
                        <li>Resolution typical: 3-5 business days</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Continuous Monitoring</h3>
                  <div className="bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`
After Approval & LEI Issuance:
         ↓
CONTINUOUS MONITORING ENABLED
         ├── Daily: Screen against new sanctions lists
         ├── Weekly: Check adverse media sources
         ├── Monthly: Verify compliance status
         └── Quarterly: Full re-screening
         ↓
IF NEW ALERT DETECTED:
         ├── Automatic notification sent to your email
         ├── Case created automatically
         ├── Your dashboard shows status immediately
         └── Compliance team reviews within 24 hours
         ↓
MONITORING DURATION:
         ├── While subscription is active: Continuous
         ├── After account closure: 3 years (legal requirement)
         └── Cost: Included in your subscription
    `)</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Download Options */}
        <Card className="mt-8 bg-green-50 border-2 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Export Your Documentation</h3>
                <p className="text-sm text-gray-600">Download comprehensive guides in multiple formats</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDocumentationDetailed;