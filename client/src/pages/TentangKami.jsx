import React, { useState, useEffect } from "react";
import BannerTentangKami from "../components/BannerTentangKami";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TentangKami() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/slide/1.JPG",
    "/slide/2.JPG",
    "/slide/3.JPG",
    "/slide/4.JPG",
    "/slide/5.JPG",
    "/slide/6.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <Helmet>
        <title>Tentang Kami - Vinnojaya Biro Jasa Bekasi Sejak 2000</title>
        <meta
          name="description"
          content="Vinnojaya adalah biro jasa profesional sejak tahun 2000 yang melayani pengurusan STNK, BPKB, SIM, dan dokumen kendaraan di Bekasi. Terpercaya, cepat, dan aman dengan 34 cabang."
        />
        <meta
          name="keywords"
          content="tentang vinnojaya, profil vinnojaya, biro jasa bekasi, sejarah vinnojaya, kantor vinnojaya pekayon, kantor vinnojaya galaxy"
        />
        <link rel="canonical" href="https://vinnojaya.com/tentang-kami" />

        <meta
          property="og:title"
          content="Tentang Kami - Vinnojaya Biro Jasa Bekasi Sejak 2000"
        />
        <meta
          property="og:description"
          content="Biro jasa profesional sejak 2000 dengan 34 cabang. Melayani pengurusan STNK, BPKB, SIM di Bekasi dan sekitarnya."
        />
        <meta property="og:url" content="https://vinnojaya.com/tentang-kami" />
      </Helmet>

      <BannerTentangKami />
      <section
        className="container my-3 my-md-5 px-3 px-md-4"
        style={{
          background: "linear-gradient(to bottom, #fffbf5, #ffffff)",
          borderRadius: "12px",
          padding: "2rem 1rem",
          boxShadow: "0 4px 8px rgba(190, 149, 57, 0.15)",
        }}
      >
        <div className="row mb-4 mb-md-5">
          <div className="col-md-3 mb-3 mb-md-0">
            {/* Image Carousel */}
            <div
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(190, 149, 57, 0.3)",
                height: "100%",
                minHeight: "300px",
              }}
            >
              <img
                src={slides[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(190, 149, 57, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(190, 149, 57, 1)";
                  e.currentTarget.style.transform =
                    "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(190, 149, 57, 0.8)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(190, 149, 57, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(190, 149, 57, 1)";
                  e.currentTarget.style.transform =
                    "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(190, 149, 57, 0.8)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <FaChevronRight size={20} />
              </button>
              {/* Indicators */}
              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "8px",
                  zIndex: 10,
                }}
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: currentSlide === index ? "30px" : "10px",
                      height: "10px",
                      borderRadius: "5px",
                      border: "none",
                      background:
                        currentSlide === index
                          ? "#BE9539"
                          : "rgba(255, 255, 255, 0.5)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div
              className="p-3 p-md-4"
              style={{
                background: "white",
                borderRadius: "10px",
                borderLeft: "4px solid #BE9539",
                boxShadow: "0 4px 8px rgba(190, 149, 57, 0.1)",
              }}
            >
              <p style={{ lineHeight: "1.8", color: "#555" }}>
                Vinnojaya adalah perusahaan yang bergerak dalam bidang jasa,
                terutama jasa STNK &amp; BPKB. Kami Jasa Konsultan profesional
                yang berkomitmen memberikan solusi cepat, aman, dan terpercaya
                untuk setiap kebutuhan administrasi Anda. Kami berdiri sejak
                tahun 2000 dengan nama Vinno Mandiri dan pada tahun 2011 dibuat
                legalitas dengan perubahan nama menjadi CV. Vinnojaya. Kami
                hadir untuk membantu individu maupun perusahaan menghemat waktu,
                tenaga, dan biaya dalam mengurus berbagai dokumen penting
                kendaraan.
              </p>

              <p className="my-4" style={{ lineHeight: "1.8", color: "#555" }}>
                Kami melayani seluruh area Jakarta, Bogor, Depok, Tangerang,
                Bekasi, Purwakarta, Karawang, Subang, Bandung, Serang & Jawa
                Tengah. Sampai saat ini Kami sudah memiliki 34 cabang dari
                beberapa rekanan.
              </p>

              <h5
                className="mt-4 mb-3 fw-bold"
                style={{
                  color: "#BE9539",
                }}
              >
                KEUNGGULAN VINNOJAYA
              </h5>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  lineHeight: "2",
                  color: "#555",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <FaCheck
                    style={{
                      color: "#BE9539",
                      fontSize: "1.5rem",
                      marginRight: "1rem",
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  />
                  <span>
                    Berbasis sistem komputerisasi untuk efisiensi dan keamanan.
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <FaCheck
                    style={{
                      color: "#BE9539",
                      fontSize: "1.5rem",
                      marginRight: "1rem",
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  />
                  <span>
                    Memiliki legalitas resmi yang terdaftar dan terpercaya.
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <FaCheck
                    style={{
                      color: "#BE9539",
                      fontSize: "1.5rem",
                      marginRight: "1rem",
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  />
                  <span>
                    Kualitas &amp; keamanan dalam setiap proses layanan.
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <FaCheck
                    style={{
                      color: "#BE9539",
                      fontSize: "1.5rem",
                      marginRight: "1rem",
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  />
                  <span>Harga terjangkau dengan transparansi biaya.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(to right, transparent, #BE9539, transparent)",
            margin: "3rem 0",
            borderRadius: "2px",
          }}
        />

        <div className="text-center mb-4">
          <h3
            className="fw-bold"
            style={{
              color: "#BE9539",
              fontSize: "2rem",
            }}
          >
            LOKASI JASA KONSULTAN VINNOJAYA
          </h3>
        </div>

        <div className="row g-4">
          {/* VINNOJAYA PEKAYON */}
          <div className="col-12">
            <div
              className="p-4"
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
              <div
                className="row align-items-center"
                style={{ alignItems: "stretch" }}
              >
                <div
                  className="col-md-4 mb-3 mb-md-0"
                  style={{ display: "flex" }}
                >
                  <img
                    src="/PEKAYON.jpg"
                    alt="VINNOJAYA PEKAYON Office"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "10px",
                      border: "3px solid #BE9539",
                      display: "block",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h4
                    className="fw-bold mb-3"
                    style={{
                      color: "#BE9539",
                      fontSize: "1.5rem",
                    }}
                  >
                    VINNOJAYA PEKAYON
                  </h4>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>Alamat:</strong> Jl.
                    Palem Raya cc 35 no.4 RT. 005 RW. 017. Pondok Pekayon Indah
                    Pekayon Jaya, Bekasi Selatan
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>No Telp:</strong>{" "}
                    021-824 15 999
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>No WhatsApp:</strong>{" "}
                    0811 1044 949
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>Email:</strong>{" "}
                    vinnojaya.pekayon@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VINNOJAYA KCP TAMAN GALAXY */}
          <div className="col-12">
            <div
              className="p-4"
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
              <div
                className="row align-items-center"
                style={{ alignItems: "stretch" }}
              >
                <div
                  className="col-md-4 mb-3 mb-md-0"
                  style={{ display: "flex" }}
                >
                  <img
                    src="/GALAXY.jpg"
                    alt="VINNOJAYA KCP TAMAN GALAXY Office"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "10px",
                      border: "3px solid #BE9539",
                      display: "block",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h4
                    className="fw-bold mb-3"
                    style={{
                      color: "#BE9539",
                      fontSize: "1.5rem",
                    }}
                  >
                    VINNOJAYA KCP TAMAN GALAXY
                  </h4>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>Alamat:</strong> Jl.
                    Sedap Malam NO.181 b RT 001 RW. 011 Jakasetia, Bekasi
                    Selatan
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>No Telp:</strong>{" "}
                    021-820 5945
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>No WhatsApp:</strong>{" "}
                    0811 1772 949
                  </p>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "#555",
                      marginBottom: "0",
                    }}
                  >
                    <strong style={{ color: "#BE9539" }}>Email:</strong>{" "}
                    vinnojaya.galaxy@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
