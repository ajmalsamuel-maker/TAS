import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Mail, Globe, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function OrgProfileStep({ organization, onNext }) {
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState({
    legal_name: organization.legal_name || '',
    lei: organization.lei || '',
    country: organization.country || '',
    contact_email: organization.contact_email || '',
    contact_phone: organization.contact_phone || ''
  });

  const updateOrgMutation = useMutation({
    mutationFn: (data) => base44.entities.Organization.update(organization.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['organization']);
      toast.success('Organization profile updated');
      onNext();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrgMutation.mutate(profile);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Building2 className="h-12 w-12 mx-auto text-blue-600 mb-3" />
        <h2 className="text-2xl font-bold mb-2">Organization Profile</h2>
        <p className="text-gray-600">Tell us about your organization</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4" />
            Legal Entity Name
          </label>
          <Input
            value={profile.legal_name}
            onChange={(e) => setProfile({ ...profile, legal_name: e.target.value })}
            placeholder="ABC Bank Inc."
          />
          <p className="text-xs text-gray-500 mt-1">Official registered business name</p>
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4" />
            Legal Entity Identifier (LEI)
          </label>
          <Input
            value={profile.lei}
            onChange={(e) => setProfile({ ...profile, lei: e.target.value })}
            placeholder="549300XBMHFKR3WWHW51"
          />
          <p className="text-xs text-gray-500 mt-1">Your organization's LEI (if applicable)</p>
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4" />
            Primary Country
          </label>
          <Input
            value={profile.country}
            onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            placeholder="United States"
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4" />
            Contact Email *
          </label>
          <Input
            type="email"
            value={profile.contact_email}
            onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })}
            placeholder="admin@abcbank.com"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4" />
            Contact Phone
          </label>
          <Input
            value={profile.contact_phone}
            onChange={(e) => setProfile({ ...profile, contact_phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <button type="submit" className="hidden">Submit</button>
      </form>
    </div>
  );
}