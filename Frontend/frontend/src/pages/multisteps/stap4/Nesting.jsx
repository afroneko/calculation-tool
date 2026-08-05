import "./Nesting.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { parseDxf } from "../../../services/parseDxf";
import useCalculatieStore from "../../../store/calculatieStore";
import { valideerStap } from "../../../services/validatie";

const PLAAT_BREEDTE_MM = 3000;
const PLAAT_HOOGTE_MM = 1500;
const PLAAT_OPPERVLAKTE_M2 = (PLAAT_BREEDTE_MM / 1000) * (PLAAT_HOOGTE_MM / 1000);
const DICHTHEID = {
  135: 7.93, // RVS304
  137: 7.98, // RVS316
  182: 7.98, // RVS316 GESL
  183: 7.98, // RVS316 GESL ZF
  143: 7.93, // RVS304 TRPL
  134: 7.85, // Staal
  144: 7.85, // Staal TRPL
  139: 2.70, // Alu
  141: 2.70, // Alu TRPL
  138: 7.93, // Perfo RVS
  140: 8.96, // Koper
  142: 7.93, // Rigidized
};
const getDichtheid = (artikelgroepId) => DICHTHEID[artikelgroepId] ?? 7.85;

export default function Nesting() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { files, materials, nestingData, setNestingData, platenData, setPlatenData, document} = useCalculatieStore();
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

          const oppervlakte = (width / 1000) * (height / 1000);
          const dikte = parseInt(mat?.dikte) || 1;

         // gewicht per onderdeel: oppervlakte(m²) × dikte(m) × dichtheid(kg/m³)
          const gewicht = parseFloat(
            (oppervlakte * (dikte / 1000) * getDichtheid(mat?.artikelgroepId)).toFixed(2)
          );

          return {
             id: f.id,
            materiaalNaam: mat?.materiaalNaam ?? "-",
            artikelgroepId: mat?.artikelgroepId ?? null,
            zoekCode: mat?.zoekCode ?? null,
            dikte: mat?.dikte ?? "-",
            lengte: width,
            breedte: height,
            oppervlakte,
            gewicht,
            aantallen: mat?.aantallen ?? 1,
            gaten: holeCount,
          };
        })
      );
      setNestingData(results);

      // groepeer per materiaal + dikte voor plaatberekening
      const groepen = {};
      results.forEach((r) => {
        const key = `${r.materiaalNaam}-${r.dikte}`;
        if (!groepen[key]) {
          groepen[key] = {
            materiaalNaam: r.materiaalNaam,
            dikte: r.dikte,
            artikelgroepId: r.artikelgroepId,
            zoekCode: r.zoekCode,
            totaleOppervlakte: 0,
            totaalGewicht: 0,
          };
        }
        groepen[key].totaleOppervlakte += r.oppervlakte * r.aantallen;
        groepen[key].totaalGewicht += r.gewicht * r.aantallen;
      });

      const platenPerGroep = Object.entries(groepen).map(([key, groep]) => ({
        groep: key,
        materiaalNaam: groep.materiaalNaam,
        dikte: groep.dikte,
        artikelgroepId: groep.artikelgroepId,
        zoekCode: groep.zoekCode,
        totaleOppervlakte: parseFloat(groep.totaleOppervlakte.toFixed(2)),
        totaalGewicht: parseFloat(groep.totaalGewicht.toFixed(2)),
        aantalPlaten: Math.ceil(groep.totaleOppervlakte / PLAAT_OPPERVLAKTE_M2),
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
    sum + r.oppervlakte * r.aantallen, 0
  );
  const aantalOnderdelen = nestingData.reduce((sum, r) => sum + r.aantallen, 0);

  const [fout, setFout] = useState(null);
  const store = useCalculatieStore();
  const handleNext = () => {
    const validatie = valideerStap(4, store);

    if (!validatie.geldig) {
      setFout(validatie.fout);
      return;
    }

    setFout(null);
    navigate(`/stap5/${type}`);
  };

  return (
    <div className="nesting-page">
      <Progressbar />
            
      <OfferteStapLayout
        offerte={{
          offertenummer: document?.quoteNumber ?? "-",
          klant: document?.customer ?? "-",
          verkoper: document?.salesperson ?? "-",
          aangemaaktOp: document?.createdAt ?? "-",
        }}
        progress={{ stap: 3, totaal: 8 }}
        onPrevious={() => navigate(`/stap3/${type}`)}
        onNext={handleNext}
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
              <th>Lengte (mm)</th>
              <th>Breedte (mm)</th>
              <th>Dikte</th>
              <th>Oppervlakte (m²)</th>
              <th>Gewicht (kg)</th>
              <th>Aantallen</th>
              <th>Gaten</th>
            </tr>
          </thead>
          <tbody>
            {berekend ? (
              nestingData.map((rij) => (
                <tr key={rij.id}>
                  <td>{rij.materiaalNaam}</td>
                  <td>{rij.lengte}</td>
                  <td>{rij.breedte}</td>
                  <td>{rij.dikte}</td>
                  <td>{rij.oppervlakte.toFixed(3)}</td>
                  <td>{rij.gewicht.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}kg</td>
                  <td>{rij.aantallen}</td>
                  <td>{rij.gaten}</td>
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
              <strong>Totale oppervlakte:</strong> {totaleOppervlakte.toFixed(2)}m²
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
                  <th>Materiaal</th>
                  <th>Dikte</th>
                  <th>Totale oppervlakte</th>
                  <th>Totaal gewicht</th>
                  <th>Aantal platen ({PLAAT_BREEDTE_MM}×{PLAAT_HOOGTE_MM}mm)</th>
                </tr>
              </thead>
              <tbody>
                {platenData.map((p) => (
                  <tr key={p.groep}>
                    <td>{p.materiaalNaam}</td>
                    <td>{p.dikte}</td>
                    <td>{p.totaleOppervlakte.toFixed(2)}m²</td>
                    <td>{p.totaalGewicht.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}kg</td>
                    <td>{p.aantalPlaten}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {fout && <p className="stap-fout">{fout}</p>}

      </OfferteStapLayout>
    </div>
  );
}