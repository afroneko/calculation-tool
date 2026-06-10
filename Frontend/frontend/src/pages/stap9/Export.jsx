import "./Export.css";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";

export default function Export() {
  const navigate = useNavigate();
  return (
    <div className="export-page">
      <h1>Offerte calculeren</h1>
      <OfferteStapLayout
        offerte={{
          offertenummer: "23873",
          klant: "Tummers Food Processing",
          verkoper: "Senne Scheeren",
          aangemaaktOp: "10-05-2026",
        }}
        progress={{ stap: 5, totaal: 8 }}
        onPrevious={() => navigate("/stap5")}
        onNext={() => navigate("/stap7")}
      >
        <h2>Export</h2>
        <p>Hier kunnen de offertegegevens worden geëxporteerd</p>
      </OfferteStapLayout>
    </div>
  );
}