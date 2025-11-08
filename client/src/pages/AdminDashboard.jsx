import AdminBanner from "./AdminBanner";
import AdminReview from "./AdminReview";
import AdminPartners from "./AdminPartners";
import AdminServices from "./AdminServices";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("banner");

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard Admin</h2>

      <div className="text-center mb-4">
        <button
          className={`btn me-2 ${
            activeTab === "banner" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("banner")}
        >
          Banner
        </button>
        <button
          className={`btn ${
            activeTab === "review" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>
        <button
          className={`btn ms-2 ${
            activeTab === "partners" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("partners")}
        >
          Mitra
        </button>
        <button
          className={`btn ms-2 ${
            activeTab === "services" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Layanan
        </button>
      </div>

      {activeTab === "banner" && <AdminBanner />}
      {activeTab === "review" && <AdminReview />}
      {activeTab === "partners" && <AdminPartners />}
      {activeTab === "services" && <AdminServices />}
    </div>
  );
}
