import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { invoiceId, countryCode } = body;

    if (!invoiceId || !countryCode) {
      return Response.json({ error: 'Missing invoiceId or countryCode' }, { status: 400 });
    }

    // Fetch invoice
    const invoices = await base44.entities.Invoice.filter({ id: invoiceId });
    if (!invoices.length) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }
    const invoice = invoices[0];

    // Fetch country standards
    const standards = await base44.entities.InvoiceStandard.filter({ country_code: countryCode });
    if (!standards.length) {
      return Response.json({ error: 'Country standard not found' }, { status: 404 });
    }
    const standard = standards[0];

    // Validate required fields
    const missingFields = [];
    standard.required_fields?.forEach(field => {
      if (!invoice[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return Response.json({
        error: 'Missing required fields for this country',
        missingFields
      }, { status: 400 });
    }

    // Format invoice according to country standard
    const formattedInvoice = {
      ...invoice,
      _formatting_applied: {
        country_code: countryCode,
        country_name: standard.country_name,
        standards: standard.invoicing_standards,
        formatted_at: new Date().toISOString()
      },
      _formatted_dates: {
        issue_date: formatDate(invoice.issue_date, standard.invoice_format?.date_format),
        due_date: formatDate(invoice.due_date, standard.invoice_format?.date_format),
        billing_period_start: formatDate(invoice.billing_period_start, standard.invoice_format?.date_format),
        billing_period_end: formatDate(invoice.billing_period_end, standard.invoice_format?.date_format)
      },
      _formatted_amounts: {
        subtotal: formatCurrency(invoice.subtotal, standard.invoice_format),
        tax_amount: formatCurrency(invoice.tax_amount, standard.invoice_format),
        discount_amount: formatCurrency(invoice.discount_amount, standard.invoice_format),
        total_amount: formatCurrency(invoice.total_amount, standard.invoice_format)
      },
      _tax_info: {
        tax_label: standard.tax_treatment?.tax_label || 'Tax',
        tax_rate: invoice.tax_rate,
        vat_applicable: standard.tax_treatment?.vat_applicable,
        reverse_charge: standard.tax_treatment?.reverse_charge_applicable
      },
      _compliance_metadata: {
        legal_requirements: standard.legal_requirements,
        retention_requirement_days: standard.legal_requirements?.invoice_retention_days,
        signature_required: standard.legal_requirements?.signature_required,
        digital_submission_required: standard.legal_requirements?.electronic_submission_required,
        special_notes: standard.legal_requirements?.special_notes
      }
    };

    return Response.json({
      success: true,
      formattedInvoice,
      complianceChecks: {
        sequential_numbering: standard.legal_requirements?.sequential_numbering_required,
        retention_days: standard.legal_requirements?.invoice_retention_days,
        signature_required: standard.legal_requirements?.signature_required,
        digital_accepted: standard.legal_requirements?.digital_invoice_accepted
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function formatDate(dateStr, format = 'DD/MM/YYYY') {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  switch (format) {
    case 'MM/DD/YYYY': return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD': return `${year}-${month}-${day}`;
    case 'DD.MM.YYYY': return `${day}.${month}.${year}`;
    default: return `${day}/${month}/${year}`;
  }
}

function formatCurrency(amount, invoiceFormat) {
  if (amount === null || amount === undefined) return null;

  const separator = invoiceFormat?.decimal_separator || '.';
  const formatted = amount.toFixed(2).replace('.', separator);
  return `${invoiceFormat?.currency_format || 'USD'} ${formatted}`;
}