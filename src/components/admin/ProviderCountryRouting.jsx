import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Settings, Plus, Trash2, Activity, CheckCircle2 } from 'lucide-react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const COUNTRY_CODES = [
  'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'CH', 'SE',
  'NO', 'DK', 'AU', 'NZ', 'JP', 'CN', 'IN', 'BR', 'MX', 'ZA'
];

export default function ProviderCountryRouting({ provider, onUpdate }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState(provider?.country_routing_rules?.countries || []);
  const [priorityWeight, setPriorityWeight] = useState(provider?.priority_weight || 10);
  const [fallbackEnabled, setFallbackEnabled] = useState(
    provider?.country_routing_rules?.fallback_enabled !== false
  );
  const [exclusiveCountries, setExclusiveCountries] = useState(
    provider?.country_routing_rules?.exclusive_countries || false
  );
  const [availableCountries, setAvailableCountries] = useState([]);

  const queryClient = useQueryClient();

  const { data: providers } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.Provider.list()
  });

  useEffect(() => {
    if (providers) {
      const countries = new Set();
      providers.forEach(p => {
        if (p.country_routing_rules?.countries?.length > 0) {
          p.country_routing_rules.countries.forEach(c => countries.add(c));
        }
      });
      setAvailableCountries(Array.from(countries).sort());
    }
  }, [providers]);

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
      priority_weight: parseInt(priorityWeight),
      country_routing_rules: {
        enabled: true,
        countries: selectedCountries,
        fallback_enabled: fallbackEnabled,
        exclusive_countries: exclusiveCountries
      }
    });
  };

  const toggleCountry = (code) => {
    setSelectedCountries(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const selectAllCountries = () => {
    setSelectedCountries([...COUNTRY_CODES]);
  };

  const allSelected = selectedCountries.length === COUNTRY_CODES.length;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Globe className="h-4 w-4" />
          Routing Rules
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Configure Routing for {provider.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="priority" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="priority">Priority</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="fallback">Fallback</TabsTrigger>
          </TabsList>

          <TabsContent value="priority" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
              Lower numbers = higher priority. Within the same country, providers are sorted by weight.
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Priority Weight</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={priorityWeight}
                onChange={(e) => setPriorityWeight(e.target.value)}
                placeholder="10"
              />
              <p className="text-xs text-gray-500 mt-2">
                Current: <Badge variant="secondary">{priorityWeight}</Badge>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="countries" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
              {selectedCountries.length === 0
                ? 'No countries selected = Provider available globally'
                : `Provider serves ${selectedCountries.length} countries`}
            </div>

            {availableCountries.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-900">
                <p className="font-semibold mb-2">Countries Covered by Other Providers:</p>
                <div className="flex flex-wrap gap-2">
                  {availableCountries.map(code => (
                    <Badge key={code} variant="secondary" className="bg-green-100 text-green-800">
                      {code}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <Label className="text-sm font-semibold">Select Countries</Label>
              <div className="flex gap-2">
                {selectedCountries.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCountries([])}
                  >
                    Clear All
                  </Button>
                )}
                <Button
                  variant={allSelected ? "secondary" : "outline"}
                  size="sm"
                  onClick={selectAllCountries}
                  className="flex items-center gap-1"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Select All
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {COUNTRY_CODES.map(code => (
                <button
                  key={code}
                  onClick={() => toggleCountry(code)}
                  className={`px-3 py-1.5 rounded border font-medium text-sm transition-all ${
                    selectedCountries.includes(code)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fallback" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-900">
                <strong>Exclusive Mode:</strong> If enabled, this provider will ONLY serve the selected
                countries and won't be used as fallback for other regions.
              </div>

              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={exclusiveCountries}
                  onChange={(e) => setExclusiveCountries(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Enable Exclusive Mode</span>
              </label>

              <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-900 mt-4">
                <strong>Fallback Mode:</strong> If disabled, this provider won't be used as a fallback if
                primary providers fail.
              </div>

              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={fallbackEnabled}
                  onChange={(e) => setFallbackEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Allow as Fallback Provider</span>
              </label>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 justify-end mt-6 border-t pt-4">
          <Button variant="outline" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
            {isPending ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}