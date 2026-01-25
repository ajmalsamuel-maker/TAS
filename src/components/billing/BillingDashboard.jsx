import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, FileText, TrendingUp, AlertCircle, Download, Send } from 'lucide-react';

export default function BillingDashboard({ organizationId }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Fetch billing stats
  const { data: stats } = useQuery({
    queryKey: ['billingStats', organizationId],
    queryFn: async () => {
      const invoices = await base44.entities.Invoice.filter({
        organization_id: organizationId
      });
      
      const totalRevenue = invoices
        .filter(i => i.status === 'paid')
        .reduce((sum, i) => sum + (i.total_amount || 0), 0);
      
      const unpaid = invoices
        .filter(i => ['issued', 'sent', 'overdue'].includes(i.status))
        .reduce((sum, i) => sum + (i.total_amount || 0), 0);
      
      return {
        totalRevenue,
        unpaid,
        invoiceCount: invoices.length,
        paidCount: invoices.filter(i => i.status === 'paid').length
      };
    }
  });

  // Fetch invoices
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices', organizationId],
    queryFn: () => base44.entities.Invoice.filter({ organization_id: organizationId })
  });

  // Fetch usage metrics
  const { data: usage } = useQuery({
    queryKey: ['usageMetrics', organizationId],
    queryFn: () => base44.entities.UsageMetrics.filter({ organization_id: organizationId })
  });

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    issued: 'bg-blue-100 text-blue-800',
    sent: 'bg-blue-100 text-blue-800',
    viewed: 'bg-cyan-100 text-cyan-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${stats?.totalRevenue.toFixed(2) || '0'}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unpaid Amount</p>
                <p className="text-2xl font-bold">${stats?.unpaid.toFixed(2) || '0'}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Invoices</p>
                <p className="text-2xl font-bold">{stats?.invoiceCount || 0}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid %</p>
                <p className="text-2xl font-bold">
                  {stats?.invoiceCount ? Math.round((stats.paidCount / stats.invoiceCount) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-600">Loading invoices...</p>
          ) : invoices?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 font-semibold">Invoice #</th>
                    <th className="text-left py-2 px-2 font-semibold">Period</th>
                    <th className="text-right py-2 px-2 font-semibold">Amount</th>
                    <th className="text-left py-2 px-2 font-semibold">Status</th>
                    <th className="text-left py-2 px-2 font-semibold">Due Date</th>
                    <th className="text-left py-2 px-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-mono text-sm">{invoice.invoice_number}</td>
                      <td className="py-3 px-2 text-sm">
                        {invoice.billing_period_start} to {invoice.billing_period_end}
                      </td>
                      <td className="py-3 px-2 text-right font-semibold">
                        ${invoice.total_amount?.toFixed(2) || '0'}
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={statusColors[invoice.status] || 'bg-gray-100'}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-sm">{invoice.due_date}</td>
                      <td className="py-3 px-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedInvoice(invoice)}
                          className="text-xs"
                        >
                          View
                        </Button>
                        {invoice.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs text-blue-600"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Send
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No invoices found</p>
          )}
        </CardContent>
      </Card>

      {/* Usage Summary */}
      {usage?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Usage This Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">KYB Verifications</p>
                <p className="text-xl font-bold">{usage[0].kyb_verifications || 0}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">AML Screenings</p>
                <p className="text-xl font-bold">{usage[0].aml_screenings || 0}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">LEI Issuances</p>
                <p className="text-xl font-bold">{usage[0].lei_issuances || 0}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">API Calls</p>
                <p className="text-xl font-bold">{usage[0].api_calls || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Invoice {selectedInvoice.invoice_number}</CardTitle>
              <button onClick={() => setSelectedInvoice(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">Issue Date</p>
                  <p className="font-semibold">{selectedInvoice.issue_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-semibold">{selectedInvoice.due_date}</p>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <h3 className="font-semibold mb-3">Items</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm">Description</th>
                      <th className="text-right py-2 text-sm">Qty</th>
                      <th className="text-right py-2 text-sm">Unit Price</th>
                      <th className="text-right py-2 text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items?.map((item, idx) => (
                      <tr key={idx} className="border-b text-sm">
                        <td className="py-2">{item.description}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">${item.unit_price?.toFixed(2)}</td>
                        <td className="text-right font-semibold">${item.total?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${selectedInvoice.subtotal?.toFixed(2)}</span>
                </div>
                {selectedInvoice.tax_amount > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({selectedInvoice.tax_rate}%):</span>
                    <span>${selectedInvoice.tax_amount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${selectedInvoice.total_amount?.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}