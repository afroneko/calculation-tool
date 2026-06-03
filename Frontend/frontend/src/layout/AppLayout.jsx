import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";
import LoginOverlay from "../pages/login/LoginOverlay";
import { useState } from "react";

export default function AppLayout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="layout">
      <Sidebar onAdminClick={() => setShowLogin(true)} />

      <main className="content">
        <Outlet />
      </main>

      {/* LOGIN OVERLAY BOVEN HELE APP */}
      {showLogin && (
        <LoginOverlay onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
}