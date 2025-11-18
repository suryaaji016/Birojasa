const nodemailer = require("nodemailer");

// Configure via env vars
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  
  console.log("[Mailer] Creating Gmail transporter...");
  console.log("[Mailer] SMTP_HOST:", SMTP_HOST);
  console.log("[Mailer] SMTP_PORT:", SMTP_PORT);
  console.log("[Mailer] SMTP_USER:", SMTP_USER);
  console.log("[Mailer] FROM_EMAIL:", FROM_EMAIL);
  
  if (!SMTP_USER || !SMTP_PASS) {
    const msg = "SMTP credentials missing! Set SMTP_USER and SMTP_PASS in .env";
    console.error("[Mailer] ❌", msg);
    throw new Error(msg);
  }
  
  // Gmail-specific configuration
  transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service (auto-configures host/port)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    // Fallback manual config if service fails
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // Use STARTTLS
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    }
  });
  
  console.log("[Mailer] ✅ Transporter created");
  return transporter;
}

async function sendMail(to, subject, text, html) {
  try {
    console.log("[Mailer] ========== SENDING EMAIL ==========");
    console.log("[Mailer] To:", to);
    console.log("[Mailer] Subject:", subject);
    
    const t = getTransporter();
    
    const info = await t.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    
    console.log("[Mailer] ✅ Email sent successfully!");
    console.log("[Mailer] MessageId:", info.messageId);
    console.log("[Mailer] ========================================");
    return info;
  } catch (err) {
    console.error("[Mailer] ❌ EMAIL SEND FAILED");
    console.error("[Mailer] Error:", err.message);
    console.error("[Mailer] Code:", err.code);
    console.error("[Mailer] ========================================");
    throw err;
  }
}

module.exports = { sendMail };
