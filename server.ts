import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function getGraphToken(tenantId: string, clientId: string, clientSecret: string) {
  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('scope', 'https://graph.microsoft.com/.default');
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'client_credentials');

  const response = await fetch(url, {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get MS token: ${errorText}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

async function sendGraphEmail(accessToken: string, senderEmail: string, destinationEmail: string, subject: string, htmlContent: string) {
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderEmail)}/sendMail`;
  
  const mailData = {
    message: {
      subject: subject,
      body: {
        contentType: 'HTML',
        content: htmlContent
      },
      toRecipients: [
        {
          emailAddress: {
            address: destinationEmail
          }
        }
      ]
    },
    saveToSentItems: 'true'
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mailData)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send MS Graph email: ${errorText}`);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  
  // Legacy 301 Redirects
  app.get('/services/offensive-security', (req, res) => res.redirect(301, '/services/vapt'));
  app.get('/services/defensive-security', (req, res) => res.redirect(301, '/services/managed-soc'));
  app.get('/services/managed-it', (req, res) => res.redirect(301, '/services/microsoft-365'));

  // SEO Routes
  // API Route for handling inquiries
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, phone, company, course, reason, message, leadType, sourcePage } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    try {
      // Send email via Microsoft Graph API
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      // Use MS_SENDER_EMAIL or fall back to INQUIRY_DESTINATION_EMAIL or info@yourdomain.com
      const senderEmail = process.env.MS_SENDER_EMAIL || process.env.INQUIRY_DESTINATION_EMAIL || "info@yourdomain.com";
      const destinationEmail = process.env.INQUIRY_DESTINATION_EMAIL || "info@yourdomain.com";

      if (!tenantId || !clientId || !clientSecret) {
        throw new Error("Missing Microsoft Graph API credentials in environment variables (MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET).");
      }

      const accessToken = await getGraphToken(tenantId, clientId, clientSecret);
      
      const subject = `New TechDefends Website Enquiry: ${name}`;
      const htmlContent = `
        <h3>New TechDefends Website Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company Name:</strong> ${company || 'Not specified'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Reason for Inquiry:</strong> ${reason || course || 'Not specified'}</p>
        <p><strong>Lead Type:</strong> ${leadType || 'business_enquiry'}</p>
        <p><strong>Source Page:</strong> ${sourcePage || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message ? message.replace(/\n/g, '<br>') : 'No additional message'}</p>
      `;

      await sendGraphEmail(accessToken, senderEmail, destinationEmail, subject, htmlContent);

      res.status(200).json({ success: true, message: "Inquiry sent successfully" });
    } catch (error: any) {
      console.error("Error processing inquiry:", error);
      res.status(500).json({ error: "Failed to process inquiry.", details: error.message || String(error) });
    }
  });

  // Vite middleware for development
  let isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite not found or failed to load. Falling back to static serving.");
      isDev = false;
    }
  }
  
  if (!isDev) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express SPA fallback using app.use to avoid path-to-regexp v8 errors in Express 5
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
