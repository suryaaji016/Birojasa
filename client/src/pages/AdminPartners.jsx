import { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { getAuthToken } from "../utils/cookies";

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [logo, setLogo] = useState(null);
  const [branchesText, setBranchesText] = useState("");
  const [editingPartner, setEditingPartner] = useState(null);
  const [editName, setEditName] = useState("");
  const [editParentId, setEditParentId] = useState("");
  const [editLogo, setEditLogo] = useState(null);
  const [editBranchesText, setEditBranchesText] = useState("");

  const fetchPartners = async () => {
    const { data } = await axios.get("/partners");
    setPartners(data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!parentId && branchesText && branchesText.trim()) {
        const formData = new FormData();
        formData.append("name", name);
        if (logo) formData.append("logo", logo);
        const { data: main } = await axios.post("/partners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const lines = branchesText
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l.length);

        await Promise.all(
          lines.map((line) =>
            axios.post("/partners", { name: line, parentId: main.id })
          )
        );

        Swal.fire(
          "✅ Sukses",
          "Perusahaan dan cabang berhasil ditambahkan",
          "success"
        );
        setName("");
        setParentId("");
        setLogo(null);
        setBranchesText("");
        fetchPartners();
      } else {
        const formData = new FormData();
        formData.append("name", name);
        if (parentId) formData.append("parentId", parentId);
        if (logo) formData.append("logo", logo);
        await axios.post("/partners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("✅ Sukses", "Mitra berhasil ditambahkan", "success");
        setName("");
        setParentId("");
        setLogo(null);
        setBranchesText("");
        fetchPartners();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Gagal", "Gagal menambahkan mitra", "error");
    }
  };

  const handleDelete = async (partner) => {
    // if partner has branches, warn the user that deleting will also remove branches
    const hasBranches = partner?.branches && partner.branches.length > 0;
    const confirmMsg = hasBranches
      ? `Mitra ini memiliki ${partner.branches.length} cabang. Menghapus akan menghapus juga cabang-cabang tersebut. Lanjutkan?`
      : "Yakin ingin menghapus mitra ini?";

    const result = await Swal.fire({
      title: "Konfirmasi",
      text: confirmMsg,
      icon: hasBranches ? "warning" : "question",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });
    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/partners/${partner.id}`);
      fetchPartners();
    } catch (err) {
      console.error("Delete partner failed:", err);
      Swal.fire("❌ Gagal", "Gagal menghapus mitra", "error");
    }
  };

  const openEdit = (p) => {
    setEditingPartner(p);
    setEditName(p.name || "");
    setEditParentId(p.parentId || "");
    setEditLogo(null);
    // populate branches text area (one per line) if partner has branches
    const lines =
      p.branches && p.branches.length ? p.branches.map((b) => b.name) : [];
    setEditBranchesText(lines.join("\n"));
    const modalEl = document.getElementById("editPartnerModal");
    if (!modalEl) return;
    const modal = new Modal(modalEl);
    modal.show();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingPartner) return;
    // quick auth check
    const token = getAuthToken();
    if (!token) {
      Swal.fire(
        "❌ Autentikasi",
        "Token tidak ditemukan. Silakan login ulang.",
        "error"
      );
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("parentId", editParentId || "");
      if (editLogo) formData.append("logo", editLogo);
      console.log("Updating partner", editingPartner?.id, {
        name: editName,
        parentId: editParentId,
        hasLogo: !!editLogo,
      });

      await axios.put(`/partners/${editingPartner.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // If editing a main company (no parent) and branches text provided,
      // create any branch names that don't already exist.
      if (!editParentId && editBranchesText && editBranchesText.trim()) {
        const newLines = editBranchesText
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l.length);

        // existing branch names from the original editingPartner (if present)
        const existing = (editingPartner.branches || []).map((b) =>
          b.name.toLowerCase()
        );

        const toCreate = newLines.filter(
          (ln) => !existing.includes(ln.toLowerCase())
        );
        if (toCreate.length) {
          await Promise.all(
            toCreate.map((name) =>
              axios.post("/partners", { name, parentId: editingPartner.id })
            )
          );
        }
      }
      Swal.fire("✅ Sukses", "Mitra berhasil diperbarui", "success");
      fetchPartners();
      setEditingPartner(null);
      const modalEl = document.getElementById("editPartnerModal");
      if (modalEl) {
        const bs = Modal.getInstance(modalEl);
        if (bs) bs.hide();
      }
    } catch (err) {
      console.error("Update partner failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal memperbarui mitra";
      if (err?.response?.status === 401) {
        Swal.fire(
          "❌ Autentikasi",
          "Sesi Anda mungkin telah habis. Silakan login ulang.",
          "error"
        );
      } else {
        Swal.fire("❌ Gagal", msg, "error");
      }
    }
  };

  return (
    <div className="container my-4">
      <h4 className="text-center mb-4">Kelola Mitra</h4>

      <form onSubmit={handleCreate} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nama Perusahaan / Unit</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Cabang dari (kosongkan jika perusahaan inti)
          </label>
          <select
            className="form-select"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="">-- Pilih perusahaan inti (opsional) --</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Logo (opsional)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Cabang (opsional — jika menambah perusahaan inti, masukkan 1 cabang
            per baris)
          </label>
          <textarea
            className="form-control"
            rows={4}
            placeholder={"Contoh:\nCABANG A\nCABANG B\nCABANG C"}
            value={branchesText}
            onChange={(e) => setBranchesText(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Tambah Mitra</button>
      </form>

      <div className="row">
        {partners.map((p) => (
          <div key={p.id} className="col-md-6 mb-3">
            <div className="card p-3">
              <div className="d-flex align-items-center">
                <div style={{ flex: 0 }} className="me-3 text-center">
                  {p.logoUrl ? (
                    <img
                      src={`${axios.defaults.baseURL || ""}${p.logoUrl}`}
                      alt={p.name}
                      style={{ height: 60, objectFit: "contain" }}
                    />
                  ) : (
                    <div style={{ minWidth: 120 }}>{p.name}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="fw-bold">{p.name}</div>
                  {/* branches as tidy vertical text */}
                  <div className="text-muted small mt-2">
                    {p.branches && p.branches.length ? (
                      p.branches.map((b) => (
                        <div key={b.id} className="mb-1">
                          {b.name}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted">(Tidak ada cabang)</div>
                    )}
                  </div>
                </div>
                <div
                  style={{ flex: 0, minWidth: 90 }}
                  className="ms-3 d-flex flex-column align-items-end justify-content-center"
                >
                  <div className="d-flex flex-column gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p)}
                      type="button"
                    >
                      Hapus
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openEdit(p)}
                      type="button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Edit Partner */}
      <div
        className="modal fade"
        id="editPartnerModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Mitra</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Cabang dari (kosongkan jika perusahaan inti)
                  </label>
                  <select
                    className="form-select"
                    value={editParentId}
                    onChange={(e) => setEditParentId(e.target.value)}
                  >
                    <option value="">
                      -- Pilih perusahaan inti (opsional) --
                    </option>
                    {partners.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Logo (opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => setEditLogo(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cabang (satu per baris)</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder={
                      "Masukkan satu cabang per baris. Jika kosong, tidak akan menambah cabang baru."
                    }
                    value={editBranchesText}
                    onChange={(e) => setEditBranchesText(e.target.value)}
                    disabled={!!editParentId}
                  />
                  {editParentId ? (
                    <div className="form-text">
                      Ini adalah unit cabang, bukan perusahaan inti —
                      pengelolaan cabang dilakukan dari daftar utama.
                    </div>
                  ) : (
                    <div className="form-text">
                      Menambahkan baris baru akan membuat cabang baru. Cabang
                      yang sudah ada tidak akan dihapus secara otomatis.
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Batal
                </button>
                <button className="btn btn-primary">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
