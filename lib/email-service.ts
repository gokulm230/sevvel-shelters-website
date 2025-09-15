// Email service that uses SMTP.js

declare global {
  interface Window {
    Email: {
      send: (config: {
        Host: string;
        Username: string;
        Password: string;
        To: string;
        From: string;
        Subject: string;
        Body: string;
        ReplyTo?: string;
      }) => Promise<string>;
    };
  }
}

// Interface for the email data
interface EmailData {
  to: string;
  subject: string;
  body: string;
  from?: string;
  name?: string;
}

// Email service that uses SMTP.js
export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // Check if we're in browser environment
    if (typeof window !== 'undefined' && typeof window.Email !== 'undefined') {
      // Use the reply-to header to make the email appear from the user
      // while still using the company's SMTP server
      const fromEmail = "info@sevvelshelters.com"; // Always use your domain email for sending
      const fromName = data.name || "Website Contact";
      const replyTo = data.from || fromEmail;
      
      const response = await window.Email.send({
        Host: "s1.maildns.net",
        Username: "info@sevvelshelters.com", // Replace with your actual email
        Password: "SevvelShelters2025", // Replace with your actual password
        To: data.to,
        From: `${fromName} <${fromEmail}>`,
        ReplyTo: replyTo,
        Subject: data.subject,
        Body: data.body
      });
      
      if (response === "OK") {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

// Function to create HTML email body
export function createEmailBody(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isJob?: boolean;
  jobTitle?: string;
}): string {
  const { name, email, phone, subject, message, isJob, jobTitle } = data;
  
  const emailSubject = isJob ? `Job Application: ${jobTitle}` : (subject || "Website Inquiry");
  
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 15px;
            border-bottom: 1px solid #eaeaea;
            text-align: center;
          }
          .content {
            padding: 20px 0;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>${emailSubject}</h2>
          </div>
          <div class="content">
            <p>You have received a new message from ${name} via the Sevvel Shelters website:</p>
            
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${!isJob && subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div class="footer">
            <p>This email was sent from the Sevvel Shelters website contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}