import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MarketingWebsiteDocumentation = () => {
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
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Marketing Website Documentation</h1>
          <h2 className="text-3xl text-gray-700 mb-4">Public Offering & Platform Information</h2>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="default">Marketing Guide</Badge>
            <Badge variant="secondary">Public Website</Badge>
            <Badge variant="secondary">2026-01-25</Badge>
            <Badge className="bg-amber-100 text-amber-800">Public Facing</Badge>
          </div>
          <p className="text-gray-600 mt-4">For: Marketing & Product Teams</p>
        </div>

        {/* Website Structure */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-3xl font-bold">Public Website Structure</h2>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-bold mb-4">Website Navigation & Pages</h3>
              <p className="mb-6 leading-relaxed">
                The Trust Anchor Service marketing website is designed to attract, educate, and convert business decision-makers seeking enterprise-grade compliance infrastructure. The site follows a classic SaaS marketing structure with clear value propositions, customer testimonials, technical documentation, and strong calls-to-action throughout the funnel.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-2">Home / Landing</p>
                  <p className="text-sm">Hero section with value prop, problem/solution, three-tier pricing, CTA</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <p className="font-bold mb-2">About / Solutions</p>
                  <p className="text-sm">Company mission, team bios, customer logos, use cases by industry</p>
                </div>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-2">Pricing</p>
                  <p className="text-sm">Feature comparison, plan details, ROI calculator, FAQ</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded border-l-4 border-indigo-600">
                  <p className="font-bold mb-2">Documentation / Contact</p>
                  <p className="text-sm">API docs, blog, knowledge base, contact form, sales calendar</p>
                </div>
              </div>

              <MermaidDiagram 
                chart={`graph TB
                  A["Landing Page<br/>hero, value prop<br/>social proof"]
                  B["Solutions Page<br/>industry use cases<br/>features by role"]
                  C["Pricing Page<br/>plans & features<br/>ROI calculator"]
                  D["Documentation<br/>API, blog<br/>knowledge base"]
                  E["Contact/Demo<br/>sales form<br/>calendar booking"]
                  F["User Login<br/>portal access"]
                  G["Admin Login<br/>admin access"]

                  A --> B
                  A --> C
                  A --> D
                  A --> E
                  E --> F
                  E --> G

                  style A fill:#e3f2fd
                  style B fill:#f3e5f5
                  style C fill:#fff3e0
                  style D fill:#e8f5e9
                  style E fill:#fce4ec
                  style F fill:#d4edda
                  style G fill:#d4edda`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Messaging & Value Props */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Messaging & Value Propositions" section="messaging" />
          </CardHeader>
          {expandedSections.messaging && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Core Value Propositions by Audience</h3>
                <p className="mb-6 leading-relaxed">
                  TAS appeals to different personas with different value propositions. A CFO cares about cost reduction and operational efficiency. A Chief Compliance Officer cares about regulatory risk mitigation. A CTO cares about API integration and scalability. Our marketing messaging is tailored to each persona with specific metrics and benefits that matter to them.
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-6 rounded border-l-4 border-blue-600">
                    <p className="font-bold text-lg mb-3">💰 For Finance / CFO</p>
                    <ul className="text-sm space-y-2 ml-4">
                      <li>• <strong>95% cost reduction</strong> vs traditional KYB providers</li>
                      <li>• <strong>$15K annual savings</strong> per 1000 verifications</li>
                      <li>• Eliminate manual compliance team overhead</li>
                      <li>• Transparent, per-verification pricing</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded border-l-4 border-blue-600">
                    <p className="font-bold text-lg mb-3">🛡️ For Compliance / Chief Compliance Officer</p>
                    <ul className="text-sm space-y-2 ml-4">
                      <li>• <strong>99.9% accuracy</strong> with multi-layer validation</li>
                      <li>• <strong>24/7 continuous monitoring</strong> of all entities</li>
                      <li>• Automated audit trails for regulatory audits</li>
                      <li>• PCI DSS Level 1 certified, multi-jurisdiction compliant</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded border-l-4 border-indigo-600">
                    <p className="font-bold text-lg mb-3">⚙️ For Operations / CTO</p>
                    <ul className="text-sm space-y-2 ml-4">
                      <li>• <strong>REST API</strong> with 100ms latency, 99.95% uptime SLA</li>
                      <li>• <strong>Webhook integrations</strong> for real-time compliance updates</li>
                      <li>• <strong>2-5 hour verification</strong> time, 90% automated</li>
                      <li>• Horizontal scaling to 100,000+ concurrent users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Target Industries & Use Cases</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Industry</th>
                      <th className="border p-3 text-left">Primary Need</th>
                      <th className="border p-3 text-left">Key Message</th>
                      <th className="border p-3 text-left">ROI Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">Banking & Finance</td>
                      <td className="border p-3">AML/KYB compliance for account opening</td>
                      <td className="border p-3">Reduce onboarding time from weeks to hours</td>
                      <td className="border p-3">Customer acquisition speed</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3 font-semibold">Payments & Fintech</td>
                      <td className="border p-3">Merchant verification for payment processing</td>
                      <td className="border p-3">Lower fraud, higher approval rates</td>
                      <td className="border p-3">Volume capacity, margin improvement</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="border p-3 font-semibold">Cryptocurrency</td>
                      <td className="border p-3">Web3 identity & compliance</td>
                      <td className="border p-3">vLEI credentials for blockchain integration</td>
                      <td className="border p-3">Regulatory approval, institutional access</td>
                    </tr>
                    <tr className="hover:bg-amber-50">
                      <td className="border p-3 font-semibold">Insurance</td>
                      <td className="border p-3">Underwriting risk assessment</td>
                      <td className="border p-3">Faster claims processing, lower fraud</td>
                      <td className="border p-3">Loss ratio improvement</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="border p-3 font-semibold">Legal/Compliance</td>
                      <td className="border p-3">Due diligence automation</td>
                      <td className="border p-3">Reduce document review time by 80%</td>
                      <td className="border p-3">Lawyer billable hours, paralegal overhead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Pricing Strategy */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Pricing & Packaging" section="pricing" />
          </CardHeader>
          {expandedSections.pricing && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Tiered Pricing Model</h3>
                <p className="mb-6 leading-relaxed">
                  TAS uses value-based pricing tied to verification volume and feature access. The three tiers (Starter, Business, Enterprise) are designed for different organization sizes and compliance maturity levels. Pricing is transparent with no hidden fees—customers pay for what they use with predictable monthly invoices.
                </p>

                <MermaidDiagram 
                  chart={`graph TB
                    A["Organization Size"]
                    B["Starter<br/>$99/month<br/>50 KYB/month<br/>Email support"]
                    C["Business<br/>$299/month<br/>200 KYB/month<br/>LEI issuance<br/>24/7 Chat support"]
                    D["Enterprise<br/>Custom pricing<br/>Unlimited volume<br/>Dedicated account<br/>Phone support"]

                    A --> B
                    A --> C
                    A --> D

                    E["Usage Overage<br/>Per verification<br/>Charged monthly"]
                    B --> E
                    C --> E
                    D --> E

                    style A fill:#e3f2fd
                    style B fill:#fff3e0
                    style C fill:#e8f5e9
                    style D fill:#fce4ec
                    style E fill:#f1f8e9`}
                />

                <table className="w-full text-sm border-collapse mt-8">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Metric</th>
                      <th className="border p-3 text-center">Starter</th>
                      <th className="border p-3 text-center">Business</th>
                      <th className="border p-3 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">Monthly Price</td>
                      <td className="border p-3 text-center font-bold">$99</td>
                      <td className="border p-3 text-center font-bold">$299</td>
                      <td className="border p-3 text-center font-bold">Custom</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">KYB Verifications Included</td>
                      <td className="border p-3 text-center">50</td>
                      <td className="border p-3 text-center">200</td>
                      <td className="border p-3 text-center">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">Cost Per Verification</td>
                      <td className="border p-3 text-center">$1.98</td>
                      <td className="border p-3 text-center">$1.50</td>
                      <td className="border p-3 text-center">Negotiated</td>
                    </tr>
                    <tr className="hover:bg-indigo-50">
                      <td className="border p-3">Overage Price</td>
                      <td className="border p-3 text-center">$2.00 / each</td>
                      <td className="border p-3 text-center">$1.75 / each</td>
                      <td className="border p-3 text-center">Negotiated</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">LEI Issuance</td>
                      <td className="border p-3 text-center">❌</td>
                      <td className="border p-3 text-center">✅ Included</td>
                      <td className="border p-3 text-center">✅ Included</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">Continuous Monitoring</td>
                      <td className="border p-3 text-center">❌</td>
                      <td className="border p-3 text-center">✅ 6 months</td>
                      <td className="border p-3 text-center">✅ Unlimited</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">API Access</td>
                      <td className="border p-3 text-center">❌</td>
                      <td className="border p-3 text-center">✅</td>
                      <td className="border p-3 text-center">✅</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3">Support</td>
                      <td className="border p-3 text-center">Email</td>
                      <td className="border p-3 text-center">Chat + Email</td>
                      <td className="border p-3 text-center">24/7 Phone + Dedicated</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3">SLA Uptime</td>
                      <td className="border p-3 text-center">99.5%</td>
                      <td className="border p-3 text-center">99.9%</td>
                      <td className="border p-3 text-center">99.95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Pricing Rationale & Economics</h3>
                <div className="bg-blue-50 p-6 rounded border-l-4 border-blue-600">
                  <p className="font-bold mb-3">Why These Prices?</p>
                  <p className="text-sm leading-relaxed">
                    Starter ($99) is designed for small businesses and nonprofits that need basic verification. Business ($299) targets SMBs and mid-market companies that need API integration and continuous monitoring. Enterprise pricing is negotiated based on volume commitments, custom SLAs, and dedicated support requirements. The pricing is 80-90% cheaper than traditional KYB providers (Dun & Bradstreet, Bloomberg Terminal) while providing higher accuracy and speed.
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Sales Funnel & Conversion */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Sales Funnel & Customer Journey" section="funnel" />
          </CardHeader>
          {expandedSections.funnel && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">From Awareness to Customer</h3>
                <p className="mb-6 leading-relaxed">
                  The TAS customer journey follows a standard SaaS funnel with five stages: Awareness (discovery via search, ads, content), Consideration (visiting website, comparing competitors), Intent (requesting demo, talking to sales), Decision (trial period, contract negotiation), and Onboarding (account setup, first verification). Each stage has specific objectives and metrics.
                </p>

                <MermaidDiagram 
                  chart={`graph TB
                    A["1. Awareness<br/>Search, ads, content<br/>1000s of visitors<br/>Goal: Drive to website"]
                    B["2. Consideration<br/>Read about TAS<br/>Compare pricing<br/>Watch demo video<br/>Goal: Generate interest"]
                    C["3. Intent<br/>Request demo<br/>Talk to sales<br/>Free trial signup<br/>Goal: Demo scheduled"]
                    D["4. Decision<br/>Trial period<br/>Contract negotiation<br/>Security review<br/>Goal: Closed deal"]
                    E["5. Onboarding<br/>Account setup<br/>Team training<br/>First verification<br/>Goal: Active customer"]

                    A --> B
                    B --> C
                    C --> D
                    D --> E

                    style A fill:#e3f2fd
                    style B fill:#fff3e0
                    style C fill:#fce4ec
                    style D fill:#f8d7da
                    style E fill:#d4edda`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Conversion Metrics & Targets</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Stage</th>
                      <th className="border p-3 text-left">Traffic / Users</th>
                      <th className="border p-3 text-center">Conversion Rate</th>
                      <th className="border p-3 text-left">Typical Duration</th>
                      <th className="border p-3 text-left">Key Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3 font-semibold">Awareness</td>
                      <td className="border p-3">10,000 monthly visitors</td>
                      <td className="border p-3 text-center">2-5%</td>
                      <td className="border p-3">—</td>
                      <td className="border p-3">Land on homepage</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-3 font-semibold">Consideration</td>
                      <td className="border p-3">200-500 visitors</td>
                      <td className="border p-3 text-center">10-15%</td>
                      <td className="border p-3">2-5 days</td>
                      <td className="border p-3">Browse website, read docs</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="border p-3 font-semibold">Intent</td>
                      <td className="border p-3">20-75 qualified leads</td>
                      <td className="border p-3 text-center">25-40%</td>
                      <td className="border p-3">1-3 days</td>
                      <td className="border p-3">Request demo / free trial</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="border p-3 font-semibold">Decision</td>
                      <td className="border p-3">5-30 sales conversations</td>
                      <td className="border p-3 text-center">30-50%</td>
                      <td className="border p-3">1-2 weeks</td>
                      <td className="border p-3">Contract signed</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3 font-semibold">Onboarding</td>
                      <td className="border p-3">2-15 new customers</td>
                      <td className="border p-3 text-center">90-95%</td>
                      <td className="border p-3">1-2 weeks</td>
                      <td className="border p-3">First verification submitted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Content & SEO Strategy */}
        <Card className="mb-8">
          <CardHeader>
            <SectionHeader title="Content & SEO Strategy" section="content" />
          </CardHeader>
          {expandedSections.content && (
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Content Marketing Pillars</h3>
                <p className="mb-6 leading-relaxed">
                  TAS content strategy targets different search intents across the compliance and fintech industries. We create educational content (how to guides, whitepapers), thought leadership (industry trends, regulatory changes), product content (feature guides, API docs), and sales enablement (ROI calculators, case studies). This multi-format approach improves search visibility and establishes TAS as a thought leader in the space.
                </p>

                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                    <p className="font-bold">Educational Content</p>
                    <p className="text-sm mt-2">Blog posts, whitepapers, guides on compliance topics (KYB 101, AML screening best practices, LEI overview)</p>
                    <p className="text-xs text-gray-600 mt-2">SEO Target: High-volume keywords (10K+ searches/month)</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                    <p className="font-bold">Thought Leadership</p>
                    <p className="text-sm mt-2">Industry reports, regulatory analysis, predictions on compliance trends</p>
                    <p className="text-xs text-gray-600 mt-2">Audience: C-suite, decision makers, industry publications</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-600">
                    <p className="font-bold">Product Content</p>
                    <p className="text-sm mt-2">API documentation, feature guides, integration tutorials</p>
                    <p className="text-xs text-gray-600 mt-2">Audience: Developers, technical teams, API users</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-600">
                    <p className="font-bold">Sales Enablement</p>
                    <p className="text-sm mt-2">Case studies, ROI calculators, competitor comparisons, customer testimonials</p>
                    <p className="text-xs text-gray-600 mt-2">Audience: Prospects in decision stage, sales team</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Top Target Keywords & Search Volume</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border p-3 text-left">Keyword</th>
                      <th className="border p-3 text-center">Monthly Volume</th>
                      <th className="border p-3 text-left">Search Intent</th>
                      <th className="border p-3 text-left">Content Format</th>
                      <th className="border p-3 text-center">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-red-50">
                      <td className="border p-3">"KYB verification" / "Know Your Business"</td>
                      <td className="border p-3 text-center">12K</td>
                      <td className="border p-3">Educational</td>
                      <td className="border p-3">Blog post + whitepaper</td>
                      <td className="border p-3 text-center">★★★</td>
                    </tr>
                    <tr className="hover:bg-orange-50">
                      <td className="border p-3">"AML screening" / "Anti-money laundering"</td>
                      <td className="border p-3 text-center">8K</td>
                      <td className="border p-3">Educational</td>
                      <td className="border p-3">Blog post + guide</td>
                      <td className="border p-3 text-center">★★★</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-3">"LEI issuance" / "Legal Entity Identifier"</td>
                      <td className="border p-3 text-center">6K</td>
                      <td className="border p-3">Educational</td>
                      <td className="border p-3">Blog post + API guide</td>
                      <td className="border p-3 text-center">★★★</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="border p-3">"Compliance software" / "Verification SaaS"</td>
                      <td className="border p-3 text-center">5K</td>
                      <td className="border p-3">Transactional</td>
                      <td className="border p-3">Comparison guide</td>
                      <td className="border p-3 text-center">★★★</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="border p-3">"Business onboarding" / "Customer verification"</td>
                      <td className="border p-3 text-center">4K</td>
                      <td className="border p-3">Solution</td>
                      <td className="border p-3">Case study</td>
                      <td className="border p-3 text-center">★★</td>
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
              <p><strong>Classification:</strong> Marketing Internal</p>
              <p><strong>Target Audience:</strong> Marketing & Product Teams</p>
              <p className="text-xs mt-4 border-t border-gray-700 pt-4">© 2026 FTS.Money & Certizen Technologies. Marketing documentation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingWebsiteDocumentation;