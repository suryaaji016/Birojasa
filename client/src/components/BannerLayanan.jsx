import { useEffect, useState } from "react";
import axios from "../api/axios";
import { WHATSAPP_NUMBER } from "../config";

export default function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get("/banners");
        if (mounted) setBanners(data || []);
      } catch {
        if (mounted) setBanners([]);
      }
    };
    fetchBanners();
    return () => (mounted = false);
  }, []);

  return (
    <section className="hero-carousel">
      <div
        id="sharedBanner"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {banners.length === 0 ? (
            <div className="carousel-item active hero">
              <div className="container text-center">
                <h1>DAFTAR LAYANAN & PERSYARATAN</h1>
              </div>
            </div>
          ) : (
            banners.map((banner, idx) => (
              <div
                key={banner.id}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                style={{
                  backgroundImage: `url(${axios.defaults.baseURL || ""}${
                    banner.imageUrl
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "420px",
                  color: "white",
                }}
              >
                <div
                  className="container text-center d-flex flex-column justify-content-center align-items-center"
                  style={{ minHeight: "420px" }}
                >
                  <h1>DAFTAR LAYANAN & PERSYARATAN</h1>
                </div>
              </div>
            ))
          )}
        </div>
        {banners.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#sharedBanner"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#sharedBanner"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
