import { NavLink, useNavigate } from "react-router-dom"; 
import { Icon } from "@iconify/react";
import "./Sidebar.css";

export default function Sidebar({ onAdminClick }) {
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
                        <Icon icon="clarity:home-line" className="nav-icon" />
                        Dashboard
                    </NavLink>
                </li>
                 <li>
                    <NavLink to="/overview" className="nav-link">
                        <Icon icon="ph:calculator" className="nav-icon" />
                        Order
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/overview" className="nav-link">
                        <Icon icon="ph:calculator" className="nav-icon" />
                        Offerte
                    </NavLink>
                </li>
            </ul>

            <hr className="sidebar-divider" />

            {/* Login button */}
            <NavLink 
              to="/admin"
              className="nav-link"
              onClick={(e) => {
                  e.preventDefault();
                  onAdminClick();
              }} 
            >
              <Icon icon="lets-icons:user-light" className="nav-icon" />
              Admin
            </NavLink>
        </nav>
  );
}