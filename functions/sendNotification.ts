import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Send notification + email to user
 * Creates Notification entity and sends email via Core.SendEmail
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { recipientEmail, type, title, message, actionUrl, priority, sendEmail } = await req.json();

    if (!recipientEmail || !type || !title || !message) {
      return Response.json({ 
        error: 'recipientEmail, type, title, and message are required' 
      }, { status: 400 });
    }

    // Create notification entity
    const notification = await base44.entities.Notification.create({
      recipient_email: recipientEmail,
      type: type,
      title: title,
      message: message,
      action_url: actionUrl || null,
      priority: priority || 'medium',
      status: 'unread',
      send_email: sendEmail !== false // default to true
    });

    // Send email if requested
    if (sendEmail !== false) {
      try {
        await base44.integrations.Core.SendEmail({
          to: recipientEmail,
          subject: title,
          body: buildEmailBody(title, message, actionUrl)
        });

        // Mark email as sent
        await base44.entities.Notification.update(notification.id, {
          email_sent: true
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the entire notification if email fails
      }
    }

    return Response.json({
      success: true,
      notification: notification,
      message: 'Notification sent successfully'
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function buildEmailBody(title, message, actionUrl) {
  const actionButton = actionUrl ? `
    <table cellpadding="0" cellspacing="0" border="0" align="center">
      <tr>
        <td style="background-color: #0044CC; border-radius: 4px; padding: 12px 30px;">
          <a href="${actionUrl}" style="color: white; text-decoration: none; font-weight: bold;">
            View Details
          </a>
        </td>
      </tr>
    </table>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0044CC 0%, #002D66 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${title}</h1>
          </div>
          <div class="content">
            <p>${message}</p>
            ${actionButton}
            <p style="margin-top: 30px; color: #999; font-size: 12px;">
              This is an automated message from Trust Anchor Service. Please do not reply to this email.
            </p>
          </div>
          <div class="footer">
            <p>© 2026 FTS.Money & Certizen Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}