import "./Controle.css";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";

export default function Controle() {
  const navigate = useNavigate();
  return (
    <div className="controle-page">
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
        <h2>Controle</h2>
        <p>Hier kunnen de offertegegevens worden gecontroleerd</p>
      </OfferteStapLayout>
    </div>
  );
}