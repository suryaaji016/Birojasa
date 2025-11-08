import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

export default function ReviewForm({ refresh }) {
  const [form, setForm] = useState({ name: "", message: "", image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation with SweetAlert
    if (!form.name || form.name.trim() === "") {
      return Swal.fire("Validasi", "Nama harus diisi", "warning");
    }
    if (!form.message || form.message.trim() === "") {
      return Swal.fire("Validasi", "Pesan review harus diisi", "warning");
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("message", form.message);
      if (form.image) formData.append("image", form.image);

      await axios.post("http://localhost:3000/reviews", formData);

      Swal.fire("Berhasil!", "Review berhasil ditambahkan 🎉", "success");
      setForm({ name: "", message: "", image: null });
      refresh();

      // tutup modal setelah submit
      const modalEl = document.getElementById("reviewModal");
      if (modalEl) {
        const bs = Modal.getInstance(modalEl) || new Modal(modalEl);
        bs.hide();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Gagal ❌", "Tidak dapat mengirim review.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-3"
        placeholder="Nama"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        style={{
          borderColor: "#BE9539",
          borderWidth: "2px",
          borderRadius: "8px",
          padding: "10px 15px",
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
        }
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      />
      <textarea
        className="form-control mb-3"
        placeholder="Tulis review..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        rows="4"
        style={{
          borderColor: "#BE9539",
          borderWidth: "2px",
          borderRadius: "8px",
          padding: "10px 15px",
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = "0 0 0 0.2rem rgba(190, 149, 57, 0.25)")
        }
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      ></textarea>
      <input
        type="file"
        accept="image/*"
        className="form-control mb-3"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        style={{
          borderColor: "#BE9539",
          borderWidth: "2px",
          borderRadius: "8px",
          padding: "10px 15px",
        }}
      />
      <button
        className="btn w-100"
        style={{
          background: "#BE9539",
          borderColor: "#BE9539",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "10px",
          padding: "12px 20px",
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
        Kirim Review
      </button>
    </form>
  );
}
