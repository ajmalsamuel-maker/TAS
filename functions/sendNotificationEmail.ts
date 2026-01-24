import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user?.role || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { notificationId } = body;

    if (!notificationId) {
      return Response.json({ error: 'notificationId required' }, { status: 400 });
    }

    const notification = await base44.entities.Notification.get(notificationId);

    if (!notification) {
      return Response.json({ error: 'Notification not found' }, { status: 404 });
    }

    if (!notification.send_email) {
      return Response.json({ email_sent: false }, { status: 200 });
    }

    await base44.integrations.Core.SendEmail({
      to: notification.recipient_email,
      subject: notification.title,
      body: `
        <h2>${notification.title}</h2>
        <p>${notification.message}</p>
        ${notification.action_url ? `<p><a href="${notification.action_url}" style="color: #0044CC; font-weight: bold;">View Details</a></p>` : ''}
        <hr />
        <p style="font-size: 12px; color: #999;">Priority: ${notification.priority}</p>
      `
    });

    await base44.entities.Notification.update(notificationId, {
      email_sent: true
    });

    return Response.json({ 
      success: true,
      email_sent: true,
      recipient: notification.recipient_email
    });

  } catch (error) {
    console.error('Email notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});