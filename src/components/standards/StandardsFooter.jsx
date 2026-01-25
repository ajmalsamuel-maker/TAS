import React from 'react';
import { STANDARDS, COMPLIANCE_FRAMEWORKS } from './StandardsReference';
import { ExternalLink } from 'lucide-react';

export default function StandardsFooter() {
  return (
    <div className="bg-slate-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-lg font-bold mb-8">Standards & Compliance</h3>
        
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-4">Identity Standards</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.LEI.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.LEI.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.VLEI.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.VLEI.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.ISO_3166_1.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.ISO_3166_1.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.ISO_20275.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.ISO_20275.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-4">Cryptography</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.KERI.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.KERI.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.ACDC.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.ACDC.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-4">Compliance</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.FATF.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.FATF.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.ISO_27001.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.ISO_27001.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-4">Governance</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                <a href={STANDARDS.GLEIF.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  {STANDARDS.GLEIF.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 text-xs text-gray-400 space-y-3">
          <p><strong className="text-white">Full Compliance & Standards:</strong></p>
          <p>TAS Platform is fully compliant with international standards including: LEI issuance (ISO 17442 - Legal Entity Identifier), cryptographic identity verification (KERI/ACDC), global regulatory frameworks (FATF AML/CFT, GDPR, SOX), data standards (ISO 3166-1 country codes, ISO 20275 entity legal forms, ISO 4217 currency codes), information security (ISO/IEC 27001, PCI DSS Level 1), and Web3 standards (W3C Verifiable Credentials, ACDC Authentic Chained Data Containers). The platform maintains continuous compliance with FinCEN regulations, OFAC sanctions requirements, and emerging digital identity standards globally.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-xs">
            <div className="bg-slate-800 p-2 rounded">Identity: LEI (ISO 17442)</div>
            <div className="bg-slate-800 p-2 rounded">Web3: ACDC, KERI, vLEI</div>
            <div className="bg-slate-800 p-2 rounded">Security: ISO 27001</div>
            <div className="bg-slate-800 p-2 rounded">Payments: PCI DSS L1</div>
            <div className="bg-slate-800 p-2 rounded">Compliance: FATF, GDPR</div>
            <div className="bg-slate-800 p-2 rounded">Data: ISO 3166-1, 20275</div>
          </div>
        </div>
      </div>
    </div>
  );
}