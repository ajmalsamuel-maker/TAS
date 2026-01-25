import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { subscriptionId, billingPeriodStart, billingPeriodEnd, organizationId } = body;

    if (!subscriptionId || !billingPeriodStart || !billingPeriodEnd) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch subscription
    const subscription = await base44.entities.Subscription.filter({ id: subscriptionId });
    if (!subscription.length) {
      return Response.json({ error: 'Subscription not found' }, { status: 404 });
    }

    const sub = subscription[0];

    // Fetch usage metrics
    const usage = await base44.entities.UsageMetrics.filter({
      subscription_id: subscriptionId,
      period_start: billingPeriodStart,
      period_end: billingPeriodEnd
    });

    const usageData = usage.length ? usage[0] : {};

    // Fetch billing plan
    const plan = await base44.entities.BillingPlan.filter({ tier: sub.tier });
    const planData = plan.length ? plan[0] : {};

    // Fetch billing settings
    const settings = await base44.entities.BillingSettings.filter({});
    const settingsData = settings.length ? settings[0] : {};

    // Calculate invoice
    const basePrice = planData.base_price || 0;
    const usageCost = usageData.total_cost || 0;
    const subtotal = basePrice + usageCost;
    const taxRate = settingsData.default_tax_rate || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;

    // Build line items
    const items = [
      {
        description: `${planData.name || sub.tier} Subscription (${billingPeriodStart} to ${billingPeriodEnd})`,
        quantity: 1,
        unit_price: basePrice,
        total: basePrice,
        category: 'subscription'
      }
    ];

    // Add usage-based charges
    if (usageData.kyb_verifications > 0) {
      items.push({
        description: `KYB Verifications (${usageData.kyb_verifications} @ $${usageData.cost_breakdown?.kyb_cost || 0})`,
        quantity: usageData.kyb_verifications,
        unit_price: usageData.cost_breakdown?.kyb_cost || 0,
        total: usageData.cost_breakdown?.kyb_cost * usageData.kyb_verifications || 0,
        category: 'usage'
      });
    }

    if (usageData.aml_screenings > 0) {
      items.push({
        description: `AML Screenings (${usageData.aml_screenings} @ $${usageData.cost_breakdown?.aml_cost || 0})`,
        quantity: usageData.aml_screenings,
        unit_price: usageData.cost_breakdown?.aml_cost || 0,
        total: usageData.cost_breakdown?.aml_cost * usageData.aml_screenings || 0,
        category: 'usage'
      });
    }

    if (usageData.lei_issuances > 0) {
      items.push({
        description: `LEI Issuances (${usageData.lei_issuances} @ $${usageData.cost_breakdown?.lei_cost || 0})`,
        quantity: usageData.lei_issuances,
        unit_price: usageData.cost_breakdown?.lei_cost || 0,
        total: usageData.cost_breakdown?.lei_cost * usageData.lei_issuances || 0,
        category: 'usage'
      });
    }

    // Generate invoice number
    const invoiceNumber = `${settingsData.invoice_prefix || 'INV'}-${new Date().getFullYear()}-${String(settingsData.invoice_next_number || 1).padStart(6, '0')}`;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (settingsData.payment_terms_days || 30));

    // Create invoice
    const invoice = await base44.entities.Invoice.create({
      organization_id: organizationId || sub.user_id,
      subscription_id: subscriptionId,
      invoice_number: invoiceNumber,
      billing_period_start: billingPeriodStart,
      billing_period_end: billingPeriodEnd,
      issue_date: new Date().toISOString().split('T')[0],
      due_date: dueDate.toISOString().split('T')[0],
      status: 'draft',
      items: items,
      subtotal: subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      currency: settingsData.currency || 'USD'
    });

    // Update billing settings with next invoice number
    if (settings.length) {
      await base44.entities.BillingSettings.update(settings[0].id, {
        invoice_next_number: (settingsData.invoice_next_number || 1) + 1
      });
    }

    // Update usage metrics with invoice reference
    if (usage.length) {
      await base44.entities.UsageMetrics.update(usage[0].id, {
        invoice_id: invoice.id
      });
    }

    return Response.json({
      success: true,
      invoiceId: invoice.id,
      invoiceNumber: invoiceNumber,
      totalAmount: totalAmount,
      message: 'Invoice generated successfully'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});