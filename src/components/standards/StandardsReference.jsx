// Global standards reference - used across the platform
export const STANDARDS = {
  ISO_27001: {
    name: 'ISO/IEC 27001',
    description: 'Information Security Management',
    url: 'https://www.iso.org/standard/54534.html',
    category: 'Security'
  },
  ISO_3166_1: {
    name: 'ISO 3166-1',
    description: 'Country codes (Alpha-2)',
    url: 'https://www.iso.org/standard/63545.html',
    category: 'Geography'
  },
  ISO_20275: {
    name: 'ISO 20275',
    description: 'Entity Legal Form codes (ELF)',
    url: 'https://www.iso.org/standard/67255.html',
    category: 'Legal'
  },
  ISO_4217: {
    name: 'ISO 4217',
    description: 'Currency codes',
    url: 'https://www.iso.org/standard/64758.html',
    category: 'Finance'
  },
  LEI: {
    name: 'LEI (Legal Entity Identifier)',
    description: 'ISO 17442 - Global entity identification',
    url: 'https://www.gleif.org/',
    category: 'Identity'
  },
  VLEI: {
    name: 'vLEI (verifiable LEI)',
    description: 'Cryptographically verifiable LEI credential',
    url: 'https://www.gleif.org/en/vlei',
    category: 'Identity'
  },
  KERI: {
    name: 'KERI (Key Event Receipt Infrastructure)',
    description: 'Cryptographic verification and trust',
    url: 'https://keri.one/',
    category: 'Cryptography'
  },
  ACDC: {
    name: 'ACDC (Authentic Chained Data Container)',
    description: 'Credential format for vLEI',
    url: 'https://github.com/WebOfTrust/acdc',
    category: 'Cryptography'
  },
  FATF: {
    name: 'FATF Recommendations',
    description: 'Financial Action Task Force AML/CFT standards',
    url: 'https://www.fatf-gafi.org/recommendations.html',
    category: 'Compliance'
  },
  GLEIF: {
    name: 'GLEIF Standards',
    description: 'Global Legal Entity Identifier Foundation',
    url: 'https://www.gleif.org/',
    category: 'Governance'
  }
};

export const COMPLIANCE_FRAMEWORKS = {
  AML_CFT: {
    name: 'AML/CFT',
    description: 'Anti-Money Laundering / Counter-Terrorist Financing',
    standard: 'FATF Recommendations'
  },
  KYB: {
    name: 'KYB',
    description: 'Know Your Business',
    standard: 'ISO 20275 + LEI'
  },
  KYC: {
    name: 'KYC',
    description: 'Know Your Customer',
    standard: 'FATF Recommendations'
  },
  GDPR: {
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    standard: 'EU Regulation 2016/679'
  },
  SOC2: {
    name: 'SOC 2 Type II',
    description: 'Security, Availability, Processing Integrity',
    standard: 'AICPA Standards'
  }
};

export const getStandardBadge = (standard) => {
  const std = STANDARDS[standard];
  return std ? `${std.name} - ${std.description}` : standard;
};

export const getComplianceBadge = (framework) => {
  const fw = COMPLIANCE_FRAMEWORKS[framework];
  return fw ? `${fw.name} (${fw.standard})` : framework;
};