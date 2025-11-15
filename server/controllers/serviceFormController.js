class ServiceFormController {
  static async send(req, res) {
    try {
      const body = req.body || {};
      // accept either 'layanan' (Indonesian) or 'service' (frontend) keys
      const { nama, noTelp, daerah, asal, tujuan, noPolisi, cabang, category } =
        body;
      // requirements used to be sent from frontend; if absent, fallback to []
      const requirements = body.requirements || [];
      const layanan = body.layanan || body.service || "";

      const { WA_TANGERANG, WA_BEKASI, WA_JAKARTA, WA_DEFAULT } = process.env;
      // email routing envs
      const { EMAIL_TANGERANG, EMAIL_BEKASI, EMAIL_JAKARTA, EMAIL_DEFAULT } =
        process.env;

      // normalize cabang: trim, collapse spaces, lowercase
      const branchRaw = (cabang || "").trim().toLowerCase();
      const branchKey = branchRaw.replace(/\s+/g, "");
      let adminWhatsapp = WA_DEFAULT || "";
      if (
        (branchKey === "tangerang" || branchKey.startsWith("tangerang")) &&
        WA_TANGERANG
      )
        adminWhatsapp = WA_TANGERANG;
      if (
        (branchKey === "bekasi" || branchKey.startsWith("bekasi")) &&
        WA_BEKASI
      )
        adminWhatsapp = WA_BEKASI;
      if (
        (branchKey === "jakarta" || branchKey.startsWith("jakarta")) &&
        WA_JAKARTA
      )
        adminWhatsapp = WA_JAKARTA;

      console.info(
        "[ServiceForm] branch:",
        branchRaw,
        "-> adminWA:",
        adminWhatsapp
      );

      // Try immediate send first
      let emailSent = false;
      const { sendMail } = require("../services/mailer");

      // Choose email based on cabang
      const toEmail =
        branchKey === "tangerang" && EMAIL_TANGERANG
          ? EMAIL_TANGERANG
          : branchKey === "bekasi" && EMAIL_BEKASI
          ? EMAIL_BEKASI
          : branchKey === "jakarta" && EMAIL_JAKARTA
          ? EMAIL_JAKARTA
          : EMAIL_DEFAULT || "";

      console.log(
        "[ServiceForm] Attempting immediate send for cabang:",
        branchKey,
        "to:",
        toEmail
      );

      // Build email body
      // Build plain-text and HTML email bodies
      const textParts = [];
      textParts.push("Permintaan Layanan Baru dari Website Biro Jasa");
      if (nama) textParts.push(`Nama: ${nama}`);
      if (noTelp) textParts.push(`No. Telp: ${noTelp}`);
      if (category) textParts.push(`Kategori: ${category}`);
      if (layanan) textParts.push(`Layanan: ${layanan}`);
      if (daerah) textParts.push(`Daerah: ${daerah}`);
      if (asal) textParts.push(`Asal: ${asal}`);
      if (tujuan) textParts.push(`Tujuan: ${tujuan}`);
      if (noPolisi) textParts.push(`No. Polisi: ${noPolisi}`);
      if (cabang) textParts.push(`Cabang: ${cabang}`);
      if (Array.isArray(requirements) && requirements.length)
        textParts.push(`Persyaratan: ${requirements.join(", ")}`);
      textParts.push("---");
      textParts.push("Balas pesan ini untuk menindaklanjuti.");
      const textBody = textParts.join("\n");

      const htmlRows = [];
      htmlRows.push(`<h3>Permintaan Layanan Baru dari Website Biro Jasa</h3>`);
      const addRow = (label, value) =>
        htmlRows.push(`<p><strong>${label}:</strong> ${value || "-"}</p>`);
      addRow("Nama", nama);
      addRow("No. Telp", noTelp);
      addRow("Kategori", category);
      addRow("Layanan", layanan);
      addRow("Daerah", daerah);
      addRow("Asal", asal);
      addRow("Tujuan", tujuan);
      addRow("No. Polisi", noPolisi);
      addRow("Cabang", cabang);
      if (Array.isArray(requirements) && requirements.length)
        addRow("Persyaratan", requirements.join(", "));
      htmlRows.push(`<hr/><p>Balas pesan ini untuk menindaklanjuti.</p>`);
      const htmlBody = htmlRows.join("\n");

      // Try immediate send with both text and html - with timeout
      if (toEmail) {
        try {
          // Set timeout wrapper for email sending
          const emailPromise = sendMail(
            toEmail,
            `Permintaan Layanan: ${nama || ""}`,
            textBody,
            htmlBody
          );

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Email timeout after 20s")),
              20000
            )
          );

          const result = await Promise.race([emailPromise, timeoutPromise]);

          console.info(
            "[ServiceForm] ✅ Immediate email sent to",
            toEmail,
            "messageId:",
            result.messageId
          );
          emailSent = true;
        } catch (err) {
          console.error(
            "[ServiceForm] ❌ Immediate email send failed:",
            err.message || err
          );
          // Don't fail the request, just log the error
          emailSent = false;
        }
      } else {
        console.warn(
          "[ServiceForm] ⚠️ No email configured for cabang:",
          branchKey
        );
      }

      // Return result to user - always succeed to improve UX
      // Even if email fails, we log it and user can contact via WhatsApp
      if (!emailSent) {
        console.error(
          "[ServiceForm] ❌ Email send failed - but responding 200"
        );
        return res.status(200).json({
          message: "Formulir diterima. Kami akan menghubungi Anda segera.",
          warning: "Email notification may be delayed",
        });
      }

      return res.status(200).json({
        message: "Formulir berhasil dikirim dan email notifikasi terkirim.",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: String(err) });
    }
  }
}

module.exports = ServiceFormController;
