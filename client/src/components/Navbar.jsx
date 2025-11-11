import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { getAuthToken, removeAuthToken } from "../utils/cookies";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = getAuthToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar?",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAuthToken();
        Swal.fire("Logout", "Anda telah keluar", "success");
        navigate("/"); // kembali ke home
      }
    });
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(to right, #ffffff, #fffbf5)",
        borderBottom: "3px solid #BE9539",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
          style={{
            color: "#BE9539",
            fontSize: "1.3rem",
          }}
        >
          <img
            src="/vinnobg.png"
            alt="Vinno Jaya Logo"
            width="120"
            height="35"
            className="d-inline-block align-top me-2"
          />
        </Link>

        {/* Burger Button for Mobile - controlled by React state */}
        <button
          className={`navbar-toggler ${isOpen ? "open" : ""}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((s) => !s)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{
                  color: "#1a1918",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#BE9539";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#1a1918";
                  e.target.style.transform = "translateY(0)";
                }}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/layanan"
                style={{
                  color: "#1a1918",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#BE9539";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#1a1918";
                  e.target.style.transform = "translateY(0)";
                }}
                onClick={() => setIsOpen(false)}
              >
                Layanan
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/tentang-kami"
                style={{
                  color: "#1a1918",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#BE9539";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#1a1918";
                  e.target.style.transform = "translateY(0)";
                }}
                onClick={() => setIsOpen(false)}
              >
                Tentang Kami
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/hubungi-kami"
                style={{
                  color: "#1a1918",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#BE9539";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#1a1918";
                  e.target.style.transform = "translateY(0)";
                }}
                onClick={() => setIsOpen(false)}
              >
                Hubungi Kami
              </Link>
            </li>
          </ul>
        </div>

        {token && (
          <div className="ms-auto d-flex gap-2">
            <Link
              to="/admin"
              className="btn"
              style={{
                background: "#BE9539",
                borderColor: "#BE9539",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "8px",
                padding: "8px 20px",
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
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="btn"
              style={{
                background: "#fff",
                borderColor: "#BE9539",
                color: "#BE9539",
                fontWeight: "600",
                borderRadius: "8px",
                padding: "8px 20px",
                borderWidth: "2px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#BE9539";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#fff";
                e.target.style.color = "#BE9539";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
