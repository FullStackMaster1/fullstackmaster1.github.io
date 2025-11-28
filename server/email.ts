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
    const { client, fromEmail } = await getResendClient();
    
    const adminEmail = 'rupesh@fullstackmaster.net';
    
    const { data, error } = await client.emails.send({
      from: fromEmail || 'FullStack Master <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Webinar Registration: ${registration.webinarTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #eab308; padding-bottom: 10px;">
            New Webinar Registration
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Registrant Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">${registration.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="mailto:${registration.email}" style="color: #2563eb;">${registration.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">${registration.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>WhatsApp:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">
                  ${registration.whatsappOptIn 
                    ? '<span style="color: #16a34a;">Yes, opted in</span>' 
                    : '<span style="color: #dc2626;">No</span>'}
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #eab308;">
            <strong style="color: #92400e;">Webinar:</strong>
            <span style="color: #78350f;">${registration.webinarTitle}</span>
          </div>
          
          <p style="color: #64748b; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            This notification was sent from your FullStack Master coaching platform.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Email send error:', error);
      return false;
    }

    console.log('Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}
