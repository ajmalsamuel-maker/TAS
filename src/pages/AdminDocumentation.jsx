import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, BookOpen, Search, FileText } from 'lucide-react';
import { UserManualSection } from '@/components/documentation/UserManualContent';
import { adminManualSections } from '@/components/documentation/userManualData';

const AdminDocumentation = () => {
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
      className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
    >
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {expandedSections[section] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );

  const filteredManualSections = searchQuery
    ? adminManualSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subsections.some(sub =>
          sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : adminManualSections;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-5xl font-bold text-gray-900">Admin Documentation</h1>
              <p className="text-xl text-gray-600 mt-2">Technical reference and administrator manual</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white p-2 rounded-lg shadow-sm">
            <TabsTrigger value="manual" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" />
              Administrator Manual
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              Technical Reference
            </TabsTrigger>
          </TabsList>

          {/* Admin Manual Tab */}
          <TabsContent value="manual" className="space-y-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="default">Version 1.0</Badge>
              <Badge variant="secondary">Complete Administrator Guide</Badge>
              <Badge variant="secondary">2026-01-26</Badge>
              <Badge className="bg-amber-100 text-amber-800">Internal - Admin Teams</Badge>
            </div>

            {/* Executive Summary */}
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-3xl font-bold">Executive Summary</h2>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-bold mb-4">Administrator Role Overview</h3>
                  <p className="mb-4 leading-relaxed">
                    As a TAS Platform Administrator, you are the operational backbone of the Trust Anchor Service. Your responsibilities span application review, organization management, compliance monitoring, billing oversight, and system health maintenance. This manual provides comprehensive guidance for every administrative function, from routine daily tasks to complex edge cases requiring judgment and expertise.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    The TAS platform processes thousands of verification requests monthly across 120+ countries, supporting organizations from small startups to Fortune 500 enterprises. Your role ensures that every application is reviewed with appropriate rigor, that billing is accurate and transparent, that compliance alerts are investigated promptly, and that customers receive excellent service throughout their lifecycle. The average administrator manages 30-50 applications daily, monitors 200+ active organizations, and resolves 10-15 support cases while maintaining 99.5% SLA compliance.
                  </p>
                  <p className="leading-relaxed">
                    This manual is organized into functional areas matching your daily workflow: Dashboard Operations, Application Review, Organization Management, Billing Administration, Compliance Monitoring, and System Configuration. Each section provides detailed narratives explaining not just how to perform tasks, but why processes are designed as they are, what regulatory requirements drive decisions, and how to handle exceptional situations requiring judgment.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                  <h3 className="text-lg font-bold mb-4">Core Administrative Responsibilities</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Application Review & Approval:</strong> Evaluate LEI applications for completeness, accuracy, and compliance with GLEIF standards. Target: &lt;24-hour turnaround for standard applications</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Organization Lifecycle Management:</strong> Create, configure, and maintain organization accounts including billing setup, feature enablement, and user management</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Compliance Alert Investigation:</strong> Review and resolve AML alerts, sanction matches, and PEP flags within regulatory timelines with full documentation</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Billing & Revenue Management:</strong> Configure pricing plans, manage credits, process invoices, resolve payment failures, and export data to accounting systems</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Credential Issuance & Management:</strong> Issue vLEI credentials, manage LEI renewals, handle revocations, and maintain GLEIF synchronization</span></li>
                    <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>System Monitoring & Maintenance:</strong> Monitor platform health, respond to alerts, coordinate with engineering on issues, and ensure uptime SLAs are met</span></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Daily Administrative Workflow</h3>
                  <p className="mb-4 leading-relaxed">
                    A typical administrator day begins with the Dashboard Health Check - review the top metrics bar for any red indicators requiring immediate attention, check the pending applications queue for SLA breaches, scan the AML alerts panel for critical severity items, and verify system health is green. This morning review takes 5-10 minutes but surfaces 90% of urgent issues.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    The morning session (9 AM - 12 PM) focuses on application review. Process applications in priority order: SLA-breached items first, then approaching-deadline items, then standard queue. Target 15-20 application reviews before lunch, with an average of 8-12 minutes per straightforward application and 20-30 minutes for complex cases requiring manual research. Use the batch approval feature when you have 3+ straightforward applications from the same jurisdiction to save time.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Afternoon sessions (1 PM - 5 PM) alternate between compliance work and operational tasks. Monday afternoons focus on billing - review pending invoices, resolve payment failures, process refund requests. Tuesday/Thursday afternoons handle compliance - investigate AML alerts, review high-risk cases, update sanctions list configurations. Wednesday/Friday afternoons cover organization management - create new organizations for sales deals, configure special pricing, handle support escalations. This pattern ensures all areas receive attention without becoming overwhelming.
                  </p>
                  <p className="leading-relaxed">
                    The end-of-day review (30 minutes before close) verifies all critical items are resolved: check for unassigned SLA-breached applications, verify critical AML alerts have been assigned or resolved, confirm no failed payment notifications were missed, and review tomorrow's calendar for LEI renewals or scheduled maintenance. Document any items you couldn't complete in team notes so the next shift or tomorrow morning picks them up immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search admin manual (e.g., 'approve application', 'billing plans', 'user management')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-base shadow-sm"
                />
              </div>
            </div>

            {/* Manual Sections */}
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

            {/* Footer */}
            <Card className="bg-gray-900 text-white mt-8">
              <CardContent className="pt-6">
                <div className="text-sm space-y-3">
                  <p><strong>Document Version:</strong> 1.0</p>
                  <p><strong>Last Updated:</strong> January 26, 2026</p>
                  <p><strong>Classification:</strong> Internal - Admin Teams</p>
                  <p><strong>Owner:</strong> TAS Operations</p>
                  <p className="text-xs mt-4 border-t border-gray-700 pt-4">© 2026 FTS.Money & Certizen Technologies. Internal use only.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Reference Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="default">Version 1.0</Badge>
              <Badge variant="secondary">Complete Reference</Badge>
              <Badge variant="secondary">2026-01-26</Badge>
              <Badge className="bg-amber-100 text-amber-800">Internal - Technical Teams</Badge>
            </div>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-3xl font-bold">Executive Summary</h2>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-bold mb-4">Platform Overview</h3>
              <p className="mb-4 leading-relaxed">
                Trust Anchor Service (TAS) represents a paradigm shift in business identity verification and compliance. Traditional KYB (Know Your Business) solutions require 2-4 weeks, extensive manual review, and teams of compliance specialists. Our platform automates the entire process in 2-5 hours, reducing costs by 95% while improving accuracy to 99.9%.
              </p>
              <p className="mb-4 leading-relaxed">
                The platform consists of four primary verification engines (KYB, AML, Document Verification, and Continuous Monitoring) orchestrated through a sophisticated workflow system. Each component is independently scalable, multi-tenant capable, and PCI DSS Level 1 compliant. The architecture supports global expansion with country-specific compliance rules for 120+ countries.
              </p>
              <p className="leading-relaxed">
                TAS delivers enterprise-grade identity verification, compliance automation, LEI issuance, and blockchain-ready credentials through a unified API, enabling organizations to launch compliance operations in 24-48 hours rather than 12-36 months.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <h3 className="text-lg font-bold mb-4">Core Capabilities</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>KYB Verification:</strong> Automated business registry checks across 120+ countries with real-time verification of incorporation, entity status, and beneficial ownership</span></li>
                <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>AML Screening:</strong> Real-time scanning against 300+ sanctions lists, PEP databases, and adverse media sources with configurable alert thresholds</span></li>
                <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>LEI Issuance:</strong> Integrated GLEIF workflow for Legal Entity Identifier generation with automatic renewal tracking</span></li>
                <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>vLEI Credentials:</strong> Cryptographically signed Web3-ready verifiable credentials using W3C standards</span></li>
                <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Continuous Monitoring:</strong> Ongoing surveillance for regulatory changes, sanctions list updates, and compliance status degradation</span></li>
                <li className="flex gap-3"><span className="text-blue-600 font-bold">✓</span><span><strong>Case Management:</strong> Integrated investigation workflow for alert resolution with SLA tracking and audit trails</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Architecture Philosophy</h3>
              <p className="mb-4 leading-relaxed">
                The TAS architecture is built on three foundational principles:
              </p>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-bold mb-2">1. Efficiency Through Multi-Tenancy</p>
                  <p>Rather than deploying isolated infrastructure for each customer, TAS shares infrastructure while maintaining strict logical data isolation. This approach reduces per-customer costs by 70% while improving reliability through resource pooling.</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-bold mb-2">2. Security Through Defense-in-Depth</p>
                  <p>Every layer of the stack implements isolation mechanisms appropriate for its characteristics. Database schemas are physically separated, APIs require cryptographic validation, and audit trails track every access. This means compromise of one isolation layer doesn't breach others.</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-bold mb-2">3. Scalability Through Statelessness</p>
                  <p>Services are designed to be horizontally scalable without state affinity. Session data is externalized to Redis, requests are routed by load balancers, and database connections are pooled. This enables automatic scaling from 100 concurrent users to 100,000.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="System Architecture" section="architecture" />
          </CardHeader>
          {expandedSections.architecture && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">High-Level Architecture</h3>
                <p className="mb-6 leading-relaxed">
                  The TAS platform is organized into five distinct layers, each with specific responsibilities and clearly defined boundaries. This layered approach provides clear separation of concerns, enables independent scaling of components, and maintains security through network segmentation. Each layer has been designed with the principle that failure in one layer does not cascade to others, and each can be independently updated, scaled, or replaced without affecting the entire system. Understanding the flow of a request through these layers is essential for troubleshooting performance bottlenecks, planning capacity upgrades, and conducting thorough security analysis.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Edge Layer (Cloudflare)</strong> serves as the first line of defense against malicious traffic. All requests pass through Cloudflare's global network, which provides DDoS protection, Web Application Firewall (WAF) rules based on OWASP standards, and geo-blocking capabilities. The WAF inspects incoming requests and blocks those matching known attack patterns. Geographic restrictions can be enforced to comply with sanctions regulations (e.g., blocking requests from OFAC-designated countries).
                </p>
                <p className="mb-6 leading-relaxed">
                  The <strong>Portal Layer</strong> encompasses all customer-facing interfaces: the Admin Portal for platform administrators, the User Portal for business customers managing their compliance workflows, the Public Website for marketing and information, and the Merchant Portal for direct API integration. Each portal is a React-based single-page application that communicates exclusively through the Gateway Layer via authenticated APIs. The portals maintain no session state of their own; all session data is stored in Redis and retrieved via the API layer.
                </p>
                <p className="mb-6 leading-relaxed">
                  The <strong>Gateway Layer</strong> (AWS Application Load Balancer) performs SSL/TLS termination, decrypting all incoming HTTPS traffic and re-encrypting outbound traffic to backend services. It distributes incoming requests across multiple ECS container instances using health checks at 30-second intervals. The ALB maintains connection draining with a 300-second timeout to ensure in-flight requests complete before removing instances. It supports HTTP/2 and gRPC protocols, enabling efficient bidirectional communication for real-time updates.
                </p>
                <p className="mb-6 leading-relaxed">
                  The <strong>Application Layer</strong> contains the core business logic organized into three primary services: the Verification Engine (KYB, AML, Document validation), the Billing Engine (metering, invoicing, payment processing), and the Compliance Engine (case management, audit logging, alerts). These services communicate via message queues for async operations and direct API calls for synchronous requests. The Workflow Orchestration Engine coordinates the entire verification pipeline, ensuring that KYB → AML → Document → LEI → Monitoring stages execute in the correct sequence with proper error handling and retry logic.
                </p>
                <p className="mb-6 leading-relaxed">
                  The <strong>Data Layer</strong> provides persistence through PostgreSQL for transactional data, Redis for caching and sessions, SQS for asynchronous task queuing, and S3 for document storage and backups. This separation of concerns ensures that each system is optimized for its specific access patterns: PostgreSQL's ACID guarantees ensure billing data consistency, Redis's in-memory performance enables fast rate limiting checks, SQS provides reliable async processing, and S3 offers nearly unlimited document storage with automatic replication.
                </p>
                <MermaidDiagram 
                  chart={`graph TD
                    A["Cloudflare CDN & WAF<br/>DDoS Protection • WAF Rules • Geo-Blocking"]
                    B["Portal Layer<br/>Admin • User • Public • Merchant"]
                    C["AWS ALB<br/>SSL • Load Balancing • Health Checks"]
                    D["Application Services<br/>Verification • Billing • Compliance"]
                    E["Workflow Orchestration<br/>KYB → AML → Document → LEI → Monitor"]
                    F["PostgreSQL<br/>Transactional Data"]
                    G["Redis<br/>Cache • Sessions • Rate Limits"]
                    H["SQS<br/>Async Queues"]
                    I["S3<br/>Documents • Backups"]

                    A -->|HTTPS Filtered| B
                    B -->|Authenticated API| C
                    C -->|Load Balanced| D
                    D --> E
                    E -->|Persist| F
                    E -->|Cache| G
                    E -->|Queue| H
                    E -->|Store| I

                    style A fill:#e1f5ff
                    style B fill:#f3e5f5
                    style C fill:#fff3e0
                    style D fill:#e8f5e9
                    style E fill:#fce4ec
                    style F fill:#f1f8e9
                    style G fill:#e0f2f1
                    style H fill:#ede7f6
                    style I fill:#fbe9e7`}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Request Flow Analysis</h3>
                <p className="mb-6 leading-relaxed">
                  Every request through TAS follows a predictable path. Understanding this flow is crucial for identifying performance bottlenecks, configuring caching strategies, and troubleshooting failures. The following timeline represents a typical KYB verification request from submission to completion, with all latency measurements captured across the entire stack.
                </p>
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Step</th>
                      <th className="border p-3 text-left">Component</th>
                      <th className="border p-3 text-left">Action</th>
                      <th className="border p-3 text-center">Latency</th>
                      <th className="border p-3 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">1</td>
                      <td className="border p-3 font-mono">Client</td>
                      <td className="border p-3">Submit KYB request via HTTPS</td>
                      <td className="border p-3 text-center">—</td>
                      <td className="border p-3">Initiate verification</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">2</td>
                      <td className="border p-3 font-mono">Cloudflare</td>
                      <td className="border p-3">DDoS checks, WAF rules, geo-block validation</td>
                      <td className="border p-3 text-center">&lt;10ms</td>
                      <td className="border p-3">Security filtering</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">3</td>
                      <td className="border p-3 font-mono">ALB</td>
                      <td className="border p-3">SSL termination, load balance across ECS tasks</td>
                      <td className="border p-3 text-center">&lt;5ms</td>
                      <td className="border p-3">Distribute load</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">4</td>
                      <td className="border p-3 font-mono">API Gateway</td>
                      <td className="border p-3">Validate API key via HMAC, rate limit check</td>
                      <td className="border p-3 text-center">&lt;8ms</td>
                      <td className="border p-3">Authentication</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">5</td>
                      <td className="border p-3 font-mono">Redis</td>
                      <td className="border p-3">Check rate limit counter for merchant</td>
                      <td className="border p-3 text-center">&lt;1ms</td>
                      <td className="border p-3">Throttle requests</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">6</td>
                      <td className="border p-3 font-mono">ECS Task</td>
                      <td className="border p-3">Input validation, normalize data</td>
                      <td className="border p-3 text-center">&lt;15ms</td>
                      <td className="border p-3">Verify data integrity</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">7</td>
                      <td className="border p-3 font-mono">Workflow Engine</td>
                      <td className="border p-3">Create OnboardingApplication record</td>
                      <td className="border p-3 text-center">&lt;20ms</td>
                      <td className="border p-3">Persist request</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">8</td>
                      <td className="border p-3 font-mono">PostgreSQL</td>
                      <td className="border p-3">INSERT application, write audit log</td>
                      <td className="border p-3 text-center">&lt;10ms</td>
                      <td className="border p-3">Database commit</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">9</td>
                      <td className="border p-3 font-mono">SQS</td>
                      <td className="border p-3">Queue async verification workflows</td>
                      <td className="border p-3 text-center">&lt;5ms</td>
                      <td className="border p-3">Non-blocking work</td>
                    </tr>
                    <tr className="bg-green-50 font-bold">
                      <td className="border p-3">Total</td>
                      <td className="border p-3">Synchronous Path</td>
                      <td className="border p-3">Response to client</td>
                      <td className="border p-3 text-center">&lt;80ms</td>
                      <td className="border p-3">P99 Latency Target</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-6 text-sm leading-relaxed">
                  <strong>Background Processing:</strong> After the synchronous response is sent, SQS workers asynchronously execute KYB verification (30-120 minutes), AML screening (5-30 minutes), and document validation (1-5 minutes). These workflows run in parallel and independently update the application status as each completes, enabling real-time dashboard updates via WebSocket subscriptions.
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Multi-Tenancy */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Multi-Tenancy Model" section="multitenancy" />
          </CardHeader>
          {expandedSections.multitenancy && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Tenant Isolation Strategy</h3>
                <p className="mb-6 leading-relaxed">
                  Multi-tenancy is not merely a cost-optimization strategy—it is a fundamental architectural requirement for building compliant financial infrastructure. By sharing infrastructure across customers while maintaining absolute data isolation, TAS achieves both economies of scale and regulatory compliance. In the payments industry, where PCI DSS certification is mandatory, the stakes are particularly high. A single isolation mechanism failure could expose sensitive card data across multiple merchants.
                </p>
                <p className="mb-6 leading-relaxed">
                  TAS implements a defense-in-depth approach where every layer of the stack enforces isolation independently. This means that even if application code has a bug, the database prevents unauthorized data access. Even if an attacker breaches the API layer, they cannot escape their tenant's data through the cache layer. This layered approach is why financial regulators and auditors demand multiple isolation mechanisms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Isolation Implementation by Layer</h3>
                <p className="mb-6 leading-relaxed">
                  The multi-layer isolation strategy ensures that no single point of failure can compromise data across multiple tenants. Each layer implements isolation appropriate to its function, and together they create overlapping security boundaries that protect sensitive data at every level of the stack.
                </p>
                <MermaidDiagram 
                   chart={`graph TB
                     API["API Layer<br/>HMAC Signature Validation<br/>org_id in every request"]
                     DB["Database Layer<br/>Row-Level Security<br/>Schema isolation"]
                     CACHE["Cache Layer<br/>Namespace Prefixing<br/>org_*:key pattern"]
                     QUEUE["Message Queue<br/>org_id filtering<br/>Attribute-based routing"]
                     STORAGE["Storage Layer<br/>IAM Role Restriction<br/>Prefix-based access"]

                     API -->|Validate| DB
                     API -->|Store session| CACHE
                     API -->|Queue async| QUEUE
                     API -->|Upload docs| STORAGE

                     style API fill:#e3f2fd
                     style DB fill:#f3e5f5
                     style CACHE fill:#e0f2f1
                     style QUEUE fill:#fff3e0
                     style STORAGE fill:#fbe9e7`}
                 />
                <table className="w-full text-sm border-collapse mt-6">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Layer</th>
                      <th className="border p-3 text-left">Isolation Mechanism</th>
                      <th className="border p-3 text-left">Implementation</th>
                      <th className="border p-3 text-left">Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-red-50">
                      <td className="border p-3 font-semibold">Database</td>
                      <td className="border p-3">Separate PostgreSQL schema per tenant</td>
                      <td className="border p-3">Row-level security (RLS) policies on all tables. Query: SELECT * blocks cross-tenant access at DB layer</td>
                      <td className="border p-3">PCI DSS §6.5.1</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="border p-3 font-semibold">Cache</td>
                      <td className="border p-3">Key namespace prefixing</td>
                      <td className="border p-3">Redis keys: "org_&#123;id&#125;:session:&#123;session_id&#125;". Impossible to iterate across organizations</td>
                      <td className="border p-3">PCI DSS §2.2.4</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-3 font-semibold">Message Queue</td>
                      <td className="border p-3">Message attributes filtering</td>
                      <td className="border p-3">SQS message attributes contain org_id. Worker filters to own org only</td>
                      <td className="border p-3">PCI DSS §12.3</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3 font-semibold">Object Storage</td>
                      <td className="border p-3">AWS S3 IAM policies</td>
                      <td className="border p-3">Each organization has IAM role. Bucket policy restricts access to org-specific prefixes</td>
                      <td className="border p-3">PCI DSS §2.2.4</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">API Authentication</td>
                      <td className="border p-3">HMAC signature validation</td>
                      <td className="border p-3">API key includes org_id. Signature verified against request payload + org_id</td>
                      <td className="border p-3">PCI DSS §6.5.10</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="border p-3 font-semibold">Domain/DNS</td>
                      <td className="border p-3">Subdomain per tenant</td>
                      <td className="border p-3">api-org1.tas.example.com vs api-org2.tas.example.com. Individual SSL certificates</td>
                      <td className="border p-3">PCI DSS §2.2.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded">
                <h3 className="font-bold mb-3">Why Multi-Layer Isolation Matters</h3>
                <p className="text-sm leading-relaxed mb-3">
                  Consider this failure scenario: An application bug allows a developer to bypass authentication checks and directly query the database. In a single-isolation system, this developer could access all merchants' data. In TAS's multi-layer architecture:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>Layer 1: API authentication still validates that the request belongs to a specific organization</li>
                  <li>Layer 2: Even with valid auth, the database RLS policy prevents SELECT queries from returning cross-tenant rows</li>
                  <li>Layer 3: Cache isolation ensures the developer cannot enumerate keys across organizations</li>
                  <li>Layer 4: S3 IAM policies prevent file access outside the organization's prefix</li>
                </ul>
                <p className="text-sm leading-relaxed mt-3">
                  This defense-in-depth approach is why TAS achieves PCI DSS Level 1 certification and why auditors approve the architecture for multi-tenant payment processing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Business Benefits of Multi-Tenancy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                    <p className="font-bold mb-2">Cost Efficiency</p>
                    <ul className="text-sm space-y-1">
                      <li>• 70% infrastructure cost reduction</li>
                      <li>• Shared database resources</li>
                      <li>• Single codebase deployment</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                    <p className="font-bold mb-2">Performance</p>
                    <ul className="text-sm space-y-1">
                      <li>• Resource pooling across tenants</li>
                      <li>• Better cache utilization</li>
                      <li>• Faster anomaly detection</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-600">
                    <p className="font-bold mb-2">Compliance</p>
                    <ul className="text-sm space-y-1">
                      <li>• PCI DSS L1 certified</li>
                      <li>• Audit trails per tenant</li>
                      <li>• GDPR data residency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Billing System */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Billing System Architecture" section="billing" />
          </CardHeader>
          {expandedSections.billing && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Unified Billing & Metering System</h3>
                <p className="mb-6 leading-relaxed">
                  The TAS billing system is designed around the principle of automatic, accurate, and transparent billing. Rather than manual invoice creation or periodic batch processes, the system meters usage in real-time as workflows execute. Every KYB verification, AML screening, and LEI issuance immediately generates a metering event that is aggregated into the customer's current usage metrics. This enables accurate billing, real-time customer dashboards, and automated overage enforcement.
                </p>
                <p className="mb-6 leading-relaxed">
                  The billing architecture follows an event-driven design. As verification workflows complete, they emit events to the Billing service via a message queue. The Billing service consumes these events, updates UsageMeter counters, applies pricing rules, and accumulates line items. At month-end (or billing date), the system generates a ConsolidatedInvoice by summing all accumulated usage and applying the customer's subscription plan pricing.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Real-Time Usage Tracking:</strong> When a KYB verification completes successfully, an event is published to SQS with the message body containing service_type='kyb', organization_id, timestamp, and cost_amount. The Billing microservice consumes this event and increments the corresponding UsageMetric counter. The customer's dashboard receives a real-time update via WebSocket, showing the incremented count and remaining verifications in their monthly limit. If the verification exceeds their limit, an overage charge is calculated based on overage_price_per_call from their subscription plan.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Invoice Generation Process:</strong> At the customer's billing_date (e.g., the 15th of each month), the system runs the invoice generation job. For each active subscription, it queries the UsageMetrics table for the current billing period, aggregates all usage from the start_date to the billing period end, and calculates charges: (base_subscription_price) + (sum of all usage costs). If the customer has prepaid credits, those are applied first. The system then creates an Invoice record in Draft status with individual line items for each service type. If auto_generate_invoices is enabled in BillingSettings, the invoice is automatically issued, sent, and recorded in the customer's audit log.
                </p>
                <MermaidDiagram 
                   chart={`graph LR
                    A["Workflow Completes<br/>KYB/AML/Document/LEI"] 
                    B["Emit Event<br/>service_type<br/>org_id<br/>cost_amount"]
                    C["Billing Service<br/>Consume event<br/>Update UsageMetric"]
                    D["Real-Time Dashboard<br/>Customer sees updated<br/>usage & remaining"]

                    E["Billing Date Triggered<br/>Scheduled job"]
                    F["Aggregate Usage<br/>Sum all events<br/>in billing period"]
                    G["Calculate Charges<br/>Base + overage<br/>Apply credits"]
                    H["Generate Invoice<br/>Create line items<br/>Save as Draft"]
                    I["Issue & Send<br/>if auto_email<br/>enabled"]
                    J["Payment Received<br/>Update invoice status<br/>Reconcile in accounting"]

                    A --> B --> C --> D
                    E --> F --> G --> H --> I --> J

                    style A fill:#e3f2fd
                    style B fill:#e3f2fd
                    style C fill:#fff3cd
                    style D fill:#d4edda
                    style E fill:#f8d7da
                    style F fill:#f8d7da
                    style G fill:#fff3cd
                    style H fill:#e2e3e5
                    style I fill:#d1ecf1
                    style J fill:#d4edda`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Subscription Plans & Pricing</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Feature</th>
                      <th className="border p-3 text-center">Starter</th>
                      <th className="border p-3 text-center">Business</th>
                      <th className="border p-3 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">Monthly Base Price</td>
                      <td className="border p-3 text-center">$99</td>
                      <td className="border p-3 text-center">$299</td>
                      <td className="border p-3 text-center">Custom</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">KYB Verifications Included</td>
                      <td className="border p-3 text-center">50/month</td>
                      <td className="border p-3 text-center">200/month</td>
                      <td className="border p-3 text-center">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">AML Screening Level</td>
                      <td className="border p-3 text-center">Basic (OFAC)</td>
                      <td className="border p-3 text-center">Full (300+ lists)</td>
                      <td className="border p-3 text-center">Full+ (Custom)</td>
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
                      <td className="border p-3 text-center">✅ (6 months)</td>
                      <td className="border p-3 text-center">✅ (Unlimited)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">Support Level</td>
                      <td className="border p-3 text-center">Email</td>
                      <td className="border p-3 text-center">Email + Chat</td>
                      <td className="border p-3 text-center">24/7 Phone + Dedicated</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">SLA Uptime</td>
                      <td className="border p-3 text-center">99.5%</td>
                      <td className="border p-3 text-center">99.9%</td>
                      <td className="border p-3 text-center">99.95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Invoice Lifecycle & State Machine</h3>
                <p className="mb-4 leading-relaxed">
                  Invoices in TAS follow a well-defined state machine that prevents invalid transitions and ensures data consistency. Understanding this lifecycle is essential for debugging billing issues, auditing invoice history, and ensuring regulatory compliance. The state machine design guarantees that invoices cannot transition through illegal paths—for example, an invoice cannot move directly from Draft to Paid, and a Cancelled invoice can never be reopened. This immutable audit trail is required by financial regulations and enables forensic analysis of billing disputes.
                </p>
                <p className="mb-4 leading-relaxed">
                  The <strong>Draft State</strong> is the initial state when an invoice is created. During this phase, the invoice can be freely edited, deleted, or issued. No communication is sent to the customer, and the invoice has no legal standing. This allows administrators to correct errors before the invoice becomes official.
                </p>
                <p className="mb-4 leading-relaxed">
                  The <strong>Issued State</strong> represents the moment when an invoice becomes officially binding. The system records the issue_date, and an audit log entry is created. If auto-email is enabled in BillingSettings, the invoice is automatically emailed to the customer, transitioning to the Sent state. Once issued, the invoice can only be modified through amendments (creating adjustment line items) rather than direct edits, maintaining an immutable audit trail.
                </p>
                <p className="mb-4 leading-relaxed">
                  The <strong>Viewed State</strong> indicates that the customer has opened and reviewed the invoice. This is tracked via the viewed_at timestamp, enabling reporting on how quickly customers review their invoices. If an invoice is issued but payment arrives before the customer views it, the invoice transitions directly to Paid, skipping the Viewed state.
                </p>
                <p className="mb-4 leading-relaxed">
                  The <strong>Overdue State</strong> is automatically triggered by a scheduled job when the current date exceeds the due_date. However, the invoice still expects payment—this state is a flag indicating that payment is late. When payment arrives, the invoice transitions to Paid regardless of how overdue it was. Overdue invoices trigger reminder notifications to the customer.
                </p>
                <p className="mb-4 leading-relaxed">
                  The <strong>Paid State</strong> is the completion state indicating that full payment has been received. The system records the paid_date, payment_method, and transaction_id. Paid invoices are marked as finalized and are available for export to accounting systems. This state is terminal—no further transitions are possible.
                </p>
                <MermaidDiagram 
                   chart={`stateDiagram-v2
                [*] --> Draft
                Draft --> Issued
                Draft --> Deleted
                Issued --> Sent
                Issued --> Viewed
                Issued --> Paid
                Issued --> Overdue
                Issued --> Cancelled
                Sent --> Viewed
                Sent --> Paid
                Sent --> Overdue
                Sent --> Cancelled
                Viewed --> Paid
                Viewed --> Overdue
                Viewed --> Cancelled
                Overdue --> Paid
                Overdue --> Cancelled
                Paid --> [*]
                Cancelled --> [*]
                Deleted --> [*]`}
                 />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Compliance */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Compliance & Monitoring" section="compliance" />
          </CardHeader>
          {expandedSections.compliance && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Case Management & Investigation Workflow</h3>
                <p className="mb-6 leading-relaxed">
                  When an AML alert is triggered, a case is automatically created to track the investigation. Cases are the mechanism by which TAS ensures compliance requirements are met and audit trails are maintained. Every case includes decision documentation, evidence attachments, SLA tracking, and assignment history to ensure regulatory obligations are satisfied. The case system is designed to be audit-proof: every action creates an immutable record, and the workflow enforces that all alerts are resolved according to regulatory timelines.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Phase 1: Alert & Case Creation</strong> begins when the AML Screening service detects a potential match against sanctions lists, PEP databases, or other regulatory sources. The system immediately creates a Case record with type='aml_alert', severity based on the match confidence, and status='new'. The alert details (which list was matched, match percentage, company information) are captured in context_data. An automated notification is sent to all administrators with case management permissions, creating urgency for critical alerts.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Phase 2: Assignment & Investigation</strong> requires a compliance officer to review the alert and determine if it represents a genuine risk or a false positive. The officer examines the match confidence score, company jurisdiction, and beneficial ownership information. Many alerts are false positives caused by name similarities, especially for common business names in multiple countries. The officer may perform additional research using external sources (business registries, news archives, sanctions databases). All investigation work is documented in CaseNotes, which are timestamped and attributed to the investigating officer.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Phase 3: Determination & Resolution</strong> represents the officer's final decision. If the alert is determined to be a false positive, the case is marked approved and the organization's compliance score is not degraded. If the alert is confirmed as a genuine match to a sanctioned entity, the organization is immediately blocked and regulatory authorities are notified. If the determination is inconclusive, the organization is contacted to provide additional documentation for clarification.
                </p>
                <p className="mb-6 leading-relaxed">
                  <strong>Phase 4: Closure & Audit Trail</strong> finalizes the case with resolution notes, officer name, and resolution timestamp. The time_to_resolve_hours metric is calculated and compared against the SLA target. Cases that exceed SLA are flagged for compliance review. All case notes remain immutable and searchable for future audits or regulatory investigations.
                </p>
                <MermaidDiagram 
                   chart={`graph LR
                    A["AML Alert<br/>Detected"] --> B["Case Created<br/>Type: aml_alert<br/>Status: new"]
                    B --> C["Assignment<br/>assigned_to: Officer<br/>assigned_at: timestamp"]
                    C --> D["Investigation<br/>Review alert details<br/>Research company<br/>Add case notes"]

                    D --> E{Decision}

                    E -->|False Positive| F["Approved<br/>Resume workflows<br/>Score unchanged"]
                    E -->|Confirmed Risk| G["Rejected<br/>Block account<br/>Notify authorities"]
                    E -->|Inconclusive| H["Pending Info<br/>Request from org<br/>Extended timeline"]

                    F --> I["Case Closed<br/>resolved_at: timestamp<br/>SLA status: checked"]
                    G --> I
                    H --> I

                    I --> J["Audit Trail<br/>Immutable record<br/>For compliance audits"]

                    style A fill:#ffe0e0
                    style B fill:#fff3cd
                    style D fill:#e7f3ff
                    style F fill:#d4edda
                    style G fill:#f8d7da
                    style H fill:#fff3cd
                    style I fill:#d1ecf1
                    style J fill:#e2e3e5`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">AML Alert Severity & Response</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Severity</th>
                      <th className="border p-3 text-left">Alert Type</th>
                      <th className="border p-3 text-left">Response Required</th>
                      <th className="border p-3 text-center">SLA Target</th>
                      <th className="border p-3 text-left">Regulatory Duty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-red-50">
                      <td className="border p-3 font-bold text-red-600">CRITICAL</td>
                      <td className="border p-3">Sanction List Hit</td>
                      <td className="border p-3">Immediate escalation, block all transactions, SAR filing</td>
                      <td className="border p-3 text-center">&lt; 2 hours</td>
                      <td className="border p-3">FinCEN reporting</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="border p-3 font-bold text-orange-600">HIGH</td>
                      <td className="border p-3">PEP Match</td>
                      <td className="border p-3">Create case, obtain additional evidence, determine identity</td>
                      <td className="border p-3 text-center">&lt; 1 day</td>
                      <td className="border p-3">Enhanced due diligence</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-3 font-bold text-yellow-600">MEDIUM</td>
                      <td className="border p-3">Adverse Media</td>
                      <td className="border p-3">Review article, assess relevance and impact</td>
                      <td className="border p-3 text-center">&lt; 3 days</td>
                      <td className="border p-3">Risk assessment</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-bold text-blue-600">LOW</td>
                      <td className="border p-3">High-Risk Jurisdiction</td>
                      <td className="border p-3">Flag for review, apply standard due diligence</td>
                      <td className="border p-3 text-center">&lt; 5 days</td>
                      <td className="border p-3">Standard monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Footer */}
        <Card className="bg-gray-900 text-white">
          <CardContent className="pt-6">
            <div className="text-sm space-y-3">
              <p><strong>Document Version:</strong> 1.0</p>
              <p><strong>Last Updated:</strong> January 26, 2026</p>
              <p><strong>Classification:</strong> Internal - Technical Teams</p>
              <p><strong>Owner:</strong> Platform Engineering</p>
              <p className="text-xs mt-4 border-t border-gray-700 pt-4">© 2026 FTS.Money & Certizen Technologies. Internal use only.</p>
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDocumentation;