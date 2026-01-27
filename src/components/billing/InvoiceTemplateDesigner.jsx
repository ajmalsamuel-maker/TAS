import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, Eye, Save, Plus } from 'lucide-react';
import { toast } from 'sonner';

const INVOICE_STANDARDS = {
  en16931: {
    name: 'EN 16931 (EU Standard)',
    regions: ['European Union'],
    required_fields: [
      'Invoice number',
      'Invoice date',
      'Due date',
      'Seller tax ID (VAT)',
      'Buyer tax ID (VAT)',
      'Seller name & address',
      'Buyer name & address',
      'Line items with VAT treatment',
      'Total amount excluding VAT',
      'Total VAT amount',
      'Total amount including VAT'
    ],
    validation: 'Machine-readable (XML/JSON)',
    notes: 'Required for B2B e-invoicing in EU'
  },
  peppol: {
    name: 'PEPPOL (Pan-European)',
    regions: ['European Union', 'Nordic Countries'],
    required_fields: [
      'Invoice ID (unique per seller)',
      'Issue date',
      'Invoice type code',
      'Seller details with VAT ID',
      'Buyer details with VAT ID',
      'Delivery date',
      'Payment terms',
      'Line items',
      'Accounting cost center',
      'Payment instructions (bank details)'
    ],
    validation: 'UBL 2.1 or CII format',
    notes: 'Digital, structured format for public procurement'
  },
  ubl: {
    name: 'UBL 2.1 (Universal Business Language)',
    regions: ['Global', 'Nordic', 'Australia'],
    required_fields: [
      'Invoice ID',
      'Issue date',
      'Accounting supplier (seller)',
      'Accounting customer (buyer)',
      'Invoice line items',
      'Monetary totals',
      'Payment means',
      'Tax total',
      'Contact information'
    ],
    validation: 'XML-based structured format',
    notes: 'International standard used globally'
  },
  gst: {
    name: 'GST/ITC (India, Australia)',
    regions: ['India', 'Australia'],
    required_fields: [
      'GST invoice number',
      'Date of issue',
      'Seller GSTIN',
      'Buyer GSTIN',
      'HSN/SAC codes',
      'Item description',
      'Quantity & unit',
      'Item value',
      'GST rate & amount',
      'IGST/SGST/UTGST/CGST',
      'Invoice total'
    ],
    validation: 'GSTR-1/GSTR-2 compliance',
    notes: 'Required for tax filing and audits'
  },
  gleif_lei: {
    name: 'GLEIF/LEI Standards',
    regions: ['Global - Financial Services'],
    required_fields: [
      'LEI of service provider',
      'LEI of customer (if applicable)',
      'Service date range',
      'Detailed service description',
      'Cost breakdown by service type',
      'Regulatory references',
      'Audit trail information',
      'Digital signatures',
      'Compliance flags'
    ],
    validation: 'Cryptographic signatures required',
    notes: 'For financial services, compliance operations'
  }
};

export default function InvoiceTemplateDesigner() {
  const queryClient = useQueryClient();
  const [selectedStandard, setSelectedStandard] = useState('AT');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [autoDetectByCountry, setAutoDetectByCountry] = useState(false);
  const [showAddStandard, setShowAddStandard] = useState(false);
  const [newStandardData, setNewStandardData] = useState({
    country_code: '',
    country_name: '',
    invoicing_standards: [],
    required_fields: [],
    tax_identification: { field_name: '', format_pattern: '', required: false },
    tax_treatment: { vat_applicable: false, default_tax_rate: 0, reverse_charge_applicable: false, tax_label: '' },
    invoice_format: { date_format: 'DD/MM/YYYY', decimal_separator: '.', currency_format: '', language_requirement: '' },
    legal_requirements: { invoice_retention_days: 2555, sequential_numbering_required: false, signature_required: false, digital_invoice_accepted: true, electronic_submission_required: false }
  });
  const [templateData, setTemplateData] = useState({
    header_logo_position: 'left',
    header_text: 'INVOICE',
    show_seller_info: true,
    show_buyer_info: true,
    show_line_items: true,
    show_tax_breakdown: true,
    show_payment_terms: true,
    show_notes: true,
    footer_text: '',
    terms_conditions: '',
    css_customizations: '',
    currency_position: 'left',
    date_format: 'DD/MM/YYYY'
  });

  const { data: invoiceStandards } = useQuery({
    queryKey: ['invoiceStandards'],
    queryFn: () => base44.entities.InvoiceStandard.list()
  });

  const addStandardMutation = useMutation({
    mutationFn: (data) => base44.entities.InvoiceStandard.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoiceStandards'] });
      toast.success('Invoice standard added successfully');
      setShowAddStandard(false);
      setNewStandardData({
        country_code: '',
        country_name: '',
        invoicing_standards: [],
        required_fields: [],
        tax_identification: { field_name: '', format_pattern: '', required: false },
        tax_treatment: { vat_applicable: false, default_tax_rate: 0, reverse_charge_applicable: false, tax_label: '' },
        invoice_format: { date_format: 'DD/MM/YYYY', decimal_separator: '.', currency_format: '', language_requirement: '' },
        legal_requirements: { invoice_retention_days: 2555, sequential_numbering_required: false, signature_required: false, digital_invoice_accepted: true, electronic_submission_required: false }
      });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add standard');
    }
  });

  const { data: settings } = useQuery({
    queryKey: ['billingSettings'],
    queryFn: () => base44.entities.BillingSettings.filter({}).then(r => r[0])
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const existingSettings = await base44.entities.BillingSettings.filter({});
      const updatedSettings = {
        ...settings,
        invoice_template: {
          ...settings?.invoice_template,
          ...templateData,
          standard_compliance: selectedStandard,
          auto_detect_by_country: autoDetectByCountry,
          country_templates: selectedCountry ? {
            [selectedCountry]: {
              ...templateData,
              standard_compliance: selectedStandard
            }
          } : {}
        }
      };

      if (existingSettings[0]) {
        return await base44.entities.BillingSettings.update(existingSettings[0].id, updatedSettings);
      } else {
        return await base44.entities.BillingSettings.create(updatedSettings);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billingSettings'] });
      toast.success('Invoice template saved');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save template');
    }
  });

  const standard = INVOICE_STANDARDS[selectedStandard];

  return (
    <div className="space-y-6">
      {/* Country & Auto-Detection */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Standard Selection</CardTitle>
          <CardDescription>
            Configure global or country-specific invoice standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-3 p-3 border rounded-lg">
            <input
              type="checkbox"
              checked={autoDetectByCountry}
              onChange={(e) => setAutoDetectByCountry(e.target.checked)}
            />
            <span className="font-medium text-sm">Auto-detect invoice standard based on customer country</span>
          </label>
          
          {autoDetectByCountry && invoiceStandards && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Country</label>
              <select
                value={selectedCountry || ''}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="">-- Choose a country --</option>
                {invoiceStandards.map(std => (
                  <option key={std.id} value={std.country_code}>
                    {std.country_name}
                  </option>
                ))}
              </select>
              {selectedCountry && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                  <p className="font-medium">Standards for this country:</p>
                  <p className="text-gray-700 mt-1">
                    {invoiceStandards.find(s => s.country_code === selectedCountry)?.invoicing_standards?.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Standards Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Global Invoice Standards & Compliance</CardTitle>
          <CardDescription>
            {autoDetectByCountry 
              ? `Customer invoices will automatically use the standard for their country` 
              : 'Choose the default invoicing standard for all invoices'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            >
              <option value="">-- Select Country/Standard --</option>
              {invoiceStandards?.map((std) => (
                <option key={std.id} value={std.country_code}>
                  {std.country_name} - {std.invoicing_standards?.join(', ')}
                </option>
              ))}
            </select>
            
            <Dialog open={showAddStandard} onOpenChange={setShowAddStandard}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Standard
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Invoicing Standard</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Country Code (ISO 3166-1 alpha-2)</label>
                      <Input
                        value={newStandardData.country_code}
                        onChange={(e) => setNewStandardData({...newStandardData, country_code: e.target.value.toUpperCase()})}
                        placeholder="e.g., US"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country Name</label>
                      <Input
                        value={newStandardData.country_name}
                        onChange={(e) => setNewStandardData({...newStandardData, country_name: e.target.value})}
                        placeholder="e.g., United States"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Invoicing Standards (comma-separated)</label>
                    <Input
                      value={newStandardData.invoicing_standards?.join(', ')}
                      onChange={(e) => setNewStandardData({...newStandardData, invoicing_standards: e.target.value.split(',').map(s => s.trim())})}
                      placeholder="e.g., UBL 2.1, Custom Standard"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Required Fields (comma-separated)</label>
                    <Textarea
                      value={newStandardData.required_fields?.join(', ')}
                      onChange={(e) => setNewStandardData({...newStandardData, required_fields: e.target.value.split(',').map(s => s.trim())})}
                      placeholder="e.g., Invoice number, Invoice date, Tax ID"
                      className="min-h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tax Identification Field</label>
                      <Input
                        value={newStandardData.tax_identification?.field_name}
                        onChange={(e) => setNewStandardData({...newStandardData, tax_identification: {...newStandardData.tax_identification, field_name: e.target.value}})}
                        placeholder="e.g., VAT ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Default Tax Rate (%)</label>
                      <Input
                        type="number"
                        value={newStandardData.tax_treatment?.default_tax_rate}
                        onChange={(e) => setNewStandardData({...newStandardData, tax_treatment: {...newStandardData.tax_treatment, default_tax_rate: parseFloat(e.target.value)}})}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Currency Code</label>
                      <Input
                        value={newStandardData.invoice_format?.currency_format}
                        onChange={(e) => setNewStandardData({...newStandardData, invoice_format: {...newStandardData.invoice_format, currency_format: e.target.value.toUpperCase()}})}
                        placeholder="e.g., USD"
                        maxLength={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Language Requirement</label>
                      <Input
                        value={newStandardData.invoice_format?.language_requirement}
                        onChange={(e) => setNewStandardData({...newStandardData, invoice_format: {...newStandardData.invoice_format, language_requirement: e.target.value}})}
                        placeholder="e.g., EN/ES"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => addStandardMutation.mutate(newStandardData)}
                      disabled={!newStandardData.country_code || !newStandardData.country_name || addStandardMutation.isPending}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {addStandardMutation.isPending ? 'Adding...' : 'Add Standard'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddStandard(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {selectedStandard && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              {(() => {
                const selected = invoiceStandards?.find(s => s.country_code === selectedStandard);
                return (
                  <>
                    <p className="font-semibold text-sm mb-2">{selected?.country_name}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Standards:</strong> {selected?.invoicing_standards?.join(', ')}</p>
                      <p><strong>Default Tax Rate:</strong> {selected?.tax_treatment?.default_tax_rate}%</p>
                      <p><strong>Currency:</strong> {selected?.invoice_format?.currency_format}</p>
                      <p><strong>Language:</strong> {selected?.invoice_format?.language_requirement}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Standard Details */}
      {standard && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{standard.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Applicable Regions</h4>
              <div className="flex flex-wrap gap-2">
                {standard.regions.map(region => (
                  <span key={region} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {region}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Required Fields</h4>
              <ul className="space-y-1 text-sm">
                {standard.required_fields.map((field, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-900">
                <strong>Format:</strong> {standard.validation}
              </p>
              <p className="text-sm text-amber-900 mt-1">
                <strong>Note:</strong> {standard.notes}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Template Designer */}
      <Card>
        <CardHeader>
          <CardTitle>Customize Invoice Template</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="layout" className="space-y-4">
            <TabsList>
              <TabsTrigger value="layout">Layout & Design</TabsTrigger>
              <TabsTrigger value="fields">Invoice Fields</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Header Text</label>
                  <Input
                    value={templateData.header_text}
                    onChange={(e) => setTemplateData({...templateData, header_text: e.target.value})}
                    placeholder="e.g., INVOICE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date Format</label>
                  <select
                    value={templateData.date_format}
                    onChange={(e) => setTemplateData({...templateData, date_format: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                    <option>DD.MM.YYYY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Currency Position</label>
                  <select
                    value={templateData.currency_position}
                    onChange={(e) => setTemplateData({...templateData, currency_position: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="left">Left (€100)</option>
                    <option value="right">Right (100€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Logo Position</label>
                  <select
                    value={templateData.header_logo_position}
                    onChange={(e) => setTemplateData({...templateData, header_logo_position: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Footer Text</label>
                <Textarea
                  value={templateData.footer_text}
                  onChange={(e) => setTemplateData({...templateData, footer_text: e.target.value})}
                  placeholder="Company details, contact info, etc."
                  className="min-h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Custom CSS</label>
                <Textarea
                  value={templateData.css_customizations}
                  onChange={(e) => setTemplateData({...templateData, css_customizations: e.target.value})}
                  placeholder="/* Add custom styles */"
                  className="min-h-24 font-mono text-xs"
                />
              </div>
            </TabsContent>

            {/* Fields Tab */}
            <TabsContent value="fields" className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={templateData.show_seller_info}
                    onChange={(e) => setTemplateData({...templateData, show_seller_info: e.target.checked})}
                  />
                  <span className="font-medium text-sm">Seller Information (Company name, address, VAT ID)</span>
                </label>

                <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={templateData.show_buyer_info}
                    onChange={(e) => setTemplateData({...templateData, show_buyer_info: e.target.checked})}
                  />
                  <span className="font-medium text-sm">Buyer Information (Customer name, address, VAT ID)</span>
                </label>

                <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={templateData.show_line_items}
                    onChange={(e) => setTemplateData({...templateData, show_line_items: e.target.checked})}
                  />
                  <span className="font-medium text-sm">Line Items (Description, quantity, unit price, total)</span>
                </label>

                <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={templateData.show_tax_breakdown}
                    onChange={(e) => setTemplateData({...templateData, show_tax_breakdown: e.target.checked})}
                  />
                  <span className="font-medium text-sm">Tax Breakdown (Subtotal, tax rate, tax amount, total)</span>
                </label>

                <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={templateData.show_payment_terms}
                    onChange={(e) => setTemplateData({...templateData, show_payment_terms: e.target.checked})}
                  />
                  <span className="font-medium text-sm">Payment Terms (Due date, payment methods, bank details)</span>
                </label>

                <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={templateData.show_notes}
                    onChange={(e) => setTemplateData({...templateData, show_notes: e.target.checked})}
                  />
                  <span className="font-medium text-sm">Additional Notes & References</span>
                </label>
              </div>
            </TabsContent>

            {/* Terms & Conditions Tab */}
            <TabsContent value="terms" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
                <Textarea
                  value={templateData.terms_conditions}
                  onChange={(e) => setTemplateData({...templateData, terms_conditions: e.target.value})}
                  placeholder="Enter your standard terms and conditions..."
                  className="min-h-40"
                />
                <p className="text-xs text-gray-500 mt-2">
                  These will appear on every invoice generated
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-semibold mb-2">Common T&C Sections:</p>
                <ul className="space-y-1 ml-4 list-disc text-xs">
                  <li>Payment terms (Net 30, Net 60, etc.)</li>
                  <li>Late payment penalties or interest rates</li>
                  <li>Refund policy and conditions</li>
                  <li>Dispute resolution process</li>
                  <li>Service level agreements (if applicable)</li>
                  <li>Data protection and privacy commitments</li>
                  <li>Tax and regulatory compliance notes</li>
                </ul>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-lg bg-white p-8 shadow-sm">
                <div className="space-y-6 max-w-2xl mx-auto">
                  {/* Header */}
                  <div className={`text-center mb-8 ${templateData.header_logo_position === 'left' ? 'text-left' : templateData.header_logo_position === 'right' ? 'text-right' : 'text-center'}`}>
                    <h1 className="text-3xl font-bold">{templateData.header_text || 'INVOICE'}</h1>
                  </div>

                  {/* Invoice Numbers & Dates */}
                  <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div>
                      <p className="text-xs text-gray-600">Invoice Number</p>
                      <p className="font-semibold">INV-2026-001</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Invoice Date</p>
                      <p className="font-semibold">27/01/2026</p>
                    </div>
                  </div>

                  {/* Seller & Buyer Info */}
                  {(templateData.show_seller_info || templateData.show_buyer_info) && (
                    <div className="grid grid-cols-2 gap-8 text-sm">
                      {templateData.show_seller_info && (
                        <div>
                          <p className="font-semibold text-xs text-gray-600 mb-2">FROM</p>
                          <p className="font-semibold">Your Company Name</p>
                          <p className="text-gray-600">Street Address</p>
                          <p className="text-gray-600">City, Country 12345</p>
                          <p className="text-gray-600">VAT ID: XX123456789</p>
                        </div>
                      )}
                      {templateData.show_buyer_info && (
                        <div>
                          <p className="font-semibold text-xs text-gray-600 mb-2">BILL TO</p>
                          <p className="font-semibold">Customer Name</p>
                          <p className="text-gray-600">Customer Address</p>
                          <p className="text-gray-600">City, Country 12345</p>
                          <p className="text-gray-600">VAT ID: XX987654321</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Line Items */}
                  {templateData.show_line_items && (
                    <div>
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b-2">
                            <th className="text-left py-2">Description</th>
                            <th className="text-right py-2">Qty</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Professional Services</td>
                            <td className="text-right">1</td>
                            <td className="text-right">$1,000.00</td>
                            <td className="text-right font-semibold">$1,000.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Tax Breakdown */}
                  {templateData.show_tax_breakdown && (
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$1,000.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (20%)</span>
                        <span>$200.00</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total Due</span>
                        <span>$1,200.00</span>
                      </div>
                    </div>
                  )}

                  {/* Payment Terms */}
                  {templateData.show_payment_terms && (
                    <div className="bg-gray-50 p-4 rounded text-sm">
                      <p className="font-semibold mb-2">Payment Terms</p>
                      <p className="text-gray-600 text-xs">Due: 27/02/2026 (Net 30)</p>
                      <p className="text-gray-600 text-xs mt-1">Payment Method: Bank Transfer</p>
                    </div>
                  )}

                  {/* Terms & Conditions */}
                  {templateData.terms_conditions && (
                    <div className="text-xs border-t pt-4">
                      <p className="font-semibold mb-2">Terms & Conditions</p>
                      <p className="text-gray-600">{templateData.terms_conditions.substring(0, 100)}...</p>
                    </div>
                  )}

                  {/* Footer */}
                  {templateData.footer_text && (
                    <div className="text-center text-xs text-gray-600 border-t pt-4">
                      {templateData.footer_text}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {saveMutation.isPending ? 'Saving...' : 'Save Template'}
        </Button>
      </div>
    </div>
  );
}