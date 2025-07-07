import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Exams from "./Pages/Exams";
import AdminPanel from "./Pages/AdminPanel";
import ExamDetails from "./Pages/ExamDetails";
import AdminAddQuestionPage from "./Pages/AdminAddQuestionPage";
import ResultPage from "./Pages/ResultPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = location.pathname === "/admin";

  const [showUserModal, setShowUserModal] = useState(false);
  const [userName, setUserName] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (location.pathname === "/" && !token) {
      setShowUserModal(true);
    }
  }, [location]);

  const handleUserSubmit = () => {
    const trimmedName = userName.trim();
    if (trimmedName) {
      localStorage.setItem("userToken", trimmedName);
      setShowUserModal(false);
    } else {
      alert("Zəhmət olmasa ad soyadınızı daxil edin.");
    }
  };

  const handlePasswordSubmit = () => {
    if (adminPassword === "55") {
      setShowPasswordModal(false);
      setAdminPassword("");
      navigate("/admin");
    } else {
      alert("İcazəniz yoxdur. Şifrə yanlışdır.");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (!isAdminPage) {
      setShowPasswordModal(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="app-container">
      {showUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ad Soyadınızı Daxil Edin</h3>
            <p>Örnək: rasuljangirli</p>
            <input
              type="text"
              placeholder="Ad Soyad"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleUserSubmit}>Təsdiqlə</button>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Admin Panelə Giriş</h3>
            <p>Zəhmət olmasa şifrəni daxil edin</p>
            <input
              type="password"
              placeholder="Şifrə"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button
              style={{ marginBottom: "10px" }}
              onClick={handlePasswordSubmit}
            >
              Təsdiqlə
            </button>
            <button onClick={() => setShowPasswordModal(false)}>Bağla</button>
          </div>
        </div>
      )}

      <div className="navigate_line">
        <button className="home_btn" onClick={handleHomeClick}>
          Ana Sehive
        </button>
        <button className="admin-panel-btn" onClick={handleAdminClick}>
          {isAdminPage ? "Ana Səhifəyə Qayıt" : "Admin Panelə Keç"}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Exams />} />
        <Route path="/exam/:examId" element={<ExamDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/result" element={<ResultPage />} />

        <Route
          path="/admin/exams/:examId/add-question"
          element={<AdminAddQuestionPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
