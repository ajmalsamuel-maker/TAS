import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Building2, Shield, Clock, Activity, FileCheck, Zap, Code, Check,
    Globe, Lock, TrendingUp, Users, Briefcase, Scale, Coins, Send
} from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <section className="pt-20 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold text-slate-900 mb-6">
                                Enterprise Identity & Compliance Platform
                            </h1>
                            <p className="text-xl text-slate-600 mb-4">
                                Multi-tenant B2B SaaS platform for LEI/vLEI issuance, KYB verification, AML screening, liveness detection, and automated compliance workflows
                            </p>
                            <p className="text-lg text-slate-500 mb-8">
                                Purpose-built for crypto exchanges, trade finance, law firms, corporate services, remittance providers, and enterprises
                            </p>
                            <div className="flex gap-4 mb-8">
                                <Link to={createPageUrl('Onboarding')}>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        Start Free Trial
                                    </Button>
                                </Link>
                                <Link to={createPageUrl('Contact')}>
                                    <Button size="lg" variant="outline">
                                        Contact Sales
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex gap-6 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    ISO 27001
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    LEI Certified
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    Global Standards
                                </div>
                            </div>
                        </div>

                        {/* Platform Capabilities Card */}
                        <Card className="bg-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl">Platform Capabilities</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <div className="text-4xl font-bold text-blue-600">99%</div>
                                        <div className="font-semibold">KYB Verification</div>
                                        <div className="text-sm text-slate-500">Accuracy rate</div>
                                    </div>
                                    <div className="text-center">
                                        <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <div className="text-4xl font-bold text-blue-600">24/7</div>
                                        <div className="font-semibold">AML Screening</div>
                                        <div className="text-sm text-slate-500">Real-time monitoring</div>
                                    </div>
                                    <div className="text-center">
                                        <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                        <div className="text-4xl font-bold text-blue-600">&lt;5s</div>
                                        <div className="font-semibold">vLEI Issuance</div>
                                        <div className="text-sm text-slate-500">Average time</div>
                                    </div>
                                    <div className="text-center">
                                        <Activity className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                                        <div className="text-4xl font-bold text-blue-600">Real-time</div>
                                        <div className="font-semibold">Transaction Monitoring</div>
                                        <div className="text-sm text-slate-500">TMaaS with rule engine</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <Link to={createPageUrl('TMaaSFeature')}>
                                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-4 text-center">
                                                <Activity className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                                                <div className="font-semibold text-sm">Real-time Transaction Monitoring</div>
                                                <div className="text-xs text-slate-500">TMaaS with rule engine</div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                    <Link to={createPageUrl('CaseManagementFeature')}>
                                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-4 text-center">
                                                <FileCheck className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                                <div className="font-semibold text-sm">SLA Case Management</div>
                                                <div className="text-xs text-slate-500">Auto-escalation</div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                    <Link to={createPageUrl('AuditComplianceFeature')}>
                                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-4 text-center">
                                                <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                                <div className="font-semibold text-sm">7yr Audit Logging</div>
                                                <div className="text-xs text-slate-500">Compliance ready</div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                    <Link to={createPageUrl('PolicyBuilderFeature')}>
                                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-4 text-center">
                                                <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                                <div className="font-semibold text-sm">A/B Policy Builder</div>
                                                <div className="text-xs text-slate-500">Visual + Testing</div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                                <div className="text-center pt-4 border-t">
                                    <Code className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-blue-600">REST</div>
                                    <div className="font-semibold">Unified API</div>
                                    <div className="text-sm text-slate-500">Single integration</div>
                                </div>
                                <div className="text-center text-sm text-slate-600">
                                    Complete multi-tenant isolation • Enterprise-grade security • Real-time processing
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Powered By Section */}
            <section className="py-8 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="text-sm text-slate-500 mb-4">Powered by</div>
                    <div className="flex justify-center items-center gap-12">
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/4191d6eef_Untitleddesign5.png" 
                            alt="Certizen Technology" 
                            className="h-12"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png" 
                            alt="FTS.Money" 
                            className="h-12"
                        />
                    </div>
                </div>
            </section>

            {/* Why TAS Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why TAS Platform?</h2>
                        <p className="text-xl text-slate-600">Skip months of integration work. Get enterprise-grade identity infrastructure in minutes.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <Lock className="w-10 h-10 text-blue-600 mb-4" />
                                <CardTitle>Multi-Tenant Isolation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600">Each organization gets a completely isolated workspace with dedicated data storage and access controls</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Code className="w-10 h-10 text-green-600 mb-4" />
                                <CardTitle>Unified API</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600">One API for KYB, AML, vLEI, and DID services - no need to integrate with multiple providers</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Zap className="w-10 h-10 text-purple-600 mb-4" />
                                <CardTitle>Deploy in Minutes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600">Pre-built workflows, fraud detection, and compliance automation ready out of the box</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Complete Stack Section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Complete Identity & Compliance Stack</h2>
                        <p className="text-xl text-slate-600">Everything you need to onboard businesses, verify identities, and issue credentials</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-t-4 border-t-blue-600">
                            <CardHeader>
                                <Building2 className="w-10 h-10 text-blue-600 mb-4" />
                                <CardTitle>KYB Verification</CardTitle>
                                <Badge className="mt-2">ISO 20275 & LEI Compliant</Badge>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-slate-600">Global business verification with UBO checks and regulatory compliance automation</p>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        195+ countries (ISO 3166-1)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        Real-time verification
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        FATF AML/CFT compliant
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="border-t-4 border-t-green-600">
                            <CardHeader>
                                <Shield className="w-10 h-10 text-green-600 mb-4" />
                                <CardTitle>AML Screening</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-slate-600">Comprehensive sanctions, PEP, and adverse media screening with continuous monitoring</p>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        Global watchlist coverage
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        Adverse media tracking
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        Real-time updates
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="border-t-4 border-t-purple-600">
                            <CardHeader>
                                <Globe className="w-10 h-10 text-purple-600 mb-4" />
                                <CardTitle>vLEI Credentials</CardTitle>
                                <Badge className="mt-2">ISO 17442 & KERI/ACDC</Badge>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-slate-600">LEI-based digital identity credentials with KERI/ACDC cryptographic verification</p>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        ACDC Cryptographic validation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        OOR & ECR roles (GLEIF)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" />
                                        KERI verified provenance
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-xl text-slate-600">Set up your workspace in minutes and start issuing credentials immediately</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: "1", title: "Create Workspace", desc: "Sign up and configure your isolated multi-tenant environment" },
                            { num: "2", title: "Invite Team", desc: "Add team members with role-based access controls" },
                            { num: "3", title: "Configure Workflows", desc: "Set up KYB, AML, and credential issuance policies" },
                            { num: "4", title: "Start Onboarding", desc: "Begin verifying businesses and issuing vLEI credentials" }
                        ].map((step) => (
                            <div key={step.num} className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Solutions */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Industry Solutions</h2>
                        <p className="text-xl text-slate-600">Purpose-built for your industry</p>
                    </div>
                    <div className="grid md:grid-cols-5 gap-6">
                        {[
                            { icon: Coins, title: "Crypto", desc: "LEI-verified institutional trading", page: "CryptoSolution" },
                            { icon: TrendingUp, title: "Trade Finance", desc: "SWIFT-integrated counterparty verification", page: "TradeFinanceSolution" },
                            { icon: Scale, title: "Legal", desc: "Multi-jurisdictional client onboarding", page: "LegalSolution" },
                            { icon: Briefcase, title: "CSPs", desc: "LEI issuance as a service", page: "CSPSolution" },
                            { icon: Send, title: "Remittance", desc: "Compliance-ready corridors", page: "RemittanceSolution" }
                        ].map((industry) => (
                            <Link key={industry.title} to={createPageUrl(industry.page)}>
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                    <CardContent className="p-6 text-center">
                                        <industry.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{industry.title}</h3>
                                        <p className="text-sm text-slate-600">{industry.desc}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Corporate Use Cases</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-slate-600">
                                    <li>• Vendor Onboarding</li>
                                    <li>• Partner Integration</li>
                                    <li>• Credential Issuance</li>
                                    <li>• Compliance Automation</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Web3 Business Operations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-slate-600">
                                    <li>• DAO Legal Setup</li>
                                    <li>• DeFi Compliance</li>
                                    <li>• Cross-Chain Identity</li>
                                    <li>• NFT Authentication</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Supply Chain Integration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-slate-600">
                                    <li>• Verified Identity</li>
                                    <li>• Automated Compliance</li>
                                    <li>• Secure Payments</li>
                                    <li>• Document Verification</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">B2B SaaS Pricing</h2>
                        <p className="text-xl text-slate-600">Multi-tenant workspaces with complete data isolation</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Starter",
                                price: "$1,500",
                                period: "/month",
                                features: [
                                    "Up to 100 LEI issuances/month",
                                    "5 team seats",
                                    "Basic KYB + AML",
                                    "Email support"
                                ],
                                cta: "Get Started",
                                link: "Onboarding"
                            },
                            {
                                name: "Business",
                                price: "$4,500",
                                period: "/month",
                                features: [
                                    "Up to 500 LEI issuances/month",
                                    "20 team seats",
                                    "Advanced fraud detection",
                                    "Priority support + Slack",
                                    "99.5% SLA"
                                ],
                                cta: "Get Started",
                                link: "Onboarding",
                                popular: true
                            },
                            {
                                name: "Enterprise",
                                price: "Custom",
                                period: "",
                                features: [
                                    "Unlimited issuances",
                                    "Unlimited seats",
                                    "Dedicated account manager",
                                    "White-label options",
                                    "99.9% SLA"
                                ],
                                cta: "Contact Sales",
                                link: "Contact"
                            }
                        ].map((plan) => (
                            <Card key={plan.name} className={plan.popular ? "border-blue-600 border-2" : ""}>
                                {plan.popular && (
                                    <div className="bg-blue-600 text-white text-center py-1 text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <div className="text-4xl font-bold text-slate-900 mt-4">
                                        {plan.price}
                                        <span className="text-lg text-slate-500">{plan.period}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={createPageUrl(plan.link)}>
                                        <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link to={createPageUrl('Pricing')} className="text-blue-600 hover:underline">
                            View Full Pricing Details
                        </Link>
                    </div>
                </div>
            </section>

            {/* Standards & Compliance */}
            <section className="py-20 px-6 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Standards & Compliance</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="font-bold mb-4">Identity Standards</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• LEI (Legal Entity Identifier)</li>
                                <li>• vLEI (verifiable LEI)</li>
                                <li>• ISO 3166-1</li>
                                <li>• ISO 20275</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Cryptography</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• KERI</li>
                                <li>• ACDC</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Compliance</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• FATF Recommendations</li>
                                <li>• ISO/IEC 27001</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Governance</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• GLEIF Standards</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-8 rounded-lg">
                        <h3 className="font-bold text-xl mb-4">Full Compliance & Standards:</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            TAS Platform is fully compliant with international standards including: LEI issuance (ISO 17442 - Legal Entity Identifier), 
                            cryptographic identity verification (KERI/ACDC), global regulatory frameworks (FATF AML/CFT, GDPR, SOX), 
                            data standards (ISO 3166-1 country codes, ISO 20275 entity legal forms, ISO 4217 currency codes), 
                            information security (ISO/IEC 27001, PCI DSS Level 1), and Web3 standards (W3C Verifiable Credentials, ACDC Authentic Chained Data Containers). 
                            The platform maintains continuous compliance with FinCEN regulations, OFAC sanctions requirements, and emerging digital identity standards globally.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8 text-center">
                            <Badge className="bg-slate-700">Identity: LEI (ISO 17442)</Badge>
                            <Badge className="bg-slate-700">Web3: ACDC, KERI, vLEI</Badge>
                            <Badge className="bg-slate-700">Security: ISO 27001</Badge>
                            <Badge className="bg-slate-700">Payments: PCI DSS L1</Badge>
                            <Badge className="bg-slate-700">Compliance: FATF, GDPR</Badge>
                            <Badge className="bg-slate-700">Data: ISO 3166-1, 20275</Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4">Identity Infrastructure for Modern Business</h2>
                    <p className="text-xl mb-8">Banks, fintechs, DAOs, and supply chains trust TAS to automate compliance and credential issuance</p>
                    <div className="grid md:grid-cols-4 gap-6 mb-12 text-left">
                        <div>
                            <div className="text-sm opacity-90">Developer documentation and API references</div>
                        </div>
                        <div>
                            <div className="text-sm opacity-90">Sandbox testing environment</div>
                        </div>
                        <div>
                            <div className="text-sm opacity-90">Integration guides and best practices</div>
                        </div>
                        <div>
                            <div className="text-sm opacity-90">Technical support and community</div>
                        </div>
                    </div>
                    <Link to={createPageUrl('Onboarding')}>
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                            Start Building with TAS
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}