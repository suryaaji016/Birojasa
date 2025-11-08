import { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";

export default function AdminBanner() {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);

  const fetchBanners = async () => {
    const { data } = await axios.get("/banners");
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      await axios.post("/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("✅ Sukses", "Banner berhasil diupload!", "success");
      fetchBanners();
      setImage(null);
    } catch {
      Swal.fire("❌ Gagal", "Upload gagal", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus banner ini?")) return;
    await axios.delete(`/banners/${id}`);
    fetchBanners();
  };

  return (
    <div className="container my-4">
      <h4 className="text-center mb-4">Kelola Banner</h4>

      <form onSubmit={handleUpload} className="text-center mb-5">
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="btn btn-primary">Upload Banner</button>
      </form>

      <div className="row">
        {banners.map((b) => (
          <div key={b.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`http://localhost:3000${b.imageUrl}`}
                className="card-img-top"
                alt="Banner"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;utf8," +
                    encodeURIComponent(
                      "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300'><rect fill='%23f8f9fa' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='18'>No Banner</text></svg>"
                    );
                }}
              />
              <div className="card-body text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(b.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
