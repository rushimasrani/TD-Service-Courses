import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
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

  // API Route for handling inquiries
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    try {
      // Send email via Microsoft Graph API
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      // Use MS_SENDER_EMAIL or fall back to INQUIRY_DESTINATION_EMAIL
      const senderEmail = process.env.MS_SENDER_EMAIL || process.env.INQUIRY_DESTINATION_EMAIL;
      const destinationEmail = process.env.INQUIRY_DESTINATION_EMAIL;

      if (!tenantId || !clientId || !clientSecret || !senderEmail || !destinationEmail) {
        throw new Error("Missing Microsoft Graph API configuration in environment variables.");
      }

      const accessToken = await getGraphToken(tenantId, clientId, clientSecret);
      
      const subject = `New Course Inquiry from ${name}`;
      const htmlContent = `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course/Service Selected:</strong> ${course || 'Not specified'}</p>
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
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
