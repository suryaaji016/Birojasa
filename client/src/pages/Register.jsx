import { useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", form);
      Swal.fire("Berhasil", "Akun berhasil dibuat!", "success");
      setForm({ email: "", password: "" });
    } catch (err) {
      Swal.fire("Gagal", err.response?.data?.message || "Error", "error");
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Register Admin</h3>
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
        <button className="btn btn-primary w-100">Register</button>
      </form>
      <div className="text-center mt-3">
        <Link to="/login">Kembali ke Login</Link>
      </div>
    </div>
  );
}
