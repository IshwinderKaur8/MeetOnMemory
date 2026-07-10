import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const isMock = !process.env.SMTP_USER || process.env.SMTP_USER === "your_email" || process.env.SMTP_USER.trim() === "";

let transporter;

if (isMock) {
  console.log("ℹ️ SMTP is in mock mode (console logging for emails)");
  transporter = {
    verify: (callback) => {
      if (typeof callback === "function") callback(null, true);
    },
    sendMail: async (options) => {
      console.log("=========================================");
      console.log("✉️ MOCK EMAIL SENT");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log("Content:");
      console.log(options.text || options.html);
      console.log("=========================================");
      return { messageId: "mock-id-" + Date.now() };
    }
  };
} else {
  let host = process.env.SMTP_HOST;
  if (!host) {
    if (process.env.SMTP_USER && process.env.SMTP_USER.endsWith("@gmail.com")) {
      host = "smtp.gmail.com";
    } else {
      host = "smtp-relay.brevo.com";
    }
  }
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP Connection Error:", error);
    } else {
      console.log("✅ SMTP Server is ready to send emails!");
    }
  });
}

export default transporter;
