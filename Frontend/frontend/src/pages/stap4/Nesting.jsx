import "./Nesting.css";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import Progressbar from "../../components/progressbar/Progressbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initieleMateriaalData = [
  { id: 1, materiaal: "RVS304 zf", lengte: 3000, breedte: 1500, dikte: "2mm", gewicht: "11kg", aantallen: 2 },
  { id: 2, materiaal: "RVS316 wgw", lengte: 3000, breedte: 1500, dikte: "10mm", gewicht: "28kg", aantallen: 3 },
  { id: 3, materiaal: "RVS316 wgw", lengte: 3000, breedte: 1500, dikte: "12mm", gewicht: "30kg", aantallen: 1 },
];

export default function Nesting() {
  const navigate = useNavigate();
  const [materiaalData, setMateriaalData] = useState([]);
  const [berekend, setBerekend] = useState(false);

  const handleBereken = () => {
    setMateriaalData(initieleMateriaalData);
    setBerekend(true);
  };

  const totaleOppervlakte = materiaalData.reduce((sum, r) => {
    return sum + (r.lengte / 1000) * (r.breedte / 1000) * r.aantallen;
  }, 0);

  const aantalOnderdelen = materiaalData.reduce((sum, r) => sum + r.aantallen, 0);

  return (
    <div className="nesting-page">
      <h1>Offerte calculeren</h1>
      <Progressbar />
            
      <OfferteStapLayout
        offerte={{
          offertenummer: '23873',
          klant: 'Tummers Food Processing',
          verkoper: 'Senne Scheeren',
          aangemaaktOp: '10-05-2026',
        }}
        progress={{ stap: 3, totaal: 8 }}
        onPrevious={() => navigate('/stap3')}
        onNext={() => navigate('/stap5')}
      >

      <div className="nesting-header">
        <div>
          <h2>Materiaalbehoeften</h2>
          <p>Bereken de hoeveelheid benodigd materiaal en kosten.</p>
        </div>
        <button className="bereken-knop" onClick={handleBereken}>
          Bereken materiaalbehoeften
        </button>
      </div>
 
      <table className="materiaal-tabel">
        <thead>
          <tr>
            <th>Materiaal</th>
            <th>Lengte</th>
            <th>Breedte</th>
            <th>Dikte</th>
            <th>Gewicht</th>
            <th>Aantallen</th>
          </tr>
        </thead>
        <tbody>
          {berekend ? (
              materiaalData.map((rij) => (
                <tr key={rij.id}>
                  <td>{rij.materiaal}</td>
                  <td>{rij.lengte}</td>
                  <td>{rij.breedte}</td>
                  <td>{rij.dikte}</td>
                  <td>{rij.gewicht}</td>
                  <td>{rij.aantallen}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="lege-staat">
                  Klik op "Bereken materiaalbehoeften" om te starten.
                </td>
              </tr>
            )}
        </tbody>
      </table>
                 
        {berekend && (
          <div className="nesting-totalen">
            <span>
              <strong>Totale oppervlakte:</strong> {totaleOppervlakte.toFixed(0)}m²
            </span>
            <span>
              <strong>Aantal onderdelen:</strong> {aantalOnderdelen}
            </span>
          </div>
        )}

      </OfferteStapLayout>
    </div>
  );
}