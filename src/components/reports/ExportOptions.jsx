import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export default function ExportOptions({ data, onClose }) {
  const [format, setFormat] = useState('csv');
  const [selectedData, setSelectedData] = useState(['workflows', 'transactions', 'alerts']);

  const handleExportCSV = () => {
    selectedData.forEach(dataType => {
      const items = data[dataType] || [];
      if (items.length === 0) return;

      // Get all unique keys from the data
      const keys = [...new Set(items.flatMap(item => Object.keys(item)))];
      
      // Create CSV content
      let csv = keys.join(',') + '\n';
      items.forEach(item => {
        const row = keys.map(key => {
          const value = item[key];
          if (typeof value === 'object') return JSON.stringify(value);
          return value || '';
        });
        csv += row.join(',') + '\n';
      });

      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dataType}_export_${Date.now()}.csv`;
      a.click();
    });

    toast.success('CSV files exported successfully');
    onClose();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text('TAS Platform Analytics Report', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPosition);
    yPosition += 15;

    selectedData.forEach(dataType => {
      const items = data[dataType] || [];
      
      // Section title
      doc.setFontSize(14);
      doc.text(dataType.toUpperCase(), 20, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.text(`Total Records: ${items.length}`, 20, yPosition);
      yPosition += 6;

      // Summary stats
      if (dataType === 'workflows') {
        const completed = items.filter(w => w.status === 'completed').length;
        doc.text(`Completed: ${completed} (${Math.round(completed/items.length*100)}%)`, 20, yPosition);
      } else if (dataType === 'transactions') {
        const approved = items.filter(t => t.status === 'approved').length;
        doc.text(`Approved: ${approved} (${Math.round(approved/items.length*100)}%)`, 20, yPosition);
      } else if (dataType === 'alerts') {
        const critical = items.filter(a => a.severity === 'critical').length;
        doc.text(`Critical: ${critical}`, 20, yPosition);
      }

      yPosition += 10;

      // Add new page if needed
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save(`analytics_report_${Date.now()}.pdf`);
    toast.success('PDF report exported successfully');
    onClose();
  };

  const handleExport = () => {
    if (format === 'csv') {
      handleExportCSV();
    } else if (format === 'pdf') {
      handleExportPDF();
    }
  };

  const toggleDataType = (dataType) => {
    setSelectedData(prev => 
      prev.includes(dataType)
        ? prev.filter(d => d !== dataType)
        : [...prev, dataType]
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            Export Analytics Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div>
            <Label className="text-sm font-medium">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    CSV (Spreadsheet)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF (Report)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Select Data to Export</Label>
            <div className="space-y-2">
              {[
                { id: 'workflows', label: 'Workflows', count: data.workflows?.length || 0 },
                { id: 'transactions', label: 'Transactions', count: data.transactions?.length || 0 },
                { id: 'alerts', label: 'AML Alerts', count: data.alerts?.length || 0 },
                { id: 'fraudAlerts', label: 'Fraud Alerts', count: data.fraudAlerts?.length || 0 },
                { id: 'cases', label: 'Cases', count: data.cases?.length || 0 },
                { id: 'applications', label: 'Applications', count: data.applications?.length || 0 }
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={selectedData.includes(item.id)}
                      onCheckedChange={() => toggleDataType(item.id)}
                    />
                    <label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">{item.count} records</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-900">
              {format === 'csv' 
                ? 'CSV files will be downloaded separately for each data type'
                : 'PDF will contain summary statistics for all selected data'}
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleExport} 
              disabled={selectedData.length === 0}
              className="flex-1 bg-[#0066B3]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export {format.toUpperCase()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}