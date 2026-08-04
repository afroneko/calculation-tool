import "./Materiaal.css";
import Progressbar from "../../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCalculatieStore from "../../../store/calculatieStore";
import { valideerStap } from "../../../services/validatie";

const DIKTES = ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm", "12mm", "15mm", "20mm"];

const MATERIALEN = [
  // RVS 304
  { naam: "RVS304 KGW F",           materiaalnr: 600,  increment: 4, artikelgroepCode: 1700, artikelgroepId: 135, zoekCode: "rvs 304" },
  { naam: "RVS304 KGW ZF",          materiaalnr: 200,  increment: 4, artikelgroepCode: 1700, artikelgroepId: 135, zoekCode: "rvs 304" },
  { naam: "RVS304 WGW ZF",          materiaalnr: 201,  increment: 4, artikelgroepCode: 1700, artikelgroepId: 135, zoekCode: "rvs 304" },
  { naam: "RVS304 BA F",            materiaalnr: 603,  increment: 4, artikelgroepCode: 1700, artikelgroepId: 135, zoekCode: "rvs 304" },
  { naam: "RVS304 GESL F",          materiaalnr: 602,  increment: 2, artikelgroepCode: 1705, artikelgroepId: 182, zoekCode: "k320" },
  { naam: "RVS304 GEBORSTELD F",    materiaalnr: 606,  increment: 2, artikelgroepCode: 1700, artikelgroepId: 135, zoekCode: "geborst" },
  { naam: "RVS 304 TRPL 3/4.5",    materiaalnr: 220,  increment: 4, artikelgroepCode: 1930, artikelgroepId: 143, zoekCode: "tranen" },
  { naam: "RVS 304 TRPL 4/5.5",    materiaalnr: 222,  increment: 4, artikelgroepCode: 1930, artikelgroepId: 143, zoekCode: "tranen" },
  { naam: "RVS 304 TRPL 4.5/6",    materiaalnr: 227,  increment: 4, artikelgroepCode: 1930, artikelgroepId: 143, zoekCode: "tranen" },
  { naam: "RVS 304 TRPL 5/6.5",    materiaalnr: 221,  increment: 4, artikelgroepCode: 1930, artikelgroepId: 143, zoekCode: "tranen" },
  { naam: "RVS 304 TRPL 6/7.5",    materiaalnr: 226,  increment: 4, artikelgroepCode: 1930, artikelgroepId: 143, zoekCode: "tranen" },

  // RVS 316
  { naam: "RVS316 KGW F",          materiaalnr: 604,  increment: 4, artikelgroepCode: 1750, artikelgroepId: 137, zoekCode: "316" },
  { naam: "RVS316 KGW ZF",         materiaalnr: 202,  increment: 4, artikelgroepCode: 1750, artikelgroepId: 137, zoekCode: "316" },
  { naam: "RVS316 WGW ZF",         materiaalnr: 203,  increment: 4, artikelgroepCode: 1750, artikelgroepId: 137, zoekCode: "316" },
  { naam: "RVS316 GESL F",         materiaalnr: 605,  increment: 2, artikelgroepCode: 1755, artikelgroepId: 183, zoekCode: "k320" },
  { naam: "RVS316 GESL ZF",        materiaalnr: 209,  increment: 2, artikelgroepCode: 1755, artikelgroepId: 183, zoekCode: "k420" },

  // Staal
  { naam: "ST37 BLANK",            materiaalnr: 100,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "st 37" },
  { naam: "ST37 GEBEITST",         materiaalnr: 101,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "st 37" },
  { naam: "ST37 ONGEBEITST",       materiaalnr: 102,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "st 37" },
  { naam: "ST37 YMPRESS",          materiaalnr: 103,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "st 37" },
  { naam: "S355J2 GEBEITST",       materiaalnr: 121,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "st 52" },
  { naam: "S355J2 ONGEBEITST",     materiaalnr: 122,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "st 52" },
  { naam: "STAAL SPECIAAL",        materiaalnr: 910,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "p355" },
  { naam: "STAAL TOEGELEVERD",     materiaalnr: 901,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "P355" },
  { naam: "P355NL1",               materiaalnr: 114,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "p355" },
  { naam: "HARDOX",                materiaalnr: 2103, increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "hardox" },
  { naam: "MAGNELIS",              materiaalnr: 2104, increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "MAGNELIS" },
  { naam: "ST37 TRPL 3/4.5",      materiaalnr: 104,  increment: 4, artikelgroepCode: 1960, artikelgroepId: 144, zoekCode: "tranen" },
  { naam: "ST37 TRPL 4/5.5",      materiaalnr: 107,  increment: 4, artikelgroepCode: 1960, artikelgroepId: 144, zoekCode: "tranen" },
  { naam: "ST37 TRPL 5/6.5",      materiaalnr: 105,  increment: 4, artikelgroepCode: 1960, artikelgroepId: 144, zoekCode: "tranen" },
  { naam: "ST37 TRPL 6/8",        materiaalnr: 109,  increment: 4, artikelgroepCode: 1960, artikelgroepId: 144, zoekCode: "tranen" },
  { naam: "ST37 TRPL 8/10",       materiaalnr: 108,  increment: 4, artikelgroepCode: 1960, artikelgroepId: 144, zoekCode: "tranen" },
  { naam: "VERZINKT ELECTRO",      materiaalnr: 501,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "el" },
  { naam: "VERZINKT SENDZ",        materiaalnr: 502,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "send" },
  { naam: "CORTEN A",              materiaalnr: 106,  increment: 4, artikelgroepCode: 1650, artikelgroepId: 134, zoekCode: "corten" },

  // Aluminium
  { naam: "ALU EN-AW1050 ZF",      materiaalnr: 300,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "1050" },
  { naam: "ALU EN-AW1050 F",       materiaalnr: 801,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "1050" },
  { naam: "ALU EN-AW5083 ZF",      materiaalnr: 2102, increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "5083" },
  { naam: "ALU EN-AW5754 ZF",      materiaalnr: 320,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "5754" },
  { naam: "ALU EN-AW5754 F",       materiaalnr: 802,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "5754" },
  { naam: "ALU EN-AW6082 ZF",      materiaalnr: 321,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "6082" },
  { naam: "ALU EN-AW6082 F",       materiaalnr: 803,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "6082" },
  { naam: "ALU ANODISEER KWA ZF",  materiaalnr: 322,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "anod" },
  { naam: "ALU ANODISEER KWA F",   materiaalnr: 804,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "anod" },
  { naam: "ALU GEANODISEERD ZF",   materiaalnr: 323,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "anod" },
  { naam: "ALU GEANODISEERD F",    materiaalnr: 805,  increment: 4, artikelgroepCode: 1780, artikelgroepId: 139, zoekCode: "anod" },
  { naam: "ALU TRPL 1.5/2 5T GB", materiaalnr: 305,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 2/3.5 5T OG", materiaalnr: 307,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 2.5/4 5T OG", materiaalnr: 304,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 2.5/4 5T GB", materiaalnr: 301,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 3/4.5 2T GB", materiaalnr: 308,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "st" },
  { naam: "ALU TRPL 3/4.5 5T GB", materiaalnr: 306,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 3.5/5 2T OG", materiaalnr: 302,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "2t" },
  { naam: "ALU TRPL 3.5/5 5T OG", materiaalnr: 312,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 5/6.5 2T OG", materiaalnr: 303,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "2t" },
  { naam: "ALU TRPL 5/6.5 5T OG", materiaalnr: 309,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 5/6.5 5T GB", materiaalnr: 313,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 7/8.5 5T OB", materiaalnr: 310,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 7/8.5 5T GB", materiaalnr: 314,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },
  { naam: "ALU TRPL 8/9.5 5T OB", materiaalnr: 314,  increment: 4, artikelgroepCode: 1790, artikelgroepId: 141, zoekCode: "5t" },

  { naam: "RIGIDIZED 15DP",        materiaalnr: 612,  increment: 4, artikelgroepCode: 1810, artikelgroepId: 142, zoekCode: "rig" },
  { naam: "RIGIDIZED 6WL",         materiaalnr: 610,  increment: 2, artikelgroepCode: 1810, artikelgroepId: 142, zoekCode: "rig" },
  { naam: "RIGIDIZED 7GM",         materiaalnr: 611,  increment: 2, artikelgroepCode: 1810, artikelgroepId: 142, zoekCode: "rig" },
  { naam: "RIGIDIZED 5WL",         materiaalnr: 613,  increment: 2, artikelgroepCode: 1810, artikelgroepId: 142, zoekCode: "rig" },
  { naam: "RVS304 PERFO",          materiaalnr: 230,  increment: 4, artikelgroepCode: 1760, artikelgroepId: 138, zoekCode: "perfo" },
  { naam: "RVS304 PERF R3T5D1.5",  materiaalnr: 231,  increment: 4, artikelgroepCode: 1760, artikelgroepId: 138, zoekCode: "perfo" },
  { naam: "RVS304 PERF R3T5D2",    materiaalnr: 232,  increment: 4, artikelgroepCode: 1760, artikelgroepId: 138, zoekCode: "perfo" },
  { naam: "RVS304 PERF R3T5D3",    materiaalnr: 233,  increment: 4, artikelgroepCode: 1760, artikelgroepId: 138, zoekCode: "perfo" },
  { naam: "RVS 316 PERFO",         materiaalnr: 236,  increment: 4, artikelgroepCode: 1760, artikelgroepId: 138, zoekCode: "perfo" },
  { naam: "KOPER",                 materiaalnr: 1500, increment: 4, artikelgroepCode: 1785, artikelgroepId: 140, zoekCode: "messing" },
  { naam: "MESSING",               materiaalnr: 1611, increment: 4, artikelgroepCode: 1785, artikelgroepId: 140, zoekCode: "messing" },
];


export default function Materiaal()  {
  const { files, materials, setMaterials, updateMaterial, document } = useCalculatieStore();
  const navigate = useNavigate();
  const {type} = useParams();

  // initialiseer materials vanuit files
  useEffect(() => {
    if (files.length === 0) return;
    const initialized = files.map((file) => {
      const existing = materials.find((m) => m.id === file.id);
      return existing ?? {
        id: file.id,
        naam: file.naam,
        materiaalnr: null,
        materiaalNaam: null,
        artikelgroepId: null,
        artikelgroepCode: null,
        zoekCode: null,
        dikte: DIKTES[0],
        aantallen: null,
      };
    });
    setMaterials(initialized);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const [fout, setFout] = useState(null);
  const store = useCalculatieStore();
  const handleNext = () => {
    const validatie = valideerStap(3, store);

    if (!validatie.geldig) {
      setFout(validatie.fout);
      return;
    }

    setFout(null);
    navigate(`/stap4/${type}`);
  };

     return (
        <div className="materiaal-page">
          <Progressbar />
    
           <OfferteStapLayout
          offerte={{
            offertenummer: document?.quoteNumber ?? "-",
            klant: document?.customer ?? "-",
            verkoper: document?.salesperson ?? "-",
            aangemaaktOp: document?.createdAt ?? "-",
          }}
          progress={{ stap: 2, totaal: 9 }}
          onPrevious={() => navigate(`/stap2/${type}`)}
          onNext={handleNext}
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
                    value={MATERIALEN.findIndex((m) => m.materiaalnr === mat.materiaalnr)}
                    onChange={(e) => {
                      const selected = MATERIALEN[Number(e.target.value)];
                      if (!selected) return;
                      console.log("selected:", selected);
                      updateMaterial(mat.id, "materiaalnr", selected.materiaalnr);
                      updateMaterial(mat.id, "materiaalNaam", selected.naam);
                      updateMaterial(mat.id, "artikelgroepId", selected.artikelgroepId);
                      updateMaterial(mat.id, "artikelgroepCode", selected.artikelgroepCode);
                      updateMaterial(mat.id, "zoekCode", selected.zoekCode);
                    }}
                  >
                    <option value="">-- Selecteer materiaal --</option>
                    {MATERIALEN.map((m, index) => (
                      <option key={index} value={index}>{m.naam}</option>
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="1"
                    value={mat.aantallen ?? ""}
                    onChange={(e) =>
                      updateMaterial(mat.id, "aantallen", e.target.value === "" ? null : parseInt(e.target.value))
                    }
                    className="aantallen-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {fout && <p className="stap-fout">{fout}</p>}
         
        </OfferteStapLayout>
        </div>
      );
}