import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Process feedback on rule decisions and optimize rules
 * Tracks true positives/negatives and suggests rule adjustments
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const { 
      rule_id,
      transaction_id,
      alert_id,
      actual_outcome,
      review_notes,
      confidence_score
    } = payload;

    if (!rule_id || !actual_outcome) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create feedback record
    const feedback = await base44.asServiceRole.entities.RuleFeedback.create({
      organization_id: user.organization_id,
      rule_id,
      transaction_id,
      transaction_alert_id: alert_id,
      actual_outcome,
      reviewer_email: user.email,
      review_notes,
      reviewed_at: new Date().toISOString(),
      confidence_score: confidence_score || 80,
      impact_on_rule: determineImpact(actual_outcome)
    });

    // Get the rule
    const rules = await base44.asServiceRole.entities.TransactionRule.filter({
      id: rule_id
    });

    if (!rules || rules.length === 0) {
      return Response.json({ error: 'Rule not found' }, { status: 404 });
    }

    const rule = rules[0];
    const metrics = rule.performance_metrics || {
      true_positive_count: 0,
      false_positive_count: 0
    };

    // Update metrics based on outcome
    if (actual_outcome === 'true_positive') {
      metrics.true_positive_count = (metrics.true_positive_count || 0) + 1;
    } else if (actual_outcome === 'false_positive') {
      metrics.false_positive_count = (metrics.false_positive_count || 0) + 1;
    }

    // Calculate precision and recall
    const totalPositives = (metrics.true_positive_count || 0) + (metrics.false_positive_count || 0);
    if (totalPositives > 0) {
      metrics.precision = metrics.true_positive_count / totalPositives;
    }

    // Update rule with new metrics
    await base44.asServiceRole.entities.TransactionRule.update(rule_id, {
      performance_metrics: metrics
    });

    // Get all feedback for this rule to analyze patterns
    const allFeedback = await base44.asServiceRole.entities.RuleFeedback.filter({
      rule_id,
      organization_id: user.organization_id
    });

    // Analyze feedback for optimization opportunities
    const optimization = analyzeAndOptimize(rule, allFeedback || []);

    return Response.json({
      success: true,
      feedback_id: feedback.id,
      rule_metrics: metrics,
      optimization_suggestions: optimization
    });
  } catch (error) {
    console.error('Feedback processing error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function determineImpact(outcome) {
  if (outcome === 'true_positive' || outcome === 'true_negative') {
    return 'improve';
  } else if (outcome === 'false_positive' || outcome === 'false_negative') {
    return 'degrade';
  }
  return 'neutral';
}

function analyzeAndOptimize(rule, feedbackList) {
  const suggestions = [];

  // Require minimum feedback sample
  if (feedbackList.length < 10) {
    return [{
      priority: 'low',
      suggestion: `Collect more feedback (${feedbackList.length}/10 samples)`,
      confidence: 'low'
    }];
  }

  const fpCount = feedbackList.filter(f => f.actual_outcome === 'false_positive').length;
  const fnCount = feedbackList.filter(f => f.actual_outcome === 'false_negative').length;
  const tpCount = feedbackList.filter(f => f.actual_outcome === 'true_positive').length;

  const precision = tpCount / (tpCount + fpCount) || 0;
  const recall = tpCount / (tpCount + fnCount) || 0;

  // Suggestion 1: High false positive rate
  if (fpCount / feedbackList.length > 0.3) {
    suggestions.push({
      priority: 'high',
      suggestion: `High false positive rate (${(fpCount / feedbackList.length * 100).toFixed(1)}%). Consider relaxing thresholds or adding exclusions.`,
      confidence: 'high',
      recommendation: 'Adjust condition thresholds or add AND conditions'
    });
  }

  // Suggestion 2: Low recall
  if (recall < 0.7 && fnCount > 5) {
    suggestions.push({
      priority: 'high',
      suggestion: `Low recall (${(recall * 100).toFixed(1)}%). Rule misses legitimate alerts. Consider using OR logic or lowering thresholds.`,
      confidence: 'high',
      recommendation: 'Add alternative conditions with OR logic'
    });
  }

  // Suggestion 3: Rule may be unnecessary
  if (tpCount < 3 && feedbackList.length > 20) {
    suggestions.push({
      priority: 'medium',
      suggestion: `Very few true positives (${tpCount}). This rule may need refinement or removal.`,
      confidence: 'medium',
      recommendation: 'Review rule logic or consider disabling'
    });
  }

  // Suggestion 4: High precision - make rule stricter
  if (precision > 0.95 && tpCount > 5) {
    suggestions.push({
      priority: 'low',
      suggestion: `Excellent precision (${(precision * 100).toFixed(1)}%). Could make rule stricter to catch more anomalies.`,
      confidence: 'medium',
      recommendation: 'Gradually tighten thresholds to improve recall'
    });
  }

  return suggestions.length > 0 ? suggestions : [{
    priority: 'low',
    suggestion: 'Rule is performing well. Monitor performance over time.',
    confidence: 'high'
  }];
}