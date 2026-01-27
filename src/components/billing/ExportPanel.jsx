import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Loader, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function ExportPanel() {
  const [filters, setFilters] = useState({
    format: 'csv',
    dateStart: '',
    dateEnd: ''
  });

  // Export function
  const exportMutation = useMutation({
    mutationFn: (data) => base44.functions.invoke('exportBillingData', data),
    onSuccess: (response) => {
      toast.success(`Exported ${response.data.invoiceCount} invoices`);
      // Open download
      window.open(response.data.fileUrl, '_blank');
    },
    onError: (error) => {
      toast.error(error.message || 'Export failed');
    }
  });

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: FileText },
    { value: 'excel', label: 'Excel (XLSX)', icon: Activity },
    { value: 'json', label: 'JSON', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Billing Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Export Format</label>
            <div className="grid md:grid-cols-3 gap-2">
              {formatOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setFilters({...filters, format: option.value})}
                    className={`p-4 border rounded-lg transition-all flex flex-col items-center gap-2 ${
                      filters.format === option.value
                        ? 'bg-blue-100 border-blue-400'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-8 w-8 text-blue-600" />
                    <p className="text-sm font-semibold">{option.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Date From</label>
              <Input
                type="date"
                value={filters.dateStart}
                onChange={(e) => setFilters({...filters, dateStart: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Date To</label>
              <Input
                type="date"
                value={filters.dateEnd}
                onChange={(e) => setFilters({...filters, dateEnd: e.target.value})}
              />
            </div>
          </div>

          <Button
            onClick={() => exportMutation.mutate(filters)}
            disabled={exportMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {exportMutation.isPending ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Generating Export...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export {filters.format.toUpperCase()}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Info */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex items-start gap-2">
          <Activity className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <strong>Export Formats:</strong> Use CSV for spreadsheet applications, Excel for advanced formatting, or JSON for system integrations.
          </p>
        </div>
      </div>

      {/* Quick Export Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Exports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
              exportMutation.mutate({ format: 'csv', dateStart: lastMonth, dateEnd: today });
            }}
            disabled={exportMutation.isPending}
          >
            <FileText className="h-4 w-4 mr-2" />
            Last 30 Days (CSV)
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const currentYear = new Date().getFullYear();
              exportMutation.mutate({ format: 'excel', dateStart: `${currentYear}-01-01`, dateEnd: `${currentYear}-12-31` });
            }}
            disabled={exportMutation.isPending}
          >
            <FileText className="h-4 w-4 mr-2" />
            This Year (Excel)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}