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
    <div className="space-y-4 sm:space-y-8">
      {/* Headquarters Address */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Headquarters Address *</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4">Country from Step 1: <span className="font-medium">{formData.headquarters_address?.country || formData.legal_address?.country || 'Not set'}</span></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <Label className="text-sm sm:text-base">Street Address *</Label>
            <Input
              value={formData.headquarters_address?.address || ''}
              onChange={(e) => updateAddress('headquarters_address', 'address', e.target.value)}
              placeholder="Street address"
              className="mt-2 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm sm:text-base">City *</Label>
            <Input
              value={formData.headquarters_address?.city || ''}
              onChange={(e) => updateAddress('headquarters_address', 'city', e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm sm:text-base">Province/State *</Label>
            <Input
              value={formData.headquarters_address?.province || ''}
              onChange={(e) => updateAddress('headquarters_address', 'province', e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm sm:text-base">Postal Code *</Label>
            <Input
              value={formData.headquarters_address?.postal_code || ''}
              onChange={(e) => updateAddress('headquarters_address', 'postal_code', e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Legal Address - Optional if same as Headquarters */}
      {!sameAsHQ && (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Legal Address *</h3>
          <div className="flex items-center gap-2">
            <Checkbox
              id="sameAsHQ"
              checked={sameAsHQ}
              onCheckedChange={handleSameAsHQ}
            />
            <Label htmlFor="sameAsHQ" className="text-xs sm:text-sm cursor-pointer">Same as Headquarters</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div className="md:col-span-2">
            <Label className="text-sm sm:text-base">Street Address *</Label>
            <Input
              value={formData.legal_address?.address || ''}
              onChange={(e) => updateAddress('legal_address', 'address', e.target.value)}
              placeholder="Street address"
              className="mt-2 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm sm:text-base">City *</Label>
            <Input
              value={formData.legal_address?.city || ''}
              onChange={(e) => updateAddress('legal_address', 'city', e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm sm:text-base">Province/State *</Label>
            <Input
              value={formData.legal_address?.province || ''}
              onChange={(e) => updateAddress('legal_address', 'province', e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm sm:text-base">Postal Code *</Label>
            <Input
              value={formData.legal_address?.postal_code || ''}
              onChange={(e) => updateAddress('legal_address', 'postal_code', e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
        </div>
      </div>
      )}

      {sameAsHQ && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-700">Legal address will be the same as headquarters address.</p>
        </div>
      )}
    </div>
  );
}