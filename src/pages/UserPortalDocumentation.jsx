import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, Shield, Lock, Building2, FileCheck, Globe, Activity, BookOpen, Search, FileText, Award, Settings, Users } from 'lucide-react';
import { UserManualSection } from '@/components/documentation/UserManualContent';
import { userManualSections } from '@/components/documentation/userManualData';

export default function UserPortalDocumentation() {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedManualSections, setExpandedManualSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleManualSection = (sectionId) => {
    setExpandedManualSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
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

  const filteredManualSections = searchQuery
    ? userManualSections.filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subsections.some(sub => 
          sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : userManualSections;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-5xl font-bold text-gray-900">Documentation & Help</h1>
              <p className="text-xl text-gray-600 mt-2">Complete guide to TAS features and functions</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white p-2 rounded-lg shadow-sm">
            <TabsTrigger value="manual" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" />
              User Manual
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              Technical Reference
            </TabsTrigger>
          </TabsList>

          {/* User Manual Tab */}
          <TabsContent value="manual" className="space-y-6">
            {/* Version and Metadata Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="px-4 py-1.5 text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Version 1.0.3
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 text-sm">
                <Activity className="w-4 h-4 mr-2" />
                Published: January 26, 2026
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 text-sm bg-blue-50">
                <Users className="w-4 h-4 mr-2" />
                Audience: Business Users & Compliance Officers
              </Badge>
            </div>

            {/* Executive Summary */}
            <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Welcome to the Trust Anchor Service (TAS) User Manual.</strong> This comprehensive guide empowers business users to successfully navigate every aspect of the TAS platform, from initial LEI application through ongoing credential management and compliance monitoring. Whether you're a compliance officer submitting your first verification request, a finance manager overseeing regulatory requirements, or a legal representative coordinating identity credentials, this manual provides step-by-step instructions, real-world examples, and best practices for efficient platform utilization.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The TAS platform automates complex verification workflows that traditionally required weeks of manual effort. Our integrated system performs Know Your Business (KYB) verification by querying official business registries in 120+ countries, conducts Anti-Money Laundering (AML) screening against 300+ global watchlists, and issues cryptographically verifiable credentials compliant with GLEIF and W3C standards. Most applications complete within 4-8 hours, with 87% approved automatically without manual intervention.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">What You'll Find in This Manual:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Getting Started:</strong> Account creation, dashboard navigation, user roles, and interface orientation for first-time users</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>LEI Application Process:</strong> Complete walkthrough from document preparation through final approval and credential issuance</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Credential Management:</strong> Downloading certificates, understanding vLEI credentials, sharing with partners, and managing renewals</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Compliance Monitoring:</strong> Responding to AML alerts, maintaining regulatory standards, and understanding continuous monitoring</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Web3 Integration:</strong> Using credentials in blockchain systems, DeFi protocols, and decentralized applications</span></li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 italic border-t border-blue-200 pt-4 mt-4">
                  <strong>Maintained By:</strong> TAS Product & Customer Success Teams | <strong>Last Updated:</strong> January 26, 2026 | <strong>Feedback:</strong> userdocs@tas.example.com
                </p>
              </CardContent>
            </Card>

            {/* Navigation Guide */}
            <Card className="mb-6 bg-white border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  How to Use This Manual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  This manual is organized into focused sections covering each major area of the TAS platform. Click any section title to expand detailed guides with screenshots, examples, and best practices. Use the search bar below to quickly find specific procedures or terminology.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Getting Started
                    </h4>
                    <p className="text-gray-700">Account setup, navigation basics, dashboard orientation, and role understanding</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      LEI Applications
                    </h4>
                    <p className="text-gray-700">Complete application workflow, document requirements, and approval tracking</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Compliance
                    </h4>
                    <p className="text-gray-700">AML alerts, monitoring procedures, and regulatory maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search manual (e.g., 'upload documents', 'AML screening', 'LEI renewal')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-base shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredManualSections.map((section) => (
                <UserManualSection
                  key={section.id}
                  section={section}
                  isExpanded={expandedManualSections[section.id]}
                  onToggle={() => toggleManualSection(section.id)}
                />
              ))}
            </div>

            {searchQuery && filteredManualSections.length === 0 && (
              <Card className="text-center py-16">
                <CardContent>
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">No results found</h3>
                  <p className="text-gray-600">Try different keywords or clear the search to browse all topics</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Technical Reference Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">User Guide</Badge>
                <Badge variant="secondary">Complete Reference</Badge>
                <Badge variant="secondary">2026-01-26</Badge>
                <Badge className="bg-blue-100 text-blue-800">User Facing</Badge>
              </div>

        {/* Dashboard Overview */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-3xl font-bold">Dashboard Menu Item: Your Central Command Center</h2>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-bold mb-4">Welcome to Your Compliance Hub</h3>
              <p className="mb-4 leading-relaxed">
                The Dashboard is the first screen you see upon logging into TAS, and it serves as your primary operational interface. This is not just a static display of information—it's a dynamic, real-time command center that continuously monitors your organization's compliance status, tracks active verification workflows, displays pending alerts, and provides instant access to your most frequently needed actions. Think of it as your business compliance cockpit, designed to give you complete situational awareness in seconds.
              </p>
              <p className="mb-4 leading-relaxed">
                Every element on the dashboard is purposefully positioned to support your decision-making. The top metrics cards show your most critical status indicators: LEI validity, compliance score, active workflows, and pending alerts. The middle section displays your recent activity feed—every application submission, document upload, workflow completion, and status change from the last 30 days. The right panel contains quick action buttons for your most common tasks: starting new applications, uploading documents, downloading credentials, and viewing compliance reports.
              </p>
              <p className="mb-4 leading-relaxed">
                The dashboard automatically refreshes every 60 seconds, ensuring you always see current data without manually reloading the page. For workflow progress, we use WebSocket connections that push updates instantly—when your AML screening completes, the dashboard updates immediately with the results. This real-time capability means you can leave the dashboard open all day and trust that you're seeing accurate, up-to-date information at all times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Understanding Each Dashboard Component</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    LEI Status Card
                  </h4>
                  <p className="text-sm mb-3">
                    This card displays your organization's Legal Entity Identifier status with color-coded visual indicators. A green badge with checkmark means your LEI is active and valid for use in all financial transactions. An orange warning indicates your LEI is expiring within 30 days and renewal is recommended. A red alert means your LEI has lapsed and immediate renewal is required. The card shows your 20-character LEI code prominently, with a one-click copy button for easy sharing with banks, trading platforms, or regulatory authorities.
                  </p>
                  <p className="text-sm">
                    <strong>Click this card to:</strong> View your full LEI details including issuance date, expiry date, and renewal history • Download your official LEI certificate as PDF • Copy your LEI code to clipboard • Initiate renewal process if expiring soon • View GLEIF public database entry for your organization
                  </p>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Active Workflows Card
                  </h4>
                  <p className="text-sm mb-3">
                    Shows real-time status of all verification workflows currently in progress. Each workflow—whether KYB verification, AML screening, document validation, or credential issuance—displays a progress bar showing completion percentage, the current processing step, and estimated time remaining. For example, if your AML screening is running, you'll see "AML Screening - Step 2/3: Checking PEP Databases - 75% Complete - ~5 min remaining." This transparency eliminates uncertainty and sets clear expectations.
                  </p>
                  <p className="text-sm">
                    <strong>Click this card to:</strong> View detailed step-by-step progress for each active workflow • See which specific checks are running (registry queries, sanctions screening, document OCR) • Access logs showing each verification step and its result • Estimate when workflows will complete • Identify workflows that may require your input or are waiting on manual review
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    Compliance Score Card
                  </h4>
                  <p className="text-sm mb-3">
                    Your compliance score is a calculated metric ranging from 0-100 that represents your overall regulatory health. This score is computed from multiple factors: AML screening status (30% weight), document currency and completeness (25%), information accuracy and verification (20%), response time to alerts (15%), and LEI validity status (10%). A score of 90-100 is excellent (green), 70-89 is good (light green), 50-69 requires attention (yellow), and below 50 is critical (red).
                  </p>
                  <p className="text-sm mb-3">
                    The score updates in real-time as your situation changes. If a document expires, your score drops immediately. When you upload a fresh document, it increases. If you respond quickly to an AML alert, your response time metric improves. This dynamic scoring helps you understand what actions will improve your compliance standing and prioritize remediation efforts.
                  </p>
                  <p className="text-sm">
                    <strong>Click this card to:</strong> See detailed breakdown of how your score is calculated • Identify specific areas reducing your score with recommended remediation actions • View historical score trends over time • Download compliance reports for auditors or regulators • Set up alerts when your score drops below defined thresholds
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                  <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Credentials Card
                  </h4>
                  <p className="text-sm mb-3">
                    Displays all verifiable credentials issued to your organization, including your primary LEI credential, vLEI credentials for different roles (OOR - Official Organizational Role, ECR - Engagement Context Role), and any additional certificates. Each credential shows its type, holder name, issuance date, expiration date, and current validity status. You can see at a glance which credentials are active, which are expiring soon, and which have been revoked.
                  </p>
                  <p className="text-sm">
                    <strong>Click this card to:</strong> Download credential files in multiple formats (PDF certificate, JSON Web Token, W3C Verifiable Credential) • View cryptographic signature details and verification proofs • Share credential verification links with counterparties • Revoke credentials that are no longer needed • Request new credentials for team members (administrators only) • Verify credentials presented by others
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 mt-8">Recent Activity Feed: Your Audit Trail</h3>
              <p className="mb-4 leading-relaxed">
                The Recent Activity feed occupies the left column of your dashboard and provides a chronological log of everything happening in your account. This serves multiple purposes: it keeps you informed of automated processes running in the background, creates an audit trail for compliance documentation, helps you track team member actions in multi-user organizations, and provides quick navigation to recently modified items.
              </p>
              <p className="mb-4 leading-relaxed">
                Each activity entry shows an icon indicating the type of action (document uploaded, workflow completed, user invited, etc.), a descriptive text explaining what happened ("Business Registration Certificate uploaded by compliance@yourcompany.com"), a timestamp showing when it occurred (relative time like "2 hours ago" for recent items, absolute date for older items), and a clickable link to view full details. Activities are color-coded by category: blue for applications, green for successful completions, yellow for items requiring attention, and red for errors or rejections.
              </p>
              <p className="mb-4 leading-relaxed">
                <strong>Filtering the Activity Feed:</strong> Click the filter dropdown above the feed to focus on specific activity types. "Applications Only" shows just application submissions and status changes. "Credentials Only" displays credential issuances, downloads, and revocations. "Workflows Only" tracks KYB, AML, and verification processes. "System Notifications" shows automated alerts and monitoring events. "All Activity" is the default view showing everything. Your filter preference is saved and persists across sessions.
              </p>
              <p className="mb-4 leading-relaxed">
                <strong>Using Activity for Troubleshooting:</strong> If you're wondering "Did my application submit successfully?" or "When did that workflow complete?" or "Who uploaded that document?", the activity feed provides definitive answers. Each entry includes the user who performed the action (for multi-user organizations), the exact timestamp, and links to supporting details. This eliminates confusion and provides clear accountability for all actions taken on your account.
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
            <SectionHeader title="Workflows Menu Item: Tracking Every Verification Step" section="workflows" />
          </CardHeader>
          {expandedSections.workflows && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Understanding Your Verification Journey</h3>
                <p className="mb-4 leading-relaxed">
                  The Workflows menu item is where you monitor every verification process from submission to completion. When you click "Workflows" in the main navigation, you're taken to a comprehensive view showing all workflows you've ever initiated, their current status, detailed progress for active workflows, and complete history for finished ones. This page is essential for compliance officers who need to track multiple verification requests, understand processing timelines, and troubleshoot any delays or issues.
                </p>
                <p className="mb-4 leading-relaxed">
                  Your verification workflow is automated, transparent, and designed to complete in 2-5 hours for most businesses. The process consists of three primary stages: Know Your Business (KYB) verification, Anti-Money Laundering (AML) screening, and continuous monitoring. Each stage feeds into the next, with automatic escalation to human review only when necessary. Unlike traditional verification services that operate as black boxes, TAS shows you exactly what's happening at every moment—which registry is being queried, which sanctions list is being checked, which document is being analyzed.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Stage 1: KYB Verification - Proving Your Business Exists</strong> validates that your business exists and is registered in the jurisdiction you claim. The system queries official business registries in 120+ countries, verifying incorporation date, entity status, beneficial ownership, and registered address. This stage typically completes within 30 minutes for publicly registered businesses. You'll see real-time updates as the system connects to the registry API, submits your business details, receives the response, parses the data, and compares it to your application. If everything matches perfectly, you get an instant green checkmark and automatic progression to AML screening.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Stage 2: AML Screening - Regulatory Risk Assessment</strong> checks your business and beneficial owners against 300+ global sanctions lists, PEP (Politically Exposed Persons) databases, and adverse media sources. This is where most manual reviews occur because name matching is complex—"John Smith" or "Global Trading Company" might appear on watchlists, but it's likely a different person or entity. The system uses fuzzy matching algorithms that score potential matches from 0-100%. Scores below 30% are automatically dismissed as false positives. Scores of 30-70% trigger quick human review (usually resolved in hours). Scores above 70% require thorough investigation by senior compliance officers (may take 1-3 days).
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Stage 3: Continuous Monitoring - Ongoing Compliance</strong> tracks regulatory changes, sanctions list updates, and your compliance status over time. This monitoring runs 24/7 in the background even after your LEI is issued. If your business or beneficial owners become subject to sanctions after initial verification, you receive immediate notification via email, SMS (if enabled), and dashboard alert. Your credentials may be automatically suspended pending investigation if the match is high-confidence. This continuous vigilance ensures you remain compliant even as global regulations evolve.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Workflow Page Features:</strong> The Workflows page provides powerful filtering and search capabilities. Filter by workflow type (KYB, AML, LEI Issuance, vLEI Generation), status (Pending, In Progress, Completed, Failed), date range (last 7 days, 30 days, 90 days, custom), or specific organization (for admins managing multiple entities). Each workflow entry is expandable—click to see the complete step-by-step execution log showing what happened, when it happened, which external provider was used, how long each step took, and any errors encountered. This transparency is invaluable for understanding processing delays or troubleshooting failed workflows.
                </p>
              </div>

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
            <SectionHeader title="Credentials Menu Item: Managing Your Digital Identity" section="credentials" />
          </CardHeader>
          {expandedSections.credentials && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Your Digital Identity Arsenal</h3>
                <p className="mb-4 leading-relaxed">
                  The Credentials page is your repository for all digital identity documents issued to your organization. This is where you download, verify, share, and manage your LEI certificates, vLEI credentials, verification proofs, and compliance attestations. Think of this page as your secure digital vault—everything you need to prove your business identity to banks, regulators, trading platforms, or Web3 protocols is stored here in multiple formats optimized for different use cases.
                </p>
                <p className="mb-4 leading-relaxed">
                  Upon successful verification, you receive two primary credentials: a Legal Entity Identifier (LEI) and a verifiable LEI (vLEI) credential. The LEI is a global, unique identifier for your business registered with GLEIF (Global Legal Entity Identifier Foundation). The vLEI is a cryptographically signed digital credential that proves your identity on Web3 and blockchain systems. Both credentials represent the same underlying verification—your business's proven legitimacy—but packaged differently for traditional financial systems versus modern decentralized applications.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Legal Entity Identifier (LEI):</strong> A 20-character alphanumeric code assigned to your business by GLEIF. This identifier is recognized globally by financial institutions, regulators, and trading venues. Your LEI is valid for one year and must be renewed annually. We automate this renewal process—you'll receive notifications 60 days before expiration, another at 30 days, and final reminders at 15 and 7 days. The renewal process is one-click: we verify your information is still current, charge the renewal fee to your saved payment method, and extend your LEI validity for another year. Your LEI code never changes—the same 20 characters remain your permanent global identifier throughout your business's lifetime.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Verifiable LEI Credential (vLEI):</strong> A Web3-ready digital credential that combines your LEI with cryptographic proof of your identity. This credential can be presented to counterparties, used in DeFi protocols, or integrated into smart contracts. vLEI credentials are issued as W3C Verifiable Credentials and can be stored in blockchain wallets or credential management systems. Unlike your LEI (which is a simple identifier), your vLEI contains rich metadata: your legal name, jurisdiction, registration date, verification status, issuer information, cryptographic signatures, and validity dates. Anyone can cryptographically verify your vLEI without contacting TAS—the signature proves authenticity and the blockchain registry confirms it hasn't been revoked.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Downloading and Using Your Credentials:</strong> From the Credentials page, you can download your LEI certificate as a PDF suitable for printing or attaching to regulatory submissions. You can export your vLEI as a JSON file for importing into digital wallets or as a QR code for mobile scanning. Each credential includes a verification URL—share this URL with counterparties and they can independently verify your credential's authenticity without requiring access to your TAS account. This enables trustless verification essential for Web3 and DeFi applications.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Team Credential Management (Administrators Only):</strong> If you're an organization administrator, the Credentials page includes additional functionality for issuing vLEI credentials to your team members. These personal credentials (called OOR - Official Organizational Role credentials) link individual employees to your organization's LEI, enabling them to sign documents, approve transactions, or represent your company with cryptographic proof. You define each person's role, authority scope, and validity period when issuing their credential. When team members leave, you revoke their credentials with a single click—the revocation propagates to the blockchain registry within minutes, ensuring no one can use expired credentials.
                </p>
              </div>

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
            <SectionHeader title="Compliance Menu Item: Staying Regulatory Compliant 24/7" section="compliance" />
          </CardHeader>
          {expandedSections.compliance && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Continuous Compliance Monitoring Explained</h3>
                <p className="mb-4 leading-relaxed">
                  The Compliance page is your ongoing regulatory monitoring center. While the Dashboard shows high-level compliance status, this dedicated Compliance section provides deep visibility into every aspect of your regulatory standing. Verification doesn't end after initial approval—we continuously monitor your business and beneficial owners against updated sanctions lists, PEP databases, adverse media sources, and regulatory changes. This ensures that if circumstances change, you're immediately notified and appropriate actions are taken to maintain compliance.
                </p>
                <p className="mb-4 leading-relaxed">
                  When you open the Compliance page, you see several key sections: Active Alerts requiring your attention, Compliance Score Breakdown showing exactly how your score is calculated, Document Expiration Tracker monitoring all uploaded documents, Regulatory Calendar highlighting upcoming deadlines (LEI renewal, annual certifications, etc.), and Audit Log providing complete history of all compliance-related actions on your account. This comprehensive view enables proactive compliance management rather than reactive crisis response.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Automated Monitoring - Your 24/7 Watchdog:</strong> Our systems check your business against updated watchlists daily. Global sanctions lists (OFAC, UN, EU, UK, DFAT, etc.) are updated frequently as geopolitical situations evolve. The system automatically downloads these updates, runs your organization and beneficial owners through the new data, and flags any new matches immediately. If a match is detected, you'll receive immediate notification in the portal (red badge on the Compliance menu item), via email to your registered address, and optionally via SMS if you've enabled mobile alerts. The alert includes the source (which specific sanctions list), confidence score (0-100% probability it's actually your entity), match details (what name or identifier matched), and recommended actions.
                </p>

                <p className="mb-4 leading-relaxed">
                  Most alerts are false positives due to name similarities—if your company is "Global Imports LLC" and there's a sanctioned entity called "Global Imports Ltd" in a completely different country, the fuzzy matching algorithm flags this as a potential match. The system assigns these a low confidence score (typically 20-40%) and automatically marks them as "Likely False Positive - Auto-Resolved" without requiring your action. However, they remain visible in your alert history for audit purposes. You can click any auto-resolved alert to see why it was dismissed and the specific differences that indicated it wasn't a true match.
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Manual Investigation - When Human Judgment is Needed:</strong> For high-confidence alerts (70%+ match score), our compliance team conducts manual investigation to determine whether the match represents actual regulatory risk. You'll receive an email explaining that your application is under enhanced review, what specifically triggered the alert (typically a detailed match report showing names, addresses, and identifiers that matched), and what additional documentation you can provide to expedite resolution. Common requests include: corporate structure charts showing all parent and subsidiary companies (to prove you're not affiliated with the sanctioned entity), source of funds documentation (to demonstrate your capital doesn't originate from sanctioned sources), detailed business activity explanations (to show your operations don't involve sanctioned jurisdictions or activities), and government-issued certificates of good standing.
                </p>

                <p className="mb-6 leading-relaxed">
                  Most manual investigations resolve favorably—perhaps 80% of high-confidence alerts turn out to be false positives once reviewed by experienced analysts who understand the nuances of international business structures and name variations across languages. The investigation typically takes 1-3 business days. During this period, your existing LEI remains valid (if you have one), but new credential issuances are paused. Once the investigation concludes that you're not actually the sanctioned entity, processing resumes immediately and you receive confirmation via email. If the investigation confirms you are subject to sanctions, your account is suspended, existing credentials are revoked, and the matter is escalated to regulatory authorities as required by law.
                </p>

                <p className="mb-4 leading-relaxed">
                  <strong>Alert Response Best Practices:</strong> When you receive a compliance alert, respond within 24-48 hours even if you're gathering documentation. A simple acknowledgment message like "We've received the alert and are preparing the requested documentation, expect our response within 3 business days" demonstrates good faith cooperation and prevents your case from being automatically escalated. Provide comprehensive documentation the first time—partial responses that require multiple follow-ups delay resolution significantly. If you disagree with an alert or believe it's clearly erroneous, explain why with supporting evidence rather than simply stating "this is wrong."
                </p>

                <p className="mb-6 leading-relaxed">
                  <strong>Document Expiration Management:</strong> The Compliance page includes a Document Tracker that monitors the validity of all documents you've uploaded. Business registration certificates typically don't expire, but proof of address documents (utility bills) must be refreshed every 3 months, beneficial owner identification must remain current (not expired), and certain jurisdiction-specific documents have validity periods. The tracker shows each document, its upload date, expiration date (if applicable), and days until expiration. Documents expiring within 30 days are flagged yellow. Expired documents turn red and may impact your compliance score or trigger workflows requiring updated documentation.
                </p>
              </div>

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
            <SectionHeader title="Settings Menu Item: Configuring Your Account & Organization" section="settings" />
          </CardHeader>
          {expandedSections.settings && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Settings: Your Configuration Control Center</h3>
                <p className="mb-4 leading-relaxed">
                  The Settings menu item provides access to all configuration options for your personal account and organization. This is where you manage your profile information, security settings, notification preferences, team members, billing details, API keys, and integration configurations. The Settings page is organized into logical sections with tabs or accordion panels, making it easy to find and modify specific settings without being overwhelmed by options.
                </p>
                <p className="mb-6 leading-relaxed">
                  Settings are divided into two scopes: Personal Settings (affecting only your user account) and Organization Settings (affecting all users in your organization—only visible to administrators). Personal settings include your display name, email address (read-only, used for login), password, two-factor authentication, language preference, timezone, and notification preferences. Organization settings include company profile, billing information, subscription management, team member administration, API access, webhooks, and white-label branding (Enterprise only). The interface clearly indicates which settings are personal versus organizational to prevent confusion.
                </p>

                <h3 className="text-xl font-bold mb-4 mt-8">User Management & Permissions in Detail</h3>
                <p className="mb-4 leading-relaxed">
                  Your organization can have multiple users with different permission levels. Administrators manage users, billing, and integrations. Regular users can submit applications, view workflows, and download credentials assigned to them. Each role has specific permissions that cannot be exceeded—a regular user cannot access billing, invite other users, or generate API keys. This role-based access control ensures security and compliance by limiting each user to only the data and functions necessary for their job responsibilities.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>Inviting Team Members:</strong> Organization administrators can invite new users from Settings → Team Management. Click "Invite User," enter their email address, assign their role (Administrator or User), and optionally add a welcome message. They receive an invitation email with a link to create their account. Once they complete registration, they automatically have access to your organization's data according to their assigned role. You can track invitation status—whether the email was sent, whether the recipient opened it, and whether they completed registration. Unused invitations expire after 7 days for security.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Managing Existing Users:</strong> The Team Management section shows all current users, their roles, last login date, and activity level. You can change user roles (promote regular user to administrator or demote administrator to regular user), suspend users temporarily (blocks their access without deleting their account), or remove users permanently (deletes their account and revokes all associated credentials). Each action requires confirmation and is logged in the audit trail. When you remove a user, any vLEI credentials issued to them are automatically revoked within minutes.
                </p>

                <h3 className="text-xl font-bold mb-4 mt-8">Security Settings: Protecting Your Account</h3>
                <p className="mb-4 leading-relaxed">
                  The Security tab contains critical account protection features. Two-Factor Authentication (2FA) is strongly recommended for all users and mandatory for administrators. Enable 2FA by selecting your preferred method: authenticator app (Google Authenticator, Microsoft Authenticator, Authy), SMS codes, or physical security key (YubiKey, FIDO2 device). The setup wizard guides you through the process and generates backup codes—save these in a secure location as they allow account recovery if you lose your 2FA device.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>Active Sessions Management:</strong> The Security tab shows all devices where you're currently logged in: desktop browsers, mobile devices, tablets. Each session displays the device type, operating system, browser, IP address, geographic location, and login time. You can remotely log out any session if you suspect unauthorized access or if you left yourself logged in on a shared computer. This is particularly important for administrators who have elevated privileges.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Password and Recovery:</strong> Change your password from the Security tab at any time. New passwords must meet minimum requirements: 12+ characters, uppercase and lowercase letters, numbers, symbols, and cannot be a common password or contain your email address. Set up account recovery options (backup email, phone number for SMS) so you can regain access if you forget your password. The password reset flow sends a time-limited link (valid 1 hour) to your recovery email, requiring you to verify identity before setting a new password.
                </p>

                <h3 className="text-xl font-bold mb-4 mt-8">Notification Preferences: Staying Informed Without Overwhelm</h3>
                <p className="mb-4 leading-relaxed">
                  Control what notifications you receive, how you receive them, and when. The Notification Preferences section lets you configure in-app notifications (displayed in the notification bell), email notifications (sent to your registered email), SMS notifications (for critical alerts only), and browser push notifications (desktop pop-ups even when TAS isn't the active tab). You can enable or disable each notification type individually for different event categories.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>Notification Categories:</strong> Application Status Changes (submission confirmations, approval notifications, rejection alerts), Workflow Updates (KYB completed, AML screening started, manual review required), Compliance Alerts (AML matches, sanctions hits, document expiries), Credential Events (LEI issued, vLEI generated, renewals due), Billing Events (payment successful, payment failed, invoice generated), and System Announcements (platform updates, maintenance windows, new features). For each category, choose notification delivery methods: All (in-app + email + SMS), Email Only, In-App Only, or None.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Digest Mode:</strong> Instead of receiving individual emails for every event, you can enable Daily Digest mode. This sends one comprehensive email per day summarizing all activity: applications submitted, workflows completed, alerts generated, and required actions. Digests are sent at your configured time (default 8 AM in your timezone). Critical alerts always send immediately regardless of digest settings—you won't wait 24 hours to learn about a sanctions match.
                </p>

                <h3 className="text-xl font-bold mb-4 mt-8">Billing & Subscription Management</h3>
                <p className="mb-4 leading-relaxed">
                  Administrators see a Billing section in Settings showing current subscription tier, monthly cost, payment method on file, billing history, and usage against plan limits. View all invoices (paid and unpaid), download PDF copies for accounting, see itemized charges for each service used, and track overage fees if you exceeded plan limits. Update your payment method by adding a new credit card—we securely tokenize the card via FTS.Money (our payment processor) without storing card numbers in TAS systems.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>Plan Upgrades and Downgrades:</strong> Change your subscription tier at any time. Upgrades take effect immediately—you gain access to new features and higher limits right away. Downgrades take effect at the end of your current billing period to ensure you get full value for what you've paid. When you upgrade mid-month, we calculate prorated charges: you pay the difference between your old tier and new tier for the remaining days in the current month, then full price for the new tier starting next month. When you downgrade, you continue on your current tier until the end of the billing period, then the lower-tier pricing begins.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Usage Monitoring:</strong> The Billing section includes real-time usage meters showing your consumption against plan limits. For example, if your Business plan includes 200 KYB verifications per month and you've used 147, you'll see a progress bar at 73% with "53 verifications remaining this period." This transparency helps you avoid unexpected overage charges. If you consistently approach or exceed your limits, the system suggests upgrading to a higher tier that better matches your usage patterns, potentially saving money compared to paying overage fees.
                </p>

                <h3 className="text-xl font-bold mb-4 mt-8">API Access & Integration Configuration</h3>
                <p className="mb-4 leading-relaxed">
                  For organizations with API access enabled (Business and Enterprise tiers), the Settings page includes an API section for generating and managing API keys. API keys are secret tokens that authenticate your application when making programmatic requests to TAS. Generate a new key by clicking "Create API Key," naming it descriptively (e.g., "Production Server," "Development Environment," "Mobile App"), and selecting its permissions scope (Read Only, Read + Write, Full Access). The newly generated key is displayed once—copy it immediately and store securely as you cannot view it again.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Webhook Configuration:</strong> Webhooks enable real-time notifications to your own systems when events occur in TAS. Configure webhooks from Settings → Integrations. Specify your webhook endpoint URL (where TAS should send notifications), select which event types to subscribe to (application status changes, workflow completions, compliance alerts, credential issuances), and generate a secret key for signature verification. When events occur, TAS sends HTTP POST requests to your endpoint with event details in JSON format. Your system can verify authenticity using the HMAC signature in the request headers, preventing spoofed webhook attacks.
                </p>
              </div>

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
                <h3 className="text-lg font-bold mb-4 mt-8">Web3 Dashboard: Blockchain & Decentralized Identity</h3>
                <p className="mb-4 leading-relaxed">
                  The Web3 Dashboard is a specialized menu item for organizations leveraging blockchain technology and decentralized identity systems. This section bridges traditional compliance (LEI, vLEI) with Web3 capabilities (DeFi, DAOs, NFTs). When you click "Web3" in the navigation, you access four main panels: Wallet Connection, DeFi Compliance, DAO Governance Integration, and NFT Authentication.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>Wallet Connection:</strong> Connect your organization's blockchain wallets (MetaMask, WalletConnect, Ledger) to your TAS account. Once connected, you can prove your organization's identity on any blockchain by signing messages with your wallet that's cryptographically linked to your vLEI credential. This enables trustless verification—counterparties can confirm your business's legitimacy without relying on centralized databases or third parties. The connection process takes 2 minutes: click "Connect Wallet," approve the connection request in your wallet app, sign a verification message proving you control the wallet, and the system links your wallet address to your LEI and vLEI credentials.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>DeFi Compliance:</strong> If your organization participates in decentralized finance protocols, the DeFi Compliance panel helps you meet Know Your Business (KYB) requirements many protocols now mandate. Export your vLEI credential in formats compatible with Aave, Compound, Uniswap governance, and other major DeFi platforms. The panel generates compliance proofs you can submit when protocols require verification for large transactions or governance participation. Monitor your on-chain reputation score aggregated from multiple DeFi platforms.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>DAO Governance:</strong> Decentralized Autonomous Organizations increasingly require verified identity for governance participation to prevent Sybil attacks and ensure legitimate stakeholder voting. The DAO Integration panel lets you present your vLEI credential to DAO voting platforms, proving one legitimate business per vote. Configure which DAOs you participate in, link your governance tokens to your verified identity, and view your voting history with cryptographic proof of your organization's participation.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>NFT Authentication:</strong> Issue authenticated NFTs that carry your organization's verifiable credential metadata. These NFTs prove they were created by your verified business—valuable for digital collectibles, tokenized assets, or proof of authenticity for physical goods. The NFT Authentication panel guides you through minting NFTs on multiple chains (Ethereum, Polygon, Binance Smart Chain) with embedded vLEI signatures, making them verifiably authentic and traceable to your registered business.
                </p>

                <h3 className="text-lg font-bold mb-4">API Integration & Webhooks for Developers</h3>
                <p className="mb-4 leading-relaxed">
                  For organizations that need to integrate verification into their own systems, we provide comprehensive REST API access and real-time webhooks. API users can programmatically submit verification requests, check workflow status, retrieve credentials, download verification reports, and subscribe to real-time updates via webhooks. The API follows RESTful conventions with JSON request/response formats, standard HTTP status codes, and comprehensive error messages. Rate limits are based on your subscription tier: Starter allows 100 API calls per hour, Business allows 1,000 per hour, and Enterprise has no rate limits.
                </p>
                <p className="mb-4 leading-relaxed">
                  <strong>API Documentation Access:</strong> From Settings → API, you can access the complete API reference documentation showing every available endpoint, required parameters, response formats, and code examples in multiple languages (JavaScript, Python, Java, C#, Go). The documentation includes interactive testing—you can make API calls directly from the documentation page using your real API key to see actual responses. This makes integration development significantly faster as you can test endpoints before writing code.
                </p>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-2">Popular API Use Cases:</p>
                  <ul className="text-sm space-y-2 ml-4">
                    <li>• <strong>Customer Onboarding Automation:</strong> Integrate KYB verification directly into your customer registration flow, automatically verifying business legitimacy as part of account creation</li>
                    <li>• <strong>Real-Time Credential Retrieval:</strong> Pull LEI and vLEI credentials for customer profiles in your CRM, displaying verification status in your internal dashboards</li>
                    <li>• <strong>Compliance Monitoring:</strong> Receive real-time webhooks when compliance status changes, triggering automated workflows in your compliance management system</li>
                    <li>• <strong>Data Export and Warehousing:</strong> Bulk export verification data to your own database for analytics, reporting, or regulatory filing preparation</li>
                    <li>• <strong>White-Label Integration:</strong> Embed TAS verification flows into your own product using our API, providing verification services to your customers under your brand</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="font-bold text-lg mb-3 text-blue-200">Document Information</h4>
                <div className="text-sm space-y-2">
                  <p><strong>Version:</strong> 1.0.3</p>
                  <p><strong>Published:</strong> January 26, 2026</p>
                  <p><strong>Last Reviewed:</strong> January 26, 2026</p>
                  <p><strong>Classification:</strong> User Facing Documentation</p>
                  <p><strong>Target Audience:</strong> Business Users, Compliance Officers, Finance Teams</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-blue-200">Support & Feedback</h4>
                <div className="text-sm space-y-2">
                  <p><strong>Documentation Team:</strong> TAS Product & Customer Success</p>
                  <p><strong>Feedback:</strong> userdocs@tas.example.com</p>
                  <p><strong>Technical Support:</strong> support@tas.example.com</p>
                  <p><strong>Live Chat:</strong> Available 9 AM - 6 PM (your timezone)</p>
                  <p className="text-blue-200 mt-4">We continuously improve this documentation based on user feedback. Please report errors, suggest improvements, or request additional topics.</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-xs text-gray-400">© 2026 FTS.Money & Certizen Technologies. All rights reserved. User documentation for Trust Anchor Service platform.</p>
            </div>
          </CardContent>
        </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}