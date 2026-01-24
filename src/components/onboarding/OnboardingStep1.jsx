import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function OnboardingStep1({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
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
          value={formData.other_entity_name}
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="website" className="text-base">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="https://example.com"
            className="mt-2"
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
      </div>

      <div>
        <Label htmlFor="legal_representative_name" className="text-base">Legal Representative *</Label>
        <Input
          id="legal_representative_name"
          value={formData.legal_representative_name}
          onChange={(e) => updateField('legal_representative_name', e.target.value)}
          placeholder="Full name of authorized representative"
          className="mt-2"
          required
        />
      </div>
    </div>
  );
}