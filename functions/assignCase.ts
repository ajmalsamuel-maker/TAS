import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { case_id, assignee_email, assignment_rule } = await req.json();

    if (!case_id) {
      return Response.json({ error: 'case_id is required' }, { status: 400 });
    }

    // Fetch case
    const cases = await base44.entities.Case.filter({ id: case_id });
    const caseItem = cases[0];

    if (!caseItem) {
      return Response.json({ error: 'Case not found' }, { status: 404 });
    }

    let targetAssignee = assignee_email;

    // Auto-assignment logic
    if (!targetAssignee && assignment_rule) {
      if (assignment_rule === 'round_robin') {
        targetAssignee = await getRoundRobinAssignee(base44);
      } else if (assignment_rule === 'least_loaded') {
        targetAssignee = await getLeastLoadedAssignee(base44);
      } else if (assignment_rule === 'skill_based') {
        targetAssignee = await getSkillBasedAssignee(base44, caseItem.type);
      }
    }

    if (!targetAssignee) {
      return Response.json({ error: 'No assignee determined' }, { status: 400 });
    }

    // Update case
    const now = new Date().toISOString();
    await base44.asServiceRole.entities.Case.update(case_id, {
      assigned_to: targetAssignee,
      assigned_at: now,
      assigned_by: user.email,
      status: caseItem.status === 'new' ? 'assigned' : caseItem.status
    });

    // Add assignment note
    await base44.asServiceRole.entities.CaseNote.create({
      case_id,
      author_email: 'system@tas.com',
      author_name: 'System',
      note_type: 'assignment',
      content: `Case assigned to ${targetAssignee} by ${user.full_name}`,
      is_internal: true,
      metadata: {
        assigned_by: user.email,
        assigned_to: targetAssignee,
        assignment_rule: assignment_rule || 'manual'
      }
    });

    return Response.json({
      success: true,
      assigned_to: targetAssignee,
      case_id
    });

  } catch (error) {
    console.error('Case assignment error:', error);
    return Response.json({ 
      error: 'Assignment failed', 
      details: error.message 
    }, { status: 500 });
  }
});

async function getRoundRobinAssignee(base44) {
  // Get all investigators (admin or users with specific role)
  const users = await base44.entities.User.list();
  const investigators = users.filter(u => u.role === 'admin');
  
  if (investigators.length === 0) return null;

  // Get recent assignments
  const recentCases = await base44.entities.Case.list('-assigned_at', 10);
  const lastAssignee = recentCases.find(c => c.assigned_to)?.assigned_to;

  // Find next in rotation
  const lastIndex = investigators.findIndex(u => u.email === lastAssignee);
  const nextIndex = (lastIndex + 1) % investigators.length;
  
  return investigators[nextIndex].email;
}

async function getLeastLoadedAssignee(base44) {
  const users = await base44.entities.User.list();
  const investigators = users.filter(u => u.role === 'admin');
  
  if (investigators.length === 0) return null;

  // Count open cases for each investigator
  const caseCounts = {};
  const openCases = await base44.entities.Case.filter({ 
    status: { $nin: ['resolved', 'closed'] }
  });

  investigators.forEach(inv => {
    caseCounts[inv.email] = openCases.filter(c => c.assigned_to === inv.email).length;
  });

  // Find investigator with least cases
  const leastLoaded = investigators.reduce((min, inv) => 
    (caseCounts[inv.email] < caseCounts[min.email]) ? inv : min
  );

  return leastLoaded.email;
}

async function getSkillBasedAssignee(base44, caseType) {
  // Simple skill-based routing - can be enhanced with user skill profiles
  const users = await base44.entities.User.list();
  const investigators = users.filter(u => u.role === 'admin');
  
  if (investigators.length === 0) return null;

  // For now, return random investigator - can be enhanced with skill matching
  const randomIndex = Math.floor(Math.random() * investigators.length);
  return investigators[randomIndex].email;
}