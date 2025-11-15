import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Swal from "sweetalert2";

export default function ServiceForm() {
  const defaultForm = {
    nama: "",
    noTelp: "",
    category: "",
    service: "",
    daerah: "",
    asal: "",
    tujuan: "",
    noPolisi: "",
    jenisKendaraan: "",
    cabang: "",
    // tambahan untuk PERPANJANG STNK: apakah form tambahan KTP asli sesuai STNK tersedia
    tambahanKTP: "",
    // tambahan untuk BALIK NAMA KENDARAAN (pemilik baru)
    namaBaru: "",
    noTelpBaru: "",
  };

  const [form, setForm] = useState(defaultForm);

  // mapping kategori -> layanan (services)
  const servicesByCategory = {
    // fallback — will be replaced by server config if available
    "PERPANJANG STNK": ["STNK TAHUNAN", "STNK LIMA TAHUNAN", "GANTI NOPOL"],
    "BALIK NAMA KENDARAAN": [
      "SAMA WILAYAH",
      "MUTASI ANTAR SAMSAT",
      "MUTASI LUAR DAERAH",
    ],
    "PINDAH ALAMAT": [
      "SAMA WILAYAH",
      "MUTASI ANTAR WILAYAH",
      "MUTASI LUAR DAERAH",
    ],
    "CABUT BERKAS": ["CABUT BERKAS"],
    "SIM A": ["BARU", "PERPANJANG STNK"],
    "SIM C": ["BARU", "PERPANJANG STNK"],
    "STNK HILANG": ["STNK HILANG"],
    "REVISI STNK": ["REVISI STNK"],
    "BPKB DUPLIKAT (BPKB HILANG)": ["BPKB DUPLIKAT (BPKB HILANG)"],
    "REVISI BPKB": ["REVISI BPKB"],
  };

  const [fetchedConfig, setFetchedConfig] = useState(null);

  // helpers for case-insensitive matching and tolerant lookups
  const normalize = (s) => (s || "").toString().toLowerCase().trim();
  const findKeyInsensitive = (map, key) => {
    if (!map) return undefined;
    if (Object.prototype.hasOwnProperty.call(map, key)) return key;
    const lk = normalize(key);
    return Object.keys(map).find((k) => normalize(k) === lk);
  };
  const isCategory = (cat, expected) => normalize(cat) === normalize(expected);

  // build dynamic maps from fetchedConfig when available
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "https://server.vinnojaya.co.id/config/services"
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          // transform to maps
          const byCat = {};
          data.forEach((it) => {
            const cat = (it.category || "").trim();
            const svc = (it.layanan || "").trim();
            if (!cat || !svc) return; // skip empty values
            byCat[cat] = byCat[cat] || [];
            if (!byCat[cat].includes(svc)) byCat[cat].push(svc);
          });
          setFetchedConfig({ byCategory: byCat });
        }
      } catch {
        // ignore, keep fallback
      }
    };
    load();
  }, []);

  // helper to read from fetchedConfig first, else fallback maps
  const getServicesForCategory = (cat) => {
    if (fetchedConfig && fetchedConfig.byCategory) {
      const key = findKeyInsensitive(fetchedConfig.byCategory, cat);
      if (key) return fetchedConfig.byCategory[key];
    }
    // fallback: try case-insensitive lookup in local fallback map
    const fk = findKeyInsensitive(servicesByCategory, cat);
    return fk ? servicesByCategory[fk] : [];
  };

  // allowed categories to show in the public form (case-insensitive)
  const allowedCategories = [
    "PERPANJANG STNK",
    "BALIK NAMA KENDARAAN",
    "PINDAH ALAMAT",
    "CABUT BERKAS",
    "STNK HILANG",
  ];

  const getAvailableCategories = () => {
    // Ensure the allowed categories always appear in the public form.
    // If the server provided the same category with different casing, prefer that label.
    const fetchedCats =
      fetchedConfig && fetchedConfig.byCategory
        ? Object.keys(fetchedConfig.byCategory)
        : [];
    const out = [];
    allowedCategories.forEach((allowed) => {
      // try to find a fetched category that matches this allowed one (case-insensitive)
      const match = fetchedCats.find(
        (c) => normalize(c) === normalize(allowed)
      );
      if (match) out.push(match);
      else out.push(allowed);
    });
    return out;
  };

  // when category changes, auto set service if there's only one option
  useEffect(() => {
    if (!form.category) {
      setForm((f) => ({ ...f, service: "" }));
      return;
    }
    const services = getServicesForCategory(form.category) || [];
    if (services.length === 1) {
      setForm((f) => ({ ...f, service: services[0] }));
    } else {
      setForm((f) => ({ ...f, service: "" }));
    }
    // clear dependent fields
    setForm((f) => ({
      ...f,
      daerah: "",
      asal: "",
      tujuan: "",
      namaBaru: "",
      noTelpBaru: "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.category]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.nama || form.nama.trim() === "") return "Nama harus diisi";
    if (!form.noTelp || form.noTelp.trim() === "")
      return "No. Telepon harus diisi";
    if (!form.category) return "Pilih kategori layanan";
    if (!form.service) return "Pilih layanan";

    // require daerah for PERPANJANG STNK or STNK HILANG
    if (
      isCategory(form.category, "PERPANJANG STNK") ||
      isCategory(form.category, "STNK HILANG")
    ) {
      if (!form.daerah || form.daerah.trim() === "")
        return "Daerah STNK harus diisi";
    }

    // BALIK NAMA KENDARAAN, PINDAH ALAMAT, CABUT BERKAS validations: asal/tujuan required
    if (
      isCategory(form.category, "BALIK NAMA KENDARAAN") ||
      isCategory(form.category, "PINDAH ALAMAT") ||
      isCategory(form.category, "CABUT BERKAS")
    ) {
      if (!form.asal || form.asal.trim() === "") return "Asal STNK harus diisi";
      if (!form.tujuan || form.tujuan.trim() === "")
        return "Tujuan STNK harus diisi";
    }

    if (!form.noPolisi || form.noPolisi.trim() === "")
      return "No. Polisi harus diisi";
    if (!form.jenisKendaraan || form.jenisKendaraan.trim() === "")
      return "Pilih jenis kendaraan";
    if (!form.cabang || form.cabang.trim() === "") return "Pilih cabang";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return Swal.fire("Validasi", err, "warning");

    // build payload (only include relevant fields)
    const payload = {
      nama: form.nama,
      noTelp: form.noTelp,
      category: form.category,
      service: form.service,
      noPolisi: form.noPolisi,
      jenisKendaraan: form.jenisKendaraan,
      cabang: form.cabang,
    };

    // include daerah for PERPANJANG STNK or STNK HILANG
    if (
      isCategory(form.category, "PERPANJANG STNK") ||
      isCategory(form.category, "STNK HILANG")
    ) {
      payload.daerah = form.daerah;
    }

    // include tambahanKTP info if user interacted with it
    if (form.tambahanKTP) payload.tambahanKTP = form.tambahanKTP;

    // include asal/tujuan for BALIK NAMA, PINDAH ALAMAT, CABUT BERKAS
    if (
      isCategory(form.category, "BALIK NAMA KENDARAAN") ||
      isCategory(form.category, "PINDAH ALAMAT") ||
      isCategory(form.category, "CABUT BERKAS")
    ) {
      payload.asal = form.asal;
      payload.tujuan = form.tujuan;
    }
    // requirements checklist removed from form - nothing to include

    try {
      const response = await axiosInstance.post("/service", payload, {
        timeout: 25000, // 25 second timeout
      });

      // Check if there's a warning (email delayed)
      if (response.data.warning) {
        Swal.fire(
          "Terkirim ✅",
          "Form berhasil diterima. Kami akan menghubungi Anda segera.",
          "success"
        );
      } else {
        Swal.fire(
          "Terkirim ✅",
          response.data.message || "Form berhasil dikirim ke admin.",
          "success"
        );
      }
      setForm(defaultForm);
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);

      let errorMsg = "Tidak dapat mengirim formulir. ";
      if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
        errorMsg +=
          "Koneksi timeout. Silakan coba lagi atau hubungi via WhatsApp.";
      } else if (err.response) {
        errorMsg += err.response.data?.message || "Server error.";
      } else if (err.request) {
        errorMsg +=
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      } else {
        errorMsg += err.message;
      }

      Swal.fire("Gagal ❌", errorMsg, "error");
    }
  };

  return (
    <div
      className="card p-4 shadow-lg"
      style={{
        borderRadius: "15px",
        border: "2px solid #BE9539",
        background: "linear-gradient(to bottom, #ffffff, #fffbf5)",
      }}
    >
      <h4
        className="text-center mb-4"
        style={{
          color: "#11100fff",
          fontWeight: "bold",
          fontSize: "1.5rem",

          paddingBottom: "10px",
        }}
      >
        KONSULTASI DISINI
      </h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          className="form-control mb-3"
          style={{
            borderColor: "#BE9539",
            borderWidth: "2px",
            borderRadius: "8px",
            padding: "10px 15px",
            transition: "all 0.3s ease",
          }}
          value={form.nama}
          onChange={handleChange}
          required
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
        <input
          type="text"
          name="noTelp"
          placeholder="No. Telepon"
          className="form-control mb-3"
          style={{
            borderColor: "#BE9539",
            borderWidth: "2px",
            borderRadius: "8px",
            padding: "10px 15px",
            transition: "all 0.3s ease",
          }}
          value={form.noTelp}
          onChange={handleChange}
          required
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />

        <select
          name="category"
          className="form-select mb-3"
          style={{
            borderColor: "#BE9539",
            borderWidth: "2px",
            borderRadius: "8px",
            padding: "10px 15px",
            color: "#333",
            transition: "all 0.3s ease",
          }}
          value={form.category}
          onChange={handleChange}
          required
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        >
          <option value="">-- Pilih Layanan --</option>
          {/* If server config available, list all categories from it; otherwise fallback to the four allowed */}
          {getAvailableCategories().map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        {/* Service selector: only show if category has >1 service */}
        {form.category && getServicesForCategory(form.category).length > 1 && (
          <select
            name="service"
            className="form-select mb-3"
            style={{
              borderColor: "#BE9539",
              borderWidth: "2px",
              borderRadius: "8px",
              padding: "10px 15px",
              color: "#333",
              transition: "all 0.3s ease",
            }}
            value={form.service}
            onChange={handleChange}
            required
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          >
            <option value="">-- Pilih Layanan Spesifik --</option>
            {getServicesForCategory(form.category).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {/* PERPANJANG STNK & STNK HILANG fields */}
        {(isCategory(form.category, "PERPANJANG STNK") ||
          isCategory(form.category, "STNK HILANG")) && (
          <>
            <select
              name="daerah"
              className="form-select mb-3"
              style={{
                borderColor: "#BE9539",
                borderWidth: "2px",
                borderRadius: "8px",
                padding: "10px 15px",
                color: "#333",
                transition: "all 0.3s ease",
              }}
              value={form.daerah}
              onChange={handleChange}
              required
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">-- Pilih Daerah STNK --</option>
              {[
                "JAKARTA TIMUR",
                "JAKARTA SELATAN",
                "JAKARTA BARAT",
                "JAKARTA UTARA",
                "JAKARTA PUSAT",
                "BEKASI KOTA",
                "BEKASI KABUPATEN",
                "DEPOK KOTA",
                "DEPOK KABUPATEN",
                "TANGGERANG KOTA",
                "TANGGERANG KABUPATEN",
                "BOGOR",
                "PURWAKARTA",
                "KARAWANG",
                "SUBANG",
                "SERANG",
                "BANDUNG",
                "MAGELANG",
                "PEKALONGAN",
                "SALATIGA",
                "SEMARANG",
                "SURAKARTA",
                "TEGAL",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* PERPANJANG STNK tambahan: show doc list and a simple Ada/Tidak radio */}
            <div
              className="card mb-3 p-3"
              style={{
                border: "2px solid #BE9539",
                borderRadius: "10px",
                backgroundColor: "#fffbf5",
              }}
            >
              <div
                style={{
                  marginBottom: "15px",
                  fontWeight: "600",
                  color: "#BE9539",
                }}
              >
                KTP ASLI SESUAI STNK
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tambahanKTP"
                  id="tambahanAda"
                  value="ada"
                  checked={form.tambahanKTP === "ada"}
                  onChange={handleChange}
                  style={{
                    borderColor: "#BE9539",
                    borderWidth: "2px",
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="tambahanAda"
                  style={{ color: "#333", fontWeight: "500" }}
                >
                  Ada
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tambahanKTP"
                  id="tambahanTidak"
                  value="tidak"
                  checked={form.tambahanKTP === "tidak"}
                  onChange={handleChange}
                  style={{
                    borderColor: "#BE9539",
                    borderWidth: "2px",
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="tambahanTidak"
                  style={{ color: "#333", fontWeight: "500" }}
                >
                  Tidak
                </label>
              </div>
            </div>
          </>
        )}

        {/* BALIK NAMA KENDARAAN, PINDAH ALAMAT, CABUT BERKAS: show asal/tujuan form */}
        {(isCategory(form.category, "BALIK NAMA KENDARAAN") ||
          isCategory(form.category, "PINDAH ALAMAT") ||
          isCategory(form.category, "CABUT BERKAS")) && (
          <>
            <select
              name="asal"
              className="form-select mb-3"
              style={{
                borderColor: "#BE9539",
                borderWidth: "2px",
                borderRadius: "8px",
                padding: "10px 15px",
                color: "#333",
                transition: "all 0.3s ease",
              }}
              value={form.asal}
              onChange={handleChange}
              required
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">-- Wilayah Asal STNK --</option>
              {[
                "JAKARTA TIMUR",
                "JAKARTA SELATAN",
                "JAKARTA BARAT",
                "JAKARTA UTARA",
                "JAKARTA PUSAT",
                "BEKASI KOTA",
                "BEKASI KABUPATEN",
                "DEPOK KOTA",
                "DEPOK KABUPATEN",
                "TANGGERANG KOTA",
                "TANGGERANG KABUPATEN",
                "BOGOR",
                "PURWAKARTA",
                "KARAWANG",
                "SUBANG",
                "SERANG",
                "BANDUNG",
                "MAGELANG",
                "PEKALONGAN",
                "SALATIGA",
                "SEMARANG",
                "SURAKARTA",
                "TEGAL",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              name="tujuan"
              className="form-select mb-3"
              style={{
                borderColor: "#BE9539",
                borderWidth: "2px",
                borderRadius: "8px",
                padding: "10px 15px",
                color: "#333",
                transition: "all 0.3s ease",
              }}
              value={form.tujuan}
              onChange={handleChange}
              required
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">-- Wilayah Tujuan STNK --</option>
              {[
                "JAKARTA TIMUR",
                "JAKARTA SELATAN",
                "JAKARTA BARAT",
                "JAKARTA UTARA",
                "JAKARTA PUSAT",
                "BEKASI KOTA",
                "BEKASI KABUPATEN",
                "DEPOK KOTA",
                "DEPOK KABUPATEN",
                "TANGGERANG KOTA",
                "TANGGERANG KABUPATEN",
                "BOGOR",
                "PURWAKARTA",
                "KARAWANG",
                "SUBANG",
                "SERANG",
                "BANDUNG",
                "MAGELANG",
                "PEKALONGAN",
                "SALATIGA",
                "SEMARANG",
                "SURAKARTA",
                "TEGAL",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Data pemilik baru removed per request - only asal/tujuan kept */}
          </>
        )}

        <input
          type="text"
          name="noPolisi"
          placeholder="No. Polisi"
          className="form-control mb-3"
          style={{
            borderColor: "#BE9539",
            borderWidth: "2px",
            borderRadius: "8px",
            padding: "10px 15px",
            transition: "all 0.3s ease",
          }}
          value={form.noPolisi}
          onChange={handleChange}
          required
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />

        {/* Jenis Kendaraan */}
        <div
          className="card mb-3 p-3"
          style={{
            border: "2px solid #BE9539",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              marginBottom: "15px",
              fontWeight: "700",
              color: "#BE9539",
              fontSize: "0.95rem",
              letterSpacing: "0.5px",
            }}
          >
            JENIS KENDARAAN
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="jenisKendaraan"
              id="jenisMotor"
              value="MOTOR"
              checked={form.jenisKendaraan === "MOTOR"}
              onChange={handleChange}
              required
              style={{
                borderColor: "#BE9539",
                borderWidth: "2px",
              }}
            />
            <label
              className="form-check-label"
              htmlFor="jenisMotor"
              style={{ color: "#333", fontWeight: "500", fontSize: "0.95rem" }}
            >
              MOTOR
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="jenisKendaraan"
              id="jenisMobil"
              value="MOBIL"
              checked={form.jenisKendaraan === "MOBIL"}
              onChange={handleChange}
              required
              style={{
                borderColor: "#BE9539",
                borderWidth: "2px",
              }}
            />
            <label
              className="form-check-label"
              htmlFor="jenisMobil"
              style={{ color: "#333", fontWeight: "500", fontSize: "0.95rem" }}
            >
              MOBIL
            </label>
          </div>
        </div>

        {/* Checklist persyaratan (jika tersedia untuk service terpilih) */}
        {/* Checklist persyaratan removed */}

        <select
          name="cabang"
          className="form-select mb-4"
          style={{
            borderColor: "#BE9539",
            borderWidth: "2px",
            borderRadius: "8px",
            padding: "10px 15px",
            color: "#333",
            transition: "all 0.3s ease",
          }}
          value={form.cabang}
          onChange={handleChange}
          required
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        >
          <option value="">-- Pilih Cabang --</option>
          <option value="VINNOJAYA PEKAYON">VINNOJAYA PEKAYON</option>
          <option value="VINNOJAYA TAMAN GALAXY">VINNOJAYA TAMAN GALAXY</option>
        </select>

        <button
          className="btn w-100"
          style={{
            backgroundColor: "#BE9539",
            borderColor: "#BE9539",
            color: "#fff",
            padding: "12px 20px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(190, 149, 57, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#A67F2E";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(190, 149, 57, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#BE9539";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(190, 149, 57, 0.3)";
          }}
        >
          Kirim Formulir
        </button>
      </form>
    </div>
  );
}
