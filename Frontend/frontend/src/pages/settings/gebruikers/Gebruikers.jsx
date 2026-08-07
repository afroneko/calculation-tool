import "./Gebruikers.css";
import SettingsLayout from "../../../layout/SettingsLayout";
import { useState } from "react";
import { Icon } from "@iconify/react";

// ----> USER MANAGEMENT PAGE <----

export default function Gebruikers() {
  const [gebruikersnaam, setGebruikersnaam] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(null);
  const [fout, setFout] = useState(null);

  // Function to handle user registration, including form validation, API call, and state updates for success or error messages
  const handleRegistreer = async () => {
    if (!gebruikersnaam || !wachtwoord) {
      setFout("Vul beide velden in");
      return;
    }

    setLoading(true);
    setFout(null);
    setSucces(null);

    try {
      const response = await fetch("/api/auth/registreer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gebruikersnaam, wachtwoordHash: wachtwoord }),
      });

      const data = await response.json();

      if (data.succes) {
        setSucces(`Gebruiker '${gebruikersnaam}' succesvol aangemaakt.`);
        setGebruikersnaam("");
        setWachtwoord("");
      } else {
        setFout(data.foutmelding);
      }
    } catch {
      setFout("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsLayout title="Gebruikers" description="Beheer de gebruikers van de applicatie">
      <h3 className="section-subtitle">Nieuwe gebruiker aanmaken</h3>

      <div className="gebruiker-form">
        <div className="gebruiker-field">
          <label>Gebruikersnaam</label>
          <input
            type="text"
            value={gebruikersnaam}
            onChange={(e) => setGebruikersnaam(e.target.value)}
            placeholder="Gebruikersnaam"
            className="settings-input"
          />
        </div>

        <div className="gebruiker-field">
          <label>Wachtwoord</label>
          <input
            type="password"
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
            placeholder="Wachtwoord"
            className="settings-input"
          />
        </div>

        {fout && (
          <p className="gebruiker-fout">
            <Icon icon="mdi:alert-circle-outline" width={16} />
            {fout}
          </p>
        )}

        {succes && (
          <p className="gebruiker-succes">
            <Icon icon="mdi:check-circle-outline" width={16} />
            {succes}
          </p>
        )}

        <button
          className="settings-save-btn"
          onClick={handleRegistreer}
          disabled={loading}
        >
          {loading ? "Bezig..." : "Gebruiker aanmaken"}
        </button>
      </div>
    </SettingsLayout>
  );
}