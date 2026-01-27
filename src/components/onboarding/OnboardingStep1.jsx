import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, CheckCircle2, Loader, Building2 } from 'lucide-react';
import { toast } from 'sonner';

// ISO 3166-1 Alpha-2 Country Standards
const ISO_COUNTRIES = [
  { code: 'AD', name: 'Andorra' }, { code: 'AE', name: 'United Arab Emirates' }, { code: 'AF', name: 'Afghanistan' }, { code: 'AG', name: 'Antigua and Barbuda' }, { code: 'AI', name: 'Anguilla' }, { code: 'AL', name: 'Albania' }, { code: 'AM', name: 'Armenia' }, { code: 'AO', name: 'Angola' }, { code: 'AQ', name: 'Antarctica' }, { code: 'AR', name: 'Argentina' }, { code: 'AS', name: 'American Samoa' }, { code: 'AT', name: 'Austria' }, { code: 'AU', name: 'Australia' }, { code: 'AW', name: 'Aruba' }, { code: 'AX', name: 'Åland Islands' }, { code: 'AZ', name: 'Azerbaijan' }, { code: 'BA', name: 'Bosnia and Herzegovina' }, { code: 'BB', name: 'Barbados' }, { code: 'BD', name: 'Bangladesh' }, { code: 'BE', name: 'Belgium' }, { code: 'BF', name: 'Burkina Faso' }, { code: 'BG', name: 'Bulgaria' }, { code: 'BH', name: 'Bahrain' }, { code: 'BI', name: 'Burundi' }, { code: 'BJ', name: 'Benin' }, { code: 'BL', name: 'Saint Barthélemy' }, { code: 'BM', name: 'Bermuda' }, { code: 'BN', name: 'Brunei' }, { code: 'BO', name: 'Bolivia' }, { code: 'BQ', name: 'Caribbean Netherlands' }, { code: 'BR', name: 'Brazil' }, { code: 'BS', name: 'Bahamas' }, { code: 'BT', name: 'Bhutan' }, { code: 'BV', name: 'Bouvet Island' }, { code: 'BW', name: 'Botswana' }, { code: 'BY', name: 'Belarus' }, { code: 'BZ', name: 'Belize' }, { code: 'CA', name: 'Canada' }, { code: 'CC', name: 'Cocos (Keeling) Islands' }, { code: 'CD', name: 'Democratic Republic of the Congo' }, { code: 'CF', name: 'Central African Republic' }, { code: 'CG', name: 'Republic of the Congo' }, { code: 'CH', name: 'Switzerland' }, { code: 'CI', name: 'Côte d\'Ivoire' }, { code: 'CK', name: 'Cook Islands' }, { code: 'CL', name: 'Chile' }, { code: 'CM', name: 'Cameroon' }, { code: 'CN', name: 'China' }, { code: 'CO', name: 'Colombia' }, { code: 'CR', name: 'Costa Rica' }, { code: 'CU', name: 'Cuba' }, { code: 'CV', name: 'Cape Verde' }, { code: 'CW', name: 'Curaçao' }, { code: 'CX', name: 'Christmas Island' }, { code: 'CY', name: 'Cyprus' }, { code: 'CZ', name: 'Czech Republic' }, { code: 'DE', name: 'Germany' }, { code: 'DJ', name: 'Djibouti' }, { code: 'DK', name: 'Denmark' }, { code: 'DM', name: 'Dominica' }, { code: 'DO', name: 'Dominican Republic' }, { code: 'DZ', name: 'Algeria' }, { code: 'EC', name: 'Ecuador' }, { code: 'EE', name: 'Estonia' }, { code: 'EG', name: 'Egypt' }, { code: 'EH', name: 'Western Sahara' }, { code: 'ER', name: 'Eritrea' }, { code: 'ES', name: 'Spain' }, { code: 'ET', name: 'Ethiopia' }, { code: 'FI', name: 'Finland' }, { code: 'FJ', name: 'Fiji' }, { code: 'FK', name: 'Falkland Islands' }, { code: 'FM', name: 'Micronesia' }, { code: 'FO', name: 'Faroe Islands' }, { code: 'FR', name: 'France' }, { code: 'GA', name: 'Gabon' }, { code: 'GB', name: 'United Kingdom' }, { code: 'GD', name: 'Grenada' }, { code: 'GE', name: 'Georgia' }, { code: 'GF', name: 'French Guiana' }, { code: 'GG', name: 'Guernsey' }, { code: 'GH', name: 'Ghana' }, { code: 'GI', name: 'Gibraltar' }, { code: 'GL', name: 'Greenland' }, { code: 'GM', name: 'Gambia' }, { code: 'GN', name: 'Guinea' }, { code: 'GP', name: 'Guadeloupe' }, { code: 'GQ', name: 'Equatorial Guinea' }, { code: 'GR', name: 'Greece' }, { code: 'GS', name: 'South Georgia and the South Sandwich Islands' }, { code: 'GT', name: 'Guatemala' }, { code: 'GU', name: 'Guam' }, { code: 'GW', name: 'Guinea-Bissau' }, { code: 'GY', name: 'Guyana' }, { code: 'HK', name: 'Hong Kong' }, { code: 'HM', name: 'Heard Island and McDonald Islands' }, { code: 'HN', name: 'Honduras' }, { code: 'HR', name: 'Croatia' }, { code: 'HT', name: 'Haiti' }, { code: 'HU', name: 'Hungary' }, { code: 'ID', name: 'Indonesia' }, { code: 'IE', name: 'Ireland' }, { code: 'IL', name: 'Israel' }, { code: 'IM', name: 'Isle of Man' }, { code: 'IN', name: 'India' }, { code: 'IO', name: 'British Indian Ocean Territory' }, { code: 'IQ', name: 'Iraq' }, { code: 'IR', name: 'Iran' }, { code: 'IS', name: 'Iceland' }, { code: 'IT', name: 'Italy' }, { code: 'JE', name: 'Jersey' }, { code: 'JM', name: 'Jamaica' }, { code: 'JO', name: 'Jordan' }, { code: 'JP', name: 'Japan' }, { code: 'KE', name: 'Kenya' }, { code: 'KG', name: 'Kyrgyzstan' }, { code: 'KH', name: 'Cambodia' }, { code: 'KI', name: 'Kiribati' }, { code: 'KM', name: 'Comoros' }, { code: 'KN', name: 'Saint Kitts and Nevis' }, { code: 'KP', name: 'North Korea' }, { code: 'KR', name: 'South Korea' }, { code: 'KW', name: 'Kuwait' }, { code: 'KY', name: 'Cayman Islands' }, { code: 'KZ', name: 'Kazakhstan' }, { code: 'LA', name: 'Laos' }, { code: 'LB', name: 'Lebanon' }, { code: 'LC', name: 'Saint Lucia' }, { code: 'LI', name: 'Liechtenstein' }, { code: 'LK', name: 'Sri Lanka' }, { code: 'LR', name: 'Liberia' }, { code: 'LS', name: 'Lesotho' }, { code: 'LT', name: 'Lithuania' }, { code: 'LU', name: 'Luxembourg' }, { code: 'LV', name: 'Latvia' }, { code: 'LY', name: 'Libya' }, { code: 'MA', name: 'Morocco' }, { code: 'MC', name: 'Monaco' }, { code: 'MD', name: 'Moldova' }, { code: 'ME', name: 'Montenegro' }, { code: 'MF', name: 'Saint Martin' }, { code: 'MG', name: 'Madagascar' }, { code: 'MH', name: 'Marshall Islands' }, { code: 'MK', name: 'North Macedonia' }, { code: 'ML', name: 'Mali' }, { code: 'MM', name: 'Myanmar' }, { code: 'MN', name: 'Mongolia' }, { code: 'MO', name: 'Macao' }, { code: 'MP', name: 'Northern Mariana Islands' }, { code: 'MQ', name: 'Martinique' }, { code: 'MR', name: 'Mauritania' }, { code: 'MS', name: 'Montserrat' }, { code: 'MT', name: 'Malta' }, { code: 'MU', name: 'Mauritius' }, { code: 'MV', name: 'Maldives' }, { code: 'MW', name: 'Malawi' }, { code: 'MX', name: 'Mexico' }, { code: 'MY', name: 'Malaysia' }, { code: 'MZ', name: 'Mozambique' }, { code: 'NA', name: 'Namibia' }, { code: 'NC', name: 'New Caledonia' }, { code: 'NE', name: 'Niger' }, { code: 'NF', name: 'Norfolk Island' }, { code: 'NG', name: 'Nigeria' }, { code: 'NI', name: 'Nicaragua' }, { code: 'NL', name: 'Netherlands' }, { code: 'NO', name: 'Norway' }, { code: 'NP', name: 'Nepal' }, { code: 'NR', name: 'Nauru' }, { code: 'NU', name: 'Niue' }, { code: 'NZ', name: 'New Zealand' }, { code: 'OM', name: 'Oman' }, { code: 'PA', name: 'Panama' }, { code: 'PE', name: 'Peru' }, { code: 'PF', name: 'French Polynesia' }, { code: 'PG', name: 'Papua New Guinea' }, { code: 'PH', name: 'Philippines' }, { code: 'PK', name: 'Pakistan' }, { code: 'PL', name: 'Poland' }, { code: 'PM', name: 'Saint Pierre and Miquelon' }, { code: 'PN', name: 'Pitcairn Islands' }, { code: 'PR', name: 'Puerto Rico' }, { code: 'PS', name: 'Palestine' }, { code: 'PT', name: 'Portugal' }, { code: 'PW', name: 'Palau' }, { code: 'PY', name: 'Paraguay' }, { code: 'QA', name: 'Qatar' }, { code: 'RE', name: 'Réunion' }, { code: 'RO', name: 'Romania' }, { code: 'RS', name: 'Serbia' }, { code: 'RU', name: 'Russia' }, { code: 'RW', name: 'Rwanda' }, { code: 'SA', name: 'Saudi Arabia' }, { code: 'SB', name: 'Solomon Islands' }, { code: 'SC', name: 'Seychelles' }, { code: 'SD', name: 'Sudan' }, { code: 'SE', name: 'Sweden' }, { code: 'SG', name: 'Singapore' }, { code: 'SH', name: 'Saint Helena' }, { code: 'SI', name: 'Slovenia' }, { code: 'SJ', name: 'Svalbard and Jan Mayen' }, { code: 'SK', name: 'Slovakia' }, { code: 'SL', name: 'Sierra Leone' }, { code: 'SM', name: 'San Marino' }, { code: 'SN', name: 'Senegal' }, { code: 'SO', name: 'Somalia' }, { code: 'SR', name: 'Suriname' }, { code: 'SS', name: 'South Sudan' }, { code: 'ST', name: 'São Tomé and Príncipe' }, { code: 'SV', name: 'El Salvador' }, { code: 'SX', name: 'Sint Maarten' }, { code: 'SY', name: 'Syria' }, { code: 'SZ', name: 'Eswatini' }, { code: 'TC', name: 'Turks and Caicos Islands' }, { code: 'TD', name: 'Chad' }, { code: 'TF', name: 'French Southern Territories' }, { code: 'TG', name: 'Togo' }, { code: 'TH', name: 'Thailand' }, { code: 'TJ', name: 'Tajikistan' }, { code: 'TK', name: 'Tokelau' }, { code: 'TL', name: 'Timor-Leste' }, { code: 'TM', name: 'Turkmenistan' }, { code: 'TN', name: 'Tunisia' }, { code: 'TO', name: 'Tonga' }, { code: 'TR', name: 'Turkey' }, { code: 'TT', name: 'Trinidad and Tobago' }, { code: 'TV', name: 'Tuvalu' }, { code: 'TW', name: 'Taiwan' }, { code: 'TZ', name: 'Tanzania' }, { code: 'UA', name: 'Ukraine' }, { code: 'UG', name: 'Uganda' }, { code: 'UM', name: 'United States Minor Outlying Islands' }, { code: 'US', name: 'United States' }, { code: 'UY', name: 'Uruguay' }, { code: 'UZ', name: 'Uzbekistan' }, { code: 'VA', name: 'Vatican City' }, { code: 'VC', name: 'Saint Vincent and the Grenadines' }, { code: 'VE', name: 'Venezuela' }, { code: 'VG', name: 'British Virgin Islands' }, { code: 'VI', name: 'United States Virgin Islands' }, { code: 'VN', name: 'Vietnam' }, { code: 'VU', name: 'Vanuatu' }, { code: 'WF', name: 'Wallis and Futuna' }, { code: 'WS', name: 'Samoa' }, { code: 'YE', name: 'Yemen' }, { code: 'YT', name: 'Mayotte' }, { code: 'ZA', name: 'South Africa' }, { code: 'ZM', name: 'Zambia' }, { code: 'ZW', name: 'Zimbabwe' }
];

export default function OnboardingStep1({ formData, setFormData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCountry, setSearchCountry] = useState('US');
  const [searching, setSearching] = useState(false);
  const [kybVerified, setKybVerified] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Use ISO country standards as primary source
    if (ISO_COUNTRIES && ISO_COUNTRIES.length > 0) {
      setCountries(ISO_COUNTRIES);
    } else {
      // Fallback: fetch from KYB API
      const fetchCountries = async () => {
        try {
          const result = await base44.functions.invoke('kyb', {
            action: 'countries'
          });
          if (result.data?.data?.countries) {
            setCountries(result.data.data.countries);
          }
        } catch (error) {
          console.error('Failed to fetch countries:', error);
        }
      };
      fetchCountries();
    }
  }, []);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKybSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a company name');
      return;
    }

    setSearching(true);
    try {
      const result = await base44.functions.invoke('kyb', {
        action: 'search',
        query: searchQuery,
        country: searchCountry
      });

      if (result.data?.data?.companies && result.data.data.companies.length > 0) {
        const company = result.data.data.companies[0];
        
        setFormData(prev => ({
          ...prev,
          legal_name: company.name || prev.legal_name,
          unique_business_id: company.registration_number || prev.unique_business_id,
          registry_country_code: searchCountry,
          legal_address: {
            ...prev.legal_address,
            address: company.address || prev.legal_address?.address,
            city: company.city || prev.legal_address?.city,
            country: company.country || prev.legal_address?.country
          }
        }));
        
        setKybVerified(true);
        toast.success('Company found and verified!');
      } else {
        toast.error('Company not found. Please enter details manually.');
      }
    } catch (error) {
      toast.error('Search failed: ' + error.message);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* KYB Search */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Company Verification (KYB)</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Search for your company to auto-fill details</p>
        
        <div className="flex gap-3">
          <Select value={searchCountry} onValueChange={setSearchCountry}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {countries.length > 0 ? countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </SelectItem>
              )) : (
                <SelectItem value="US">USA</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleKybSearch()}
            className="flex-1"
          />
          <Button onClick={handleKybSearch} disabled={searching} className="bg-blue-600">
            {searching ? <Loader className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
        
        {kybVerified && (
          <div className="mt-3 flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Company verified via KYB registry</span>
          </div>
        )}
      </div>

      {/* Company Information */}
      <div>
        <Label htmlFor="legal_name" className="text-base">Legal Name *</Label>
        <Input
          id="legal_name"
          value={formData.legal_name}
          onChange={(e) => updateField('legal_name', e.target.value)}
          placeholder="Official registered business name"
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="other_entity_name" className="text-base">Other Entity Name</Label>
        <Input
          id="other_entity_name"
          value={formData.other_entity_name || ''}
          onChange={(e) => updateField('other_entity_name', e.target.value)}
          placeholder="Trading name or DBA"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="entity_category" className="text-base">Entity Category *</Label>
        <Select 
          value={formData.entity_category}
          onValueChange={(value) => updateField('entity_category', value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select entity category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="financial_institution">Financial Institution</SelectItem>
            <SelectItem value="fintech">Fintech</SelectItem>
            <SelectItem value="law_firm">Law Firm</SelectItem>
            <SelectItem value="company_secretary">Company Secretary</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
            <SelectItem value="trade">Trade</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="website" className="text-base">Website</Label>
        <Input
          id="website"
          type="url"
          value={formData.website || ''}
          onChange={(e) => updateField('website', e.target.value)}
          placeholder="https://example.com"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="apply_purpose" className="text-base">Application Purpose *</Label>
        <Textarea
          id="apply_purpose"
          value={formData.apply_purpose}
          onChange={(e) => updateField('apply_purpose', e.target.value)}
          placeholder="Describe the purpose of this LEI application"
          className="mt-2 h-24"
          required
        />
      </div>

      {/* Legal Representative & Contact */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Legal Representative & Contact Person</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="legal_representative_name" className="text-base">Full Name *</Label>
            <Input
              id="legal_representative_name"
              value={formData.legal_representative_name}
              onChange={(e) => updateField('legal_representative_name', e.target.value)}
              placeholder="Full name"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-base">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="contact@example.com"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="legal_representative_mobile" className="text-base">Mobile *</Label>
            <Input
              id="legal_representative_mobile"
              value={formData.legal_representative_mobile || ''}
              onChange={(e) => updateField('legal_representative_mobile', e.target.value)}
              placeholder="+1 234 567 8900"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="contact_person_position" className="text-base">Position/Title</Label>
            <Input
              id="contact_person_position"
              value={formData.contact_person_position || ''}
              onChange={(e) => updateField('contact_person_position', e.target.value)}
              placeholder="e.g., CEO, Director"
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}