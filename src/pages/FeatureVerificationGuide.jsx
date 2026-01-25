import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FeatureVerificationGuide() {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [expandedPortal, setExpandedPortal] = useState(null);

  const phases = [
    {
      number: 1,
      name: 'Foundations',
      features: [
        'Entity schema (User, Organization, OnboardingApplication)',
        'Home page (marketing site)',
        'Pricing page',
        'About page',
        'Contact page'
      ]
    },
    {
      number: 2,
      name: 'User Onboarding & KYB',
      features: [
        'Onboarding page (5 steps)',
        'Form data collection',
        'Document upload',
        'AML screening trigger (runAmlScreening)',
        'Application status tracking',
        'Notification on submission'
      ]
    },
    {
      number: 3,
      name: 'Admin Portal & Case Management',
      features: [
        'AdminDashboard (15 tabs)',
        'Application approval workflow',
        'Case creation & assignment',
        'Case resolution with SLA tracking',
        'Internal/external notes',
        'Audit logging'
      ]
    },
    {
      number: 4,
      name: 'Analytics & Reporting',
      features: [
        'AdminReports page',
        'Metrics overview (KPI cards)',
        'Trend analysis (weekly)',
        'Export options (PDF, CSV, Excel, JSON)',
        'Dashboard charts (Recharts)'
      ]
    },
    {
      number: 5,
      name: 'Notifications & Events',
      features: [
        'Notification creation on key events',
        'Email notification delivery',
        'NotificationBell component',
        'NotificationCenter hub',
        'Unread/read/archived states',
        'Priority levels'
      ]
    },
    {
      number: 6,
      name: 'Web3 Ecosystem',
      features: [
        'Web3Dashboard page',
        'On-chain credential registration',
        'DeFi compliance monitoring',
        'Cross-chain identity linking',
        'Wallet connection',
        'Blockchain explorer links'
      ]
    },
    {
      number: 7,
      name: 'Provider Marketplace',
      features: [
        'ProviderMarketplace (6+ providers)',
        'Provider ratings & reviews',
        'Integration setup with API keys',
        'Health monitoring dashboard',
        'Uptime tracking',
        'Response time metrics'
      ]
    },
    {
      number: 8,
      name: 'Multi-Tenant Orchestration',
      features: [
        'PolicyFlowBuilder (custom workflows)',
        'OrgWebhookManager',
        'Custom policy deployment',
        'Workflow testing',
        'Multi-tenant isolation enforcement',
        'Organization-specific settings'
      ]
    }
  ];

  const portals = [
    {
      name: '🌐 Marketing Website',
      pages: ['Home', 'Pricing', 'About', 'Contact', 'UserLogin'],
      access: 'Public (No login)',
      testSteps: [
        'Browse Home page - see hero, services, pricing preview',
        'Click "Get Started" - should go to UserLogin',
        'View Pricing page - see all tiers',
        'Check About page - read platform info',
        'Contact page - see support info'
      ]
    },
    {
      name: '🏢 User Portal',
      pages: ['UserDashboard', 'Onboarding', 'ApplicationStatus', 'UserCompliance', 'UserCredentials', 'Workflows', 'Web3Dashboard', 'UserSettings'],
      access: 'Authenticated (Regular users)',
      testSteps: [
        'Login - redirects to UserDashboard',
        'Click "Start Onboarding" - go to Onboarding page',
        'Fill 5 steps of application form',
        'Submit - triggers AML screening',
        'View ApplicationStatus - shows current progress',
        'Wait for admin approval',
        'See LEI in UserCredentials after approval',
        'Check Web3Dashboard for on-chain registration'
      ]
    },
    {
      name: '🔐 Admin Portal',
      pages: ['AdminCp', 'AdminDashboard', 'AdminReports', 'AdminAnalytics', 'OrganizationOnboarding'],
      access: 'Authenticated (Admin only)',
      testSteps: [
        'Admin login - redirects to AdminDashboard',
        'Go to Applications tab - see pending apps',
        'Click app - review all details',
        'Click Approve - triggers LEI issuance',
        'View Workflows tab - see user workflows',
        'Go to Cases tab - manage escalations',
        'Check Audit Log - see all actions',
        'View Reports - export analytics',
        'Go to Providers tab - monitor uptime'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Feature Verification Guide</h1>
          <p className="text-gray-600">Complete walkthrough of all 8 phases across 3 portals</p>
        </div>

        {/* Portal Overview */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
          {portals.map((portal, idx) => (
            <Card key={idx} className="cursor-pointer" onClick={() => setExpandedPortal(expandedPortal === idx ? null : idx)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{portal.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{portal.access}</Badge>
                    {expandedPortal === idx ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
              </CardHeader>
              {expandedPortal === idx && (
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Pages:</p>
                    <div className="flex flex-wrap gap-2">
                      {portal.pages.map((page, pidx) => (
                        <Badge key={pidx}>{page}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Test Steps:</p>
                    <ol className="space-y-1">
                      {portal.testSteps.map((step, sidx) => (
                        <li key={sidx} className="text-sm text-gray-600 flex gap-2">
                          <Circle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Phases Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All 8 Phases</h2>
          <div className="space-y-4">
            {phases.map((phase) => (
              <Card key={phase.number} className="cursor-pointer" onClick={() => setExpandedPhase(expandedPhase === phase.number ? null : phase.number)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">{phase.number}</Badge>
                      <CardTitle>{phase.name}</CardTitle>
                    </div>
                    {expandedPhase === phase.number ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </CardHeader>
                {expandedPhase === phase.number && (
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Full Journey Test */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardHeader>
            <CardTitle>🚀 Complete User Journey Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">PHASE 1-2: ONBOARDING</p>
              <ol className="ml-4 space-y-1 text-sm text-gray-700">
                <li>✓ Browse Home page (public)</li>
                <li>✓ Click "Get Started" → UserLogin</li>
                <li>✓ Login as regular user → UserDashboard</li>
                <li>✓ Click "Start Onboarding" → Onboarding page</li>
                <li>✓ Fill all 5 steps</li>
                <li>✓ Submit application</li>
                <li>✓ Check ApplicationStatus page</li>
                <li>✓ Receive notification</li>
              </ol>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">PHASE 3: ADMIN REVIEW</p>
              <ol className="ml-4 space-y-1 text-sm text-gray-700">
                <li>✓ Admin login → AdminDashboard</li>
                <li>✓ Go to Applications tab</li>
                <li>✓ See submitted application</li>
                <li>✓ Review AML results</li>
                <li>✓ Click Approve</li>
                <li>✓ User receives approval notification</li>
                <li>✓ Check audit log for all actions</li>
              </ol>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">PHASE 5-6: CREDENTIALS & WEB3</p>
              <ol className="ml-4 space-y-1 text-sm text-gray-700">
                <li>✓ User goes to UserCredentials page</li>
                <li>✓ LEI code is now visible</li>
                <li>✓ vLEI credential listed</li>
                <li>✓ Go to Web3Dashboard</li>
                <li>✓ Register LEI on blockchain</li>
                <li>✓ Verify transaction on explorer</li>
              </ol>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">PHASE 7-8: CUSTOMIZATION</p>
              <ol className="ml-4 space-y-1 text-sm text-gray-700">
                <li>✓ Admin connects provider (Providers tab)</li>
                <li>✓ Create custom policy (Policies tab)</li>
                <li>✓ Test policy execution</li>
                <li>✓ Add org webhook (Webhooks tab)</li>
                <li>✓ Webhook fires on application event</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">📋 Feature Checklist</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold mb-1">Core Portal Features:</p>
              <ul className="space-y-0.5">
                <li>✓ Public marketing site</li>
                <li>✓ User authentication</li>
                <li>✓ 5-step onboarding</li>
                <li>✓ AML screening</li>
                <li>✓ LEI issuance</li>
                <li>✓ Admin approval</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Advanced Features:</p>
              <ul className="space-y-0.5">
                <li>✓ Case management</li>
                <li>✓ Web3 integration</li>
                <li>✓ Provider marketplace</li>
                <li>✓ Custom workflows</li>
                <li>✓ Webhooks</li>
                <li>✓ Analytics & reports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}