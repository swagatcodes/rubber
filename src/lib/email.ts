import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@premium-app.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log("Email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

export function getVerificationEmailHtml(
  name: string,
  verificationLink: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #5568ff 0%, #8b5cf6 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
      </div>
      <div style="background: #f9fafb; padding: 40px; border-radius: 0 0 8px 8px;">
        <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
        <p style="color: #374151; font-size: 14px; margin-bottom: 30px;">
          Thank you for signing up! Please verify your email address to complete your registration.
        </p>
        <a href="${verificationLink}" style="
          display: inline-block;
          background: #5568ff;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin-bottom: 20px;
        ">Verify Email</a>
        <p style="color: #6b7280; font-size: 12px; margin-bottom: 10px;">
          Or copy and paste this link in your browser:
        </p>
        <p style="color: #5568ff; font-size: 12px; word-break: break-all;">
          ${verificationLink}
        </p>
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          This link expires in 24 hours. If you didn't create this account, please ignore this email.
        </p>
      </div>
    </div>
  `;
}

export function getPasswordResetEmailHtml(
  name: string,
  resetLink: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #5568ff 0%, #8b5cf6 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
      </div>
      <div style="background: #f9fafb; padding: 40px; border-radius: 0 0 8px 8px;">
        <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
        <p style="color: #374151; font-size: 14px; margin-bottom: 30px;">
          We received a request to reset your password. Click the button below to create a new password.
        </p>
        <a href="${resetLink}" style="
          display: inline-block;
          background: #5568ff;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin-bottom: 20px;
        ">Reset Password</a>
        <p style="color: #6b7280; font-size: 12px; margin-bottom: 10px;">
          Or copy and paste this link in your browser:
        </p>
        <p style="color: #5568ff; font-size: 12px; word-break: break-all;">
          ${resetLink}
        </p>
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          This link expires in 1 hour. If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
  `;
}
