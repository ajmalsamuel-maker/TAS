import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';

const UserPortalDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const MermaidDiagram = ({ chart }) => {
    const containerRef = React.useRef(null);
    const diagramId = React.useRef(Math.random().toString(36).substr(2, 9));

    useEffect(() => {
      const loadAndRender = async () => {
        if (!window.mermaid) {
          return;
        }
        
        try {
          window.mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'default',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true }
          });
          
          if (containerRef.current && chart) {
            const result = await window.mermaid.render(`diagram-${diagramId.current}`, chart);
            containerRef.current.innerHTML = result.svg;
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
              svg.style.maxWidth = '100%';
              svg.style.height = 'auto';
              svg.style.minHeight = '400px';
            }
          }
        } catch (err) {
          console.error('Mermaid error:', err);
        }
      };

      if (!window.mermaid) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.async = true;
        script.onload = loadAndRender;
        document.head.appendChild(script);
      } else {
        loadAndRender();
      }
    }, [chart]);

    return (
      <div className="flex justify-center my-8 bg-white p-8 rounded-lg border border-gray-200 overflow-x-auto">
        <div ref={containerRef} className="w-full" style={{ minHeight: '400px' }} />
      </div>
    );
  };

  const SectionHeader = ({ title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
    >
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {expandedSections[section] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">User Portal Documentation</h1>
          <h2 className="text-3xl text-gray-700 mb-4">Complete Guide to Compliance & Identity Verification</h2>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="default">User Guide</Badge>
            <Badge variant="secondary">Complete Reference</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
            <Badge className="bg-blue-100 text-blue-800">User Facing</Badge>
          </div>
          <p className="text-gray-600 mt-4">For: Business Users & Compliance Officers</p>
        </div>

        {/* Dashboard Overview */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-bold mb-4">Welcome to Your Compliance Hub</h3>
              <p className="mb-4 leading-relaxed">
                The User Portal is your centralized command center for managing business identity verification, compliance monitoring, and credential issuance. Once you've completed onboarding and your LEI has been issued, you'll have immediate access to a comprehensive dashboard that displays your compliance status, active workflows, and regulatory alerts.
              </p>
              <p className="mb-4 leading-relaxed">
                The dashboard is designed with a focus on clarity and actionability. Key metrics are prominently displayed, recent activities are visible at a glance, and any alerts or required actions are immediately apparent. The interface adapts to your role—compliance officers see detailed investigation workflows, while administrators see organizational metrics and billing information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Key Dashboard Sections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-2">✅ Compliance Status</p>
                  <p className="text-sm">Real-time status of your verification, AML screening, and credential status</p>
                </div>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-2">📋 Active Workflows</p>
                  <p className="text-sm">Track KYB verification, AML screening, and document validation progress</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <p className="font-bold mb-2">⚠️ Alerts & Actions</p>
                  <p className="text-sm">Critical alerts requiring immediate attention and action items</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <p className="font-bold mb-2">🔐 Credentials & LEI</p>
                  <p className="text-sm">Your issued LEI, vLEI credentials, and verification status</p>
                </div>
              </div>
            </div>

            <MermaidDiagram 
              chart={`graph TB
                A["User Login<br/>Email & Password"]
                B["Dashboard<br/>Compliance Overview"]
                C["Workflows"]
                D["Credentials"]
                E["Compliance"]
                F["Settings"]

                A --> B
                B --> C
                B --> D
                B --> E
                B --> F

                style A fill:#e3f2fd
                style B fill:#f3e5f5
                style C fill:#fff3e0
                style D fill:#e8f5e9
                style E fill:#fce4ec
                style F fill:#f1f8e9`}
            />
          </CardContent>
        </Card>

        {/* Workflows */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Verification Workflows" section="workflows" />
          </CardHeader>
          {expandedSections.workflows && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Understanding Your Verification Journey</h3>
                <p className="mb-6 leading-relaxed">
                  Your verification workflow is automated, transparent, and designed to complete in 2-5 hours for most businesses. The process consists of three primary stages: Know Your Business (KYB) verification, Anti-Money Laundering (AML) screening, and continuous monitoring. Each stage feeds into the next, with automatic escalation to human review only when necessary.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Stage 1: KYB Verification</strong> validates that your business exists and is registered in the jurisdiction you claim. The system queries official business registries in 120+ countries, verifying incorporation date, entity status, beneficial ownership, and registered address. This stage typically completes within 30 minutes for publicly registered businesses.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Stage 2: AML Screening</strong> checks your business and beneficial owners against 300+ global sanctions lists, PEP (Politically Exposed Persons) databases, and adverse media sources. If matches are found, they are scored by confidence level. False positives (common for generic business names) are automatically resolved. High-confidence matches escalate to human investigation.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Stage 3: Continuous Monitoring</strong> tracks regulatory changes, sanctions list updates, and your compliance status over time. This ensures that if your business or beneficial owners become subject to sanctions after initial verification, you receive immediate notification and your access is restricted accordingly.
                </p>

                <MermaidDiagram 
                  chart={`graph LR
                    A["Workflow Initiated<br/>Business submitted"]
                    B["KYB Verification<br/>Registry checks<br/>30 mins typical"]
                    C["AML Screening<br/>Sanctions check<br/>15 mins typical"]
                    D["Document Review<br/>if required<br/>Manual process"]
                    E["LEI Issuance<br/>Credential generation"]
                    F["Monitoring<br/>Ongoing"]

                    A --> B
                    B --> C
                    C --> D
                    D --> E
                    E --> F

                    style A fill:#e3f2fd
                    style B fill:#fff3e0
                    style C fill:#fff3e0
                    style D fill:#fce4ec
                    style E fill:#d4edda
                    style F fill:#e0f2f1`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Workflow Status Definitions</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Status</th>
                      <th className="border p-3 text-left">Meaning</th>
                      <th className="border p-3 text-left">What You Can Do</th>
                      <th className="border p-3 text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold text-blue-600">Pending</td>
                      <td className="border p-3">Awaiting KYB data processing</td>
                      <td className="border p-3">Monitor dashboard, check status updates</td>
                      <td className="border p-3 text-center">0-30 min</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-3 font-semibold text-yellow-600">In Progress</td>
                      <td className="border p-3">Active verification processing</td>
                      <td className="border p-3">View detailed logs, submit additional docs if requested</td>
                      <td className="border p-3 text-center">30 min-4 hrs</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="border p-3 font-semibold text-purple-600">Needs Review</td>
                      <td className="border p-3">Manual review required</td>
                      <td className="border p-3">Provide additional documentation, answer questions</td>
                      <td className="border p-3 text-center">1-3 days</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3 font-semibold text-green-600">Completed</td>
                      <td className="border p-3">Verification successful</td>
                      <td className="border p-3">Access credentials, enable API access</td>
                      <td className="border p-3 text-center">—</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="border p-3 font-semibold text-red-600">Failed</td>
                      <td className="border p-3">Could not verify business</td>
                      <td className="border p-3">Resubmit with corrected information</td>
                      <td className="border p-3 text-center">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Credentials & LEI */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Credentials & LEI Management" section="credentials" />
          </CardHeader>
          {expandedSections.credentials && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Your Digital Identity</h3>
                <p className="mb-6 leading-relaxed">
                  Upon successful verification, you receive two primary credentials: a Legal Entity Identifier (LEI) and a verifiable LEI (vLEI) credential. The LEI is a global, unique identifier for your business registered with GLEIF (Global Legal Entity Identifier Foundation). The vLEI is a cryptographically signed digital credential that proves your identity on Web3 and blockchain systems.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Legal Entity Identifier (LEI):</strong> A 20-character alphanumeric code assigned to your business by GLEIF. This identifier is recognized globally by financial institutions, regulators, and trading venues. Your LEI is valid for one year and must be renewed annually. We automate this renewal process—you'll receive notifications 60 days before expiration.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Verifiable LEI Credential (vLEI):</strong> A Web3-ready digital credential that combines your LEI with cryptographic proof of your identity. This credential can be presented to counterparties, used in DeFi protocols, or integrated into smart contracts. vLEI credentials are issued as W3C Verifiable Credentials and can be stored in blockchain wallets or credential management systems.
                </p>

                <MermaidDiagram 
                  chart={`graph TB
                    A["Business Verified<br/>KYB Passed<br/>AML Clear"]
                    B["LEI Registration<br/>Submitted to GLEIF<br/>1-3 days"]
                    C["LEI Issued<br/>Global identifier<br/>Valid 1 year"]
                    D["vLEI Credential<br/>Cryptographic signing<br/>Instant"]
                    E["Credential Issued<br/>W3C Format<br/>Blockchain Ready"]
                    F["Use Across<br/>Financial systems<br/>DeFi protocols<br/>Smart contracts"]

                    A --> B
                    B --> C
                    C --> D
                    D --> E
                    E --> F

                    style A fill:#e3f2fd
                    style B fill:#fff3e0
                    style C fill:#d4edda
                    style D fill:#e8f5e9
                    style E fill:#fce4ec
                    style F fill:#f0e4ff`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Credential Details & Usage</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Credential Type</th>
                      <th className="border p-3 text-left">Format</th>
                      <th className="border p-3 text-left">Validity</th>
                      <th className="border p-3 text-left">Use Cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">LEI</td>
                      <td className="border p-3">20-character code (e.g., 5493001KJTIIGC8Y1R12)</td>
                      <td className="border p-3">1 year (auto-renewable)</td>
                      <td className="border p-3">Bank accounts, regulatory reporting, trading</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3 font-semibold">vLEI</td>
                      <td className="border p-3">W3C Verifiable Credential (JWT/LD-JSON)</td>
                      <td className="border p-3">Issuer defined (typically 2 years)</td>
                      <td className="border p-3">DeFi, NFT minting, smart contracts, identity verification</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="border p-3 font-semibold">Certificate</td>
                      <td className="border p-3">PDF (downloadable from dashboard)</td>
                      <td className="border p-3">Same as underlying credential</td>
                      <td className="border p-3">Display on website, submit to partners</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Compliance & Monitoring */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Compliance & Monitoring" section="compliance" />
          </CardHeader>
          {expandedSections.compliance && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Continuous Compliance Monitoring</h3>
                <p className="mb-6 leading-relaxed">
                  Verification doesn't end after initial approval. We continuously monitor your business and beneficial owners against updated sanctions lists, PEP databases, and regulatory changes. This ensures that if circumstances change, you're immediately notified and appropriate actions are taken.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Automated Monitoring:</strong> Our systems check your business against updated watchlists daily. If a match is detected, you'll receive immediate notification in the portal and via email. The alert includes the source (sanctions list, PEP database, news), confidence score, and recommended actions. Most alerts are false positives due to name similarities and are automatically resolved.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Manual Investigation:</strong> For high-confidence alerts, our compliance team conducts manual investigation to determine whether the match represents actual regulatory risk. You may be asked to provide additional documentation to prove your business is not subject to sanctions. This investigation typically takes 1-3 business days.
                </p>

                <MermaidDiagram 
                  chart={`graph LR
                    A["Daily Monitoring<br/>Update watchlists"]
                    B{"Match<br/>Found?"}
                    C["No Action<br/>Continue monitoring"]
                    D["Alert Created<br/>Notify user"]
                    E{"Confidence<br/>Score?"}
                    F["Auto Resolved<br/>Low confidence<br/>False positive"]
                    G["Manual Review<br/>Compliance team<br/>investigates"]
                    H["Decision"]
                    I["Approved<br/>Continue business"]
                    J["Escalated<br/>Regulatory<br/>notification"]

                    A --> B
                    B -->|No| C
                    B -->|Yes| D
                    D --> E
                    E -->|Low| F
                    E -->|High| G
                    G --> H
                    H -->|Safe| I
                    H -->|Risk| J

                    style A fill:#e3f2fd
                    style B fill:#fff3e0
                    style C fill:#d4edda
                    style D fill:#fce4ec
                    style E fill:#fff3e0
                    style F fill:#d4edda
                    style G fill:#fce4ec
                    style I fill:#d4edda
                    style J fill:#f8d7da`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Understanding Alerts</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Alert Type</th>
                      <th className="border p-3 text-left">Severity</th>
                      <th className="border p-3 text-left">What It Means</th>
                      <th className="border p-3 text-center">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-red-50">
                      <td className="border p-3 font-semibold">Sanctions Hit</td>
                      <td className="border p-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded">CRITICAL</span></td>
                      <td className="border p-3">Business matched OFAC or EU sanctions list</td>
                      <td className="border p-3 text-center">Immediate contact required</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="border p-3 font-semibold">PEP Match</td>
                      <td className="border p-3"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">HIGH</span></td>
                      <td className="border p-3">Beneficial owner is politically exposed person</td>
                      <td className="border p-3 text-center">Provide documentation</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-3 font-semibold">Adverse Media</td>
                      <td className="border p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">MEDIUM</span></td>
                      <td className="border p-3">News article mentions business in negative context</td>
                      <td className="border p-3 text-center">Review and respond</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">Registry Change</td>
                      <td className="border p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">LOW</span></td>
                      <td className="border p-3">Business registry information was updated</td>
                      <td className="border p-3 text-center">Review notice</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Settings & Administration */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Settings & Administration" section="settings" />
          </CardHeader>
          {expandedSections.settings && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">User Management & Permissions</h3>
                <p className="mb-6 leading-relaxed">
                  Your organization can have multiple users with different permission levels. Administrators manage users, billing, and integrations. Compliance officers review alerts and investigations. API users access verification services programmatically. Each role has specific permissions that cannot be exceeded—a compliance officer cannot access billing, and an API user cannot perform administrative functions.
                </p>

                <table className="w-full text-sm border-collapse mt-6">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Role</th>
                      <th className="border p-3 text-left">Permissions</th>
                      <th className="border p-3 text-left">Can Invite</th>
                      <th className="border p-3 text-left">Typical User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-purple-50">
                      <td className="border p-3 font-semibold">Organization Admin</td>
                      <td className="border p-3">All permissions, user management, billing, integrations</td>
                      <td className="border p-3">✅ Any role</td>
                      <td className="border p-3">Owner, Finance Manager</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">Compliance Officer</td>
                      <td className="border p-3">Alert investigation, case management, reporting</td>
                      <td className="border p-3">❌ No</td>
                      <td className="border p-3">Compliance Manager, Investigator</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3 font-semibold">API User</td>
                      <td className="border p-3">API access, webhook management, read compliance data</td>
                      <td className="border p-3">❌ No</td>
                      <td className="border p-3">Developer, Integration Engineer</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">Viewer</td>
                      <td className="border p-3">Read-only access to dashboard and reports</td>
                      <td className="border p-3">❌ No</td>
                      <td className="border p-3">Auditor, Stakeholder</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">API Integration & Webhooks</h3>
                <p className="mb-4 leading-relaxed">
                  For organizations that need to integrate verification into their own systems, we provide REST API access and webhooks. API users can programmatically submit verification requests, check status, retrieve credentials, and subscribe to real-time updates via webhooks.
                </p>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-2">Popular API Use Cases:</p>
                  <ul className="text-sm space-y-2 ml-4">
                    <li>• Auto-verify customer KYB during onboarding flows</li>
                    <li>• Retrieve LEI and vLEI credentials for customer profiles</li>
                    <li>• Receive real-time alerts via webhooks when compliance status changes</li>
                    <li>• Export verification data to your own database</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Footer */}
        <Card className="bg-gray-900 text-white">
          <CardContent className="pt-6">
            <div className="text-sm space-y-3">
              <p><strong>Document Version:</strong> 1.0</p>
              <p><strong>Last Updated:</strong> January 25, 2026</p>
              <p><strong>Classification:</strong> User Facing</p>
              <p><strong>Target Audience:</strong> Business Users & Compliance Officers</p>
              <p className="text-xs mt-4 border-t border-gray-700 pt-4">© 2026 FTS.Money & Certizen Technologies. User documentation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserPortalDocumentation;