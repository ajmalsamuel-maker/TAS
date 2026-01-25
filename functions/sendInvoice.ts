import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { invoiceId, recipientEmail, includeCustomerNote } = body;

    if (!invoiceId || !recipientEmail) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch invoice
    const invoices = await base44.entities.Invoice.filter({ id: invoiceId });
    if (!invoices.length) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const invoice = invoices[0];

    // Fetch organization to get name
    const orgs = await base44.entities.Organization.filter({ id: invoice.organization_id });
    const orgName = orgs.length ? orgs[0].name : 'Customer';

    // Send email
    await base44.integrations.Core.SendEmail({
      to: recipientEmail,
      subject: `Invoice ${invoice.invoice_number} from TAS Platform`,
      body: `
        <h2>Invoice #${invoice.invoice_number}</h2>
        <p>Dear ${orgName},</p>
        <p>Please find attached your invoice for the period of ${invoice.billing_period_start} to ${invoice.billing_period_end}.</p>
        
        <h3>Invoice Summary</h3>
        <ul>
          <li>Invoice Number: ${invoice.invoice_number}</li>
          <li>Issue Date: ${invoice.issue_date}</li>
          <li>Due Date: ${invoice.due_date}</li>
          <li>Amount Due: ${invoice.currency} ${invoice.total_amount.toFixed(2)}</li>
        </ul>

        <h3>Items</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="border-bottom: 1px solid #ddd;">
            <th style="text-align: left; padding: 8px;">Description</th>
            <th style="text-align: right; padding: 8px;">Amount</th>
          </tr>
          ${invoice.items.map(item => `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">${item.description}</td>
              <td style="text-align: right; padding: 8px;">${invoice.currency} ${item.total.toFixed(2)}</td>
            </tr>
          `).join('')}
          <tr style="font-weight: bold;">
            <td style="padding: 8px;">TOTAL</td>
            <td style="text-align: right; padding: 8px;">${invoice.currency} ${invoice.total_amount.toFixed(2)}</td>
          </tr>
        </table>

        ${includeCustomerNote && invoice.customer_notes ? `<p style="margin-top: 20px;">${invoice.customer_notes}</p>` : ''}

        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          Please remit payment by ${invoice.due_date}. Thank you for your business.
        </p>
      `
    });

    // Update invoice status and email sent timestamp
    await base44.entities.Invoice.update(invoiceId, {
      status: 'sent',
      email_sent_at: new Date().toISOString()
    });

    return Response.json({
      success: true,
      message: 'Invoice sent successfully',
      sentTo: recipientEmail
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});