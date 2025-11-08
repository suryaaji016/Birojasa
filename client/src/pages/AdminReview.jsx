import { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";

export default function AdminReview() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const { data } = await axios.get("/reviews");
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin hapus review ini?",
      text: "Tindakan ini tidak bisa dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/reviews/${id}`);
          Swal.fire("✅ Terhapus!", "Review berhasil dihapus", "success");
          fetchReviews();
        } catch (err) {
          console.log("🚀 ~ handleDelete ~ err:", err);
          Swal.fire("❌ Gagal", "Gagal menghapus review", "error");
        }
      }
    });
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Review Publik</h3>
      <div className="row">
        {reviews.length === 0 && (
          <p className="text-center">Belum ada review</p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              {r.imageUrl && (
                <img
                  src={`http://localhost:3000${r.imageUrl}`}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                  alt="review"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "data:image/svg+xml;utf8," +
                      encodeURIComponent(
                        "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='220'><rect fill='%23f8f9fa' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='16'>No Image</text></svg>"
                      );
                  }}
                />
              )}
              <div className="card-body">
                <h5>{r.name}</h5>
                <p>{r.message}</p>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="btn btn-danger btn-sm"
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
