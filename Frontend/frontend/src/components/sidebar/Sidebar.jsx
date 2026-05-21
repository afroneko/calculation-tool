import "./sidebar.css";
import "../../styles/global.css";
import { NavLink, useNavigate } from "react-router-dom"; 
import { Icon } from "@iconify/react";
import calculatorIcon from "../../assets/navbarIcons/calculator.svg";

export default function Sidebar() {
  return (
    <nav className="sidebar">
            <div className="imageAndTitle">
                {/* <img src={logo} alt="Flora Vitals logo" className="logo" /> */}
                <h2 className="title">Tummers</h2>
                <p className="subtitle">calculations</p>
            </div>

            <hr className="sidebar-divider" />

            <ul>
                <li>
                    <NavLink to="/" className="nav-link">
                        <Icon  icon="mdi:home" />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/overview" className="nav-link">
                        {/* <img src={calculatorIcon} alt="Calculator icon" className="navbar-icon" /> */}
                        Offerte
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className="nav-link">
                        {/* <img src={userIcon} alt="User icon" className="sapling-icon" /> */}
                        Order
                    </NavLink>
                </li>
            </ul>

            {/* Logout button */}
            <NavLink to="/logout" className="nav-link">
                {/* <img src={logoutIcon} alt="Logout icon" className="sapling-icon" /> */}
                Admin
            </NavLink>
        </nav>
  );
}