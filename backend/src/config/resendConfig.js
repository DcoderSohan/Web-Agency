import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Requirement: Use CommonJS syntax: const { Resend } = require('resend');
const { Resend } = require('resend');
const nodemailer = require('nodemailer');

let resendInstance = null;
let nodemailerTransporter = null;

/**
 * Detects the active mail provider based on the configured EMAIL_FROM address.
 * Returns 'gmail' if the sender is a Gmail address, otherwise 'resend'.
 */
export const getMailProvider = () => {
  const fromEmail = process.env.EMAIL_FROM || "";
  if (fromEmail.trim().toLowerCase().endsWith('@gmail.com')) {
    return 'gmail';
  }
  return 'resend';
};

// Lazy loader for Resend instance
const getResendInstance = () => {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY in environment variables.");
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
};

// Lazy loader for Nodemailer SMTP transporter (Gmail App Password)
const getNodemailerTransporter = () => {
  if (!nodemailerTransporter) {
    const emailUser = process.env.EMAIL_FROM;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      throw new Error("Missing EMAIL_FROM or EMAIL_PASS in environment variables for Gmail SMTP.");
    }

    nodemailerTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }
  return nodemailerTransporter;
};

/**
 * Universal mail sender function.
 * Automatically delegates to Nodemailer SMTP or Resend API at runtime based on EMAIL_FROM.
 */
export const sendMail = async ({ from, to, subject, text, html }) => {
  const provider = getMailProvider();
  
  if (provider === 'gmail') {
    console.log(`✉️ Sending email via Gmail SMTP (Nodemailer) from: ${from}`);
    const transporter = getNodemailerTransporter();
    
    const info = await transporter.sendMail({
      from: `"VTRC Technologies" <${from}>`,
      to,
      subject,
      text,
      html,
    });
    
    return { data: { id: info.messageId }, error: null };
  } else {
    console.log(`✉️ Sending email via Resend API from: ${from}`);
    const resendClient = getResendInstance();
    
    return await resendClient.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });
  }
};

// Default export compatibility object
const resend = {
  get emails() {
    return {
      send: async (options) => {
        return await sendMail(options);
      }
    };
  }
};

export default resend;
