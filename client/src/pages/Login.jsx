import { useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setAuthToken } from "../utils/cookies";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", kodeUnik: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi kode unik
    if (form.kodeUnik !== "@Vinno1Jaya2") {
      Swal.fire("Gagal", "Kode unik tidak valid!", "error");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: form.email,
        password: form.password,
        kodeUnik: form.kodeUnik, // Kirim ke backend untuk validasi
      });
      setAuthToken(data.access_token);
      Swal.fire("Selamat datang!", "Login berhasil", "success");
      navigate("/admin");
    } catch (err) {
      Swal.fire("Gagal", err.response?.data?.message || "Error", "error");
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Login Admin</h3>
      <form onSubmit={handleSubmit} className="col-md-5 mx-auto">
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Kode Unik"
          className="form-control mb-3"
          value={form.kodeUnik}
          onChange={(e) => setForm({ ...form, kodeUnik: e.target.value })}
          required
        />
        <button className="btn btn-success w-100">Login</button>
      </form>
      <div className="text-center mt-3">
        <Link to="/register">Belum punya akun? Register di sini</Link>
      </div>
    </div>
  );
}
