import "./Bewerkingen.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initieleBestanden = [
  { id: 1, naam: "20260120.5-S002.dxf", zet1eman: 10, zet2eman: null, walsen: null, borenTappenGaten: 5, lassen: null, afbramen: true },
  { id: 2, naam: "20260120.5-S005.dxf", zet1eman: null, zet2eman: null, walsen: 15, borenTappenGaten: 10, lassen: null, afbramen: true },
  { id: 3, naam: "20260120.5-S008.dxf", zet1eman: 25, zet2eman: 10, walsen: null, borenTappenGaten: null, lassen: 15, afbramen: true },
  { id: 4, naam: "20260120.5-S0014.dxf", zet1eman: null, zet2eman: null, walsen: 25, borenTappenGaten: null, lassen: 15, afbramen: true },
];

const BEWERKINGS_VELDEN = [
  { key: "zet1eman", label: "zet 1e man", type: "number" },
  { key: "zet2eman", label: "zet 2e man", type: "number" },
  { key: "walsen", label: "walsen", type: "number" },
  { key: "borenTappenGaten", label: "Boren/tappen/gaten", type: "number" },
  { key: "lassen", label: "lassen", type: "number" },
  { key: "afbramen", label: "afbramen", type: "boolean" },
];

export default function Bewerkingen() {
  const navigate = useNavigate();
  const [bestanden, setBestanden] = useState(initieleBestanden);

  const updateRij = (id, veld, waarde) => {
    setBestanden((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [veld]: waarde } : b))
    );
  };

  const berekenTotaal = (veld) => {
    if (veld === "afbramen") return null;
    return bestanden.reduce((sum, b) => sum + (b[veld] || 0), 0) || null;
  };

  const formatWaarde = (waarde, type) => {
    if (type === "boolean") return waarde ? "ja" : "-";
    return waarde != null && waarde !== 0 ? waarde : "-";
  };

  return (
    <div className="bewerkingen-page">
      <h1>Offerte calculeren</h1>
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: "23873",
          klant: "Tummers Food Processing",
          verkoper: "Senne Scheeren",
          aangemaaktOp: "10-05-2026",
        }}
        progress={{ stap: 4, totaal: 8 }}
        onPrevious={() => navigate("/stap4/:type")}
        onNext={() => navigate("/stap6/:type")}
      >
        <h2>Bewerkingen</h2>
        <p>Selecteer de juiste tijden en bewerkingen</p>

        <table className="bewerkingen-tabel">
          <thead>
            <tr>
              <th>Afbeelding</th>
              <th>DXF naam</th>
              {BEWERKINGS_VELDEN.map((v) => (
                <th key={v.key}>{v.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bestanden.map((bestand) => (
              <tr key={bestand.id}>
                <td className="afbeelding-cel">
                  <span className="dxf-icoon">📄</span>
                </td>
                <td>{bestand.naam}</td>
                {BEWERKINGS_VELDEN.map((v) => (
                  <td key={v.key}>
                    {v.type === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={!!bestand[v.key]}
                        onChange={(e) => updateRij(bestand.id, v.key, e.target.checked)}
                      />
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={bestand[v.key] ?? ""}
                        placeholder="-"
                        onChange={(e) =>
                          updateRij(bestand.id, v.key, e.target.value === "" ? null : parseInt(e.target.value))
                        }
                        className="bewerkingen-input"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="totaal-rij">
              <td />
              <td>Totaal</td>
              {BEWERKINGS_VELDEN.map((v) => {
                const totaal = berekenTotaal(v.key);
                return <td key={v.key}>{totaal || ""}</td>;
              })}
            </tr>
          </tfoot>
        </table>
      </OfferteStapLayout>
    </div>
  );
}