import React from "react";
import BannerHubungiKami from "../components/BannerHubungiKami";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function HubungiKami() {
  // Example contact data — replace with dynamic values if you have them
  const offices = [
    {
      name: "VINNOJAYA PEKAYON",
      address:
        "Jl. Palem Raya cc 35 no.4 RT. 005 RW. 017. Pondok Pekayon Indah Pekayon Jaya, Bekasi Selatan",
      phone: "021-824 15 999",
      whatsapp: "628111044949",
      email: "vinnojaya.business@gmail.com",
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

  // helpers to produce href-friendly phone strings
  const normalizeTel = (phone) => {
    if (!phone) return "";
    // remove everything except digits and +
    let cleaned = phone.replace(/[^+\d]/g, "");
    // if it starts with a single 0 (local format) convert to +62
    if (/^0\d+/.test(cleaned)) {
      cleaned = "+62" + cleaned.slice(1);
    }
    return cleaned;
  };

  const primary = offices[0];

  return (
    <>
      <Helmet>
        <title>Hubungi Kami - Jasa Konsultan Vinnojaya STNK & BPKB</title>
        <meta
          name="description"
          content="Hubungi Vinnojaya Pekayon (0811-1044-949) dan Galaxy (0811-1772-949) untuk konsultasi dan layanan pengurusan STNK, BPKB, SIM. Lokasi di Bekasi Selatan, melayani dengan cepat dan ramah."
        />
        <meta
          name="keywords"
          content="kontak vinnojaya, alamat vinnojaya pekayon, alamat vinnojaya galaxy, nomor telepon vinnojaya, whatsapp vinnojaya, lokasi kantor vinnojaya bekasi"
        />
        <link rel="canonical" href="https://vinnojaya.com/hubungi-kami" />

        <meta
          property="og:title"
          content="Hubungi Kami - Vinnojaya Pekayon & Galaxy Bekasi"
        />
        <meta
          property="og:description"
          content="Lokasi dan kontak Vinnojaya Pekayon dan Galaxy Bekasi. Telepon, WhatsApp, email tersedia untuk konsultasi layanan STNK & BPKB."
        />
        <meta property="og:url" content="https://vinnojaya.com/hubungi-kami" />
      </Helmet>

      <BannerHubungiKami />
      <section className="container my-3 my-md-5 px-3 px-md-4">
        {/* Connect with us - Full Width */}
        <div className="mb-4">
          <div
            className="p-4"
            style={{
              background: "white",
              borderRadius: "12px",
              border: "3px solid #BE9539",
              boxShadow: "0 6px 12px rgba(190, 149, 57, 0.2)",
            }}
          >
            <div className="row mb-4">
              <div className="col-md-8">
                <h5
                  className="fw-bold"
                  style={{ fontSize: "1.4rem", color: "#BE9539" }}
                >
                  CONNECT WITH US
                </h5>
              </div>
              <div className="col-md-4">
                <h5
                  className="fw-bold"
                  style={{ fontSize: "1.4rem", color: "#BE9539" }}
                >
                  JAM OPERASIONAL
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <p className="mb-3" style={{ color: "#555" }}>
                  <strong style={{ color: "#BE9539" }}>
                    📞 Telpon / Hotline:
                  </strong>
                  <br />
                  <a
                    href={`tel:${normalizeTel(primary.phone)}`}
                    aria-label={`Call ${primary.name}`}
                    className="text-decoration-none"
                    style={{
                      fontSize: "1.1rem",
                      color: "#333",
                      textDecoration: "underline",
                    }}
                  >
                    {primary.phone}
                  </a>
                </p>

                <p className="mb-3" style={{ color: "#555" }}>
                  <strong style={{ color: "#BE9539" }}>💬 WhatsApp:</strong>
                  <br />
                  <a
                    href={`https://wa.me/${primary.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${primary.name}`}
                    className="text-decoration-none"
                    style={{
                      fontSize: "1.1rem",
                      color: "#333",
                      textDecoration: "underline",
                    }}
                  >
                    {primary.whatsapp.startsWith("62")
                      ? `+${primary.whatsapp}`
                      : primary.whatsapp}
                  </a>
                </p>

                <p className="mb-3" style={{ color: "#555" }}>
                  <strong style={{ color: "#BE9539" }}>✉️ Email:</strong>
                  <br />
                  <a
                    href={`mailto:${primary.email}`}
                    aria-label={`Email ${primary.name}`}
                    className="text-decoration-none"
                    style={{
                      fontSize: "1.1rem",
                      wordBreak: "break-all",
                      color: "#333",
                      textDecoration: "underline",
                    }}
                  >
                    {primary.email}
                  </a>
                </p>
              </div>

              <div className="col-md-4 mb-3 mb-md-0">
                <p className="mb-3" style={{ color: "#555" }}>
                  <strong style={{ color: "#BE9539" }}>Instagram:</strong>
                  <br />
                  <a
                    href="https://www.instagram.com/vinnojaya.official"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                    style={{
                      fontSize: "1.1rem",
                      color: "#333",
                      textDecoration: "underline",
                    }}
                  >
                    @vinnojaya.official
                  </a>
                </p>

                <p className="mb-4" style={{ color: "#555" }}>
                  <strong style={{ color: "#BE9539" }}>TikTok:</strong>
                  <br />
                  <a
                    href="https://www.tiktok.com/@vinnojayaid"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                    style={{
                      fontSize: "1.1rem",
                      color: "#333",
                      textDecoration: "underline",
                    }}
                  >
                    @vinnojayaid
                  </a>
                </p>

                <div className="d-flex gap-3">
                  <a
                    href="https://www.instagram.com/vinnojaya.official"
                    target="_blank"
                    rel="noreferrer"
                    className="btn d-flex align-items-center justify-content-center"
                    aria-label="Instagram Vinnojaya"
                    style={{
                      background: "#fff",
                      border: "2px solid #BE9539",
                      color: "#BE9539",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      padding: "0",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#BE9539";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(190, 149, 57, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.color = "#BE9539";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <FaInstagram size={24} />
                  </a>

                  <a
                    href="https://www.tiktok.com/@vinnojayaid"
                    target="_blank"
                    rel="noreferrer"
                    className="btn d-flex align-items-center justify-content-center"
                    aria-label="TikTok Vinnojaya"
                    style={{
                      background: "#fff",
                      border: "2px solid #BE9539",
                      color: "#BE9539",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      padding: "0",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#BE9539";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(190, 149, 57, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.color = "#BE9539";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <FaTiktok size={24} />
                  </a>
                </div>
              </div>

              {/* Jam Operasional - Right Column */}
              <div className="col-md-4">
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li className="mb-2" style={{ color: "#555" }}>
                    <strong>Senin</strong>
                    <span className="float-end">09:00 - 19:00</span>
                  </li>
                  <li className="mb-2" style={{ color: "#555" }}>
                    <strong>Selasa</strong>
                    <span className="float-end">09:00 - 19:00</span>
                  </li>
                  <li className="mb-2" style={{ color: "#555" }}>
                    <strong>Rabu</strong>
                    <span className="float-end">09:00 - 19:00</span>
                  </li>
                  <li className="mb-2" style={{ color: "#555" }}>
                    <strong>Kamis</strong>
                    <span className="float-end">09:00 - 19:00</span>
                  </li>
                  <li className="mb-2" style={{ color: "#555" }}>
                    <strong>Jumat</strong>
                    <span className="float-end">09:00 - 19:00</span>
                  </li>
                  <li className="mb-2" style={{ color: "#555" }}>
                    <strong>Sabtu</strong>
                    <span className="float-end">09:00 - 14:00</span>
                  </li>
                  <li style={{ color: "#BE9539", fontWeight: "bold" }}>
                    <strong>Minggu / Libur Nasional</strong>
                    <span className="float-end">Tutup</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Location Maps - Side by Side */}
        <div className="row g-3 g-md-4">
          {offices.map((o, idx) => (
            <div className="col-md-6" key={idx}>
              <div
                className="p-4 h-100"
                style={{
                  background: "white",
                  borderRadius: "12px",
                  border: "3px solid #BE9539",
                  boxShadow: "0 6px 12px rgba(190, 149, 57, 0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(190, 149, 57, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(190, 149, 57, 0.2)";
                }}
              >
                <h5
                  className="fw-bold mb-3"
                  style={{
                    color: "#BE9539",
                    fontSize: "1.4rem",
                  }}
                >
                  {o.name}
                </h5>
                <p
                  className="mb-2"
                  style={{ color: "#6b7280", lineHeight: "1.6" }}
                >
                  📍 {o.address}
                </p>
                <p className="mb-2" style={{ color: "#555" }}>
                  <strong>📞 Telp:</strong>{" "}
                  <a
                    href={`tel:${normalizeTel(o.phone)}`}
                    aria-label={`Call ${o.name}`}
                    style={{
                      color: "#BE9539",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    {o.phone}
                  </a>
                </p>
                <p className="mb-2" style={{ color: "#555" }}>
                  <strong>💬 WhatsApp:</strong>{" "}
                  <a
                    href={`https://wa.me/${o.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${o.name}`}
                    style={{
                      color: "#BE9539",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    {o.whatsapp.startsWith("62")
                      ? `+${o.whatsapp}`
                      : o.whatsapp}
                  </a>
                </p>
                <p className="mb-3" style={{ color: "#555" }}>
                  <strong>✉️ Email:</strong>{" "}
                  <a
                    href={`mailto:${o.email}`}
                    aria-label={`Email ${o.name}`}
                    style={{
                      color: "#BE9539",
                      textDecoration: "none",
                      wordBreak: "break-all",
                      fontWeight: "600",
                    }}
                  >
                    {o.email}
                  </a>
                </p>

                {/* Map */}
                <div
                  className="map-wrapper position-relative mb-3"
                  style={{
                    minHeight: 300,
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #BE9539",
                  }}
                >
                  <iframe
                    title={`map-${idx}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      o.address
                    )}&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                  ></iframe>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      o.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ zIndex: 5 }}
                    aria-label={`Open ${o.name} in Google Maps`}
                  />
                </div>

                {/* WhatsApp Button */}
                <div className="mt-3">
                  <a
                    href={`https://wa.me/${o.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn d-flex align-items-center justify-content-center w-100"
                    aria-label={`WhatsApp ${o.name}`}
                    style={{
                      background: "#25d366",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: "600",
                      padding: "0.8rem 1.5rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1fa855";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(37, 211, 102, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#25d366";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <FaWhatsapp size={20} className="me-2" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JSON-LD Structured Data for LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Vinnojaya",
          image: "https://vinnojaya.com/vinnobg.png",
          "@id": "https://vinnojaya.com",
          url: "https://vinnojaya.com",
          telephone: "+62-811-1044-949",
          email: "vinnojaya.pekayon@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jl. Palem Raya cc 35 no.4 RT. 005 RW. 017",
            addressLocality: "Pondok Pekayon Indah, Pekayon Jaya",
            addressRegion: "Bekasi Selatan",
            postalCode: "17148",
            addressCountry: "ID",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -6.268611,
            longitude: 106.984444,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "08:00",
              closes: "17:00",
            },
          ],
          sameAs: [
            "https://www.instagram.com/vinnojaya.official",
            "https://www.tiktok.com/@vinnojayaid",
          ],
          priceRange: "$$",
          description:
            "Vinnojaya adalah biro jasa profesional yang melayani pengurusan STNK, BPKB, SIM, BBN, dan mutasi kendaraan di Bekasi sejak tahun 2000.",
        })}
      </script>
    </>
  );
}
