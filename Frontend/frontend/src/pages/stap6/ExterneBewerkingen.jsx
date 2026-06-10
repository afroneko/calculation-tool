import "./ExterneBewerkingen.css";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";
import Progressbar from "../../components/progressbar/Progressbar";

export default function ExterneBewerkingen() {
  const navigate = useNavigate();
  return (
    <div className="externe-bewerkingen-page">
      <h1>Offerte calculeren</h1>
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: "23873",
          klant: "Tummers Food Processing",
          verkoper: "Senne Scheeren",
          aangemaaktOp: "10-05-2026",
        }}
        progress={{ stap: 5, totaal: 9 }}
        onPrevious={() => navigate("/stap5")}
        onNext={() => navigate("/stap7")}
      >
        <h2>Externe bewerkingen</h2>
        <p>Hier kunnen externe bewerkingen worden toegevoegd</p>
      </OfferteStapLayout>
    </div>
  );
}