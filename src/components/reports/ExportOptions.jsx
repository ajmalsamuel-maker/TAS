import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Download, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function ExportOptions() {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', description: 'Formatted report with charts' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data for analysis' },
    { value: 'excel', label: 'Excel Workbook', description: 'Multi-sheet report' },
    { value: 'json', label: 'JSON', description: 'Structured data format' }
  ];

  const periods = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export - in real app would call backend function
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Report exported as ${selectedFormat.toUpperCase()}`);
    } catch (error) {
      toast.error('Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Period Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Reporting Period
            </label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedFormat(format.value)}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    selectedFormat === format.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold text-sm text-gray-900">{format.label}</p>
                  <p className="text-xs text-gray-600 mt-1">{format.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Report Contents */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700">Report Includes:</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Application Processing Metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Compliance & AML Screening Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span>Alerts & Risk Incidents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>LEI/vLEI Credential Issuance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span>Trend Analysis & KPI Dashboard</span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            className="w-full bg-blue-600 hover:bg-blue-700 h-11"
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export as {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>

          {/* Scheduled Reports */}
          <div className="border-t pt-6 space-y-3">
            <p className="text-sm font-semibold text-gray-700">Scheduled Reports</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="text-sm font-medium text-gray-900">Monthly Compliance Report</p>
                  <p className="text-xs text-gray-500">Last sent: Jan 31, 2026</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="text-sm font-medium text-gray-900">Weekly Metrics Summary</p>
                  <p className="text-xs text-gray-500">Last sent: Jan 26, 2026</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Scheduled Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}