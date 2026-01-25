import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader } from 'lucide-react';

export default function OrganizationFilterSelector({ selectedOrgId, onOrgChange, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const { data: organizations, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      // Admins can see all organizations; regular users only see their own
      if (user?.role === 'admin') {
        return await base44.entities.Organization.list();
      } else if (user?.organization_id) {
        const orgs = await base44.entities.Organization.filter({ id: user.organization_id });
        return orgs;
      }
      return [];
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-gray-50">
        <Loader className="h-4 w-4 animate-spin text-gray-400" />
        <span className="text-sm text-gray-600">Loading organizations...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-700">Organization:</span>
      <Select value={selectedOrgId} onValueChange={onOrgChange}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {user?.role === 'admin' && (
            <SelectItem value="all">All Organizations</SelectItem>
          )}
          {organizations?.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}