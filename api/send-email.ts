import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables.
// This is done once when the function is initialized.
const resend = new Resend(process.env.RESEND_API_KEY);

// Your serverless function, exported as 'POST' to handle POST requests.
export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request body
    const rawBody: unknown = await request.json();
    const body = rawBody as { name?: string; email?: string; company?: string; message?: string };
    const { name, email, company, message } = body;

    // 2. Basic validation to ensure required fields are present
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Prepare the email payload for Resend
    // CRITICAL: The `from` address must be a domain you have verified in your Resend account.
    // Using a generic domain like `demo.com` will fail.
    const fromAddress = 'Contact Form <noreply@your-verified-domain.com>';
    const emailPayload = {
      from: fromAddress,
      to: ['ehsaaschaudhary2001@gmail.com'], // The address where you want to receive emails
      subject: `New message from ${name}`,
      reply_to: email, // So you can reply directly to the user's email
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };
    
    // 4. Send the email using the Resend SDK
    const { data, error } = await resend.emails.send(emailPayload);

    // 5. Handle the response from Resend
    if (error) {
      // If Resend returned an error, log it and return a 500 status
      console.error('Resend API Error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If successful, log the email ID and return a 200 status
    console.log(`Email sent successfully! Email ID: ${data?.id}`);
    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (e: unknown) {
    // Handle any unexpected errors during the process
    console.error('An unexpected error occurred:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: 'An unexpected server error occurred.', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}