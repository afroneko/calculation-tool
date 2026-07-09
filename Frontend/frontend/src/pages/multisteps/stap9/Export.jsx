import "./Export.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Export() {
  const navigate = useNavigate();

  return (
    <div className="export-page">
      <Progressbar />

      <OfferteStapLayout
        offerte={offerte}
        progress={{ stap: 8, totaal: 9 }}
        onPrevious={() => navigate(`/stap9/${type}`)}
        onNext={() => navigate("/")}
      >
        <h2>Exporteren naar Ridder</h2>
        <p>Controleer de samenvatting en exporteer de calculatie naar Ridder.</p>

        <div className="export-success-banner">
          <Icon icon="icon-park-outline:check-one" width={22} height={22} className="export-success-icon" />
          <div>
            <p className="export-success-title">Calculatie is klaar om geëxporteerd te worden</p>
            <p className="export-success-description">Alle controles zijn succesvol doorstaan. De gegevens zijn volledig en valide.</p>
          </div>
        </div>

        <div className="export-content">
          <div className="export-info-card">
            <p className="export-info-title">Exportinformatie</p>
            <table className="export-info-table">
              <tbody>
                {[
                  ["Offertenummer", offerte.offertenummer],
                  ["Klant",         offerte.klant],
                  ["Verkoper",      offerte.verkoper],
                  ["Aangemaakt op", offerte.aangemaaktOp],
                  ["Stuklijsten",   offerte.stuklijsten],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="info-label">{label}</td>
                    <td className="info-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="export-actions">
            <div className="export-actions-group">
              <p className="export-actions-title">Voorblad</p>
              <button className="export-action-button">
                Downloaden als pdf
                <Icon icon="pepicons-pencil:file" width={18} height={18} />
              </button>
              <button className="export-action-button">
                Doormailen
                <Icon icon="mdi:email-outline" width={18} height={18} />
              </button>
            </div>

            <div className="export-actions-group">
              <p className="export-actions-title">Calculatie</p>
              <button className="export-action-button export-action-button--primary">
                Exporteren naar Ridder
                <Icon icon="mdi:export" width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </OfferteStapLayout>
    </div>
  );
}