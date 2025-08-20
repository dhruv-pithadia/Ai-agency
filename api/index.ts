import express, { Request, Response } from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
// It's good practice to check for the API key on startup
if (!process.env.RESEND_API_KEY) {
  console.error("FATAL ERROR: RESEND_API_KEY is not defined.");
  process.exit(1);
}
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the request body type for type safety
interface SendEmailRequestBody {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

// Your API route, now with TypeScript types
app.post('/send-email', async (req: Request<{}, {}, SendEmailRequestBody>, res: Response) => {
  try {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const fromAddress = 'Contact Form <noreply@your-verified-domain.com>'; // <-- UPDATE THIS
    const emailPayload = {
      from: fromAddress,
      to: ['ehsaaschaudhary2001@gmail.com'],
      subject: `New message from ${name}`,
      reply_to: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p>${company ? `<p>Company: ${company}</p>` : ''}<p>Message: ${message}</p>`,
    };

    const { data, error } = await resend.emails.send(emailPayload);
    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (e) {
    console.error('An unexpected error occurred:', e);
    return res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server is running on http://127.0.0.1:${PORT}`);
});