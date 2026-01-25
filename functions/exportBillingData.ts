import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { format, dateStart, dateEnd, organizationId } = body;

    if (!format || !['csv', 'excel', 'json'].includes(format)) {
      return Response.json({ error: 'Format must be csv, excel, or json' }, { status: 400 });
    }

    // Fetch invoices for date range
    const query = {};
    if (dateStart || dateEnd) {
      query.issue_date = {};
    }
    if (dateStart) query.issue_date.$gte = dateStart;
    if (dateEnd) query.issue_date.$lte = dateEnd;
    if (organizationId) query.organization_id = organizationId;

    const invoices = await base44.entities.Invoice.filter(query);

    // Format data
    let output = '';
    let mimeType = 'text/csv';
    let filename = `invoices-export-${new Date().toISOString().split('T')[0]}`;

    if (format === 'csv') {
      // CSV Header
      const headers = [
        'Invoice Number',
        'Organization ID',
        'Issue Date',
        'Due Date',
        'Status',
        'Subtotal',
        'Tax Rate %',
        'Tax Amount',
        'Total Amount',
        'Currency'
      ];
      output = headers.join(',') + '\n';

      // CSV Rows
      invoices.forEach(invoice => {
        const row = [
          invoice.invoice_number,
          invoice.organization_id,
          invoice.issue_date,
          invoice.due_date,
          invoice.status,
          invoice.subtotal,
          invoice.tax_rate || 0,
          invoice.tax_amount || 0,
          invoice.total_amount,
          invoice.currency
        ];
        output += row.map(cell => `"${cell}"`).join(',') + '\n';
      });

      filename += '.csv';
    } else if (format === 'excel') {
      // Excel format (CSV compatible for now, can use library for XLSX)
      const headers = [
        'Invoice Number',
        'Organization ID',
        'Issue Date',
        'Due Date',
        'Status',
        'Subtotal',
        'Tax Rate %',
        'Tax Amount',
        'Total Amount',
        'Currency'
      ];
      output = headers.join('\t') + '\n';

      invoices.forEach(invoice => {
        const row = [
          invoice.invoice_number,
          invoice.organization_id,
          invoice.issue_date,
          invoice.due_date,
          invoice.status,
          invoice.subtotal,
          invoice.tax_rate || 0,
          invoice.tax_amount || 0,
          invoice.total_amount,
          invoice.currency
        ];
        output += row.join('\t') + '\n';
      });

      mimeType = 'application/vnd.ms-excel';
      filename += '.xlsx';
    } else if (format === 'json') {
      output = JSON.stringify(invoices, null, 2);
      mimeType = 'application/json';
      filename += '.json';
    }

    // Generate downloadable URL
    const file = new Blob([output], { type: mimeType });
    const fileUrl = await base44.integrations.Core.UploadFile({ file });

    return Response.json({
      success: true,
      format: format,
      filename: filename,
      invoiceCount: invoices.length,
      fileUrl: fileUrl.file_url,
      totalAmount: invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0)
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});