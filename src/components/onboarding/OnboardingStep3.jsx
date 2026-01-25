import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

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
  // Add more as needed
].sort((a, b) => a.name.localeCompare(b.name));

export default function OnboardingStep3({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="entity_legal_form" className="text-base">Entity Legal Form (ISO 20275 ELF Code) *</Label>
        <Input
          id="entity_legal_form"
          value={formData.entity_legal_form}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
            updateField('entity_legal_form', val);
          }}
          placeholder="e.g., 8888 (4-digit ISO 20275 code)"
          maxLength="4"
          className="mt-2"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Enter 4-digit ISO 20275 Entity Legal Form code from GLEIF</p>
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
          <Input
            id="business_registry_name"
            value={formData.business_registry_name}
            onChange={(e) => updateField('business_registry_name', e.target.value)}
            placeholder="e.g., Companies House, SIREN, ROC"
            className="mt-2"
            required
          />
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