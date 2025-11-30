import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

export async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

interface WebinarRegistrationData {
  name: string;
  email: string;
  phone?: string | null;
  webinarId: string;
  webinarTitle: string;
  whatsappOptIn: boolean;
}

export async function sendWebinarRegistrationNotification(registration: WebinarRegistrationData): Promise<boolean> {
  try {
    console.log('Attempting to send confirmation email to registrant:', registration.name, registration.email);
    const { client, fromEmail } = await getResendClient();
    console.log('Resend client obtained, fromEmail:', fromEmail);
    
    const { data, error } = await client.emails.send({
      from: fromEmail || 'Rupesh Tiwari <onboarding@resend.dev>',
      to: registration.email,
      replyTo: 'rupesh@fullstackmaster.net',
      subject: `You're registered: ${registration.webinarTitle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">You're In! 🎯</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your spot is reserved for:</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px 20px;">
            <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 20px;">${registration.webinarTitle}</h2>
            
            <div style="background: #fff; padding: 20px; border-left: 4px solid #667eea; margin-bottom: 20px;">
              <p style="margin: 0; color: #555; line-height: 1.6;">
                Hi <strong>${registration.name.split(' ')[0]}</strong>,
              </p>
              <p style="margin: 15px 0 0 0; color: #555; line-height: 1.6;">
                Thanks for registering! I'm excited to dive deep with you on the strategies and frameworks that help senior leaders crack high-stakes interviews at top tech companies.
              </p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Next step:</strong> Look for details about the webinar schedule, any prep materials, or how to join when the time comes.
              </p>
            </div>
            
            <div style="background: #fff; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0 0 12px 0; color: #333; font-weight: 600;">Have questions before the webinar?</p>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                Just reply to this email. I read every message and love connecting with leaders who are serious about their next level. Your questions might even shape what we cover.
              </p>
            </div>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #333; font-weight: 600;">Want to book 1-on-1 coaching?</p>
              <p style="margin: 0; color: #666; font-size: 14px;">
                If you'd like personalized interview prep before or after your target role interviews, 
                <a href="https://bit.ly/book-rupesh" style="color: #667eea; text-decoration: none; font-weight: 600;">book a session here</a>.
              </p>
            </div>
            
            <p style="margin: 20px 0 0 0; color: #999; font-size: 12px; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              Best,<br/>
              <strong>Rupesh Tiwari</strong><br/>
              AWS Senior Customer Solutions Manager<br/>
              Full Stack Master Coaching
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Email send error:', JSON.stringify(error, null, 2));
      return false;
    }

    console.log('Confirmation email sent successfully! ID:', data?.id, 'to:', registration.email);
    
    // Also send notification to admin
    await sendAdminNotification(client, fromEmail, registration);
    
    return true;
  } catch (error: any) {
    console.error('Failed to send confirmation email:', error?.message || error);
    return false;
  }
}

async function sendAdminNotification(client: Resend, fromEmail: string, registration: WebinarRegistrationData): Promise<void> {
  const adminEmail = 'rupesh@fullstackmaster.net';
  
  try {
    const { data, error } = await client.emails.send({
      from: fromEmail || 'Webinar System <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Registration: ${registration.webinarTitle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: #22c55e; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 20px;">New Webinar Registration!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 25px;">
            <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px;">${registration.webinarTitle}</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 120px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${registration.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${registration.email}" style="color: #667eea;">${registration.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${registration.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">WhatsApp:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${registration.whatsappOptIn ? '✅ Opted in' : '❌ Not opted in'}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 6px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                View all registrations: <a href="https://fullstackmaster.net/admin" style="color: #667eea;">Admin Dashboard</a>
              </p>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Admin notification error:', JSON.stringify(error, null, 2));
    } else {
      console.log('Admin notification sent! ID:', data?.id);
    }
  } catch (error: any) {
    console.error('Failed to send admin notification:', error?.message || error);
  }
}
