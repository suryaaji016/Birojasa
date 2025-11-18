// Alternative mailer using Resend API (for when SMTP ports are blocked)
// To use: npm install resend
// Set RESEND_API_KEY in .env

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendMail(to, subject, text, html) {
  try {
    console.log("[Resend] ========== SENDING EMAIL ==========");
    console.log("[Resend] To:", to);
    console.log("[Resend] Subject:", subject);
    console.log("[Resend] From:", FROM_EMAIL);

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    // Dynamic import of Resend
    const { Resend } = require("resend");
    const resend = new Resend(RESEND_API_KEY);

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      text: text,
      html: html,
    });

    if (result.error) {
      throw new Error(result.error.message || JSON.stringify(result.error));
    }

    console.log("[Resend] ✅ Email sent successfully!");
    console.log("[Resend] ID:", result.data?.id);
    console.log("[Resend] ========================================");
    
    return { messageId: result.data?.id };
  } catch (err) {
    console.error("[Resend] ❌ EMAIL SEND FAILED");
    console.error("[Resend] Error:", err.message);
    console.error("[Resend] ========================================");
    throw err;
  }
}

module.exports = { sendMail };
