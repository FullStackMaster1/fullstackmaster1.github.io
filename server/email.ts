import { Resend } from 'resend';
import emailTemplates from '../client/src/data/emailTemplates.json';

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

const { branding, contact, social, registrationConfirmation, trustBadges } = emailTemplates;

function generateConfirmationEmailHtml(registration: WebinarRegistrationData): string {
  const firstName = registration.name.split(' ')[0];
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header with Logo -->
        <div style="background: linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%); padding: 30px 20px; text-align: center;">
          <img src="${branding.logoUrl}" alt="FullStack Master" style="height: 50px; margin-bottom: 15px;" />
          <h1 style="color: #fff; margin: 0; font-size: 28px;">${registrationConfirmation.headerText} ${registrationConfirmation.headerEmoji}</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">${registrationConfirmation.subheaderText}</p>
        </div>
        
        <!-- Webinar Title -->
        <div style="background: #1a365d; padding: 20px; text-align: center;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">${registration.webinarTitle}</h2>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px 25px; background-color: ${branding.backgroundColor};">
          
          <!-- Coach Photo & Greeting -->
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <img src="${branding.photoUrl}" alt="${contact.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-right: 15px; border: 3px solid ${branding.primaryColor};" />
            <div>
              <p style="margin: 0; color: ${branding.textColor}; font-size: 18px; font-weight: 600;">
                Hi ${firstName},
              </p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                Personal message from ${contact.name}
              </p>
            </div>
          </div>
          
          <!-- Main Message -->
          <div style="background: #fff; padding: 20px; border-left: 4px solid ${branding.primaryColor}; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #555; line-height: 1.7; font-size: 15px;">
              ${registrationConfirmation.mainMessage}
            </p>
          </div>
          
          <!-- Next Step -->
          <div style="background: #fff3cd; padding: 18px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
              <strong>${registrationConfirmation.nextStepTitle}</strong> ${registrationConfirmation.nextStepMessage}
            </p>
          </div>
          
          <!-- CTA Buttons -->
          <div style="background: #fff; padding: 25px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <p style="margin: 0 0 15px 0; color: ${branding.textColor}; font-weight: 600; font-size: 16px;">
              ${registrationConfirmation.coachingTitle}
            </p>
            <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
              ${registrationConfirmation.coachingMessage}
            </p>
            <a href="${contact.bookingLink}" style="display: inline-block; background: linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%); color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; margin-right: 10px;">
              📅 ${registrationConfirmation.coachingButtonText}
            </a>
          </div>
          
          <!-- WhatsApp CTA -->
          <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <p style="margin: 0 0 10px 0; color: #166534; font-weight: 600; font-size: 15px;">
              ${registrationConfirmation.whatsappTitle}
            </p>
            <p style="margin: 0 0 15px 0; color: #166534; font-size: 14px;">
              ${registrationConfirmation.whatsappMessage}
            </p>
            <a href="${contact.whatsappLink}?text=${encodeURIComponent(contact.whatsappMessage)}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
              💬 ${registrationConfirmation.whatsappButtonText}
            </a>
          </div>
          
          <!-- Questions Section -->
          <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; color: ${branding.textColor}; font-weight: 600;">${registrationConfirmation.questionsTitle}</p>
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              ${registrationConfirmation.questionsMessage}
            </p>
          </div>
          
          <!-- Trust Badges -->
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <div style="display: inline-block; margin: 5px 15px; font-size: 13px; color: #0369a1;">
              ⭐ ${trustBadges.rating}
            </div>
            <div style="display: inline-block; margin: 5px 15px; font-size: 13px; color: #0369a1;">
              👥 ${trustBadges.coached}
            </div>
            <div style="display: inline-block; margin: 5px 15px; font-size: 13px; color: #0369a1;">
              🏆 ${trustBadges.experience}
            </div>
          </div>
          
        </div>
        
        <!-- Signature -->
        <div style="background: #1a365d; padding: 25px; text-align: center;">
          <img src="${branding.photoUrl}" alt="${contact.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; border: 2px solid rgba(255,255,255,0.3);" />
          <p style="margin: 0; color: #fff; font-weight: 600; font-size: 16px;">${registrationConfirmation.signature.name}</p>
          <p style="margin: 5px 0; color: rgba(255,255,255,0.8); font-size: 13px;">${registrationConfirmation.signature.title}</p>
          <p style="margin: 5px 0 15px 0; color: rgba(255,255,255,0.7); font-size: 12px;">${registrationConfirmation.signature.tagline}</p>
          
          <!-- Social Links -->
          <div style="margin-top: 15px;">
            <a href="${social.linkedin}" style="display: inline-block; margin: 0 8px; color: #fff; text-decoration: none; font-size: 13px;">LinkedIn</a>
            <span style="color: rgba(255,255,255,0.4);">|</span>
            <a href="${social.youtube}" style="display: inline-block; margin: 0 8px; color: #fff; text-decoration: none; font-size: 13px;">YouTube</a>
            <span style="color: rgba(255,255,255,0.4);">|</span>
            <a href="${social.igotanoffer}" style="display: inline-block; margin: 0 8px; color: #fff; text-decoration: none; font-size: 13px;">Reviews</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background: #f8fafc;">
          <p style="margin: 0 0 5px 0; color: #999; font-size: 11px;">
            ${registrationConfirmation.footer.unsubscribeText}
          </p>
          <p style="margin: 0; color: #999; font-size: 11px;">
            ${registrationConfirmation.footer.copyrightText}
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationHtml(registration: WebinarRegistrationData): string {
  const { adminNotification } = emailTemplates;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: ${branding.accentColor}; padding: 25px; text-align: center;">
          <img src="${branding.logoUrl}" alt="FullStack Master" style="height: 40px; margin-bottom: 10px;" />
          <h1 style="color: #fff; margin: 0; font-size: 22px;">${adminNotification.headerText}</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 25px;">
          <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px;">${registration.webinarTitle}</h2>
          
          <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 8px;">
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 120px; color: #555;">Name:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #333;">${registration.name}</td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #555;">Email:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${registration.email}" style="color: ${branding.primaryColor};">${registration.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #555;">Phone:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #333;">${registration.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 15px; font-weight: 600; color: #555;">WhatsApp:</td>
              <td style="padding: 15px; color: #333;">${registration.whatsappOptIn ? '✅ Opted in' : '❌ Not opted in'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 25px; text-align: center;">
            <a href="${adminNotification.dashboardUrl}" style="display: inline-block; background: ${branding.primaryColor}; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              ${adminNotification.viewDashboardText}
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 15px; text-align: center; background: #f8fafc; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #999; font-size: 12px;">
            Sent from Full Stack Master Coaching Platform
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

export async function sendWebinarRegistrationNotification(registration: WebinarRegistrationData): Promise<boolean> {
  try {
    console.log('Attempting to send confirmation email to registrant:', registration.name, registration.email);
    const { client, fromEmail } = await getResendClient();
    console.log('Resend client obtained, fromEmail:', fromEmail);
    
    const subject = registrationConfirmation.subject.replace('{{webinarTitle}}', registration.webinarTitle);
    
    const { data, error } = await client.emails.send({
      from: fromEmail || `${contact.name} <onboarding@resend.dev>`,
      to: registration.email,
      replyTo: contact.email,
      subject: subject,
      html: generateConfirmationEmailHtml(registration)
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
  const adminEmail = contact.email;
  const { adminNotification } = emailTemplates;
  
  try {
    const subject = adminNotification.subject.replace('{{webinarTitle}}', registration.webinarTitle);
    
    const { data, error } = await client.emails.send({
      from: fromEmail || 'Webinar System <onboarding@resend.dev>',
      to: adminEmail,
      subject: subject,
      html: generateAdminNotificationHtml(registration)
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
