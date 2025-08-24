import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer'; // Import nodemailer
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3001;

// --- Nodemailer Transporter Setup ---
// We create a "transporter" object that will be able to send emails.
// It's configured to use Gmail's SMTP servers.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the built-in Gmail service
  auth: {
    user: process.env.GMAIL_USER,         // Your Gmail address from .env
    pass: process.env.GMAIL_APP_PASSWORD, // Your App Password from .env
  },
});

// --- Middleware ---
app.use(cors());      // Use CORS for frontend requests
app.use(express.json()); // Middleware to parse JSON bodies

// --- Type Definition ---
interface SendEmailRequestBody {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

// --- API Route ---
app.post('/api/send-email', async (req: Request<{}, {}, SendEmailRequestBody>, res: Response) => {
  console.log('Received request to /api/send-email with body:', req.body);

  try {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // --- Email Payload for Nodemailer ---
    // Note the different structure compared to Resend
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`, // The "from" field will show the user's name but be sent via your Gmail
      to: process.env.GMAIL_USER, // Send the email to yourself
      subject: `New Contact Form Message from ${name}`,
      replyTo: email, // When you hit "Reply" in your inbox, it will go to the user's email
      html: `
        <h2>New Message from your Website Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <hr>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // --- Send the Email ---
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email. Please check server logs.' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server is running on http://127.0.0.1:${PORT}`);
});