const layananData = {
  PERPANJANG: {
    "STNK TAHUNAN": ["STNK ASLI", "KTP ASLI SESUAI STNK", "FC BPKB"],
    "STNK LIMA TAHUNAN": [
      "STNK ASLI",
      "KTP ASLI SESUAI STNK",
      "FC BPKB",
      "CEK FISIK KENDARAAN",
    ],
    "GANTI NOPOL": [
      "STNK ASLI",
      "KTP ASLI",
      "BPKB ASLI",
      "CEK FISIK KENDARAAN",
    ],
  },
  "BALIK NAMA": {
    "SAMA WILAYAH": [
      "STNK ASLI",
      "BPKB ASLI",
      "FC KTP PEMILIK BARU",
      "MATERAI 10.000",
      "CEK FISIK KENDARAAN",
    ],
    "MUTASI ANTAR SAMSAT": [
      "STNK ASLI",
      "BPKB ASLI",
      "FC KTP PEMILIK BARU",
      "MATERAI 10.000",
      "CEK FISIK KENDARAAN",
    ],
    "MUTASI LUAR DAERAH": [
      "STNK ASLI",
      "BPKB ASLI",
      "FC KTP PEMILIK BARU",
      "MATERAI 10.000",
      "CEK FISIK KENDARAAN HADIR DI SAMSAT TUJUAN SESUAI KTP PEMILIK BARU",
    ],
  },
  "PINDAH ALAMAT": {
    "SAMA WILAYAH": [
      "STNK ASLI",
      "KTP ASLI ALAMAT BARU",
      "BPKB ASLI",
      "CEK FISIK KENDARAAN",
    ],
    "MUTASI ANTAR WILAYAH": [
      "STNK ASLI",
      "KTP ASLI ALAMAT BARU",
      "BPKB ASLI",
      "CEK FISIK KENDARAAN",
    ],
    "MUTASI LUAR DAERAH": [
      "STNK ASLI",
      "KTP ASLI ALAMAT BARU",
      "BPKB ASLI",
      "CEK FISIK KENDARAAN HADIR DI SAMSAT TUJUAN SESUAI KTP PEMILIK BARU",
    ],
  },
  "STNK HILANG": {
    "STNK HILANG": [
      "BPKB ASLI / SUKET LEASING",
      "KTP ASLI",
      "CEK FISIK KENDARAAN",
      "FOTO UNIT",
    ],
  },
  "REVISI STNK": {
    "REVISI STNK": [
      "STNK ASLI",
      "FC KTP / FC BPKB / FC FAKTUR (TERGANTUNG DATA YANG INGIN DI REVISI)",
    ],
  },
  "BPKB DUPLIKAT (BPKB HILANG)": {
    "BPKB DUPLIKAT (BPKB HILANG)": [
      "FC KTP A/N PEMILIK",
      "FC STNK A/N PEMILIK",
      "CEK FISIK KENDARAAN HADIR",
    ],
  },
  "REVISI BPKB": {
    "REVISI BPKB": [
      "BPKB ASLI",
      "FC KTP / FC STNK / FC FAKTUR (TERGANTUNG DATA YANG INGIN DI REVISI)",
    ],
  },
  "SIM A": {
    BARU: ["FC KTP 3 LEMBAR", "FOTO HADIR"],
    PERPANJANGAN: ["FC KTP 3 LEMBAR", "SIM ASLI", "FOTO HADIR"],
  },
  "SIM C": {
    BARU: ["FC KTP 3 LEMBAR", "FOTO HADIR"],
    PERPANJANGAN: ["FC KTP 3 LEMBAR", "SIM ASLI", "FOTO HADIR"],
  },
};

import { useState, useEffect } from "react";
import BannerLayanan from "../components/BannerLayanan";
import { Helmet } from "react-helmet-async";

export default function Layanan() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("");
  const [modalService, setModalService] = useState("");
  const [dataMap, setDataMap] = useState(null);

  // On mount, try to fetch server-managed services config. If available,
  // transform the flat array into a nested map: { category: { service: [persyaratan] } }
  const fetchConfig = async () => {
    try {
      const res = await fetch("http://localhost:3000/config/services");
      const arr = await res.json();
      if (!Array.isArray(arr) || arr.length === 0) return;
      const map = {};
      arr.forEach((it) => {
        const category = (it.category || "").toString().trim();
        if (!category) return;
        const layanan = (it.layanan || "").toString().trim() || category;
        const pers = Array.isArray(it.persyaratan) ? it.persyaratan : [];
        map[category] = map[category] || {};
        // if duplicate layanan entries exist, merge unique persyaratan
        if (!map[category][layanan]) map[category][layanan] = [];
        pers.forEach((p) => {
          if (!map[category][layanan].includes(p))
            map[category][layanan].push(p);
        });
      });
      setDataMap(map);
    } catch (err) {
      console.warn("Failed to load services config:", err);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const openModal = (category, service) => {
    setModalCategory(category);
    setModalService(service);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Helmet>
        <title>
          Layanan Kami - Jasa Konsultan Vinnojaya STNK & BPKB | Vinnojaya Bekasi
        </title>
        <meta
          name="description"
          content="Layanan lengkap Vinnojaya: Perpanjangan STNK tahunan & 5 tahunan, pengurusan BPKB, SIM A/C, BBN KB/KB, mutasi masuk/keluar, ganti nopol, balik nama. Proses cepat dan aman di Bekasi."
        />
        <meta
          name="keywords"
          content="layanan vinnojaya, perpanjang stnk, pengurusan bpkb, jasa sim, bbn kendaraan, mutasi kendaraan, balik nama kendaraan, ganti nopol"
        />
        <link rel="canonical" href="https://vinnojaya.com/layanan" />

        <meta
          property="og:title"
          content="Layanan Kami - Jasa STNK, BPKB, SIM, BBN, Mutasi | Vinnojaya"
        />
        <meta
          property="og:description"
          content="Layanan lengkap perpanjangan STNK, pengurusan BPKB, SIM, BBN, mutasi kendaraan. Proses cepat dan aman di Bekasi."
        />
        <meta property="og:url" content="https://vinnojaya.com/layanan" />
      </Helmet>

      <BannerLayanan />
      <div className="container my-3 my-md-5 px-3 px-md-4">
        <div
          className="p-3 p-md-4"
          style={{
            background: "linear-gradient(to bottom, #fffbf5, #ffffff)",
            borderRadius: "12px",
            border: "2px solid #BE9539",
            boxShadow: "0 4px 8px rgba(190, 149, 57, 0.15)",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover">
              <thead
                style={{
                  background: "#BE9539",
                  color: "white",
                }}
              >
                <tr>
                  <th style={{ width: "30%", padding: "1rem" }}>KATEGORI</th>
                  <th style={{ padding: "1rem" }}>LAYANAN</th>
                  <th style={{ width: "160px", padding: "1rem" }}>
                    PERSYARATAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataMap || layananData).map((category) => {
                  const services = Object.keys(
                    (dataMap || layananData)[category]
                  );
                  return services.map((service, si) => (
                    <tr key={`${category}-${service}`}>
                      {si === 0 && (
                        <td
                          rowSpan={services.length}
                          className="align-middle fw-bold"
                          style={{
                            background: "#fffbf5",
                            color: "#1b1a1aff",
                            padding: "1rem",
                            fontSize: "1.05rem",
                          }}
                        >
                          {category}
                        </td>
                      )}
                      <td className="align-middle" style={{ padding: "1rem" }}>
                        {service}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <button
                          className="btn btn-sm w-100"
                          onClick={() => openModal(category, service)}
                          style={{
                            borderRadius: "8px",
                            padding: "0.6rem",
                            background: "#BE9539",
                            borderColor: "#BE9539",
                            color: "#fff",
                            fontWeight: "600",
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
                          Lihat Persyaratan
                        </button>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simple modal (no bootstrap JS dependency) */}
        {modalOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: "rgba(0,0,0,0.6)", zIndex: 2000 }}
            onClick={closeModal}
          >
            <div
              className="bg-white rounded p-4"
              style={{
                width: "min(720px, 95%)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                borderRadius: "20px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5
                  className="mb-0 fw-bold"
                  style={{
                    color: "#BE9539",
                    fontSize: "1.4rem",
                  }}
                >
                  Persyaratan — {modalService}
                </h5>
                <button
                  className="btn btn-sm"
                  onClick={closeModal}
                  style={{
                    background: "#f3f4f6",
                    border: "2px solid #BE9539",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    color: "#BE9539",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#BE9539";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#f3f4f6";
                    e.target.style.color = "#BE9539";
                  }}
                >
                  ✕ Tutup
                </button>
              </div>

              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
                Kategori:{" "}
                <strong style={{ color: "#BE9539" }}>{modalCategory}</strong>
              </p>
              <ul style={{ lineHeight: "2", color: "#555" }}>
                {(dataMap || layananData)[modalCategory] &&
                (dataMap || layananData)[modalCategory][modalService] ? (
                  (dataMap || layananData)[modalCategory][modalService].map(
                    (r, i) => <li key={i}>{r}</li>
                  )
                ) : (
                  <li style={{ color: "#9ca3af" }}>
                    - Tidak ada data persyaratan -
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
