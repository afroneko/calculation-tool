import './Login.css'
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useState } from "react";

// ----> LOGIN OVERLAY COMPONENT FOR DISPLAYING THE LOGIN FORM <----

export default function LoginOverlay({ onClose }) {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [gebruikersnaam, setGebruikersnaam] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [fout, setFout] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFout(null);

    // Send login request to the backend
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gebruikersnaam, wachtwoord }),
      });

      const data = await response.json();

      if (data.succes) {
        login({ gebruikersnaam });
        onClose();
        navigate("/instellingen/algemeen");
      } else {
        setFout(data.foutmelding);
        setGebruikersnaam("");
        setWachtwoord("");
      }
    } catch {
      setFout("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="blur-overlay" onClick={onClose} />
      <div className="login-wrapper">
        <div className="login-box">
          <div className="login-avatar">
            <Icon icon="lets-icons:user-light" className="login-icon" />
          </div>

          <button type="button" className="back-btn" onClick={onClose}>
            <Icon icon="mdi-light:arrow-left" />
          </button>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="content-group">
              <div className="input-wrapper">
                <Icon icon="gridicons:user" className="input-icon" />
                <input
                  type="text"
                  placeholder="Gebruikersnaam"
                  value={gebruikersnaam}
                  onChange={(e) => setGebruikersnaam(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <Icon icon="si:lock-fill" className="input-icon" />
                <input
                  type="password"
                  placeholder="Wachtwoord"
                  value={wachtwoord}
                  onChange={(e) => setWachtwoord(e.target.value)}
                />
              </div>

              {fout && <p className="login-fout">{fout}</p>}

              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Bezig..." : "Inloggen"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}