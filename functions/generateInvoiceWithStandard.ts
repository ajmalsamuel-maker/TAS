import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user?.role === 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { invoiceId } = await req.json();

    // Fetch invoice
    const invoice = await base44.entities.Invoice.get(invoiceId);
    if (!invoice) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Fetch organization
    const orgs = await base44.entities.Organization.filter({ id: invoice.organization_id });
    const organization = orgs[0];

    // Determine customer country
    const customerCountry = organization?.country_code;

    // Fetch invoice standards
    const standards = await base44.entities.InvoiceStandard.list();
    const applicableStandard = standards.find(s => s.country_code === customerCountry);

    // Fetch billing settings
    const settings = await base44.entities.BillingSettings.filter({});
    const billingSettings = settings[0];

    // Determine which standard to use
    let standardToUse = billingSettings?.invoice_template?.standard_compliance || 'en16931';
    let requiredFields = [];
    let taxIdentificationField = '';

    if (billingSettings?.invoice_template?.auto_detect_by_country && applicableStandard) {
      standardToUse = applicableStandard.invoicing_standards[0];
      requiredFields = applicableStandard.required_fields || [];
      taxIdentificationField = applicableStandard.tax_identification?.field_name || 'Tax ID';
    }

    // Build invoice data with standard compliance
    const invoiceData = {
      ...invoice,
      applied_standard: standardToUse,
      customer_country: customerCountry,
      required_fields: requiredFields,
      template_config: billingSettings?.invoice_template || {},
      tax_label: applicableStandard?.tax_treatment?.tax_label || 'Tax',
      date_format: billingSettings?.invoice_template?.date_format || 'DD/MM/YYYY',
      currency_position: billingSettings?.invoice_template?.currency_position || 'left'
    };

    return Response.json({ 
      success: true,
      invoice: invoiceData,
      standard: {
        name: standardToUse,
        country: customerCountry,
        required_fields: requiredFields,
        format_requirements: applicableStandard?.invoice_format || {}
      }
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});