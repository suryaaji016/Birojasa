import { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // UI state for inline add forms
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [activeAddServiceCat, setActiveAddServiceCat] = useState(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePers, setNewServicePers] = useState("");

  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/config/services");
      setItems(data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // helper to build nested view by category
  const grouped = items.reduce((acc, it) => {
    const cat = it.category || "(Tidak diberi kategori)";
    acc[cat] = acc[cat] || [];
    acc[cat].push(it);
    return acc;
  }, {});

  const handleSave = async (newItems) => {
    try {
      await axios.put("/config/services", newItems);
      Swal.fire("Sukses", "Konfigurasi layanan diperbarui", "success");
      fetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Gagal", "Tidak bisa menyimpan konfigurasi", "error");
    }
  };

  // Add category (inline form)
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const copy = [
      ...items,
      { category: newCategoryName.trim(), layanan: "", persyaratan: [] },
    ];
    await handleSave(copy);
    setNewCategoryName("");
    setShowAddCategory(false);
  };

  const startAddService = (category) => {
    setActiveAddServiceCat(category);
    setNewServiceName("");
    setNewServicePers("");
  };

  const cancelAddService = () => {
    setActiveAddServiceCat(null);
    setNewServiceName("");
    setNewServicePers("");
  };

  const handleAddService = async (category) => {
    // allow empty layanan (means category-only)
    const persArr = (newServicePers || "")
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    const copy = [
      ...items,
      { category, layanan: newServiceName.trim(), persyaratan: persArr },
    ];
    await handleSave(copy);
    cancelAddService();
  };

  const handleDeleteIndex = async (idx) => {
    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Yakin menghapus item ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });
    if (!result.isConfirmed) return;
    const copy = items.filter((_, i) => i !== idx);
    await handleSave(copy);
  };

  return (
    <div className="container my-4">
      <h4 className="text-center mb-3">Kelola Layanan & Persyaratan</h4>
      <div className="mb-3 text-center">
        <button
          className="btn btn-primary me-2"
          onClick={() => setShowAddCategory((s) => !s)}
        >
          {showAddCategory ? "Batal" : "Tambah Kategori"}
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handleSave(items)}
        >
          Simpan Perubahan
        </button>
      </div>

      {showAddCategory && (
        <div className="card mb-3 p-3">
          <div className="mb-2">
            <label className="form-label">Nama Kategori</label>
            <input
              className="form-control"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nama kategori baru"
            />
          </div>
          <div>
            <button
              className="btn btn-success me-2"
              onClick={handleAddCategory}
            >
              Tambah
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowAddCategory(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Memuat...</p>
      ) : (
        Object.keys(grouped).map((cat) => (
          <div key={cat} className="card mb-3 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>{cat}</strong>
              <div>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => startAddService(cat)}
                >
                  + Tambah Layanan
                </button>
              </div>
            </div>
            <div>
              {grouped[cat].map((it, idx) => (
                <div key={`${cat}-${it.layanan}-${idx}`} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      {it.layanan ? (
                        <div className="fw-bold">{it.layanan}</div>
                      ) : (
                        <div className="fw-bold text-muted">
                          (kategori saja)
                        </div>
                      )}
                      <div className="small text-muted">
                        {(it.persyaratan || []).join(", ")}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteIndex(items.indexOf(it))}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Inline add service form for this category */}
              {activeAddServiceCat === cat ? (
                <div className="mt-2 p-2 border rounded">
                  <div className="mb-2">
                    <input
                      className="form-control mb-1"
                      placeholder="Nama layanan (kosong = kategori saja)"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                    />
                    <input
                      className="form-control"
                      placeholder="Persyaratan (pisah dengan ; )"
                      value={newServicePers}
                      onChange={(e) => setNewServicePers(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleAddService(cat)}
                    >
                      Tambah Layanan
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={cancelAddService}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
