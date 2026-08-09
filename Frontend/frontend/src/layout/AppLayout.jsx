import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";
import LoginOverlay from "../pages/login/LoginOverlay";
import { useState } from "react";

// ----> MAIN LAYOUT: SIDEBAR + MAIN CONTENT <----

export default function AppLayout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="layout">
      <Sidebar onAdminClick={() => setShowLogin(true)} />

      <main className="content">
        <Outlet />
      </main>

      {/* LOGIN OVERLAY OVER ENTIRE APP */}
      {showLogin && (
        <LoginOverlay onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
}