import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Clock, AlertCircle, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">User Documentation</h1>
          <p className="text-lg text-gray-600">Complete guide for using the Trust Anchor Service platform</p>
          <div className="mt-4 flex gap-2">
            <Badge variant="default">User Guide</Badge>
            <Badge variant="secondary">Getting Started</Badge>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8 border-l-4 border-l-green-600 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                <div>
                  <p className="font-semibold">Sign Up or Login</p>
                  <p className="text-sm text-gray-600">Create your account or access existing credentials</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                <div>
                  <p className="font-semibold">Complete Business Onboarding</p>
                  <p className="text-sm text-gray-600">Submit your company details and registry information</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                <div>
                  <p className="font-semibold">Launch Verification Workflows</p>
                  <p className="text-sm text-gray-600">Initiate KYB, AML, and credential verification processes</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">4</div>
                <div>
                  <p className="font-semibold">Receive Your LEI/vLEI</p>
                  <p className="text-sm text-gray-600">Upon approval, receive your Legal Entity Identifier credentials</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Documentation Tabs */}
        <Tabs defaultValue="onboarding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Onboarding Tab */}
          <TabsContent value="onboarding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Onboarding Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Onboarding Phases</h3>
                  <div className="space-y-3">
                    <div className="p-4 border-l-4 border-blue-600 bg-blue-50">
                      <h4 className="font-semibold mb-2">Phase 1: Company Information</h4>
                      <p className="text-sm text-gray-700">Provide legal name, website, contact details, and business entity type</p>
                      <p className="text-xs text-gray-600 mt-2">📋 Time: 5-10 minutes</p>
                    </div>
                    <div className="p-4 border-l-4 border-purple-600 bg-purple-50">
                      <h4 className="font-semibold mb-2">Phase 2: Address & Registry Information</h4>
                      <p className="text-sm text-gray-700">Enter legal address, headquarters location, and business registry details (your country's company registration number)</p>
                      <p className="text-xs text-gray-600 mt-2">📋 Time: 10-15 minutes</p>
                    </div>
                    <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                      <h4 className="font-semibold mb-2">Phase 3: Representatives</h4>
                      <p className="text-sm text-gray-700">Name and contact details of legal representative and primary contact person</p>
                      <p className="text-xs text-gray-600 mt-2">📋 Time: 5 minutes</p>
                    </div>
                    <div className="p-4 border-l-4 border-green-600 bg-green-50">
                      <h4 className="font-semibold mb-2">Phase 4: Document Upload</h4>
                      <p className="text-sm text-gray-700">Upload business registration certificate, incorporation documents, or registry proof</p>
                      <p className="text-xs text-gray-600 mt-2">📋 Time: 5-10 minutes</p>
                    </div>
                    <div className="p-4 border-l-4 border-red-600 bg-red-50">
                      <h4 className="font-semibold mb-2">Phase 5: Review & Submission</h4>
                      <p className="text-sm text-gray-700">Review all information and submit for verification</p>
                      <p className="text-xs text-gray-600 mt-2">📋 Time: 2-3 minutes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Required Documents</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Document Type</th>
                        <th className="p-2 text-left">Format</th>
                        <th className="p-2 text-left">Why Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2">Business Registration Certificate</td>
                        <td className="p-2">PDF/JPG</td>
                        <td className="p-2">Verify legal entity status</td>
                      </tr>
                      <tr>
                        <td className="p-2">Articles of Incorporation</td>
                        <td className="p-2">PDF</td>
                        <td className="p-2">Confirm entity structure</td>
                      </tr>
                      <tr>
                        <td className="p-2">Proof of Address</td>
                        <td className="p-2">PDF</td>
                        <td className="p-2">Verify headquarters location</td>
                      </tr>
                      <tr>
                        <td className="p-2">Tax Registration (optional)</td>
                        <td className="p-2">PDF</td>
                        <td className="p-2">Enhanced verification</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Available Workflows</h3>
                  <div className="space-y-3">
                    <div className="p-4 border-l-4 border-blue-600 bg-white border rounded-lg">
                      <h4 className="font-semibold mb-2">🏢 KYB (Know Your Business)</h4>
                      <p className="text-sm text-gray-700 mb-2">Comprehensive verification of your company's identity and legitimacy</p>
                      <p className="text-xs text-gray-600"><strong>Status:</strong> <Badge className="bg-blue-100 text-blue-800">Active</Badge></p>
                    </div>
                    <div className="p-4 border-l-4 border-red-600 bg-white border rounded-lg">
                      <h4 className="font-semibold mb-2">🚨 AML Screening</h4>
                      <p className="text-sm text-gray-700 mb-2">Screen against international sanction lists and PEP databases</p>
                      <p className="text-xs text-gray-600"><strong>Status:</strong> <Badge className="bg-red-100 text-red-800">Active</Badge></p>
                    </div>
                    <div className="p-4 border-l-4 border-purple-600 bg-white border rounded-lg">
                      <h4 className="font-semibold mb-2">🎫 LEI Issuance</h4>
                      <p className="text-sm text-gray-700 mb-2">Receive your Legal Entity Identifier upon approval</p>
                      <p className="text-xs text-gray-600"><strong>Status:</strong> <Badge className="bg-purple-100 text-purple-800">Conditional</Badge></p>
                    </div>
                    <div className="p-4 border-l-4 border-green-600 bg-white border rounded-lg">
                      <h4 className="font-semibold mb-2">✅ vLEI Credentials</h4>
                      <p className="text-sm text-gray-700 mb-2">Issue verifiable credentials for blockchain and DeFi usage</p>
                      <p className="text-xs text-gray-600"><strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Post-Approval</Badge></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Workflow Statuses</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Icon</th>
                        <th className="p-2 text-left">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2">Pending</td>
                        <td className="p-2"><Clock className="h-4 w-4 text-gray-500" /></td>
                        <td className="p-2">Awaiting initiation by admin</td>
                      </tr>
                      <tr>
                        <td className="p-2">In Progress</td>
                        <td className="p-2"><Clock className="h-4 w-4 text-blue-500" /></td>
                        <td className="p-2">Currently being processed</td>
                      </tr>
                      <tr>
                        <td className="p-2">Completed</td>
                        <td className="p-2"><CheckCircle2 className="h-4 w-4 text-green-500" /></td>
                        <td className="p-2">Successfully finished</td>
                      </tr>
                      <tr>
                        <td className="p-2">Failed</td>
                        <td className="p-2"><AlertCircle className="h-4 w-4 text-red-500" /></td>
                        <td className="p-2">Errors encountered - review needed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>LEI & vLEI Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">What is an LEI?</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-sm text-gray-800">
                      A <strong>Legal Entity Identifier (LEI)</strong> is a unique 20-digit code that identifies a legal entity participating in financial transactions globally. It's maintained by the Global Legal Entity Identifier Foundation (GLEIF).
                    </p>
                    <p className="text-sm text-gray-800 mt-3">
                      <strong>Uses:</strong> Regulatory compliance, interbank transactions, securities trading, derivatives reporting, and blockchain verification.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">What is a vLEI?</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                    <p className="text-sm text-gray-800">
                      A <strong>verifiable LEI (vLEI)</strong> is a cryptographically signed credential that proves the LEI is authentic and provides additional identity information for digital interactions.
                    </p>
                    <p className="text-sm text-gray-800 mt-3">
                      <strong>Uses:</strong> Web3 interactions, DeFi protocols, self-sovereign identity, blockchain transactions, smart contract verification.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Your Credentials Dashboard</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Credential</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2">LEI Code</td>
                        <td className="p-2"><Badge className="bg-green-100 text-green-800">Issued</Badge></td>
                        <td className="p-2"><button className="text-blue-600 hover:underline text-xs">View</button></td>
                      </tr>
                      <tr>
                        <td className="p-2">vLEI Credential</td>
                        <td className="p-2"><Badge className="bg-green-100 text-green-800">Issued</Badge></td>
                        <td className="p-2"><button className="text-blue-600 hover:underline text-xs">Download</button></td>
                      </tr>
                      <tr>
                        <td className="p-2">OOR Certificate</td>
                        <td className="p-2"><Badge className="bg-green-100 text-green-800">Issued</Badge></td>
                        <td className="p-2"><button className="text-blue-600 hover:underline text-xs">Verify</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Compliance Score</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-600">
                    <div className="mb-3">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Your Compliance Score</span>
                        <span className="text-2xl font-bold text-green-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">Based on: Onboarding completion, workflow status, and AML screening results</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">AML Alerts & Cases</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 border-l-4 border-green-600 rounded">
                      <p className="font-semibold text-sm">✓ No Active Alerts</p>
                      <p className="text-xs text-gray-600">Your organization passed all AML screenings</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">What to Do If You Receive an Alert</h3>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
                      <span className="text-sm">Review the alert in your Compliance dashboard</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
                      <span className="text-sm">Understand the reason (sanction hit, PEP match, adverse media, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
                      <span className="text-sm">Contact support immediately to discuss resolution options</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
                      <span className="text-sm">Provide additional documentation if required</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">5</span>
                      <span className="text-sm">Await case resolution and reinitiation of workflows</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User FAQ */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: 'How long does onboarding take?',
                a: 'The onboarding process typically takes 30-45 minutes to complete all phases. Verification by our team may take 2-5 business days depending on document complexity.'
              },
              {
                q: 'What if I receive an AML alert?',
                a: 'Don\'t panic. Many alerts are false positives. Contact our support team immediately. We\'ll help you review and resolve the issue.'
              },
              {
                q: 'Can I use my LEI immediately after issuance?',
                a: 'Yes! Once issued, your LEI is immediately active and can be used for all regulatory and blockchain purposes.'
              },
              {
                q: 'What is the cost of LEI issuance?',
                a: 'LEI costs are included in your Business or Enterprise plan subscription. Individual LEI renewals are a small annual fee (~$100).'
              },
              {
                q: 'How do I download my vLEI credentials?',
                a: 'Once issued, navigate to your Credentials section and click "Download vLEI". It will be provided as a JSON file for blockchain integration.'
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

        {/* Support */}
        <Card className="mt-8 bg-green-50 border-2 border-green-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-3">
              Our support team is here to help with any questions about onboarding, workflows, or credentials.
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold">
              Contact Support
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDocumentation;