import "../styles/layout.css";
import SettingsNavbar from "../components/settingsnavbar/SettingsNavbar";

// ----> LAYOUT FOR THE SETTINGS PAGES <----

export default function SettingsLayout({ title, description, children }) {
  return (
    <div className="settings-layout">
      <SettingsNavbar />
      <main className="settings-main">
        <div className="settings-main-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="settings-content">
          {children}
        </div>
      </main>
    </div>
  );
}