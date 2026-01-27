import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Mail, Shield, Trash2, Plus, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function UserTeam() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', role: 'user' });

  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me()
      .then(async (userData) => {
        setUser(userData);
        if (userData?.organization_id) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          setOrganization(orgs[0]);
        }
      })
      .catch(() => base44.auth.redirectToLogin(createPageUrl('UserTeam')));
  }, []);

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members', organization?.id],
    queryFn: () => base44.entities.User.filter({ organization_id: organization.id }),
    enabled: !!organization?.id,
    initialData: []
  });

  const inviteMutation = useMutation({
    mutationFn: async (data) => {
      return base44.users.inviteUser(data.email, data.role);
    },
    onSuccess: () => {
      toast.success('User invited successfully');
      setInviteData({ email: '', role: 'user' });
      setShowInviteForm(false);
      queryClient.invalidateQueries(['team-members']);
    },
    onError: (error) => {
      toast.error('Failed to invite user: ' + error.message);
    }
  });

  if (!user || !organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Team Members</h1>
            <p className="text-gray-600">Manage your organization's users and permissions</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setShowInviteForm(!showInviteForm)} className="bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          )}
        </div>

        {/* Invite Form */}
        {showInviteForm && isAdmin && (
          <Card className="mb-8 border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                Invite New Team Member
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                inviteMutation.mutate(inviteData);
              }} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                    placeholder="user@example.com"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteData.role} onValueChange={(value) => setInviteData({...inviteData, role: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Business User</SelectItem>
                      {isAdmin && <SelectItem value="admin">Administrator</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="bg-blue-600" disabled={inviteMutation.isPending}>
                    {inviteMutation.isPending ? 'Inviting...' : 'Send Invite'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Team Members */}
        <div className="space-y-4">
          {teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <Card key={member.id} className="border-2 border-blue-100 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{member.full_name}</h3>
                        <Badge className={member.role === 'admin' ? 'bg-purple-600' : 'bg-gray-600'}>
                          {member.role === 'admin' ? 'Admin' : 'User'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <p className="text-sm">{member.email}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Joined {new Date(member.created_date).toLocaleDateString()}
                      </p>
                    </div>

                    {isAdmin && member.email !== user.email && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {member.full_name}? This action cannot be undone.
                          </AlertDialogDescription>
                          <div className="flex gap-3">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Remove
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No team members yet</p>
                <p className="text-sm text-gray-500">Invite team members to collaborate on your organization</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}