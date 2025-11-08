import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import ServiceForm from "../components/ServiceForm";
import { Modal } from "bootstrap";
import WhatsAppButton from "../components/WhatsAppButton";
import { WHATSAPP_NUMBER } from "../config";
import Partners from "../components/Partners";
import { FaUser, FaLock, FaFileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [banners, setBanners] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const fetchReviews = async () => {
    const { data } = await axios.get("/reviews");
    setReviews(data);
  };

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get("/banners");
      setBanners(data);
    } catch {
      // silent fail, home can still render without banners
      setBanners([]);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchBanners();
  }, []);

  // Auto-scroll reviews horizontally every 3 seconds using real DOM sizes
  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return;
    const slider = sliderRef.current;
    const container = containerRef.current;

    const computeMaxScroll = () =>
      Math.max(0, slider.scrollWidth - container.clientWidth);

    if (reviews.length <= 3) return; // small screens / few items

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const gap = 20; // gap in CSS
        // We assume each card wrapper width equals first child's offsetWidth
        const firstCard = slider.querySelector(".review-card-wrapper");
        if (!firstCard) return 0;
        const cardWidth = firstCard.offsetWidth + gap;
        const maxScroll = computeMaxScroll();
        let next = prev + cardWidth;
        if (next > maxScroll) next = 0; // loop back to start
        return next;
      });
    }, 3000);

    // Adjust scrollPosition if container resized or content changes
    const ro = new ResizeObserver(() => {
      const maxScroll = computeMaxScroll();
      if (scrollPosition > maxScroll) setScrollPosition(0);
    });
    ro.observe(container);

    return () => {
      clearInterval(interval);
      ro.disconnect();
    };
  }, [reviews.length, scrollPosition]);

  const openModal = () => {
    const modalEl = document.getElementById("reviewModal");
    if (!modalEl) return;
    const modal = new Modal(modalEl);
    modal.show();
  };

  return (
    <>
      <Helmet>
        <title>Vinnojaya - Biro Jasa STNK, BPKB, SIM Terpercaya Bekasi</title>
        <meta
          name="description"
          content="Vinnojaya adalah biro jasa terpercaya untuk pengurusan STNK, BPKB, BBN, SIM, dan mutasi kendaraan di Bekasi. Layanan cepat, aman, dan profesional sejak 2000. Hubungi 0811-1044-949."
        />
        <meta
          name="keywords"
          content="biro jasa bekasi, jasa stnk bekasi, jasa bpkb, jasa sim, bbn kendaraan, mutasi kendaraan, vinnojaya, pengurusan stnk, perpanjangan stnk"
        />
        <link rel="canonical" href="https://vinnojaya.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Vinnojaya - Biro Jasa STNK, BPKB, SIM Terpercaya Bekasi"
        />
        <meta
          property="og:description"
          content="Biro jasa profesional untuk pengurusan STNK, BPKB, BBN, SIM, dan mutasi kendaraan di Bekasi sejak 2000."
        />
        <meta property="og:url" content="https://vinnojaya.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta
          name="twitter:title"
          content="Vinnojaya - Biro Jasa STNK, BPKB, SIM Terpercaya Bekasi"
        />
        <meta
          name="twitter:description"
          content="Biro jasa profesional untuk pengurusan STNK, BPKB, BBN, SIM, dan mutasi kendaraan di Bekasi sejak 2000."
        />
      </Helmet>

      {/* 🏙️ HERO SECTION WITH BANNER CAROUSEL */}
      <section className="hero-carousel">
        <div
          id="bannerCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-inner">
            {banners.length === 0 ? (
              <div className="carousel-item active hero">
                <div className="container text-center">
                  <h1>Vinno Jaya</h1>
                  <h3 className="mt-3">Biro Jasa Bekasi</h3>
                  <p className="mt-3">
                    Melayani pengurusan{" "}
                    <b>STNK, SIM, Mutasi, Balik Nama, KIR, Paspor</b> dan
                    lainnya. Cepat, aman, dan terpercaya!
                  </p>
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        "Halo, saya ingin bertanya tentang layanan Anda."
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-lg"
                      style={{
                        background: "#BE9539",
                        borderColor: "#BE9539",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        padding: "12px 30px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#A67F2E";
                        e.target.style.transform = "translateY(-3px)";
                        e.target.style.boxShadow =
                          "0 6px 12px rgba(0, 0, 0, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#BE9539";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 4px 8px rgba(0, 0, 0, 0.3)";
                      }}
                    >
                      💬 Hubungi Kami
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              banners.map((banner, idx) => (
                <div
                  key={banner.id}
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  style={{
                    backgroundImage: `url(http://localhost:3000${banner.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "500px",
                    color: "white",
                  }}
                >
                  <div
                    className="container text-center d-flex flex-column justify-content-center align-items-center"
                    style={{ minHeight: "500px" }}
                  >
                    <h1>Vinno Jaya</h1>
                    <h3 className="mt-3">Biro Jasa Bekasi</h3>
                    <p className="mt-3">
                      Melayani pengurusan{" "}
                      <b>STNK, SIM, Mutasi, Balik Nama, KIR, Paspor</b> dan
                      lainnya. Cepat, aman, dan terpercaya!
                    </p>
                    <div className="mt-4">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          "Halo, saya ingin bertanya tentang layanan Anda."
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-lg"
                        style={{
                          background: "#BE9539",
                          borderColor: "#BE9539",
                          color: "#fff",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          padding: "12px 30px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#A67F2E";
                          e.target.style.transform = "translateY(-3px)";
                          e.target.style.boxShadow =
                            "0 6px 12px rgba(0, 0, 0, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#BE9539";
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.3)";
                        }}
                      >
                        💬 Hubungi Kami
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Carousel controls */}
          {banners.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#bannerCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#bannerCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      </section>

      {/* SEKILAS TENTANG KAMI */}
      <section className="container my-5 px-3 px-md-4">
        <div
          className="p-3 p-md-4 mb-4"
          style={{
            borderRadius: "12px",
          }}
        >
          <div className="row align-items-center">
            <div className="col-md-5 text-center mb-3 mb-md-0">
              <img
                src="/vinnobg.png"
                alt="Vinno Jaya"
                className="img-fluid"
                style={{
                  maxHeight: 360,
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
            <div className="col-md-7">
              <h2 className="mb-2 fw-bold" style={{ color: "#131311ff" }}>
                Sekilas Tentang Kami
              </h2>
              <h4 className="mb-3" style={{ color: "#A67F2E" }}>
                Vinnojaya
              </h4>

              <p style={{ lineHeight: "1.8", color: "#555" }}>
                Vinnojaya adalah perusahaan yang bergerak dalam bidang jasa,
                terutama jasa STNK & BPKB. Kami Jasa Konsultan profesional yang
                berkomitmen memberikan solusi cepat, aman, dan terpercaya untuk
                setiap kebutuhan administrasi Anda. Kami berdiri sejak tahun
                2000 dengan nama Vinno Mandiri dan pada tahun 2011 dibat
                legalitas dengan perubahan nama menjadi CV. Vinnojaya. Kami
                hadir untuk membantu individu maupun perusahaan menghemat waktu,
                tenaga, dan biaya dalam mengurus berbagai dokumen penting
                kendaraan.
              </p>

              <div className="mt-4">
                <a
                  href="/layanan"
                  className="btn px-4"
                  style={{
                    borderRadius: "10px",
                    fontWeight: "600",
                    background: "#BE9539",
                    borderColor: "#BE9539",
                    color: "#fff",
                    padding: "10px 25px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#A67F2E";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 4px 8px rgba(190, 149, 57, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#BE9539";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Selengkapnya →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Layanan */}
        <div
          className="p-3 p-md-4 mb-4"
          style={{
            borderRadius: "12px",
            color: "#2c3e50",
          }}
        >
          <div className="mb-4">
            <h2 className="mb-0 fw-bold">Layanan</h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                marginTop: "10px",
                borderRadius: "2px",
              }}
            />
          </div>

          <div className="row g-3 g-md-4">
            <div className="col-md-6">
              {/* Left column: 2 service cards */}
              <div
                className="d-flex align-items-start p-3 bg-white rounded mb-3"
                style={{
                  borderLeft: "4px solid #BE9539",
                  boxShadow: "0 4px 8px rgba(190, 149, 57, 0.15)",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(190, 149, 57, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(190, 149, 57, 0.15)";
                }}
              >
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 50,
                    height: 50,
                    background: "#BE9539",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  <FaUser size={24} color="white" />
                </div>
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "#BE9539" }}>
                    SIM
                  </h5>
                </div>
              </div>

              <div
                className="d-flex align-items-start p-3 bg-white rounded mt-3"
                style={{
                  borderLeft: "4px solid #BE9539",
                  boxShadow: "0 4px 8px rgba(190, 149, 57, 0.15)",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(190, 149, 57, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(190, 149, 57, 0.15)";
                }}
              >
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 50,
                    height: 50,
                    background: "#BE9539",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  <FaLock size={24} color="white" />
                </div>
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "#BE9539" }}>
                    Pengurusan BBN
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="d-flex align-items-start p-3 bg-white rounded mb-3"
                style={{
                  borderLeft: "4px solid #BE9539",
                  boxShadow: "0 4px 8px rgba(190, 149, 57, 0.15)",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(190, 149, 57, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(190, 149, 57, 0.15)";
                }}
              >
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 50,
                    height: 50,
                    background: "#BE9539",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  <FaFileAlt size={24} color="white" />
                </div>
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "#BE9539" }}>
                    Pengurusan STNK
                  </h5>
                  <p className="mb-0 small text-muted">
                    Perpanjangan & pengurusan STNK
                  </p>
                </div>
              </div>

              <div
                className="d-flex align-items-start p-3 bg-white rounded"
                style={{
                  borderLeft: "4px solid #BE9539",
                  boxShadow: "0 4px 8px rgba(190, 149, 57, 0.15)",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(190, 149, 57, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(190, 149, 57, 0.15)";
                }}
              >
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 50,
                    height: 50,
                    background: "#BE9539",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  <FaMapMarkerAlt size={24} color="white" />
                </div>
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "#BE9539" }}>
                    Pengurusan Mutasi
                  </h5>
                  <p className="mb-0 small text-muted">
                    Mutasi kendaraan antar daerah
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a
              href="/layanan"
              className="btn px-5"
              style={{
                borderRadius: "10px",
                fontWeight: "600",
                background: "#BE9539",
                borderColor: "#BE9539",
                color: "#fff",
                padding: "12px 30px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#A67F2E";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 8px rgba(190, 149, 57, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#BE9539";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Lihat Semua Layanan →
            </a>
          </div>
        </div>
      </section>

      {/* MITRA / PARTNERS BAR (diletakkan di bawah Layanan) */}
      <Partners />

      {/* 🧾 FORM LAYANAN */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ServiceForm />
          </div>
        </div>
      </section>

      {/* 💬 REVIEW SECTION */}
      <section className="review-section mb-5">
        <div className="container">
          <h3
            className="text-center mb-4"
            style={{ color: "#121211ff", fontWeight: "bold" }}
          >
            💬 Review Pelanggan
          </h3>
          <div className="text-center mb-4">
            <button
              className="btn"
              onClick={openModal}
              style={{
                background: "#BE9539",
                borderColor: "#BE9539",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "10px",
                padding: "10px 25px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 8px rgba(190, 149, 57, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#A67F2E";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(190, 149, 57, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#BE9539";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(190, 149, 57, 0.3)";
              }}
            >
              + Tambah Review
            </button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-muted">Belum ada review 😢</p>
        ) : (
          <div className="review-horizontal-container" ref={containerRef}>
            <div
              className="review-horizontal-slider"
              ref={sliderRef}
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                transition: "transform 0.8s ease-in-out",
              }}
            >
              {reviews.map((r) => (
                <div key={r.id} className="review-card-wrapper">
                  <ReviewCard data={r} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 🪟 MODAL REVIEW */}
      <div
        className="modal fade"
        id="reviewModal"
        tabIndex="-1"
        aria-labelledby="reviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              border: "2px solid #BE9539",
              borderRadius: "12px",
            }}
          >
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(to right, #BE9539, #A67F2E)",
                color: "white",
                borderRadius: "10px 10px 0 0",
              }}
            >
              <h5
                className="modal-title fw-bold"
                style={{ color: "#121211ff" }}
                id="reviewModalLabel"
              >
                📝 Tambah Review
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ReviewForm refresh={fetchReviews} />
            </div>
          </div>
        </div>
      </div>
      {/* Floating WhatsApp button */}
      <WhatsAppButton
        phone={WHATSAPP_NUMBER}
        message="Halo, saya mau tanya layanan."
      />
    </>
  );
}
