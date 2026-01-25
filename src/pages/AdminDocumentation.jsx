import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true, theme: 'default' });

const AdminDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const MermaidDiagram = ({ id, chart }) => {
    React.useEffect(() => {
      try {
        mermaid.contentLoaderContent(document.querySelector(`#${id}`));
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }, [id]);

    return (
      <div className="flex justify-center my-6 bg-white p-6 rounded-lg border border-gray-200 overflow-x-auto">
        <div id={id} className="mermaid">{chart}</div>
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
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Trust Anchor Service</h1>
          <h2 className="text-3xl text-gray-700 mb-4">Complete Technical Infrastructure & System Design</h2>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="default">Version 1.0</Badge>
            <Badge variant="secondary">Complete Reference</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
            <Badge className="bg-amber-100 text-amber-800">Internal - Technical Teams</Badge>
          </div>
          <p className="text-gray-600 mt-4">Document Owner: Platform Engineering</p>
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
                  id="arch-diagram"
                  chart={`graph TD
    A["🌐 Cloudflare CDN & WAF<br/>DDoS Protection • WAF Rules • Geo-Blocking"]
    B["🖥️ Portal Layer<br/>Admin • User • Public • Merchant"]
    C["⚖️ AWS ALB<br/>SSL • Load Balancing • Health Checks"]
    D["🔧 Application Services<br/>Verification • Billing • Compliance"]
    E["📊 Workflow Orchestration<br/>KYB → AML → Document → LEI → Monitor"]
    F["💾 PostgreSQL<br/>Transactional Data"]
    G["⚡ Redis<br/>Cache • Sessions • Rate Limits"]
    H["📋 SQS<br/>Async Queues"]
    I["📦 S3<br/>Documents • Backups"]
    
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
                <table className="w-full text-sm border-collapse">
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
                      <td className="border p-3">Redis keys: &quot;org_{id}:session:{session_id}&quot;. Impossible to iterate across organizations</td>
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
                  id="invoice-lifecycle"
                  chart={`stateDiagram-v2
              [*] --> Draft

              Draft --> Issued: issue()<br/>System: Record issue_date
              Draft --> Deleted: delete()<br/>Admin action

              Issued --> Sent: auto_email_enabled<br/>System: Send email
              Issued --> Viewed: payment received before<br/>customer views
              Issued --> Paid: payment_received
              Issued --> Overdue: due_date passed
              Issued --> Cancelled: admin cancel()

              Sent --> Viewed: customer opens<br/>Track viewed_at
              Sent --> Paid: payment_received
              Sent --> Overdue: due_date passed
              Sent --> Cancelled: admin cancel()

              Viewed --> Paid: payment_received
              Viewed --> Overdue: due_date passed
              Viewed --> Cancelled: admin cancel()

              Overdue --> Paid: payment_received<br/>Late payment accepted
              Overdue --> Cancelled: admin cancel()

              Paid --> [*]
              Cancelled --> [*]
              Deleted --> [*]

              note right of Draft
              Mutable state
              Can be edited or deleted
              end note

              note right of Paid
              Terminal state
              No further transitions
              end note`}
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
                  When an AML alert is triggered, a case is automatically created to track the investigation. Cases are the mechanism by which TAS ensures compliance requirements are met and audit trails are maintained. Every case includes decision documentation, evidence attachments, and SLA tracking to ensure regulatory obligations are satisfied.
                </p>
                <div className="bg-slate-100 p-6 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap">
{`WORKFLOW: AML Alert → Case Creation → Investigation → Resolution

┌─────────────────────────────────────────────────────────────┐
│ PHASE 1: ALERT & CASE CREATION                              │
├─────────────────────────────────────────────────────────────┤

Event: AML screening detects sanction list match
    ↓
System auto-creates Case:
    ├─ case_type = 'aml_alert'
    ├─ priority = alert.severity (CRITICAL/HIGH/MEDIUM)
    ├─ status = 'new'
    ├─ related_entity = Organization
    └─ context_data = Alert details + company info
    ↓
Admin receives notification email + dashboard alert
    ↓

┌─────────────────────────────────────────────────────────────┐
│ PHASE 2: ASSIGNMENT & INVESTIGATION                         │
├─────────────────────────────────────────────────────────────┤

Admin assigns case:
    ├─ assigned_to = Compliance Officer
    ├─ assigned_at = timestamp
    └─ Notify assignee via email
    ↓
Officer reviews:
    ├─ Alert details (which list, match confidence)
    ├─ Company information (name, country, registration)
    ├─ Historical data (previous alerts, compliance score)
    └─ External sources (news, sanctions databases)
    ↓
Officer adds CaseNotes:
    ├─ "Match appears to be false positive - different entity ID"
    ├─ "Company registered in Germany (different from OFAC hit in Russia)"
    └─ Attachments: Evidence screenshots, documentation
    ↓

┌─────────────────────────────────────────────────────────────┐
│ PHASE 3: DETERMINATION & RESOLUTION                         │
├─────────────────────────────────────────────────────────────┤

Officer makes determination:

Option A: FALSE POSITIVE
    ├─ resolution_action = 'approved'
    ├─ Set status = 'resolved'
    ├─ Resume customer workflows
    └─ Allow subsequent verifications

Option B: CONFIRMED RISK
    ├─ resolution_action = 'rejected'
    ├─ Block organization account
    ├─ Generate compliance report
    └─ Alert regulatory authorities

Option C: INCONCLUSIVE
    ├─ status = 'pending_info'
    ├─ Send message to organization
    └─ Request additional documentation
    ↓

┌─────────────────────────────────────────────────────────────┐
│ PHASE 4: CLOSURE & AUDIT TRAIL                              │
├─────────────────────────────────────────────────────────────┤

Case finalization:
    ├─ resolved_at = timestamp
    ├─ resolved_by = Officer name + email
    ├─ time_to_resolve_hours = (resolved_at - created_at)
    ├─ SLA_status = Check if within SLA target
    └─ Archive case
    ↓
Audit trail permanent:
    ├─ Every note timestamped and attributed
    ├─ Resolution tracked with evidence
    ├─ Metrics updated (resolve rate, avg time)
    └─ Available for compliance audits`}
                  </pre>
                </div>
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
              <p><strong>Last Updated:</strong> January 25, 2026</p>
              <p><strong>Classification:</strong> Internal - Technical Teams</p>
              <p><strong>Owner:</strong> Platform Engineering</p>
              <p className="text-xs mt-4 border-t border-gray-700 pt-4">© 2026 FTS.Money & Certizen Technologies. Internal use only.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDocumentation;