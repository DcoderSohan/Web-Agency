import { OTP } from "./otp.model.js";
import otpGenerator from "otp-generator";
import { sendMail } from "../../config/mailConfig.js";

/**
 * Controller to handle sending OTP via Brevo API
 * POST /api/otp/send-otp  or  POST /api/otp/send-email-otp
 */
export const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Required field validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is a required field.",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 2. Basic email format validation (works for all valid emails, not just Gmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Validation failed: Please provide a valid email address.",
      });
    }

    // 3. Cooldown: prevent requesting a new OTP within 30 seconds
    const existingOtp = await OTP.findOne({ email: trimmedEmail }).sort({ createdAt: -1 });
    if (existingOtp) {
      const timeDiff = new Date() - existingOtp.createdAt;
      if (timeDiff < 30000) {
        return res.status(429).json({
          success: false,
          message: "Please wait 30 seconds before requesting a new OTP.",
        });
      }
    }

    // 4. Generate secure 6-digit numeric OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    // 5. Store OTP in DB (auto-expires after 5 minutes via TTL index)
    await OTP.create({ email: trimmedEmail, otp });

    // 6. Build email content
    const emailSubject = "Email Verification OTP – VTRC Technologies";
    const emailBody = `Your OTP is: ${otp}\nThis OTP expires in 5 minutes.`;

    const emailHtmlBody = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #1a1a1a; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Verification Required</h2>
        </div>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 24px; text-align: center;">
          Please use the following One-Time Password (OTP) to verify your email address.
        </p>
        <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; background-color: #f5f3ff; padding: 18px; text-align: center; border-radius: 12px; border: 1px dashed #c7d2fe; margin-bottom: 24px; font-family: 'Courier New', Courier, monospace;">
          ${otp}
        </div>
        <p style="color: #dc2626; font-size: 14px; font-weight: 600; text-align: center; margin-bottom: 0;">
          This OTP expires in 5 minutes.
        </p>
        <div style="margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 24px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If you did not request this email, you can safely ignore it.
          </p>
        </div>
      </div>
    `;

    // 7. Send email via Brevo API
    const brevoResponse = await sendMail({
      to: trimmedEmail,
      subject: emailSubject,
      text: emailBody,
      html: emailHtmlBody,
    });

    console.log(`✅ OTP sent to ${trimmedEmail}. Brevo messageId: ${brevoResponse?.messageId || "sent"}`);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
    });
  } catch (error) {
    console.error("Error in sendEmailOtp:", error?.response?.data || error.message || error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while sending OTP. Please try again.",
    });
  }
};

/**
 * Controller to handle verifying OTP
 * POST /api/otp/verify-otp  or  POST /api/otp/verify-email-otp
 */
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Required fields validation
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Validation failed: Both email and OTP are required fields.",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedOtp = otp.trim();

    // 2. Retrieve most recent OTP record for this email
    const record = await OTP.findOne({ email: trimmedEmail }).sort({ createdAt: -1 });

    // 3. Check if OTP exists (TTL handles expiry automatically)
    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new one.",
      });
    }

    // 4. Check if the OTP matches
    if (record.otp !== trimmedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    // 5. Delete the verified OTP to prevent reuse
    await OTP.deleteOne({ _id: record._id });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Error in verifyEmailOtp:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred during OTP verification.",
    });
  }
};
