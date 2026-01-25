import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { subscriptionId, organizationId, metricType, quantity } = body;

    if (!subscriptionId || !organizationId || !metricType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get current billing period
    const today = new Date();
    const periodStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const periodEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

    // Find or create usage metrics for current period
    const metrics = await base44.entities.UsageMetrics.filter({
      subscription_id: subscriptionId,
      period_start: periodStart,
      period_end: periodEnd
    });

    let metricsId;
    let currentMetrics;

    if (metrics.length) {
      currentMetrics = metrics[0];
      metricsId = currentMetrics.id;
    } else {
      const newMetrics = await base44.entities.UsageMetrics.create({
        organization_id: organizationId,
        subscription_id: subscriptionId,
        period_start: periodStart,
        period_end: periodEnd
      });
      metricsId = newMetrics.id;
      currentMetrics = newMetrics;
    }

    // Update metric based on type
    const updateData = {};
    const updateQuantity = quantity || 1;

    switch (metricType) {
      case 'kyb_verification':
        updateData.kyb_verifications = (currentMetrics.kyb_verifications || 0) + updateQuantity;
        break;
      case 'aml_screening':
        updateData.aml_screenings = (currentMetrics.aml_screenings || 0) + updateQuantity;
        break;
      case 'lei_issuance':
        updateData.lei_issuances = (currentMetrics.lei_issuances || 0) + updateQuantity;
        break;
      case 'vlei_credential':
        updateData.vlei_credentials = (currentMetrics.vlei_credentials || 0) + updateQuantity;
        break;
      case 'api_call':
        updateData.api_calls = (currentMetrics.api_calls || 0) + updateQuantity;
        break;
      default:
        return Response.json({ error: 'Unknown metric type' }, { status: 400 });
    }

    // Recalculate total cost
    const costBreakdown = currentMetrics.cost_breakdown || {};
    const totalCost = Object.values(costBreakdown).reduce((sum, val) => sum + (val || 0), 0);
    updateData.total_cost = totalCost;

    await base44.entities.UsageMetrics.update(metricsId, updateData);

    return Response.json({
      success: true,
      message: `${metricType} tracked successfully`,
      updatedMetrics: updateData
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});