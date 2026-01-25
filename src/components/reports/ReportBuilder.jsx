import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download, Filter, FileText } from 'lucide-react';
import { toast } from 'sonner';

const METRIC_OPTIONS = [
  { id: 'workflows', label: 'Workflows', fields: ['status', 'type', 'created_date'] },
  { id: 'transactions', label: 'Transactions', fields: ['status', 'risk_level', 'amount', 'type'] },
  { id: 'alerts', label: 'AML Alerts', fields: ['severity', 'type', 'status'] },
  { id: 'fraud', label: 'Fraud Alerts', fields: ['fraud_type', 'confidence_score', 'severity'] },
  { id: 'cases', label: 'Cases', fields: ['type', 'priority', 'status', 'time_to_resolve_hours'] },
  { id: 'applications', label: 'Applications', fields: ['status', 'entity_category', 'tas_verification_status'] }
];

const AGGREGATIONS = ['count', 'sum', 'average', 'min', 'max'];
const GROUP_BY_OPTIONS = ['day', 'week', 'month', 'status', 'type', 'category'];

export default function ReportBuilder({ data }) {
  const [reportName, setReportName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [groupBy, setGroupBy] = useState('day');
  const [aggregation, setAggregation] = useState('count');
  const [filters, setFilters] = useState({});
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(m => m !== metricId)
        : [...prev, metricId]
    );
  };

  const generateReport = () => {
    if (selectedMetrics.length === 0) {
      toast.error('Please select at least one metric');
      return;
    }

    const report = {
      name: reportName || 'Custom Report',
      generatedAt: new Date().toISOString(),
      dateRange: { from: dateFrom, to: dateTo },
      metrics: selectedMetrics,
      data: {}
    };

    // Generate data for each selected metric
    selectedMetrics.forEach(metricId => {
      let metricData = data[metricId] || [];

      // Apply date filters
      if (dateFrom || dateTo) {
        metricData = metricData.filter(item => {
          const itemDate = new Date(item.created_date);
          if (dateFrom && itemDate < dateFrom) return false;
          if (dateTo && itemDate > dateTo) return false;
          return true;
        });
      }

      // Calculate aggregations
      if (aggregation === 'count') {
        report.data[metricId] = {
          total: metricData.length,
          breakdown: groupByData(metricData, groupBy)
        };
      } else if (aggregation === 'average' && metricId === 'transactions') {
        const amounts = metricData.map(t => t.amount || 0);
        report.data[metricId] = {
          average: amounts.reduce((a, b) => a + b, 0) / amounts.length || 0,
          total: amounts.reduce((a, b) => a + b, 0)
        };
      }
    });

    setGeneratedReport(report);
    toast.success('Report generated successfully');
  };

  const groupByData = (items, grouping) => {
    const grouped = {};
    
    items.forEach(item => {
      let key;
      if (grouping === 'status') {
        key = item.status || 'unknown';
      } else if (grouping === 'type') {
        key = item.type || 'unknown';
      } else if (grouping === 'day') {
        key = item.created_date?.split('T')[0] || 'unknown';
      } else {
        key = 'all';
      }
      
      grouped[key] = (grouped[key] || 0) + 1;
    });

    return grouped;
  };

  const exportReport = (format) => {
    if (!generatedReport) {
      toast.error('Please generate a report first');
      return;
    }

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(generatedReport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedReport.name.replace(/\s/g, '_')}_${Date.now()}.json`;
      a.click();
      toast.success('Report exported as JSON');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Configuration Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Report Name</Label>
            <Input
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Q1 Performance Report"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm mb-2 block">Select Metrics</Label>
            <div className="space-y-2">
              {METRIC_OPTIONS.map(metric => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.id}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <label htmlFor={metric.id} className="text-sm cursor-pointer">
                    {metric.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-sm">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full mt-1 text-xs">
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {dateFrom ? format(dateFrom, 'PP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-sm">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full mt-1 text-xs">
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {dateTo ? format(dateTo, 'PP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label className="text-sm">Group By</Label>
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GROUP_BY_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm">Aggregation</Label>
            <Select value={aggregation} onValueChange={setAggregation}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AGGREGATIONS.map(agg => (
                  <SelectItem key={agg} value={agg}>
                    {agg.charAt(0).toUpperCase() + agg.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateReport} className="w-full bg-[#0066B3]">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Report Preview</CardTitle>
          {generatedReport && (
            <Button onClick={() => exportReport('json')} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {generatedReport ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{generatedReport.name}</h3>
                <p className="text-sm text-gray-600">
                  Generated: {new Date(generatedReport.generatedAt).toLocaleString()}
                </p>
                {generatedReport.dateRange.from && (
                  <p className="text-sm text-gray-600">
                    Period: {format(generatedReport.dateRange.from, 'PP')} - {generatedReport.dateRange.to ? format(generatedReport.dateRange.to, 'PP') : 'Present'}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {Object.entries(generatedReport.data).map(([metric, values]) => (
                  <Card key={metric}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold capitalize">
                        {metric}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {values.total !== undefined && (
                        <p className="text-2xl font-bold text-[#0044CC] mb-3">
                          Total: {values.total}
                        </p>
                      )}
                      {values.average !== undefined && (
                        <p className="text-lg text-gray-700 mb-2">
                          Average: ${values.average.toFixed(2)}
                        </p>
                      )}
                      {values.breakdown && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Breakdown:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(values.breakdown).map(([key, count]) => (
                              <div key={key} className="flex justify-between bg-gray-50 p-2 rounded">
                                <span className="text-sm text-gray-600">{key}</span>
                                <span className="text-sm font-semibold">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Configure and generate your custom report</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}