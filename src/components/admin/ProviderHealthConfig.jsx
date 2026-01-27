import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Activity, Settings } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function ProviderHealthConfig({ provider, onUpdate }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [config, setConfig] = useState(provider?.health_check_config || {
    enabled: true,
    check_frequency_minutes: 5,
    timeout_seconds: 10,
    expected_response_code: 200,
    use_health_endpoint: true
  });

  const queryClient = useQueryClient();

  const { mutate: updateProvider, isPending } = useMutation({
    mutationFn: async (data) => {
      return await base44.entities.Provider.update(provider.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      setOpenDialog(false);
      if (onUpdate) onUpdate();
    }
  });

  const handleSave = () => {
    updateProvider({
      health_check_config: {
        enabled: config.enabled,
        check_frequency_minutes: Math.max(5, parseInt(config.check_frequency_minutes)),
        timeout_seconds: parseInt(config.timeout_seconds),
        expected_response_code: parseInt(config.expected_response_code),
        use_health_endpoint: config.use_health_endpoint
      }
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Activity className="h-4 w-4" />
          Health Config
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Health Check Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Enable Health Monitoring</span>
          </label>

          {config.enabled && (
            <>
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Check Frequency (minutes)
                </Label>
                <Input
                  type="number"
                  min="5"
                  step="5"
                  value={config.check_frequency_minutes}
                  onChange={(e) =>
                    setConfig({ ...config, check_frequency_minutes: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">Minimum: 5 minutes</p>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Timeout (seconds)
                </Label>
                <Input
                  type="number"
                  min="5"
                  max="60"
                  value={config.timeout_seconds}
                  onChange={(e) => setConfig({ ...config, timeout_seconds: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Expected HTTP Status Code
                </Label>
                <Input
                  type="number"
                  min="100"
                  max="599"
                  value={config.expected_response_code}
                  onChange={(e) =>
                    setConfig({ ...config, expected_response_code: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">Usually 200 for health endpoints</p>
              </div>

              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={config.use_health_endpoint}
                  onChange={(e) =>
                    setConfig({ ...config, use_health_endpoint: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <div>
                  <span className="text-sm font-medium">Use Health Endpoint</span>
                  <p className="text-xs text-gray-500">
                    If unchecked, will test with actual API calls instead
                  </p>
                </div>
              </label>

              {config.use_health_endpoint && (
                <div>
                  <Label className="text-sm font-semibold mb-2 block">
                    Health Endpoint (relative path)
                  </Label>
                  <Input
                    placeholder="/health"
                    value={provider?.health_check_endpoint || ''}
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Configure in provider settings
                  </p>
                </div>
              )}
            </>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900">
            <strong>Note:</strong> Health checks run automatically. If provider fails 3 consecutive
            checks, it's marked offline.
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6 border-t pt-4">
          <Button variant="outline" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending} className="bg-green-600 hover:bg-green-700">
            {isPending ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}