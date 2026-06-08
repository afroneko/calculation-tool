import "./DxfInvoer.css";
import Progressbar from "../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../layout/OfferteStapLayout";

export default function DxfInvoer() {

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
      voortgang={{ stap: 2, totaal: 8 }}
      onVorige={() => navigate('/stap/2')}
      onVolgende={() => navigate('/stap/4')}
    >
      {/* Hier komt je tabel, form, of andere content */}
      <h2>Materiaal selecteren</h2>
      <p>Selecteer het juiste materiaal, dikte en aantallen.</p>
      {/* ... */}
    </OfferteStapLayout>
    </div>
  );
}