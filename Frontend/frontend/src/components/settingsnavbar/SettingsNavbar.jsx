import "./SettingsNavbar.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

// ----> NAVBAR COMPONENT FOR THE SETTINGS PAGES <----

const navItems = [
  { label: "Algemeen",   sublabel: "Algemene instellingen",         path: "/instellingen/algemeen",   icon: "mdi:cog-outline" },
  { label: "Materialen", sublabel: "Materiaalsoorten en prijzen",   path: "/instellingen/materialen", icon: "material-symbols-light:devices-fold-outline" },
  { label: "Tarieven",   sublabel: "Machine en bewerkingstarieven", path: "/instellingen/tarieven",   icon: "ant-design:stock-outlined" },
  { label: "Normtijden", sublabel: "Tijden per bewerking",          path: "/instellingen/normtijden", icon: "iconamoon:clock-light" },
  { label: "Gebruikers",  sublabel: "Gebruikersbeheer", path: "/instellingen/gebruikers", icon: "mdi:account-group-outline" },
];

export default function SettingsNavbar() {
  return (
    <aside className="settings-sidebar">
      <h2 className="settings-sidebar-title">Instellingen</h2>
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `settings-nav-item ${isActive ? "settings-nav-item--active" : ""}`
            }
          >
            <Icon icon={item.icon} width={18} height={18} className="nav-icon" />
            <div>
              <span className="nav-label">{item.label}</span>
              <span className="nav-sublabel">{item.sublabel}</span>
            </div>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}