import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function OnboardingStep2({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAddress = (addressType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Contact Person */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Person Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Name *</Label>
            <Input
              value={formData.contact_person_name}
              onChange={(e) => updateField('contact_person_name', e.target.value)}
              placeholder="Contact person full name"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Telephone *</Label>
            <Input
              value={formData.contact_person_tel}
              onChange={(e) => updateField('contact_person_tel', e.target.value)}
              placeholder="+1 234 567 8900"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.contact_person_email}
              onChange={(e) => updateField('contact_person_email', e.target.value)}
              placeholder="contact@example.com"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Department</Label>
            <Input
              value={formData.contact_person_department}
              onChange={(e) => updateField('contact_person_department', e.target.value)}
              placeholder="e.g., Legal, Compliance"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Position</Label>
            <Input
              value={formData.contact_person_position}
              onChange={(e) => updateField('contact_person_position', e.target.value)}
              placeholder="e.g., Compliance Officer"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Legal Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Legal Address *</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Country/Region *</Label>
            <Input
              value={formData.legal_address?.country || ''}
              onChange={(e) => updateAddress('legal_address', 'country', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Province/Region *</Label>
            <Input
              value={formData.legal_address?.province || ''}
              onChange={(e) => updateAddress('legal_address', 'province', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>City *</Label>
            <Input
              value={formData.legal_address?.city || ''}
              onChange={(e) => updateAddress('legal_address', 'city', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Postal Code *</Label>
            <Input
              value={formData.legal_address?.postal_code || ''}
              onChange={(e) => updateAddress('legal_address', 'postal_code', e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Address *</Label>
            <Input
              value={formData.legal_address?.address || ''}
              onChange={(e) => updateAddress('legal_address', 'address', e.target.value)}
              placeholder="Street address"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Headquarters Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Headquarters Address *</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Country/Region *</Label>
            <Input
              value={formData.headquarters_address?.country || ''}
              onChange={(e) => updateAddress('headquarters_address', 'country', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Province/Region *</Label>
            <Input
              value={formData.headquarters_address?.province || ''}
              onChange={(e) => updateAddress('headquarters_address', 'province', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>City *</Label>
            <Input
              value={formData.headquarters_address?.city || ''}
              onChange={(e) => updateAddress('headquarters_address', 'city', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Postal Code *</Label>
            <Input
              value={formData.headquarters_address?.postal_code || ''}
              onChange={(e) => updateAddress('headquarters_address', 'postal_code', e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Address *</Label>
            <Input
              value={formData.headquarters_address?.address || ''}
              onChange={(e) => updateAddress('headquarters_address', 'address', e.target.value)}
              placeholder="Street address"
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}