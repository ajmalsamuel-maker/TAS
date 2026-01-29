import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Server, Database, Lock, Code, GitBranch, 
  AlertTriangle, CheckCircle2, Clock, Zap 
} from 'lucide-react';

export default function MigrationGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Migration Guide: Base44 → Self-Hosted
          </h1>
          <p className="text-gray-600">
            Complete guide to migrate this TAS platform to AWS/Digital Ocean for PCI compliance
          </p>
        </div>

        {/* Warning */}
        <Alert className="mb-6 border-orange-300 bg-orange-50">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Estimated Timeline: 3-4 weeks</strong> - This is a complete backend rebuild, 
            not just a redeployment. Budget accordingly for development resources.
          </AlertDescription>
        </Alert>

        {/* Overview */}
        <Card className="mb-6 border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-6 w-6 text-[#0044CC]" />
              What Needs To Be Replaced
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-red-100 text-red-800 mt-1">Critical</Badge>
                <div>
                  <p className="font-semibold text-gray-900">Backend API Layer</p>
                  <p className="text-sm text-gray-600">All <code>base44.entities.*</code> calls need REST/GraphQL API endpoints</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-red-100 text-red-800 mt-1">Critical</Badge>
                <div>
                  <p className="font-semibold text-gray-900">Authentication System</p>
                  <p className="text-sm text-gray-600">Replace <code>base44.auth.*</code> with Auth0, Clerk, or custom JWT</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-red-100 text-red-800 mt-1">Critical</Badge>
                <div>
                  <p className="font-semibold text-gray-900">Database</p>
                  <p className="text-sm text-gray-600">PostgreSQL + Prisma/TypeORM for entity management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-orange-100 text-orange-800 mt-1">High</Badge>
                <div>
                  <p className="font-semibold text-gray-900">Backend Functions</p>
                  <p className="text-sm text-gray-600">Rewrite Deno functions as Express/Fastify API routes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-100 text-yellow-800 mt-1">Medium</Badge>
                <div>
                  <p className="font-semibold text-gray-900">Integration Services</p>
                  <p className="text-sm text-gray-600">Direct API calls to AML Watcher, Facia, KYB providers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="mb-6 border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-[#0044CC]" />
              Recommended Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Frontend (Keep)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    React 18 + Vite
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Tailwind CSS + shadcn/ui
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    React Query
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    React Router
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Backend (Build New)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    Node.js + Express/Fastify
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    PostgreSQL (PCI compliant)
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    Prisma ORM
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    Auth0 or Clerk
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    Redis (caching)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Steps */}
        <Card className="mb-6 border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-[#0044CC]" />
              Step-by-Step Migration Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Week 1 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Week 1: Infrastructure Setup</h3>
                </div>
                <div className="ml-7 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">1.</span>
                    <p className="text-gray-700">
                      <strong>AWS/DO Setup:</strong> Provision PostgreSQL RDS, EC2/Droplet for API, 
                      S3 for file storage, CloudFront/CDN
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">2.</span>
                    <p className="text-gray-700">
                      <strong>Export Data:</strong> Use Base44 API to export all entity data 
                      (Organizations, Applications, Transactions, Users, etc.)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">3.</span>
                    <p className="text-gray-700">
                      <strong>Database Schema:</strong> Convert Base44 entities to Prisma schema
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <pre className="text-xs overflow-x-auto">{`// Example: entities/Organization.json → prisma/schema.prisma
model Organization {
  id                  String   @id @default(uuid())
  name                String
  legal_name          String?
  organization_type   String
  lei                 String?
  country             String?
  subscription_tier   String   @default("starter")
  subscription_status String   @default("trial")
  tmaas_enabled       Boolean  @default(false)
  created_date        DateTime @default(now())
  updated_date        DateTime @updatedAt
  created_by          String
  
  applications        OnboardingApplication[]
  users               User[]
}`}</pre>
                  </div>
                </div>
              </div>

              {/* Week 2 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Week 2: Backend API Development</h3>
                </div>
                <div className="ml-7 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">1.</span>
                    <p className="text-gray-700">
                      <strong>REST API:</strong> Create Express server with routes for all entities
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <pre className="text-xs overflow-x-auto">{`// Backend: /api/organizations
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/organizations
app.get('/api/organizations', async (req, res) => {
  const orgs = await prisma.organization.findMany({
    where: { created_by: req.user.email }
  });
  res.json(orgs);
});

// POST /api/organizations
app.post('/api/organizations', async (req, res) => {
  const org = await prisma.organization.create({
    data: { ...req.body, created_by: req.user.email }
  });
  res.json(org);
});`}</pre>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <span className="font-mono text-blue-600">2.</span>
                    <p className="text-gray-700">
                      <strong>Auth Integration:</strong> Set up Auth0/Clerk, JWT middleware
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">3.</span>
                    <p className="text-gray-700">
                      <strong>Migrate Functions:</strong> Convert Base44 backend functions to API routes
                    </p>
                  </div>
                </div>
              </div>

              {/* Week 3 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Week 3: Frontend API Client</h3>
                </div>
                <div className="ml-7 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">1.</span>
                    <p className="text-gray-700">
                      <strong>Create API Client:</strong> Replace Base44 SDK with custom API wrapper
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <pre className="text-xs overflow-x-auto">{`// Frontend: src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Replace base44.entities.Organization.list()
export const entities = {
  Organization: {
    list: async () => {
      const { data } = await api.get('/organizations');
      return data;
    },
    create: async (orgData) => {
      const { data } = await api.post('/organizations', orgData);
      return data;
    },
    filter: async (query) => {
      const { data } = await api.get('/organizations', { params: query });
      return data;
    }
  }
  // Repeat for all entities...
};

// Replace base44.auth.me()
export const auth = {
  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
  logout: () => {
    // Auth0/Clerk logout
  }
};`}</pre>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <span className="font-mono text-blue-600">2.</span>
                    <p className="text-gray-700">
                      <strong>Find & Replace:</strong> Replace all <code>base44.*</code> imports with your API client
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <pre className="text-xs overflow-x-auto">{`// Before:
import { base44 } from '@/api/base44Client';
const orgs = await base44.entities.Organization.list();

// After:
import { entities } from '@/api/client';
const orgs = await entities.Organization.list();`}</pre>
                  </div>
                </div>
              </div>

              {/* Week 4 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Week 4: Integration & Testing</h3>
                </div>
                <div className="ml-7 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">1.</span>
                    <p className="text-gray-700">
                      <strong>Third-Party APIs:</strong> Direct integration with AML Watcher, Facia, KYB providers
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">2.</span>
                    <p className="text-gray-700">
                      <strong>Data Migration:</strong> Import exported data into PostgreSQL
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">3.</span>
                    <p className="text-gray-700">
                      <strong>PCI Compliance:</strong> Implement encryption, audit logging, access controls
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">4.</span>
                    <p className="text-gray-700">
                      <strong>Testing:</strong> End-to-end testing, security audit, load testing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment */}
        <Card className="mb-6 border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-6 w-6 text-[#0044CC]" />
              Deployment Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <pre className="text-sm overflow-x-auto">{`┌─────────────────────────────────────────────┐
│           AWS / Digital Ocean               │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐      ┌─────────────────┐ │
│  │   CloudFront │──────│  S3 (Frontend)  │ │
│  │     (CDN)    │      │   React Build   │ │
│  └──────────────┘      └─────────────────┘ │
│         │                                   │
│         │                                   │
│  ┌──────▼────────────────────────────────┐ │
│  │     Load Balancer (ALB/NGINX)        │ │
│  └──────┬────────────────────────────────┘ │
│         │                                   │
│         ├──────────┬──────────┬───────────┤│
│  ┌──────▼──┐ ┌────▼───┐ ┌────▼────┐      ││
│  │ API     │ │ API    │ │ API     │      ││
│  │ Server  │ │ Server │ │ Server  │      ││
│  │ (Node)  │ │ (Node) │ │ (Node)  │      ││
│  └────┬────┘ └────┬───┘ └────┬────┘      ││
│       │           │           │           ││
│       └───────────┴───────────┘           ││
│                   │                        │
│            ┌──────▼──────┐                 │
│            │ PostgreSQL  │                 │
│            │   (RDS)     │                 │
│            └─────────────┘                 │
│                                             │
│  ┌─────────────┐     ┌──────────────────┐ │
│  │   Redis     │     │  External APIs   │ │
│  │  (Cache)    │     │  - AML Watcher   │ │
│  └─────────────┘     │  - Facia         │ │
│                      │  - KYB Providers │ │
│                      └──────────────────┘ │
└─────────────────────────────────────────────┘`}</pre>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Frontend:</strong> Vite build → S3 → CloudFront CDN</p>
              <p><strong>Backend:</strong> Node.js API on EC2/ECS/App Platform (auto-scaling)</p>
              <p><strong>Database:</strong> PostgreSQL RDS (Multi-AZ for HA)</p>
              <p><strong>Cache:</strong> Redis ElastiCache</p>
              <p><strong>Storage:</strong> S3 for documents/files</p>
            </div>
          </CardContent>
        </Card>

        {/* PCI Compliance */}
        <Card className="mb-6 border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-6 w-6 text-green-600" />
              PCI Compliance Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {[
                'Encrypt all data in transit (TLS 1.2+)',
                'Encrypt all data at rest (AES-256)',
                'Implement strong access controls (MFA, RBAC)',
                'Maintain audit logs for all data access',
                'Regular security scanning & penetration testing',
                'Network segmentation (VPC, Security Groups)',
                'Tokenize sensitive payment data',
                'Regular backups with encryption',
                'Incident response plan',
                'Annual PCI DSS audit'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Estimate */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-[#0044CC]" />
              Estimated Monthly Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">EC2/App Platform (API servers)</span>
                <span className="font-semibold">$150-300/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">PostgreSQL RDS (Multi-AZ)</span>
                <span className="font-semibold">$200-400/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Redis ElastiCache</span>
                <span className="font-semibold">$50-100/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">S3 + CloudFront</span>
                <span className="font-semibold">$20-50/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Load Balancer</span>
                <span className="font-semibold">$20-40/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Backups & Monitoring</span>
                <span className="font-semibold">$30-60/mo</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                <span className="font-bold text-gray-900">Total Infrastructure</span>
                <span className="font-bold text-[#0044CC]">$470-950/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">+ Auth0/Clerk</span>
                <span className="font-semibold">$25-100/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">+ PCI Compliance Audit</span>
                <span className="font-semibold">$1,500-5,000 annually</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Notes */}
        <Alert className="mt-6 border-blue-300 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <strong>Note:</strong> This guide provides a roadmap. Actual implementation will require 
            experienced full-stack developers familiar with Node.js, PostgreSQL, AWS/DO, and PCI compliance. 
            Consider hiring a DevOps engineer for infrastructure setup and security hardening.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}