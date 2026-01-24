import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe, User, Save, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'hi', name: 'हिन्दी' }
];

export default function UserSettings() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    position: '',
    preferred_language: 'en',
    region: ''
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(userData => {
      setUser(userData);
      setFormData({
        full_name: userData.full_name || '',
        company_name: userData.company_name || '',
        position: userData.position || '',
        preferred_language: userData.preferred_language || 'en',
        region: userData.region || ''
      });
    });
  }, []);

  const updateMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      toast.success('Settings updated successfully');
      base44.auth.me().then(setUser);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>

        {/* Profile Information */}
        <Card className="mb-6 border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-[#0044CC]" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (Read-only)</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="mt-2 bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button type="submit" className="bg-[#0044CC] hover:bg-[#002D66]">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Language & Regional Settings */}
        <Card className="mb-6 border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-[#0044CC]" />
              Language & Regional Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preferred_language">Preferred Language</Label>
                  <Select
                    value={formData.preferred_language}
                    onValueChange={(value) => setFormData({...formData, preferred_language: value})}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name} ({lang.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    All platform communications, workflows, and reports will use this language
                  </p>
                </div>

                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    placeholder="e.g., APAC, EU, Americas"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button type="submit" className="bg-[#0044CC] hover:bg-[#002D66]">
                  <Save className="h-4 w-4 mr-2" />
                  Update Preferences
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Account Type</p>
                <p className="font-semibold text-gray-900">{user?.role === 'admin' ? 'Administrator' : 'Business User'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="font-semibold text-gray-900">
                  {user?.created_date ? format(new Date(user.created_date), 'MMMM yyyy') : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">LEI Status</p>
                <div className="flex items-center gap-2">
                  {user?.lei ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-700">Active</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-700">Pending</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Onboarding Status</p>
                <Badge className="bg-green-100 text-green-800">
                  {user?.onboarding_status || 'Approved'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}