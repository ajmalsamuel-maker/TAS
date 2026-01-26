// ISO 4217 Currency Codes
export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QAR' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KWD' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BHD' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'OMR' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COP' },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'ARS' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$' }
];

// Tax types by country (ISO standards: VAT Directive 2006/112/EC, OECD standards)
export const TAX_RULES_BY_COUNTRY = [
  // Europe - VAT (EU VAT Directive)
  { code: 'AT', tax_type: 'VAT', rate: 20, reverse_charge: true },
  { code: 'BE', tax_type: 'VAT', rate: 21, reverse_charge: true },
  { code: 'BG', tax_type: 'VAT', rate: 20, reverse_charge: true },
  { code: 'HR', tax_type: 'VAT', rate: 25, reverse_charge: true },
  { code: 'CY', tax_type: 'VAT', rate: 19, reverse_charge: true },
  { code: 'CZ', tax_type: 'VAT', rate: 21, reverse_charge: true },
  { code: 'DK', tax_type: 'VAT', rate: 25, reverse_charge: true },
  { code: 'EE', tax_type: 'VAT', rate: 20, reverse_charge: true },
  { code: 'FI', tax_type: 'VAT', rate: 24, reverse_charge: true },
  { code: 'FR', tax_type: 'VAT', rate: 20, reverse_charge: true },
  { code: 'DE', tax_type: 'VAT', rate: 19, reverse_charge: true },
  { code: 'GR', tax_type: 'VAT', rate: 24, reverse_charge: true },
  { code: 'HU', tax_type: 'VAT', rate: 27, reverse_charge: true },
  { code: 'IE', tax_type: 'VAT', rate: 23, reverse_charge: true },
  { code: 'IT', tax_type: 'VAT', rate: 22, reverse_charge: true },
  { code: 'LV', tax_type: 'VAT', rate: 21, reverse_charge: true },
  { code: 'LT', tax_type: 'VAT', rate: 21, reverse_charge: true },
  { code: 'LU', tax_type: 'VAT', rate: 17, reverse_charge: true },
  { code: 'MT', tax_type: 'VAT', rate: 18, reverse_charge: true },
  { code: 'NL', tax_type: 'VAT', rate: 21, reverse_charge: true },
  { code: 'PL', tax_type: 'VAT', rate: 23, reverse_charge: true },
  { code: 'PT', tax_type: 'VAT', rate: 23, reverse_charge: true },
  { code: 'RO', tax_type: 'VAT', rate: 19, reverse_charge: true },
  { code: 'SK', tax_type: 'VAT', rate: 20, reverse_charge: true },
  { code: 'SI', tax_type: 'VAT', rate: 22, reverse_charge: true },
  { code: 'ES', tax_type: 'VAT', rate: 21, reverse_charge: true },
  { code: 'SE', tax_type: 'VAT', rate: 25, reverse_charge: true },
  { code: 'GB', tax_type: 'VAT', rate: 20, reverse_charge: true },
  { code: 'NO', tax_type: 'VAT', rate: 25, reverse_charge: false },
  { code: 'CH', tax_type: 'VAT', rate: 7.7, reverse_charge: false },
  
  // Asia-Pacific - GST/VAT
  { code: 'AU', tax_type: 'GST', rate: 10, reverse_charge: false },
  { code: 'NZ', tax_type: 'GST', rate: 15, reverse_charge: false },
  { code: 'SG', tax_type: 'GST', rate: 9, reverse_charge: false },
  { code: 'MY', tax_type: 'SST', rate: 6, reverse_charge: false },
  { code: 'IN', tax_type: 'GST', rate: 18, reverse_charge: false },
  { code: 'ID', tax_type: 'VAT', rate: 11, reverse_charge: false },
  { code: 'PH', tax_type: 'VAT', rate: 12, reverse_charge: false },
  { code: 'TH', tax_type: 'VAT', rate: 7, reverse_charge: false },
  { code: 'VN', tax_type: 'VAT', rate: 10, reverse_charge: false },
  { code: 'JP', tax_type: 'Consumption Tax', rate: 10, reverse_charge: false },
  { code: 'KR', tax_type: 'VAT', rate: 10, reverse_charge: false },
  { code: 'CN', tax_type: 'VAT', rate: 13, reverse_charge: false },
  { code: 'TW', tax_type: 'VAT', rate: 5, reverse_charge: false },
  { code: 'HK', tax_type: 'None', rate: 0, reverse_charge: false },
  
  // Middle East
  { code: 'AE', tax_type: 'VAT', rate: 5, reverse_charge: false },
  { code: 'SA', tax_type: 'VAT', rate: 15, reverse_charge: false },
  { code: 'BH', tax_type: 'VAT', rate: 10, reverse_charge: false },
  { code: 'OM', tax_type: 'VAT', rate: 5, reverse_charge: false },
  { code: 'QA', tax_type: 'None', rate: 0, reverse_charge: false },
  { code: 'KW', tax_type: 'None', rate: 0, reverse_charge: false },
  { code: 'IL', tax_type: 'VAT', rate: 17, reverse_charge: false },
  
  // Americas
  { code: 'US', tax_type: 'Sales Tax', rate: 0, reverse_charge: false }, // Varies by state
  { code: 'CA', tax_type: 'GST/HST', rate: 5, reverse_charge: false }, // Federal + Provincial
  { code: 'MX', tax_type: 'IVA', rate: 16, reverse_charge: false },
  { code: 'BR', tax_type: 'IVA', rate: 17, reverse_charge: false },
  { code: 'CL', tax_type: 'IVA', rate: 19, reverse_charge: false },
  { code: 'CO', tax_type: 'IVA', rate: 19, reverse_charge: false },
  { code: 'AR', tax_type: 'IVA', rate: 21, reverse_charge: false },
  
  // Africa
  { code: 'ZA', tax_type: 'VAT', rate: 15, reverse_charge: false },
  { code: 'NG', tax_type: 'VAT', rate: 7.5, reverse_charge: false },
  { code: 'KE', tax_type: 'VAT', rate: 16, reverse_charge: false },
  { code: 'EG', tax_type: 'VAT', rate: 14, reverse_charge: false }
];

export function getCurrencySymbol(code) {
  return CURRENCIES.find(c => c.code === code)?.symbol || code;
}

export function getTaxRule(countryCode) {
  return TAX_RULES_BY_COUNTRY.find(t => t.code === countryCode);
}