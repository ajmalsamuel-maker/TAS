import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function FieldMappingConfig({ integrationKey, integrationName }) {
  const queryClient = useQueryClient();
  const [mappings, setMappings] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch existing mappings
  const { data: existingMappings = [], isLoading } = useQuery({
    queryKey: ['fieldMappings', integrationKey],
    queryFn: async () => {
      const result = await base44.entities.FieldMapping.filter({ integration_key: integrationKey });
      setMappings(result);
      return result;
    }
  });

  // Define field options for different entity types
  const fieldOptions = {
    invoice: {
      app: [
        { value: 'invoice_number', label: 'Invoice Number' },
        { value: 'issue_date', label: 'Issue Date' },
        { value: 'due_date', label: 'Due Date' },
        { value: 'subtotal', label: 'Subtotal' },
        { value: 'tax_amount', label: 'Tax Amount' },
        { value: 'total_amount', label: 'Total Amount' },
        { value: 'currency', label: 'Currency' },
        { value: 'customer_notes', label: 'Customer Notes' },
        { value: 'organization_id', label: 'Customer ID' }
      ],
      accounting: {
        quickbooks: [
          { value: 'DocNumber', label: 'Document Number' },
          { value: 'TxnDate', label: 'Transaction Date' },
          { value: 'DueDate', label: 'Due Date' },
          { value: 'TotalAmt', label: 'Total Amount' },
          { value: 'Balance', label: 'Balance' },
          { value: 'CustomerRef', label: 'Customer Reference' }
        ],
        xero: [
          { value: 'InvoiceNumber', label: 'Invoice Number' },
          { value: 'Date', label: 'Date' },
          { value: 'DueDate', label: 'Due Date' },
          { value: 'SubTotal', label: 'Subtotal' },
          { value: 'TotalTax', label: 'Total Tax' },
          { value: 'Total', label: 'Total' },
          { value: 'Contact', label: 'Contact' }
        ],
        default: [
          { value: 'invoice_num', label: 'Invoice Number' },
          { value: 'date', label: 'Date' },
          { value: 'due_date', label: 'Due Date' },
          { value: 'total', label: 'Total' },
          { value: 'customer_id', label: 'Customer ID' }
        ]
      }
    },
    customer: {
      app: [
        { value: 'legal_name', label: 'Legal Name' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'address', label: 'Address' },
        { value: 'tax_id', label: 'Tax ID' }
      ],
      accounting: {
        quickbooks: [
          { value: 'DisplayName', label: 'Display Name' },
          { value: 'PrimaryEmailAddr', label: 'Email Address' },
          { value: 'PrimaryPhone', label: 'Phone' },
          { value: 'BillAddr', label: 'Billing Address' }
        ],
        xero: [
          { value: 'Name', label: 'Contact Name' },
          { value: 'EmailAddress', label: 'Email Address' },
          { value: 'FirstName', label: 'First Name' },
          { value: 'LastName', label: 'Last Name' }
        ],
        default: [
          { value: 'name', label: 'Name' },
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' }
        ]
      }
    }
  };

  // Save mappings
  const saveMutation = useMutation({
    mutationFn: async () => {
      // Delete existing mappings for this integration
      const existing = await base44.entities.FieldMapping.filter({ integration_key: integrationKey });
      for (const mapping of existing) {
        await base44.entities.FieldMapping.delete(mapping.id);
      }

      // Create new mappings
      for (const mapping of mappings) {
        if (mapping.app_field && mapping.accounting_field) {
          await base44.entities.FieldMapping.create({
            integration_key: integrationKey,
            entity_type: mapping.entity_type,
            app_field: mapping.app_field,
            accounting_field: mapping.accounting_field
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fieldMappings'] });
      toast.success('Field mappings saved');
      setHasChanges(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save mappings');
    }
  });

  const addMapping = (entityType) => {
    setMappings([...mappings, {
      id: `temp-${Date.now()}`,
      entity_type: entityType,
      app_field: '',
      accounting_field: ''
    }]);
    setHasChanges(true);
  };

  const updateMapping = (id, field, value) => {
    setMappings(mappings.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
    setHasChanges(true);
  };

  const removeMapping = (id) => {
    setMappings(mappings.filter(m => m.id !== id));
    setHasChanges(true);
  };

  const accountingFields = fieldOptions.invoice.accounting[integrationKey] 
    || fieldOptions.invoice.accounting.default;

  return (
    <div className="space-y-6">
      {/* Invoice Mappings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice Field Mappings</CardTitle>
            <Button size="sm" onClick={() => addMapping('invoice')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Mapping
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mappings.filter(m => m.entity_type === 'invoice').length === 0 ? (
              <p className="text-center text-gray-500 py-4">No invoice mappings configured</p>
            ) : (
              mappings.filter(m => m.entity_type === 'invoice').map((mapping) => (
                <div key={mapping.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Select 
                    value={mapping.app_field} 
                    onValueChange={(value) => updateMapping(mapping.id, 'app_field', value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="App field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.invoice.app.map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ArrowRight className="h-5 w-5 text-gray-400" />

                  <Select 
                    value={mapping.accounting_field} 
                    onValueChange={(value) => updateMapping(mapping.id, 'accounting_field', value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={`${integrationName} field`} />
                    </SelectTrigger>
                    <SelectContent>
                      {accountingFields.map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeMapping(mapping.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Customer Mappings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Customer Field Mappings</CardTitle>
            <Button size="sm" onClick={() => addMapping('customer')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Mapping
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mappings.filter(m => m.entity_type === 'customer').length === 0 ? (
              <p className="text-center text-gray-500 py-4">No customer mappings configured</p>
            ) : (
              mappings.filter(m => m.entity_type === 'customer').map((mapping) => (
                <div key={mapping.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Select 
                    value={mapping.app_field} 
                    onValueChange={(value) => updateMapping(mapping.id, 'app_field', value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="App field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.customer.app.map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ArrowRight className="h-5 w-5 text-gray-400" />

                  <Select 
                    value={mapping.accounting_field} 
                    onValueChange={(value) => updateMapping(mapping.id, 'accounting_field', value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={`${integrationName} field`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(fieldOptions.customer.accounting[integrationKey] || fieldOptions.customer.accounting.default).map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeMapping(mapping.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {hasChanges && (
        <div className="flex justify-end">
          <Button 
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? 'Saving...' : 'Save All Mappings'}
          </Button>
        </div>
      )}
    </div>
  );
}