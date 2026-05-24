import { OTP } from "./otp.model.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

export const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.endsWith("@gmail.com")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid Gmail address.",
      });
    }

    // Check if OTP was generated recently to implement cooldown (optional backend validation, primarily handled on frontend)
    const existingOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (existingOtp) {
      const timeDiff = new Date() - existingOtp.createdAt;
      if (timeDiff < 30000) { // 30 seconds cooldown
        return res.status(429).json({
          success: false,
          message: "Please wait 30 seconds before requesting a new OTP.",
        });
      }
    }

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    // Save OTP to DB
    await OTP.create({
      email,
      otp,
    });

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"VTRC Technologies" <no-reply@vtrc.tech>',
      to: email,
      subject: "VTRC Technologies - Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #000; text-transform: uppercase;">VTRC Technologies</h2>
          <p>Your One-Time Password (OTP) for email verification is:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; color: #000; background-color: #f4f4f4; padding: 10px; text-align: center; border-radius: 4px;">${otp}</h1>
          <p style="color: #666; font-size: 14px;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please ensure email configuration is correct.",
    });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    // Find the most recent OTP for this email
    const record = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new one.",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP provided.",
      });
    }

    // OTP is valid, delete it
    await OTP.deleteOne({ _id: record._id });

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during verification.",
    });
  }
};
