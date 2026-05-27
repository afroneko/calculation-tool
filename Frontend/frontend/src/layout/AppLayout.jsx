import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

export default function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}