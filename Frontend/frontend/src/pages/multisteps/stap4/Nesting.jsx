import "./Nesting.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DxfParser from "dxf-parser";
import useCalculatieStore from "../../../store/calculatieStore";

const PLAAT_BREEDTE_MM = 3000;
const PLAAT_HOOGTE_MM = 1500;
const PLAAT_OPPERVLAKTE_M2 = (PLAAT_BREEDTE_MM / 1000) * (PLAAT_HOOGTE_MM / 1000);
const DICHTHEID = {
  "RVS304 zf":  7.93,
  "RVS316 wgw": 7.98,
  "RVS316 zf":  7.98,
  "S235":       7.85,
  "S355":       7.85,
  "Aluminium":  2.70,
};
const getDichtheid = (materiaal) => DICHTHEID[materiaal] ?? 7.85;

const parseDxf = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new DxfParser();
        const dxf = parser.parseSync(e.target.result);
        const entities = dxf.entities || [];

        // bounding box berekenen
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        const circles = entities.filter((en) => en.type === "CIRCLE");

        entities.forEach((en) => {
          if (en.vertices) {
            en.vertices.forEach((v) => {
              minX = Math.min(minX, v.x);
              minY = Math.min(minY, v.y);
              maxX = Math.max(maxX, v.x);
              maxY = Math.max(maxY, v.y);
            });
          }
          if (en.center) {
            minX = Math.min(minX, en.center.x - (en.radius || 0));
            minY = Math.min(minY, en.center.y - (en.radius || 0));
            maxX = Math.max(maxX, en.center.x + (en.radius || 0));
            maxY = Math.max(maxY, en.center.y + (en.radius || 0));
          }
        });

        const width  = Math.round(maxX - minX);
        const height = Math.round(maxY - minY);

        resolve({ width, height, holeCount: circles.length });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export default function Nesting() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { files, materials, nestingData, setNestingData, platenData, setPlatenData} = useCalculatieStore();
  const [berekend, setBerekend] = useState(nestingData.length > 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBereken = async () => {
    setLoading(true);
    setError(null);
    try {
      //promise kan alles tegelijk verwerken in plaats van 1 voor 1
      const results = await Promise.all(
        files.map(async (f) => {
          const mat = materials.find((m) => m.id === f.id);
          const { width, height, holeCount } = await parseDxf(f.file);

          // gewicht berekening: lengte(m) * breedte(m) * dichtheid staal * dikte(mm)
          // dit is een benadering, in werkelijkheid afhankelijk van het materiaal
          const gewicht = parseFloat(
            (
              (width / 1000) *
              (height / 1000) *
              getDichtheid(mat?.materiaal) *
              (parseInt(mat?.dikte) || 1)
            ).toFixed(2)
          );

          return {
            id: f.id,
            materiaal: mat?.materiaal ?? "-",
            dikte: mat?.dikte ?? "-",
            lengte: width,
            breedte: height,
            gewicht,
            aantallen: mat?.aantallen ?? 1,
            gaten: holeCount,
          };
        })
      );
      setNestingData(results);

      // groepeer per materiaal + dikte, want elke combinatie heeft eigen platen nodig
    const groepen = {};
    results.forEach((r) => {
      const key = `${r.materiaal}-${r.dikte}`;
      const oppervlakteOnderdeel = (r.lengte / 1000) * (r.breedte / 1000) * r.aantallen;
      groepen[key] = (groepen[key] || 0) + oppervlakteOnderdeel;
    });

    // aantal platen per groep = totale oppervlakte van die groep / plaatoppervlakte, naar boven afgerond
    const platenPerGroep = Object.entries(groepen).map(([key, oppervlakte]) => ({
      groep: key,
      benodigdeOppervlakte: oppervlakte,
      aantalPlaten: Math.ceil(oppervlakte / PLAAT_OPPERVLAKTE_M2),
    }));

    setPlatenData(platenPerGroep);
      setBerekend(true);
    } catch (err) {
      setError("Er ging iets mis bij het uitlezen van de DXF bestanden.");
    } finally {
      setLoading(false);
    }
  };

  const totaleOppervlakte = nestingData.reduce((sum, r) =>
    sum + (r.lengte / 1000) * (r.breedte / 1000) * r.aantallen, 0
  );
  const aantalOnderdelen = nestingData.reduce((sum, r) => sum + r.aantallen, 0);

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
        onPrevious={() => navigate('/stap3/:type')}
        onNext={() => navigate('/stap5/:type')}
      >

      <div className="nesting-header">
        <div>
          <h2>Materiaalbehoeften</h2>
          <p>Bereken de hoeveelheid benodigd materiaal en kosten.</p>
        </div>
        <button className="bereken-knop" onClick={handleBereken} disabled={loading}>
            {loading ? "Berekenen..." : "Bereken materiaalbehoeften"}
          </button>
      </div>

      {error && <p className="nesting-error">{error}</p>}
 
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
              nestingData.map((rij) => (
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
                <td colSpan={7} className="lege-staat">
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

        {berekend && platenData.length > 0 && (
          <div className="platen-overzicht">
            <h3 className="platen-titel">Benodigde platen</h3>
            <table className="platen-tabel">
              <thead>
                <tr>
                  <th>Materiaal / dikte</th>
                  <th>Benodigde oppervlakte</th>
                  <th>Aantal platen ({PLAAT_BREEDTE_MM}x{PLAAT_HOOGTE_MM}mm)</th>
                </tr>
              </thead>
              <tbody>
                {platenData.map((p) => (
                  <tr key={p.groep}>
                    <td>{p.groep}</td>
                    <td>{p.benodigdeOppervlakte.toFixed(2)}m²</td>
                    <td>{p.aantalPlaten}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </OfferteStapLayout>
    </div>
  );
}