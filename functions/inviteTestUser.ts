import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { email, role = 'user' } = body;

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Invite the user
    await base44.users.inviteUser(email, role);

    return Response.json({
      success: true,
      message: `User invited: ${email}`,
      email,
      role
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});