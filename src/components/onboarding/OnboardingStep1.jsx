import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, CheckCircle2, Loader, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingStep1({ formData, setFormData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCountry, setSearchCountry] = useState('US');
  const [searching, setSearching] = useState(false);
  const [kybVerified, setKybVerified] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch all supported countries from KYB API
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