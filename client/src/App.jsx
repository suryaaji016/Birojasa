import { BrowserRouter } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Layanan from "./pages/Layanan";
import TentangKami from "./pages/TentangKami";
import HubungiKami from "./pages/HubungiKami";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  // pages where footer should be hidden (exact matches) or prefixes
  const noFooterPaths = ["/login", "/register"];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/hubungi-kami" element={<HubungiKami />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* render footer except on specific routes or admin prefix */}
      {!noFooterPaths.includes(location.pathname) &&
        !location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppContent />
    </BrowserRouter>
  );
}
