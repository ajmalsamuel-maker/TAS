import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { COUNTRY_REGISTRY_MAP } from './registryData';

const ENTITY_LEGAL_FORMS = [
  { code: '1000', label: 'Sole Proprietor', description: 'Individual operating as self-employed' },
  { code: '1100', label: 'General Partnership (GP)', description: 'Two or more partners with shared liability' },
  { code: '1200', label: 'Limited Partnership (LP)', description: 'Partners with limited and general liability' },
  { code: '1300', label: 'Limited Liability Partnership (LLP)', description: 'Partners with limited personal liability' },
  { code: '2000', label: 'Limited Company', description: 'Company with limited liability structure' },
  { code: '2100', label: 'Private Limited Company (Ltd)', description: 'Privately held limited company' },
  { code: '2110', label: 'Close Company', description: 'Limited company with restricted share transfer' },
  { code: '2200', label: 'Public Limited Company (Plc)', description: 'Publicly traded limited company' },
  { code: '3000', label: 'Unlimited Company', description: 'Company without liability limits' },
  { code: '4000', label: 'Joint Venture', description: 'Partnership agreement for specific project' },
  { code: '5000', label: 'Cooperative', description: 'Member-owned business organization' },
  { code: '6000', label: 'Trust', description: 'Legal arrangement for asset management' },
  { code: '7000', label: 'Association', description: 'Group organized for common purpose' },
  { code: '8000', label: 'Other Legal Entity', description: 'Any other legal entity type' },
  { code: '8888', label: 'Non-classified Business Entity', description: 'Entity type cannot be classified' }
];

const COUNTRY_CODES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function OnboardingStep3({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Get registries for selected country
  const getRegistriesForCountry = (countryCode) => {
    return COUNTRY_REGISTRY_MAP[countryCode] || [];
  };

  const registriesForCountry = getRegistriesForCountry(formData.registry_country_code);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="entity_legal_form" className="text-base">Entity Legal Form (ISO 20275) *</Label>
        <Select 
          value={formData.entity_legal_form}
          onValueChange={(value) => updateField('entity_legal_form', value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select entity legal form" />
          </SelectTrigger>
          <SelectContent>
            {ENTITY_LEGAL_FORMS.map((form) => (
              <SelectItem key={form.code} value={form.code} className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{form.label}</span>
                  <span className="text-xs text-gray-500">({form.code})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formData.entity_legal_form && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-gray-900">
              {ENTITY_LEGAL_FORMS.find(f => f.code === formData.entity_legal_form)?.label}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {ENTITY_LEGAL_FORMS.find(f => f.code === formData.entity_legal_form)?.description}
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="business_registry_country" className="text-base">Registry Country (ISO 3166-1) *</Label>
          <Select 
            value={formData.registry_country_code || ''}
            onValueChange={(value) => updateField('registry_country_code', value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="business_registry_name" className="text-base">Name of Business Registry *</Label>
          {registriesForCountry.length > 1 ? (
            <Select 
              value={formData.business_registry_name}
              onValueChange={(value) => updateField('business_registry_name', value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a registry for this country" />
              </SelectTrigger>
              <SelectContent>
                {registriesForCountry.map((registry) => (
                  <SelectItem key={registry.code} value={registry.name}>
                    {registry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : registriesForCountry.length === 1 ? (
            <div className="mt-2">
              <Input
                id="business_registry_name"
                value={registriesForCountry[0].name}
                disabled
                className="mt-2 bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-populated based on selected country</p>
            </div>
          ) : (
            <Input
              id="business_registry_name"
              value={formData.business_registry_name}
              onChange={(e) => updateField('business_registry_name', e.target.value)}
              placeholder="Enter registry name"
              className="mt-2"
              required
            />
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="unique_business_id" className="text-base">Unique Business Identifier *</Label>
        <Input
          id="unique_business_id"
          value={formData.unique_business_id}
          onChange={(e) => updateField('unique_business_id', e.target.value)}
          placeholder="Certificate of Incorporation No."
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="business_registration_cert_no" className="text-base">Business Registration Certificate No. *</Label>
        <Input
          id="business_registration_cert_no"
          value={formData.business_registration_cert_no}
          onChange={(e) => updateField('business_registration_cert_no', e.target.value)}
          className="mt-2"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="entity_creation_date" className="text-base">Entity Creation Date *</Label>
          <Input
            id="entity_creation_date"
            type="date"
            value={formData.entity_creation_date}
            onChange={(e) => updateField('entity_creation_date', e.target.value)}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="business_cert_effective_date" className="text-base">Business Certificate Effective Date *</Label>
          <Input
            id="business_cert_effective_date"
            type="date"
            value={formData.business_cert_effective_date}
            onChange={(e) => updateField('business_cert_effective_date', e.target.value)}
            className="mt-2"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="number_of_employees" className="text-base">Number of Employees *</Label>
        <Select 
          value={formData.number_of_employees}
          onValueChange={(value) => updateField('number_of_employees', value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select number of employees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3_or_more">3 or more</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}