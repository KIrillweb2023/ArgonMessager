

import nodemailer from "nodemailer";
import crypto from "crypto";
import { configDotenv } from "dotenv";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Только для разработки
      }
    });
  }

  generatePinCode() {
    // Генерируем криптографически безопасный 6-значный код
    return crypto.randomInt(100000, 999999).toString();
  }

  async sendPinEmail(email, pin) {
    const mailOptions = {
      from: `"Secure Messenger" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Verification PIN Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            .container {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .header {
              background-color: #4a90e2;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .pin-code {
              font-size: 48px;
              font-weight: bold;
              color: #4a90e2;
              text-align: center;
              padding: 20px;
              letter-spacing: 10px;
              background-color: #f8f9fa;
              border-radius: 10px;
              margin: 20px 0;
            }
            .warning {
              color: #e74c3c;
              font-size: 14px;
              text-align: center;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #7f8c8d;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Secure Messenger</h1>
            </div>
            <div class="content">
              <h2>Verification Required</h2>
              <p>Hello,</p>
              <p>You requested to log in to Secure Messenger. Use the following PIN code to complete your login:</p>
              
              <div class="pin-code">${pin}</div>
              
              <p><strong>Security Information:</strong></p>
              <ul>
                <li>This code will expire in ${process.env.PIN_EXPIRY_MINUTES} minutes</li>
                <li>Never share this code with anyone</li>
                <li>Our staff will never ask for this code</li>
              </ul>
              
              <div class="warning">
                ⚠️ If you didn't request this code, please ignore this email and ensure your account security.
              </div>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply.</p>
              <p>&copy; 2024 Secure Messenger. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`PIN sent to ${email}`);
    } catch (error) {
      console.error('Email error:', error);
      throw new Error('Failed to send verification email');
    }
  }
}

export default new EmailService();