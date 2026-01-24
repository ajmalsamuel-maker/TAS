import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, Shield, Edit2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { logAction, ACTION_TYPES } from '../audit/auditLogger';

const ROLE_PERMISSIONS = {
  admin: ['manage_users', 'manage_providers', 'manage_workflows', 'view_analytics', 'manage_translations'],
  editor: ['create_content', 'edit_content', 'view_analytics'],
  viewer: ['view_analytics', 'view_workflows'],
  user: ['view_own_workflows', 'submit_applications']
};

export default function UserManagement() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingRole, setEditingRole] = useState('');
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    initialData: []
  });

  const inviteMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      await base44.users.inviteUser(email, 'user');
      // Update with granular role after invitation
      const users = await base44.entities.User.list();
      const newUser = users.find(u => u.email === email);
      if (newUser) {
        await base44.entities.User.update(newUser.id, { 
          user_role: role,
          permissions: ROLE_PERMISSIONS[role] || []
        });
        // Log the invitation
        await logAction(ACTION_TYPES.USER_INVITED, {
          invited_email: email,
          assigned_role: role
        });
      }
    },
    onSuccess: () => {
      toast.success('User invited successfully');
      setEmail('');
      setRole('user');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to invite user');
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole, userEmail }) => {
      await base44.entities.User.update(userId, {
        user_role: newRole,
        permissions: ROLE_PERMISSIONS[newRole] || []
      });
      // Log the role change
      await logAction(ACTION_TYPES.USER_ROLE_CHANGED, {
        user_email: userEmail,
        new_role: newRole
      });
    },
    onSuccess: () => {
      toast.success('User role updated');
      setEditingUserId(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update role');
    }
  });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email');
      return;
    }
    inviteMutation.mutate({ email, role });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite New User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-[#0066B3] hover:bg-[#004C8C]"
                  disabled={inviteMutation.isPending}
                >
                  {inviteMutation.isPending ? 'Inviting...' : 'Send Invite'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const isEditing = editingUserId === user.id;
                  const userRole = user.user_role || user.role || 'user';
                  const roleColors = {
                    admin: 'bg-red-500',
                    editor: 'bg-blue-500',
                    viewer: 'bg-amber-500',
                    user: 'bg-gray-500'
                  };
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Select value={editingRole} onValueChange={setEditingRole}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge className={`${roleColors[userRole] || 'bg-gray-500'} text-white`}>
                            {userRole === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                            {userRole}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(user.permissions || ROLE_PERMISSIONS[userRole] || []).slice(0, 2).map((perm, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {perm.replace(/_/g, ' ')}
                            </span>
                          ))}
                          {(user.permissions || ROLE_PERMISSIONS[userRole] || []).length > 2 && (
                            <span className="text-xs text-gray-500">+{(user.permissions || ROLE_PERMISSIONS[userRole] || []).length - 2}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateRoleMutation.mutate({ userId: user.id, newRole: editingRole, userEmail: user.email })}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingUserId(null)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingUserId(user.id);
                              setEditingRole(userRole);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}