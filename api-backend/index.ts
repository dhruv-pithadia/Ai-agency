import express, { type Request, type Response } from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import cors from "cors"

// Load environment variables from .env file
dotenv.config()

const app = express()
// Use the port from the environment for deployment, or default to 3001
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3001


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address from .env
    pass: process.env.GMAIL_APP_PASSWORD, // Your App Password from .env
  },
})

// --- Middleware ---
app.use(cors()) // Use CORS for frontend requests
app.use(express.json()) // Middleware to parse JSON bodies

// --- Type Definition ---
interface SendEmailRequestBody {
  name?: string
  email?: string
  company?: string
  message?: string
}

// --- API Route ---
app.post("/api/send-email", async (req: Request<{}, {}, SendEmailRequestBody>, res: Response) => {
  console.log("Received request to /api/send-email with body:", req.body)

  // Validate that the required environment variables are loaded
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment.")
    return res.status(500).json({ error: "Server configuration error." })
  }

  try {
    const { name, email, company, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields: name, email, and message are required." })
    }

    // --- Email Payload for Nodemailer ---
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send the email to yourself
      subject: `New Contact Form Message from ${name}`,
      replyTo: email, // Set the user's email as the reply-to address
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Message</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                New Contact Form Message
              </h1>
              <p style="color: #e8eaff; margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">
                You have received a new inquiry from your website
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Contact Information Card -->
              <div style="background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 25px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                  Contact Information
                </h2>
                
                <div style="margin-bottom: 15px;">
                  <span style="display: inline-block; width: 80px; color: #4a5568; font-weight: 600; font-size: 14px;">Name:</span>
                  <span style="color: #2d3748; font-size: 16px;">${name}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <span style="display: inline-block; width: 80px; color: #4a5568; font-weight: 600; font-size: 14px;">Email:</span>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                </div>
                
                ${
                  company
                    ? `
                <div style="margin-bottom: 15px;">
                  <span style="display: inline-block; width: 80px; color: #4a5568; font-weight: 600; font-size: 14px;">Company:</span>
                  <span style="color: #2d3748; font-size: 16px;">${company}</span>
                </div>
                `
                    : ""
                }
              </div>

              <!-- Message Card -->
              <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 25px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                  Message
                </h3>
                <div style="color: #4a5568; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; margin-top: 35px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);">
                  Reply to ${name}
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f7fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0; font-size: 14px;">
                This message was sent from your website contact form on ${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    }

    // --- Send the Email ---
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully!")
    return res.status(200).json({ message: "Email sent successfully!" })
  } catch (error) {
    console.error("Error sending email:", error)
    return res.status(500).json({ error: "Failed to send email. Please check server logs." })
  }
})

// Listen on all network interfaces, which is crucial for proxies and deployment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server is running on port ${PORT}`)
})
