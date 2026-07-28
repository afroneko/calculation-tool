import { NavLink, useNavigate } from "react-router-dom"; 
import { Icon } from "@iconify/react";
import "./Sidebar.css";
import useAuthStore from "../../store/authStore";

export default function Sidebar({ onAdminClick }) {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <nav className="sidebar">
      <div className="imageAndTitle">
        {/* <img src={logo} alt="Flora Vitals logo" className="logo" /> */}
        <h2 className="title">Tummers</h2>
                
      </div>
      <p className="subtitle">calculations</p>

      <ul>
        <li>
          <NavLink to="/" className="nav-link">
            <Icon icon="clarity:home-line" className="sidebar-icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/overview" className="nav-link">
            <Icon icon="ph:calculator" className="sidebar-icon" />
            Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/overview" className="nav-link">
            <Icon icon="ph:calculator" className="sidebar-icon" />
            Offerte
            </NavLink>
        </li>
                
        {isLoggedIn && (
          <li>
            <NavLink to="/instellingen/tarieven" className="nav-link">
              <Icon icon="mdi:cog-outline" className="sidebar-icon" />
              Instellingen
            </NavLink>
          </li>
        )}
                
      </ul>

      <hr className="sidebar-divider" />

      {isLoggedIn ? (
        <button
          className="nav-link"
          onClick={logout}
        >
          <Icon icon="mdi:logout" className="sidebar-icon" />
          Uitloggen
        </button>
      ) : (
        <NavLink
          to="/admin"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            onAdminClick();
          }}
            >
              <Icon icon="lets-icons:user-light" className="sidebar-icon" />
              Admin
            </NavLink>
      )}
    </nav>
  );
}