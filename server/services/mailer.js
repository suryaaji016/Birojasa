const nodemailer = require("nodemailer");

// Configure via env vars
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  
  console.log("[Mailer] Checking SMTP configuration...");
  console.log("[Mailer] SMTP_HOST:", SMTP_HOST);
  console.log("[Mailer] SMTP_PORT:", SMTP_PORT);
  console.log("[Mailer] SMTP_USER:", SMTP_USER);
  console.log("[Mailer] SMTP_PASS:", SMTP_PASS ? "***configured***" : "MISSING");
  console.log("[Mailer] FROM_EMAIL:", FROM_EMAIL);
  
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    const msg = `SMTP config missing! SMTP_HOST=${SMTP_HOST}, SMTP_USER=${SMTP_USER}, SMTP_PASS=${SMTP_PASS ? 'SET' : 'MISSING'}`;
    console.error("[Mailer] ❌", msg);
    throw new Error(msg);
  }
  
  console.log("[Mailer] Creating nodemailer transporter...");
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 15000, // 15 seconds for socket
    debug: true, // Enable debug output
    logger: true // Enable logger
  });
  console.log("[Mailer] ✅ Transporter created successfully");
  return transporter;
}

async function sendMail(to, subject, text, html) {
  try {
    console.log("[Mailer] ========== START EMAIL SEND ==========");
    console.log("[Mailer] To:", to);
    console.log("[Mailer] Subject:", subject);
    console.log("[Mailer] Text length:", text?.length || 0);
    console.log("[Mailer] HTML length:", html?.length || 0);
    
    const t = getTransporter();
    
    console.log("[Mailer] Calling sendMail...");
    const info = await t.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    
    console.log("[Mailer] ✅ Email sent successfully!");
    console.log("[Mailer] MessageId:", info.messageId);
    console.log("[Mailer] Response:", info.response);
    console.log("[Mailer] ========== END EMAIL SEND ==========");
    return info;
  } catch (err) {
    console.error("[Mailer] ========== EMAIL SEND FAILED ==========");
    console.error("[Mailer] Error message:", err.message);
    console.error("[Mailer] Error code:", err.code);
    console.error("[Mailer] Error stack:", err.stack);
    if (err.response) console.error("[Mailer] SMTP Response:", err.response);
    if (err.responseCode) console.error("[Mailer] Response Code:", err.responseCode);
    console.error("[Mailer] ==========================================");
    throw err;
  }
}

module.exports = { sendMail };
