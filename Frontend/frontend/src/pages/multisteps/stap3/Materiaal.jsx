import "./Materiaal.css";
import Progressbar from "../../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MATERIAAL_SOORTEN = ["RVS304 zf", "RVS316 wgw", "RVS316 zf", "S235", "S355"];
const DIKTES = ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm", "12mm", "15mm", "20mm"];

const initieleBestanden = [
  { id: 1, naam: "20260120.5-S002.dxf", materiaal: "RVS304 zf", dikte: "2mm", aantallen: 5 },
  { id: 2, naam: "20260120.5-S005.dxf", materiaal: "RVS304 zf", dikte: "2mm", aantallen: 3 },
  { id: 3, naam: "20260120.5-S008.dxf", materiaal: "RVS316 wgw", dikte: "10mm", aantallen: 12 },
  { id: 4, naam: "20260120.5-S0014.dxf", materiaal: "RVS316 wgw", dikte: "12mm", aantallen: 1 },
];

export default function Materiaal()  {
     const navigate = useNavigate();
     const [bestanden, setBestanden] = useState(initieleBestanden);

  const updateRij = (id, veld, waarde) => {
    setBestanden((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [veld]: waarde } : b))
    );
  };

     return (
        <div className="materiaal-page">
          <h1>Offerte calculeren</h1>
          <Progressbar />
    
           <OfferteStapLayout
          offerte={{
            offertenummer: '23873',
            klant: 'Tummers Food Processing',
            verkoper: 'Senne Scheeren',
            aangemaaktOp: '10-05-2026',
          }}
          progress={{ stap: 2, totaal: 8 }}
          onPrevious={() => navigate('/stap2')}
          onNext={() => navigate('/stap4')}
        >
          
          <h2>Materiaal selecteren</h2>
          <p>selecteer het juiste materiaal, dikte en aantallen.</p>

          <table className="materiaal-tabel">
          <thead>
            <tr>
              <th>Afbeelding</th>
              <th>DXF naam</th>
              <th>
                Materiaal soort
                <span className="filter-icoon">▼</span>
              </th>
              <th>Dikte</th>
              <th>Aantallen</th>
            </tr>
          </thead>
          <tbody>
            {bestanden.map((bestand) => (
              <tr key={bestand.id}>
                <td className="afbeelding-cel">
                  <span className="dxf-icoon">📄</span>
                </td>
                <td>{bestand.naam}</td>
                <td>
                  <select
                    value={bestand.materiaal}
                    onChange={(e) => updateRij(bestand.id, "materiaal", e.target.value)}
                  >
                    {MATERIAAL_SOORTEN.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={bestand.dikte}
                    onChange={(e) => updateRij(bestand.id, "dikte", e.target.value)}
                  >
                    {DIKTES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={bestand.aantallen}
                    onChange={(e) => updateRij(bestand.id, "aantallen", parseInt(e.target.value) || 1)}
                    className="aantallen-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         
        </OfferteStapLayout>
        </div>
      );
}