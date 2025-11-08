import { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import axios from "../api/axios";

export default function Partners() {
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    try {
      const { data } = await axios.get("/partners");
      setPartners(data);
    } catch {
      setPartners([]);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const openModalFor = (partner) => {
    // render modal content dynamically
    const modalBody = document.getElementById("partnersModalBody");
    if (!modalBody) return;

    // clear previous content
    modalBody.innerHTML = "";

    // logo container (top, centered)
    const logoWrap = document.createElement("div");
    logoWrap.className = "text-center mb-3";

    if (partner.logoUrl) {
      const img = document.createElement("img");
      const base = axios.defaults.baseURL || "";
      img.src = `${base}${partner.logoUrl}`;
      img.alt = partner.name || "logo";
      img.style.maxHeight = "150px";
      img.className = "d-block img-fluid";
      img.onerror = function () {
        this.onerror = null;
        // simple inline placeholder if the image fails
        this.src =
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='100'><rect fill='%23f8f9fa' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'>No Image</text></svg>"
          );
      };
      logoWrap.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "border p-3 d-inline-block";
      placeholder.style.minWidth = "160px";
      placeholder.textContent = partner.name || "(no logo)";
      logoWrap.appendChild(placeholder);
    }

    modalBody.appendChild(logoWrap);

    // main title as plain text (no leading number), centered
    const mainTitle = document.createElement("div");
    mainTitle.innerHTML = `<strong>${partner.name}</strong>`;
    mainTitle.className = "mb-3 text-center";
    mainTitle.style.fontSize = "1.05rem";
    modalBody.appendChild(mainTitle);

    // branches: plain text lines (not an ul) - allow many and make container scrollable
    const branchesWrap = document.createElement("div");
    branchesWrap.className = "branches-text small";
    // center the block and keep text left-aligned for readability
    branchesWrap.style.maxWidth = "720px";
    branchesWrap.style.margin = "0 auto";
    branchesWrap.style.textAlign = "left";
    branchesWrap.style.lineHeight = "1.7";
    branchesWrap.style.padding = "4px 8px";

    if (partner.branches && partner.branches.length) {
      partner.branches.forEach((b) => {
        const line = document.createElement("div");
        line.textContent = b.name; // one per line, tidy downward
        line.className = "mb-2";
        branchesWrap.appendChild(line);
      });
    } else {
      const empty = document.createElement("div");
      empty.className = "text-muted small";
      empty.textContent = "(Tidak ada cabang)";
      branchesWrap.appendChild(empty);
    }

    modalBody.appendChild(branchesWrap);

    const modalEl = document.getElementById("partnersModal");
    if (!modalEl) return;
    const modal = new Modal(modalEl);
    modal.show();
  };

  return (
    <section
      className="partners-section py-5"
      style={{ background: "linear-gradient(to bottom, #fffbf5, #ffffff)" }}
    >
      <div className="container text-center">
        <h4
          className="mb-4"
          style={{ color: "#201f1dff", fontWeight: "bold", fontSize: "2rem" }}
        >
          Mitra Kami
        </h4>
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#BE9539",
            margin: "0 auto 2rem auto",
            borderRadius: "2px",
          }}
        />
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-4 partners-bar">
          {partners.map((p) => {
            const placeholder =
              "data:image/svg+xml;utf8," +
              encodeURIComponent(
                "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><rect fill='%23f8f9fa' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='16'>No Image</text></svg>"
              );
            return (
              <div
                key={p.id}
                className="partner-logo"
                onClick={() => openModalFor(p)}
                style={{ cursor: "pointer" }}
              >
                {p.logoUrl ? (
                  <img
                    src={`${axios.defaults.baseURL || ""}${p.logoUrl}`}
                    alt={p.name}
                    style={{ height: 150, objectFit: "contain" }}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholder;
                    }}
                  />
                ) : (
                  <div className="border p-2" style={{ width: 140 }}>
                    {p.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="partnersModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content rounded-4"
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            {/* close button inside body (top-right) and logo + list in body */}
            <div
              className="modal-body position-relative"
              id="partnersModalBody"
              style={{
                maxHeight: "65vh",
                overflowY: "auto",
                background: "linear-gradient(to bottom, #fffbf5, #ffffff)",
              }}
            >
              <button
                type="button"
                className="btn-close position-absolute"
                style={{
                  top: "15px",
                  right: "15px",
                  background: "#BE9539",
                  opacity: 1,
                  borderRadius: "50%",
                  padding: "10px",
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
