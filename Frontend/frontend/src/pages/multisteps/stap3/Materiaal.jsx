import "./Materiaal.css";
import Progressbar from "../../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useCalculatieStore from "../../../store/calculatieStore";

const MATERIAAL_SOORTEN = ["RVS304 zf", "RVS316 wgw", "RVS316 zf", "S235", "S355"];
const DIKTES = ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm", "12mm", "15mm", "20mm"];

export default function Materiaal()  {
  const { files, materials, setMaterials, updateMaterial } = useCalculatieStore();
  const navigate = useNavigate();
  const {type} = useParams();

   useEffect(() => {
    if (files.length === 0) return;
    // maak voor elk geüpload bestand een material entry aan
    // als een bestand al in materials zit (gebruiker gaat terug), bewaar dan de bestaande waarden
    const initialized = files.map((file) => {
      const existing = materials.find((m) => m.id === file.id);
      return existing ?? {
        id: file.id,
        naam: file.naam,
        //Standaardopties als startwaarde
        materiaal: MATERIAAL_SOORTEN[0],
        dikte: DIKTES[0],
        aantallen: 1,
      };
    });
    setMaterials(initialized);
  }, [files]);

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
          progress={{ stap: 2, totaal: 9 }}
          onPrevious={() => navigate(`/stap2/${type}`)}
          onNext={() => navigate(`/stap4/${type}`)}
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
            {materials.map((mat) => (
              <tr key={mat.id}>
                <td className="afbeelding-cel">
                  <span className="dxf-icoon">📄</span>
                </td>
                <td>{mat.naam}</td>
                <td>
                  <select
                    value={mat.materiaal}
                    onChange={(e) => updateMaterial(mat.id, "materiaal", e.target.value)}
                  >
                    {MATERIAAL_SOORTEN.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={mat.dikte}
                    onChange={(e) => updateMaterial(mat.id, "dikte", e.target.value)}
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
                    value={mat.aantallen}
                    onChange={(e) => updateMaterial(mat.id, "aantallen", parseInt(e.target.value) || 1)}
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