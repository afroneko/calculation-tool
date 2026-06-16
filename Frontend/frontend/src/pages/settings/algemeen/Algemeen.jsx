import "./Algemeen.css";
import SettingsLayout from "../../../layout/SettingsLayout";
import { useState } from "react";

export default function Algemeen() {
  const [darkMode, setDarkMode] = useState(false);
  const [companyName, setCompanyName] = useState("Tummers Food Processing");
  const [logo, setLogo] = useState(null);
  const [currency, setCurrency] = useState("EUR");
  const [language, setLanguage] = useState("nl");

  return (
    <SettingsLayout title="Algemeen" description="Algemene instellingen voor de applicatie">

      <div className="settings-group">
        <h3 className="settings-group-title">Weergave</h3>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-title">Donkere modus</span>
            <span className="row-subtitle">Schakel tussen licht en donker thema</span>
          </div>
          <button
            className={`toggle ${darkMode ? "toggle--on" : ""}`}
            onClick={() => setDarkMode((v) => !v)}
            aria-label="Donkere modus"
          >
            <span className="toggle-thumb" />
          </button>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-title">Taal</span>
            <span className="row-subtitle">Taal van de interface</span>
          </div>
          <select
            className="settings-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="nl">Nederlands</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-title">Valuta</span>
            <span className="row-subtitle">Standaard valuta voor berekeningen</span>
          </div>
          <select
            className="settings-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dollar ($)</option>
            <option value="GBP">Pond (£)</option>
          </select>
        </div>
      </div>

      <div className="settings-group">
        <h3 className="settings-group-title">Bedrijf</h3>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-title">Bedrijfsnaam</span>
            <span className="row-subtitle">Wordt gebruikt op offertes en exports</span>
          </div>
          <input
            className="settings-input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-title">Logo</span>
            <span className="row-subtitle">Wordt gebruikt op het voorblad van de offerte</span>
          </div>
          <div className="logo-upload">
            {logo ? (
              <div className="logo-preview">
                <img src={URL.createObjectURL(logo)} alt="Logo" />
                <button className="logo-remove" onClick={() => setLogo(null)}>Verwijderen</button>
              </div>
            ) : (
              <label className="logo-upload-btn">
                Uploaden
                <input type="file" accept="image/*" hidden onChange={(e) => setLogo(e.target.files[0])} />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="settings-save-row">
        <button className="settings-save-btn">Opslaan</button>
      </div>

    </SettingsLayout>
  );
}