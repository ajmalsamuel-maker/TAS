import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Palette, Upload, Link as LinkIcon, Webhook } from 'lucide-react';
import { toast } from 'sonner';

export default function BrandingSettingsStep({ organization, onNext }) {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState({
    branding_logo_url: organization.settings?.branding_logo_url || '',
    primary_color: organization.settings?.primary_color || '#0044CC',
    webhook_url: organization.settings?.webhook_url || '',
    default_language: organization.settings?.default_language || 'en'
  });
  const [uploading, setUploading] = useState(false);

  const updateSettingsMutation = useMutation({
    mutationFn: (data) => base44.entities.Organization.update(organization.id, {
      settings: data
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['organization']);
      toast.success('Settings saved');
      onNext();
    }
  });

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setSettings({ ...settings, branding_logo_url: file_url });
      toast.success('Logo uploaded');
    } catch (error) {
      toast.error('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    updateSettingsMutation.mutate(settings);
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Palette className="h-12 w-12 mx-auto text-blue-600 mb-3" />
        <h2 className="text-2xl font-bold mb-2">Branding & Settings</h2>
        <p className="text-gray-600">Customize your organization's appearance and integrations</p>
      </div>

      <div className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Upload className="h-4 w-4" />
            Organization Logo
          </label>
          {settings.branding_logo_url && (
            <div className="mb-3 p-4 border rounded-lg bg-white">
              <img 
                src={settings.branding_logo_url} 
                alt="Logo preview" 
                className="h-16 object-contain"
              />
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={uploading}
          />
          <p className="text-xs text-gray-500 mt-1">Upload your organization's logo (PNG, JPG, SVG)</p>
        </div>

        {/* Primary Color */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Palette className="h-4 w-4" />
            Primary Brand Color
          </label>
          <div className="flex gap-3">
            <Input
              type="color"
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
              className="w-20 h-10"
            />
            <Input
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
              placeholder="#0044CC"
              className="flex-1"
            />
          </div>
        </div>

        {/* Webhook URL */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Webhook className="h-4 w-4" />
            Webhook URL (Optional)
          </label>
          <Input
            value={settings.webhook_url}
            onChange={(e) => setSettings({ ...settings, webhook_url: e.target.value })}
            placeholder="https://your-system.com/webhooks/tas"
          />
          <p className="text-xs text-gray-500 mt-1">
            Receive real-time notifications for onboarding events
          </p>
        </div>

        {/* Language */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <LinkIcon className="h-4 w-4" />
            Default Language
          </label>
          <select
            value={settings.default_language}
            onChange={(e) => setSettings({ ...settings, default_language: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="en">English</option>
            <option value="zh">中文 (Chinese)</option>
            <option value="es">Español (Spanish)</option>
            <option value="fr">Français (French)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSave}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={updateSettingsMutation.isPending || uploading}
        >
          Save Settings
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