import "./DxfInvoer.css";
import Progressbar from "../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";

export default function DxfInvoer() {
const navigate = useNavigate();

  return (
    <div className="dxf-invoer-page">
      <h1>Dxf Invoer</h1>
      <Progressbar />

       <OfferteStapLayout
      title="Materiaal & diktes"
      offerte={{
        offertenummer: '23873',
        klant: 'Tummers Food Processing',
        verkoper: 'Senne Scheeren',
        aangemaaktOp: '10-05-2026',
      }}
      voortgang={{ stap: 1, totaal: 8 }}
      onVorige={() => navigate('/stap/1')}
      onVolgende={() => navigate('/stap/3')}
    >
      {/* Hier komt je tabel, form, of andere content */}
      <h2>DXF bestanden laden</h2>
      <p>Upload de DXF bestanden van de onderdelen</p>
      {/* ... */}
    </OfferteStapLayout>
    </div>
  );
}