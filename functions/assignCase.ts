import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Assign a case to an investigator
 * Ensures case belongs to the assigned user's organization
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { caseId, assigneeEmail, notes } = await req.json();

    if (!caseId || !assigneeEmail) {
      return Response.json({ error: 'caseId and assigneeEmail required' }, { status: 400 });
    }

    // Fetch case
    const cases = await base44.entities.Case.filter({ id: caseId });
    const caseRecord = cases[0];

    if (!caseRecord) {
      return Response.json({ error: 'Case not found' }, { status: 404 });
    }

    // Verify assignee exists and is in the same organization
    const users = await base44.entities.User.filter({ 
      email: assigneeEmail,
      organization_id: caseRecord.organization_id
    });

    if (!users || users.length === 0) {
      return Response.json({ error: 'Assignee not found in organization' }, { status: 404 });
    }

    // Update case
    const updatedCase = await base44.entities.Case.update(caseId, {
      status: 'assigned',
      assigned_to: assigneeEmail,
      assigned_at: new Date().toISOString(),
      assigned_by: user.email
    });

    // Create case note
    await base44.entities.CaseNote.create({
      case_id: caseId,
      author_email: user.email,
      author_name: user.full_name,
      note_type: 'assignment',
      content: notes || `Case assigned to ${assigneeEmail} by ${user.full_name}`,
      is_internal: true
    });

    // Create notification for assignee
    await base44.functions.invoke('sendNotification', {
      recipientEmail: assigneeEmail,
      type: 'critical_alert',
      title: 'New Case Assigned to You',
      message: `A case has been assigned to you: ${caseRecord.subject}. Priority: ${caseRecord.priority}`,
      actionUrl: '/cases',
      priority: 'high',
      sendEmail: true
    });

    return Response.json({
      success: true,
      case: updatedCase,
      message: 'Case assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning case:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});