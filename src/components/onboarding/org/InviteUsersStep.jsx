import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Plus, X, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function InviteUsersStep({ organization, onNext }) {
  const [invites, setInvites] = useState([
    { email: '', role: 'user' }
  ]);
  const [sentInvites, setSentInvites] = useState([]);

  const inviteUserMutation = useMutation({
    mutationFn: ({ email, role }) => base44.users.inviteUser(email, role),
    onSuccess: (_, variables) => {
      setSentInvites([...sentInvites, variables.email]);
      toast.success(`Invitation sent to ${variables.email}`);
    }
  });

  const addInvite = () => {
    setInvites([...invites, { email: '', role: 'user' }]);
  };

  const removeInvite = (index) => {
    setInvites(invites.filter((_, i) => i !== index));
  };

  const updateInvite = (index, field, value) => {
    const updated = [...invites];
    updated[index][field] = value;
    setInvites(updated);
  };

  const sendInvites = async () => {
    const validInvites = invites.filter(inv => inv.email.trim());
    
    for (const invite of validInvites) {
      await inviteUserMutation.mutateAsync(invite);
    }
    
    if (validInvites.length === 0) {
      onNext();
    }
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 mx-auto text-blue-600 mb-3" />
        <h2 className="text-2xl font-bold mb-2">Invite Your Team</h2>
        <p className="text-gray-600">Add team members to help manage onboarding workflows</p>
      </div>

      <div className="space-y-4">
        {invites.map((invite, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="team.member@company.com"
                value={invite.email}
                onChange={(e) => updateInvite(index, 'email', e.target.value)}
              />
            </div>
            <div className="w-36">
              <Select
                value={invite.role}
                onValueChange={(value) => updateInvite(index, 'role', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {invites.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeInvite(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addInvite}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another User
        </Button>
      </div>

      {sentInvites.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invitations Sent
          </h3>
          <div className="flex flex-wrap gap-2">
            {sentInvites.map((email, index) => (
              <Badge key={index} className="bg-green-100 text-green-800">
                {email}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          onClick={sendInvites}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={inviteUserMutation.isPending}
        >
          <Mail className="h-4 w-4 mr-2" />
          Send Invitations
        </Button>
        <Button
          variant="outline"
          onClick={handleSkip}
        >
          Skip for Now
        </Button>
      </div>
    </div>
  );
}