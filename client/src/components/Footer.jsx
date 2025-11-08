import React from "react";

export default function Footer() {
  const offices = [
    {
      name: "VINNOJAYA PEKAYON",
      address:
        "Jl. Palem Raya cc 35 no.4 RT. 005 RW. 017. Pondok Pekayon Indah Pekayon Jaya, Bekasi Selatan",
      phone: "021-824 15 999",
      whatsapp: "628111044949",
      email: "vinnojaya.pekayon@gmail.com",
    },
    {
      name: "VINNOJAYA KCP TAMAN GALAXY",
      address:
        "Jl. Sedap Malam NO.181 b RT 001 RW. 011 Jakasetia, Bekasi Selatan",
      phone: "021-820 5945",
      whatsapp: "628111772949",
      email: "vinnojaya.galaxy@gmail.com",
    },
  ];

  const normalizeTel = (phone) => {
    if (!phone) return "";
    let cleaned = phone.replace(/[^+\d]/g, "");
    if (/^0\d+/.test(cleaned)) {
      cleaned = "+62" + cleaned.slice(1);
    }
    return cleaned;
  };

  return (
    <footer
      className="mt-5"
      style={{
        background: "linear-gradient(to bottom, #2c2c2c, #1a1a1a)",
        color: "#fff",
        borderTop: "4px solid #BE9539",
      }}
    >
      <div className="container py-5">
        {/* Section Title */}
        <div className="mb-4">
          <h4 className="fw-bold mb-0" style={{ color: "#BE9539" }}>
            Hubungi Kami
          </h4>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#BE9539",
              marginTop: "8px",
            }}
          />
        </div>

        <div className="row g-4">
          {offices.map((o, idx) => (
            <div className="col-md-6" key={idx}>
              <div
                className="p-4 h-100"
                style={{
                  background: "#3a3a3a",
                  borderRadius: "10px",
                  borderLeft: "4px solid #BE9539",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(190, 149, 57, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h5 className="fw-bold mb-3" style={{ color: "#BE9539" }}>
                  {o.name}
                </h5>

                {/* Address */}
                <div className="mb-3">
                  <p
                    className="small mb-0"
                    style={{ lineHeight: "1.6", opacity: 0.9 }}
                  >
                    📍 {o.address}
                  </p>
                </div>

                {/* Phone */}
                <div className="mb-2">
                  <span className="small">📞 </span>
                  <a
                    href={`tel:${normalizeTel(o.phone)}`}
                    className="text-white text-decoration-none small"
                    style={{ opacity: 0.9 }}
                  >
                    {o.phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="mb-2">
                  <span className="small">💬 </span>
                  <a
                    href={`https://wa.me/${o.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white text-decoration-none small"
                    style={{ opacity: 0.9 }}
                  >
                    {o.whatsapp.startsWith("62")
                      ? `+${o.whatsapp}`
                      : o.whatsapp}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <span className="small">✉️ </span>
                  <a
                    href={`mailto:${o.email}`}
                    className="text-white text-decoration-none small"
                    style={{ opacity: 0.9, wordBreak: "break-all" }}
                  >
                    {o.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div
        style={{
          borderTop: "2px solid rgba(190, 149, 57, 0.3)",
          background: "#1a1a1a",
        }}
      >
        <div className="container py-3 text-center">
          <p className="mb-0 small" style={{ opacity: 0.8 }}>
            &copy; {new Date().getFullYear()}{" "}
            <strong style={{ color: "#BE9539" }}>Vinnojaya</strong>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
