import axios from "axios";

/**
 * Send an email using Brevo (Sendinblue) REST API
 */
export const sendMail = async ({ to, subject, text, html }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const senderName = process.env.SENDER_NAME || "VTRC Technologies";

  if (!apiKey || !senderEmail) {
    throw new Error("Missing BREVO_API_KEY or SENDER_EMAIL in environment variables.");
  }

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: to,
      },
    ],
    subject: subject,
    htmlContent: html,
    textContent: text,
  };

  try {
    const response = await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    console.log(`✉️ Sending email via Brevo API from: ${senderEmail} to: ${to}`);
    return response.data;
  } catch (error) {
    console.error("Brevo API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
