import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Update transaction status after manual review
 * Called when an analyst approves/rejects a flagged transaction
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transaction_id, new_status, resolution_notes, escalate_to_case } = await req.json();

    if (!transaction_id || !new_status) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get transaction
    const txs = await base44.asServiceRole.entities.Transaction.filter({
      id: transaction_id,
      organization_id: user.organization_id
    });

    if (!txs || txs.length === 0) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const tx = txs[0];

    // Update transaction
    const updateData = {
      status: new_status,
      reviewed_by: user.email,
      reviewed_at: new Date().toISOString()
    };

    if (resolution_notes) {
      updateData.resolution_notes = resolution_notes;
    }

    await base44.asServiceRole.entities.Transaction.update(tx.id, updateData);

    // Update related alert if exists
    const alerts = await base44.asServiceRole.entities.TransactionAlert.filter({
      transaction_id: tx.id
    });

    if (alerts && alerts.length > 0) {
      const alert = alerts[0];
      let alertStatus = 'resolved';
      let resolution_action = 'approved';

      if (new_status === 'blocked') {
        alertStatus = 'resolved';
        resolution_action = 'blocked';
      } else if (new_status === 'approved') {
        alertStatus = 'resolved';
        resolution_action = 'approved';
      } else if (new_status === 'rejected') {
        alertStatus = 'resolved';
        resolution_action = 'rejected';
      }

      await base44.asServiceRole.entities.TransactionAlert.update(alert.id, {
        status: alertStatus,
        resolution_action,
        resolution_notes,
        reviewed_by: user.email,
        reviewed_at: new Date().toISOString()
      });

      // If escalating to case
      if (escalate_to_case && new_status === 'blocked') {
        const newCase = await base44.asServiceRole.entities.Case.create({
          organization_id: user.organization_id,
          case_number: `TX-${tx.transaction_id.substring(0, 8).toUpperCase()}`,
          type: 'transaction_review',
          priority: 'high',
          status: 'new',
          subject: `Transaction Review: ${tx.transaction_id}`,
          description: `Blocked transaction ${tx.transaction_id} for ${tx.amount} ${tx.currency}. ${resolution_notes || 'Requires review.'}`,
          related_entity_type: 'Transaction',
          related_entity_id: tx.id,
          context_data: {
            transaction_id: tx.transaction_id,
            amount: tx.amount,
            currency: tx.currency,
            risk_score: tx.risk_score,
            triggered_rules: tx.triggered_rules,
            flags: tx.flags
          }
        });

        // Update alert with case reference
        await base44.asServiceRole.entities.TransactionAlert.update(alert.id, {
          related_case_id: newCase.id
        });
      }
    }

    // Send callback if configured
    const configs = await base44.asServiceRole.entities.TMaaSConfig.filter({
      organization_id: user.organization_id
    });

    if (configs && configs.length > 0 && configs[0].callback_url) {
      try {
        await fetch(configs[0].callback_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_id: tx.transaction_id,
            status: new_status,
            reviewed_by: user.email,
            reviewed_at: new Date().toISOString(),
            action: new_status === 'approved' ? 'approve' : 'reject'
          })
        });
      } catch (error) {
        console.error('Callback error:', error);
      }
    }

    return Response.json({
      success: true,
      transaction_id: tx.id,
      status: new_status
    });
  } catch (error) {
    console.error('Update transaction status error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});