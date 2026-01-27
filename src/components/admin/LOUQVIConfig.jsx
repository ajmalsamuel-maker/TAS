import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Key, CheckCircle2, AlertCircle, ExternalLink, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function LOUQVIConfig() {
  const [louProvider, setLouProvider] = useState('rapidlei');
  const [louApiKey, setLouApiKey] = useState('');
  const [louEnabled, setLouEnabled] = useState(false);
  const [showAddLOU, setShowAddLOU] = useState(false);
  const [newLOUName, setNewLOUName] = useState('');
  const [newLOUUrl, setNewLOUUrl] = useState('');

  const [qviProvider, setQviProvider] = useState('gleif');
  const [qviApiKey, setQviApiKey] = useState('');
  const [qviEnabled, setQviEnabled] = useState(false);
  const [showAddQVI, setShowAddQVI] = useState(false);
  const [newQVIName, setNewQVIName] = useState('');
  const [newQVIUrl, setNewQVIUrl] = useState('');

  const [customLOUProviders, setCustomLOUProviders] = useState([]);
  const [customQVIProviders, setCustomQVIProviders] = useState([]);

  const handleAddLOUProvider = () => {
    if (!newLOUName || !newLOUUrl) {
      toast.error('Please provide provider name and URL');
      return;
    }
    const newProvider = {
      value: newLOUName.toLowerCase().replace(/\s+/g, '_'),
      label: newLOUName,
      url: newLOUUrl
    };
    setCustomLOUProviders([...customLOUProviders, newProvider]);
    setLouProvider(newProvider.value);
    setNewLOUName('');
    setNewLOUUrl('');
    setShowAddLOU(false);
    toast.success(`${newLOUName} added successfully`);
  };

  const handleAddQVIProvider = () => {
    if (!newQVIName || !newQVIUrl) {
      toast.error('Please provide provider name and URL');
      return;
    }
    const newProvider = {
      value: newQVIName.toLowerCase().replace(/\s+/g, '_'),
      label: newQVIName,
      url: newQVIUrl
    };
    setCustomQVIProviders([...customQVIProviders, newProvider]);
    setQviProvider(newProvider.value);
    setNewQVIName('');
    setNewQVIUrl('');
    setShowAddQVI(false);
    toast.success(`${newQVIName} added successfully`);
  };

  const handleSaveLOUConfig = () => {
    // In production, this would save to secrets/environment variables
    toast.success('LOU configuration saved (demo mode)');
    setLouEnabled(true);
  };

  const handleSaveQVIConfig = () => {
    // In production, this would save to secrets/environment variables
    toast.success('QVI configuration saved (demo mode)');
    setQviEnabled(true);
  };

  const louProviders = [
    { value: 'rapidlei', label: 'RapidLEI', url: 'https://www.rapidlei.com' },
    { value: 'bloomberg', label: 'Bloomberg LEI', url: 'https://www.bloomberg.com/lei' },
    { value: 'ubisecure', label: 'Ubisecure', url: 'https://www.ubisecure.com' },
    { value: 'gmei', label: 'GMEI Utility', url: 'https://www.gmeiutility.org' },
    ...customLOUProviders
  ];

  const qviProviders = [
    { value: 'gleif', label: 'GLEIF (Direct)', url: 'https://www.gleif.org/vlei' },
    { value: 'partner_qvi', label: 'Partner QVI', url: '#' },
    ...customQVIProviders
  ];

  return (
    <div className="space-y-6">
      {/* LOU Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            LEI Issuance - LOU Integration
          </CardTitle>
          <CardDescription>
            Configure integration with a GLEIF-accredited Local Operating Unit (LOU) for real LEI issuance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Real LEI issuance requires a business agreement with an LOU. 
              API keys are provided after registration and verification.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="lou-provider">LOU Provider</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddLOU(!showAddLOU)}
                >
                  {showAddLOU ? 'Cancel' : '+ Add Custom'}
                </Button>
              </div>
              
              {showAddLOU ? (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <Label htmlFor="new-lou-name">Provider Name</Label>
                    <Input
                      id="new-lou-name"
                      placeholder="e.g., Custom LOU Provider"
                      value={newLOUName}
                      onChange={(e) => setNewLOUName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-lou-url">Website URL</Label>
                    <Input
                      id="new-lou-url"
                      placeholder="https://..."
                      value={newLOUUrl}
                      onChange={(e) => setNewLOUUrl(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddLOUProvider} className="w-full">
                    Add Provider
                  </Button>
                </div>
              ) : (
                <>
                  <Select value={louProvider} onValueChange={setLouProvider}>
                    <SelectTrigger id="lou-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {louProviders.map(provider => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <a 
                    href={louProviders.find(p => p.value === louProvider)?.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    Visit provider website <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
            </div>

            <div>
              <Label htmlFor="lou-api-key">API Key</Label>
              <Input
                id="lou-api-key"
                type="password"
                placeholder="Enter LOU API key..."
                value={louApiKey}
                onChange={(e) => setLouApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                API key will be stored securely in environment variables
              </p>
            </div>

            <div>
              <Label htmlFor="lou-endpoint">API Endpoint</Label>
              <Input
                id="lou-endpoint"
                placeholder="https://api.rapidlei.com/v1"
                defaultValue="https://api.rapidlei.com/v1"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Badge variant={louEnabled ? 'default' : 'outline'} className={louEnabled ? 'bg-green-600' : ''}>
                  {louEnabled ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  {louEnabled ? 'Configured' : 'Not Configured'}
                </Badge>
              </div>
              <Button onClick={handleSaveLOUConfig} disabled={!louApiKey}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QVI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            vLEI Issuance - QVI Integration
          </CardTitle>
          <CardDescription>
            Configure integration with a Qualified vLEI Issuer (QVI) for real vLEI credential issuance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-purple-800">
              <strong>Note:</strong> vLEI issuance requires GLEIF's KERI infrastructure and QVI authorization. 
              This is more complex than LEI issuance and typically requires partnership agreements.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="qvi-provider">QVI Provider</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddQVI(!showAddQVI)}
                >
                  {showAddQVI ? 'Cancel' : '+ Add Custom'}
                </Button>
              </div>
              
              {showAddQVI ? (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <Label htmlFor="new-qvi-name">Provider Name</Label>
                    <Input
                      id="new-qvi-name"
                      placeholder="e.g., Custom QVI Provider"
                      value={newQVIName}
                      onChange={(e) => setNewQVIName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-qvi-url">Website URL</Label>
                    <Input
                      id="new-qvi-url"
                      placeholder="https://..."
                      value={newQVIUrl}
                      onChange={(e) => setNewQVIUrl(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddQVIProvider} className="w-full">
                    Add Provider
                  </Button>
                </div>
              ) : (
                <>
                  <Select value={qviProvider} onValueChange={setQviProvider}>
                    <SelectTrigger id="qvi-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {qviProviders.map(provider => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <a 
                    href={qviProviders.find(p => p.value === qviProvider)?.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-purple-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    Learn more about QVI <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
            </div>

            <div>
              <Label htmlFor="qvi-api-key">QVI API Key / KERI Agent Key</Label>
              <Input
                id="qvi-api-key"
                type="password"
                placeholder="Enter QVI API key..."
                value={qviApiKey}
                onChange={(e) => setQviApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Requires KERI infrastructure setup and witness network configuration
              </p>
            </div>

            <div>
              <Label htmlFor="qvi-endpoint">QVI Endpoint</Label>
              <Input
                id="qvi-endpoint"
                placeholder="https://api.gleif.org/vlei/v1"
                defaultValue="https://api.gleif.org/vlei/v1"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Badge variant={qviEnabled ? 'default' : 'outline'} className={qviEnabled ? 'bg-green-600' : ''}>
                  {qviEnabled ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  {qviEnabled ? 'Configured' : 'Not Configured'}
                </Badge>
              </div>
              <Button onClick={handleSaveQVIConfig} disabled={!qviApiKey}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900 mb-2">Current Mode: DEMO/SANDBOX</p>
              <p className="text-xs text-amber-800">
                The system is currently issuing demo credentials. Configure real LOU/QVI integrations above 
                and update the credential issuance functions to use production APIs. Contact the respective 
                providers for API documentation and integration guides.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}