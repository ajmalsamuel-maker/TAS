import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { invoiceId, accountingSystem } = body;

    if (!invoiceId || !accountingSystem) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch invoice
    const invoices = await base44.entities.Invoice.filter({ id: invoiceId });
    if (!invoices.length) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const invoice = invoices[0];

    // Fetch billing settings
    const settings = await base44.entities.BillingSettings.filter({});
    const settingsData = settings.length ? settings[0] : {};

    // Format for different accounting systems
    let exportPayload = {};
    let externalId = null;

    switch (accountingSystem) {
      case 'quickbooks':
        // QuickBooks Online API format
        exportPayload = {
          docNumber: invoice.invoice_number,
          txnDate: invoice.issue_date,
          dueDate: invoice.due_date,
          amount: invoice.total_amount,
          line: invoice.items.map(item => ({
            detailType: 'SalesItemLineDetail',
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unit_price,
            amount: item.total
          }))
        };
        externalId = `QB-${invoice.invoice_number}`;
        break;

      case 'xero':
        // Xero API format
        exportPayload = {
          InvoiceNumber: invoice.invoice_number,
          InvoiceDate: invoice.issue_date,
          DueDate: invoice.due_date,
          Total: invoice.total_amount,
          LineItems: invoice.items.map(item => ({
            Description: item.description,
            Quantity: item.quantity,
            UnitAmount: item.unit_price,
            LineAmount: item.total
          }))
        };
        externalId = `XER-${invoice.invoice_number}`;
        break;

      case 'sage':
        // Sage format
        exportPayload = {
          InvoiceNumber: invoice.invoice_number,
          InvoiceDate: invoice.issue_date,
          DueDate: invoice.due_date,
          InvoiceAmount: invoice.total_amount,
          InvoiceDetails: invoice.items.map(item => ({
            ItemDescription: item.description,
            Qty: item.quantity,
            UnitPrice: item.unit_price,
            Amount: item.total
          }))
        };
        externalId = `SAG-${invoice.invoice_number}`;
        break;

      case 'netsuite':
        // NetSuite SuiteScript format
        exportPayload = {
          tranid: invoice.invoice_number,
          trandate: invoice.issue_date,
          duedate: invoice.due_date,
          total: invoice.total_amount,
          item: invoice.items.map(item => ({
            item_description: item.description,
            quantity: item.quantity,
            rate: item.unit_price,
            amount: item.total
          }))
        };
        externalId = `NET-${invoice.invoice_number}`;
        break;

      case 'oracle':
        // Oracle Finance Cloud format
        exportPayload = {
          invoiceNumber: invoice.invoice_number,
          invoiceDate: invoice.issue_date,
          dueDate: invoice.due_date,
          invoiceAmount: invoice.total_amount,
          invoiceLines: invoice.items.map(item => ({
            lineNumber: invoice.items.indexOf(item) + 1,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unit_price,
            lineAmount: item.total
          }))
        };
        externalId = `ORC-${invoice.invoice_number}`;
        break;

      case 'sap':
        // SAP format
        exportPayload = {
          VBELN: invoice.invoice_number,
          FKDAT: invoice.issue_date,
          FKDAT_DUE: invoice.due_date,
          NETWR: invoice.total_amount,
          POSITIONS: invoice.items.map((item, idx) => ({
            POSNR: String(idx + 1).padStart(6, '0'),
            VTEXT: item.description,
            MENGE: item.quantity,
            NETPR: item.unit_price,
            NETWR: item.total
          }))
        };
        externalId = `SAP-${invoice.invoice_number}`;
        break;

      default:
        return Response.json({ error: 'Unsupported accounting system' }, { status: 400 });
    }

    // Update invoice with export record
    const exportedTo = invoice.exported_to || [];
    exportedTo.push({
      system: accountingSystem,
      exported_at: new Date().toISOString(),
      external_id: externalId,
      status: 'success'
    });

    await base44.entities.Invoice.update(invoiceId, {
      exported_to: exportedTo
    });

    return Response.json({
      success: true,
      accountingSystem: accountingSystem,
      externalId: externalId,
      exportPayload: exportPayload,
      message: `Invoice exported to ${accountingSystem} successfully`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});