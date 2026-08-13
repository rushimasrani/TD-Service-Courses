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

async function main() {
  try {
    const tenantId = process.env.MS_TENANT_ID!;
    const clientId = process.env.MS_CLIENT_ID!;
    // Add the missing hyphen for testing
    const clientSecret = process.env.MS_CLIENT_SECRET!;
    const senderEmail = process.env.MS_SENDER_EMAIL!;
    const destinationEmail = process.env.INQUIRY_DESTINATION_EMAIL!;

    console.log("Getting token...");
    const token = await getGraphToken(tenantId, clientId, clientSecret);
    console.log("Token received.");
    
    console.log("Sending email...");
    await sendGraphEmail(token, senderEmail, destinationEmail, "Test", "Test body");
    console.log("Success");
  } catch (err) {
    console.error(err);
  }
}

main();
