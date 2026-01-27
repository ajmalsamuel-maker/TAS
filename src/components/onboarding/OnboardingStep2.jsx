import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function OnboardingStep2({ formData, setFormData }) {
  const [sameAsHQ, setSameAsHQ] = useState(false);

  const updateAddress = (addressType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value
      }
    }));
  };

  const handleSameAsHQ = (checked) => {
    setSameAsHQ(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        legal_address: { ...prev.headquarters_address }
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Headquarters Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Headquarters Address *</h3>
        <p className="text-sm text-gray-600 mb-4">Country from Step 1: <span className="font-medium">{formData.headquarters_address?.country || formData.legal_address?.country || 'Not set'}</span></p>
        <div className="grid md:grid-cols-2 gap-6">
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

      {/* Legal Address */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Legal Address *</h3>
          <div className="flex items-center gap-2">
            <Checkbox
              id="sameAsHQ"
              checked={sameAsHQ}
              onCheckedChange={handleSameAsHQ}
            />
            <Label htmlFor="sameAsHQ" className="text-sm cursor-pointer">Same as Headquarters</Label>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Country/Region *</Label>
            <Input
              value={formData.legal_address?.country || ''}
              onChange={(e) => updateAddress('legal_address', 'country', e.target.value)}
              className="mt-2"
              disabled={sameAsHQ}
            />
          </div>
          <div>
            <Label>Province/Region *</Label>
            <Input
              value={formData.legal_address?.province || ''}
              onChange={(e) => updateAddress('legal_address', 'province', e.target.value)}
              className="mt-2"
              disabled={sameAsHQ}
            />
          </div>
          <div>
            <Label>City *</Label>
            <Input
              value={formData.legal_address?.city || ''}
              onChange={(e) => updateAddress('legal_address', 'city', e.target.value)}
              className="mt-2"
              disabled={sameAsHQ}
            />
          </div>
          <div>
            <Label>Postal Code *</Label>
            <Input
              value={formData.legal_address?.postal_code || ''}
              onChange={(e) => updateAddress('legal_address', 'postal_code', e.target.value)}
              className="mt-2"
              disabled={sameAsHQ}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Address *</Label>
            <Input
              value={formData.legal_address?.address || ''}
              onChange={(e) => updateAddress('legal_address', 'address', e.target.value)}
              placeholder="Street address"
              className="mt-2"
              disabled={sameAsHQ}
            />
          </div>
        </div>
      </div>
    </div>
  );
}