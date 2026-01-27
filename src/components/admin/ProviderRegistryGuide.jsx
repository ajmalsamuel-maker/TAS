import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, GitBranch } from 'lucide-react';

export default function ProviderRegistryGuide() {
  return (
    <div className="space-y-6 p-6 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Provider Registry Architecture</h1>
        <p className="text-gray-600">Understanding the dual-registry system for service providers</p>
      </div>

      {/* Main Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Two Registry Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ProviderGlobal */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-lg mb-2">1. ProviderGlobal (Reference Library)</h3>
            <p className="text-gray-700 mb-3">
              Complete catalog of all available service providers worldwide. Acts as a marketplace/encyclopedia.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <Badge variant="outline">Read-only Reference</Badge>
                <Badge variant="outline">Global Catalog</Badge>
              </div>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li><strong>Purpose:</strong> Research, comparison, selection of providers</li>
                <li><strong>Users:</strong> Admins evaluating providers, selection teams</li>
                <li><strong>Data:</strong> Pricing, capabilities, compliance, pros/cons, alternatives</li>
                <li><strong>Examples:</strong> GLEIF, Alchemy, QuickNode, Certik, Chainalysis</li>
              </ul>
            </div>
          </div>

          {/* Provider */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg mb-2">2. Provider (Operational Configuration)</h3>
            <p className="text-gray-700 mb-3">
              Active, configured providers actually used by your system. Contains credentials and routing rules.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <Badge>Operational</Badge>
                <Badge>Active Configuration</Badge>
              </div>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li><strong>Purpose:</strong> Service routing, orchestration, monitoring</li>
                <li><strong>Users:</strong> System (automated), APIs</li>
                <li><strong>Data:</strong> API endpoints, keys, health status, priority weights, country routing</li>
                <li><strong>Examples:</strong> 3 instances of KYB providers, 2 AML providers, 1 Facia provider</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LEI/vLEI Provider Placement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            LEI/vLEI Issuers: Dual Placement Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              LEI and vLEI issuers should exist in <strong>BOTH registries</strong>
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4">
            {/* In ProviderGlobal */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-blue-700">In ProviderGlobal</h4>
              <p className="text-sm text-gray-600 mb-3">Entry: "GLEIF" provider record</p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✓ Provider info & capabilities</li>
                <li>✓ Pricing models</li>
                <li>✓ Compliance certifications</li>
                <li>✓ Pros and cons</li>
                <li>✓ Alternative LEI issuers</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
                <strong>Use case:</strong> Admins browse available LEI issuers globally
              </div>
            </div>

            {/* In Provider */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-green-700">In Provider</h4>
              <p className="text-sm text-gray-600 mb-3">Instance: "GLEIF-Production" configuration</p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✓ API endpoint URLs</li>
                <li>✓ API credentials (keys)</li>
                <li>✓ Health check config</li>
                <li>✓ Country routing rules</li>
                <li>✓ Current operational status</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded text-xs">
                <strong>Use case:</strong> System uses to actually issue LEI credentials
              </div>
            </div>
          </div>

          {/* Linking */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Linking the Two</h4>
            <p className="text-sm text-gray-600 mb-3">
              The Provider record includes <code className="bg-gray-100 px-2 py-1 rounded text-xs">operational_provider_id</code> pointing to its ProviderGlobal reference:
            </p>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono text-xs space-y-1">
              <div><strong>Provider "GLEIF-Production":</strong></div>
              <div className="text-gray-600">- operational_provider_id: &lt;ProviderGlobal.GLEIF.id&gt;</div>
              <div className="text-gray-600">- endpoint: https://api.gleif.org/...</div>
              <div className="text-gray-600">- api_key: secret123</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Web3 Providers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary">WEB3</Badge>
            Web3 Service Providers Added
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Expanded the global registry with these Web3 providers:
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="border rounded p-3">
                <h4 className="font-semibold text-sm">Alchemy</h4>
                <p className="text-xs text-gray-600 mt-1">Multi-chain NFT, wallet & data queries</p>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-semibold text-sm">QuickNode</h4>
                <p className="text-xs text-gray-600 mt-1">RPC endpoints across 5+ blockchains</p>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-semibold text-sm">Certik</h4>
                <p className="text-xs text-gray-600 mt-1">Smart contract audits & security scoring</p>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-semibold text-sm">Etherscan</h4>
                <p className="text-xs text-gray-600 mt-1">Address verification & transaction data</p>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-semibold text-sm">Chainalysis</h4>
                <p className="text-xs text-gray-600 mt-1">Enterprise crypto AML & risk scoring</p>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-semibold text-sm">GLEIF</h4>
                <p className="text-xs text-gray-600 mt-1">LEI issuance & verification (global)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Alert>
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <strong>Summary:</strong> Use ProviderGlobal as your decision/research layer and Provider as your operational layer. LEI/vLEI issuers appear in both, linked by <code className="bg-white px-1 rounded text-xs">operational_provider_id</code>.
        </AlertDescription>
      </Alert>
    </div>
  );
}