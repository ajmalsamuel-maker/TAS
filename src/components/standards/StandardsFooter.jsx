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

        <div className="border-t border-slate-700 pt-6 text-xs text-gray-400">
          <p>TAS Platform complies with LEI issuance standards (ISO 17442), cryptographic verification (KERI/ACDC), and global compliance frameworks (FATF, GDPR, ISO 27001). All data collection and processing adheres to ISO 3166-1 (country codes), ISO 20275 (entity legal forms), and ISO 4217 (currency codes).</p>
        </div>
      </div>
    </div>
  );
}