import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Shield, Lock, Building2, FileCheck, Globe, Activity } from 'lucide-react';

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
        className="w-full flex items-center justify-between p-4 bg-[#0066B3]/10 hover:bg-[#0066B3]/20 rounded-lg transition-colors"
      >
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {expandedSections[section] ? <ChevronDown className="h-5 w-5 text-[#0066B3]" /> : <ChevronRight className="h-5 w-5 text-[#0066B3]" />}
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
                <div className="bg-[#0066B3]/5 p-4 rounded border-l-4 border-[#0066B3]">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-[#0066B3]" />
                    <p className="font-bold">Compliance Status</p>
                  </div>
                  <p className="text-sm">Real-time status of your verification, AML screening, and credential status</p>
                </div>
                <div className="bg-[#0066B3]/5 p-4 rounded border-l-4 border-[#0066B3]">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-[#0066B3]" />
                    <p className="font-bold">Active Workflows</p>
                  </div>
                  <p className="text-sm">Track KYB verification, AML screening, and document validation progress</p>
                </div>
                <div className="bg-[#0066B3]/5 p-4 rounded border-l-4 border-[#0066B3]">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-5 w-5 text-[#0066B3]" />
                    <p className="font-bold">Alerts & Actions</p>
                  </div>
                  <p className="text-sm">Critical alerts requiring immediate attention and action items</p>
                </div>
                <div className="bg-[#0066B3]/5 p-4 rounded border-l-4 border-[#0066B3]">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-5 w-5 text-[#0066B3]" />
                    <p className="font-bold">Credentials & LEI</p>
                  </div>
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

                style A fill:#e3f2fd,stroke:#0066B3
                style B fill:#e3f2fd,stroke:#0066B3
                style C fill:#e3f2fd,stroke:#0066B3
                style D fill:#e3f2fd,stroke:#0066B3
                style E fill:#e3f2fd,stroke:#0066B3
                style F fill:#e3f2fd,stroke:#0066B3`}
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
                     A["Submit<br/>Business Data"]
                     B["KYB Check<br/>Registry lookup<br/>30 min"]
                     C["AML Screen<br/>Sanctions scan<br/>15 min"]
                     D{"Manual<br/>Review?"}
                     E["Investigation<br/>1-3 days"]
                     F["Approved"]
                     G["LEI Issued"]
                     H["vLEI Created"]
                     I["24/7 Monitoring"]

                     A --> B
                     B --> C
                     C --> D
                     D -->|No| F
                     D -->|Yes| E
                     E --> F
                     F --> G
                     G --> H
                     H --> I

                     style A fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style B fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style C fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style D fill:#fff3e0,stroke:#0066B3,stroke-width:2px
                     style E fill:#fff3e0,stroke:#0066B3,stroke-width:2px
                     style F fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style G fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style H fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style I fill:#e3f2fd,stroke:#0066B3,stroke-width:2px`}
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
                       <th className="border p-3 text-center">Next Step</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="hover:bg-blue-50">
                       <td className="border p-3 font-semibold text-blue-600">Submitted</td>
                       <td className="border p-3">Application received and queued for processing</td>
                       <td className="border p-3">Monitor dashboard, check email for updates</td>
                       <td className="border p-3 text-center">0-5 min</td>
                       <td className="border p-3 text-center">→ KYB Check</td>
                     </tr>
                     <tr className="hover:bg-yellow-50">
                       <td className="border p-3 font-semibold text-yellow-600">In Progress</td>
                       <td className="border p-3">Active KYB/AML processing</td>
                       <td className="border p-3">View detailed activity logs, submit docs if requested</td>
                       <td className="border p-3 text-center">30 min-2 hrs</td>
                       <td className="border p-3 text-center">→ Review or Approved</td>
                     </tr>
                     <tr className="hover:bg-purple-50">
                       <td className="border p-3 font-semibold text-purple-600">Manual Review</td>
                       <td className="border p-3">High-confidence AML match or document verification</td>
                       <td className="border p-3">Provide additional documentation, respond to queries</td>
                       <td className="border p-3 text-center">1-3 days</td>
                       <td className="border p-3 text-center">→ Approved or Rejected</td>
                     </tr>
                     <tr className="hover:bg-green-50">
                       <td className="border p-3 font-semibold text-green-600">Approved</td>
                       <td className="border p-3">Verification complete, credentials ready</td>
                       <td className="border p-3">Download LEI, vLEI credentials, enable API access</td>
                       <td className="border p-3 text-center">—</td>
                       <td className="border p-3 text-center">→ Monitoring</td>
                     </tr>
                     <tr className="hover:bg-red-50">
                       <td className="border p-3 font-semibold text-red-600">Rejected</td>
                       <td className="border p-3">Could not verify business legitimacy</td>
                       <td className="border p-3">Resubmit with corrected/new information</td>
                       <td className="border p-3 text-center">—</td>
                       <td className="border p-3 text-center">→ New Application</td>
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
                     A["Business Verified<br/>KYB Passed"]
                     B["LEI Registration<br/>Submit GLEIF"]
                     C["LEI Issued<br/>Global identifier"]
                     D["vLEI Credential<br/>Signing"]
                     E["Credential Issued<br/>W3C Format"]
                     F["Use Across<br/>Financial systems"]

                     A --> B
                     B --> C
                     C --> D
                     D --> E
                     E --> F

                     style A fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style B fill:#fff3e0,stroke:#0066B3,stroke-width:2px
                     style C fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style D fill:#e3f2fd,stroke:#0066B3,stroke-width:2px
                     style E fill:#fce4ec,stroke:#0066B3,stroke-width:2px
                     style F fill:#e3f2fd,stroke:#0066B3,stroke-width:2px`}
                 />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Credential Details & Usage</h3>
                <table className="w-full text-sm border-collapse">
                   <thead className="bg-gray-800 text-white">
                     <tr>
                       <th className="border p-3 text-left">Credential Type</th>
                       <th className="border p-3 text-left">Format & Standard</th>
                       <th className="border p-3 text-left">Validity Period</th>
                       <th className="border p-3 text-left">Primary Use Cases</th>
                       <th className="border p-3 text-left">Renewal</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="hover:bg-blue-50">
                       <td className="border p-3 font-semibold text-blue-600">LEI</td>
                       <td className="border p-3">20-char alphanumeric code (ISO 17442)<br/>e.g., 5493001KJTIIGC8Y1R12</td>
                       <td className="border p-3">1 year<br/>Fixed expiration date</td>
                       <td className="border p-3">• Bank accounts<br/>• Regulatory reporting<br/>• Trading platforms<br/>• Financial settlements</td>
                       <td className="border p-3">Auto-renewal 60 days before expiry (automated)</td>
                     </tr>
                     <tr className="hover:bg-green-50">
                       <td className="border p-3 font-semibold text-green-600">vLEI</td>
                       <td className="border p-3">W3C Verifiable Credential<br/>JWT/JSON-LD format<br/>ACDC cryptographic signing</td>
                       <td className="border p-3">Issuer-defined<br/>Typically 2 years<br/>Cryptographically signed</td>
                       <td className="border p-3">• DeFi protocols<br/>• NFT & Web3 identity<br/>• Smart contracts<br/>• DAO governance<br/>• Blockchain verification</td>
                       <td className="border p-3">Manual re-issuance before expiry</td>
                     </tr>
                     <tr className="hover:bg-indigo-50">
                       <td className="border p-3 font-semibold text-indigo-600">Certificate</td>
                       <td className="border p-3">PDF document<br/>Printable & digital<br/>Contains full LEI details</td>
                       <td className="border p-3">Same as LEI<br/>Matches LEI expiration</td>
                       <td className="border p-3">• Website display<br/>• Partner submissions<br/>• Regulatory filings<br/>• Audit documentation</td>
                       <td className="border p-3">Automatic when LEI renews</td>
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
                       <th className="border p-3 text-center">Severity</th>
                       <th className="border p-3 text-left">What It Means</th>
                       <th className="border p-3 text-left">Action Required</th>
                       <th className="border p-3 text-center">SLA</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="hover:bg-red-50">
                       <td className="border p-3 font-semibold text-red-600">Sanctions Hit</td>
                       <td className="border p-3 text-center"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">CRITICAL</span></td>
                       <td className="border p-3">Business matched OFAC, UN, or EU sanctions list with high confidence</td>
                       <td className="border p-3">Contact immediately • Provide proof of legitimate business • May be escalated to authorities</td>
                       <td className="border p-3 text-center">2 hours</td>
                     </tr>
                     <tr className="hover:bg-orange-50">
                       <td className="border p-3 font-semibold text-orange-600">PEP Match</td>
                       <td className="border p-3 text-center"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">HIGH</span></td>
                       <td className="border p-3">Beneficial owner or director matches PEP (Politically Exposed Person) database</td>
                       <td className="border p-3">Provide documentation • Explain business relationship • Enhanced due diligence may be required</td>
                       <td className="border p-3 text-center">1 day</td>
                     </tr>
                     <tr className="hover:bg-yellow-50">
                       <td className="border p-3 font-semibold text-yellow-600">Adverse Media</td>
                       <td className="border p-3 text-center"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">MEDIUM</span></td>
                       <td className="border p-3">News article or report mentions business in potentially negative context (fraud, investigation, etc.)</td>
                       <td className="border p-3">Review article • Respond with context • Provide clarifying documentation if needed</td>
                       <td className="border p-3 text-center">3 days</td>
                     </tr>
                     <tr className="hover:bg-blue-50">
                       <td className="border p-3 font-semibold text-blue-600">Registry Update</td>
                       <td className="border p-3 text-center"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">LOW</span></td>
                       <td className="border p-3">Business registry shows updated information (address, directors, ownership changes)</td>
                       <td className="border p-3">Review notice • Confirm accuracy • Update profile if information changed</td>
                       <td className="border p-3 text-center">5 days</td>
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
                       <th className="border p-3 text-left">Key Permissions</th>
                       <th className="border p-3 text-center">Can Invite</th>
                       <th className="border p-3 text-left">Cannot Access</th>
                       <th className="border p-3 text-left">Typical User</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="hover:bg-purple-50">
                       <td className="border p-3 font-semibold text-purple-600">Organization Admin</td>
                       <td className="border p-3">All permissions • User & role management • Billing & payments • API key generation • Integrations • Settings</td>
                       <td className="border p-3 text-center">✅ All</td>
                       <td className="border p-3">Nothing (full access)</td>
                       <td className="border p-3">Owner, Finance Manager, CEO</td>
                     </tr>
                     <tr className="hover:bg-blue-50">
                       <td className="border p-3 font-semibold text-blue-600">Compliance Officer</td>
                       <td className="border p-3">Alert investigation • Case management • Comment on cases • Reporting • View compliance data</td>
                       <td className="border p-3 text-center">❌</td>
                       <td className="border p-3">Billing, User management, Settings, API access</td>
                       <td className="border p-3">Compliance Manager, Investigator, Risk Officer</td>
                     </tr>
                     <tr className="hover:bg-green-50">
                       <td className="border p-3 font-semibold text-green-600">API User</td>
                       <td className="border p-3">API access • Webhook management • Read verification data • View own API keys</td>
                       <td className="border p-3 text-center">❌</td>
                       <td className="border p-3">Billing, User management, Case review, Settings</td>
                       <td className="border p-3">Developer, Integration Engineer, System Admin</td>
                     </tr>
                     <tr className="hover:bg-indigo-50">
                       <td className="border p-3 font-semibold text-indigo-600">Viewer</td>
                       <td className="border p-3">Read-only access to dashboard • View reports • View compliance status</td>
                       <td className="border p-3 text-center">❌</td>
                       <td className="border p-3">Everything except read • Cannot make any changes</td>
                       <td className="border p-3">Auditor, Stakeholder, Board Member, Consultant</td>
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