import "./Bewerkingen.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCalculatieStore from "../../../store/calculatieStore";
import { valideerStap } from "../../../services/validatie";
import ConfirmModal from "../../../components/modal/ConfirmModal";

// ----> 5TH STEP PAGE: OPERATIONS <----

const BEWERKINGS_VELDEN = [
  { key: "zet1eman",          label: "zet 1e man",            type: "number" },
  { key: "zet2eman",          label: "zet 2e man",            type: "number" },
  { key: "walsen",            label: "walsen",                type: "number" },
  { key: "borenTappenGaten",  label: "Boren/ tappen/ gaten",  type: "number" },
  { key: "lassen",            label: "lassen (m)",                type: "number" },
  { key: "afbramen",          label: "afbramen",              type: "boolean" },
];

export default function Bewerkingen() {
  const navigate = useNavigate();
  const { type } =useParams();

  const { files, operations, setOperations, updateOperation, document } = useCalculatieStore();

  // Effect to initialize operations based on the uploaded files, ensuring that each file has a corresponding operation entry in the store
  useEffect(() => {
    if (files.length === 0) return;

    const initialized = files.map((file) => {
      const existing = operations.find((o) => o.id === file.id);
      return existing ?? {
        id: file.id,
        naam: file.naam,
        zet1eman: null,
        zet2eman: null,
        walsen: null,
        borenTappenGaten: null,
        lassen: null,
        afbramen: false,
      };
    });

    setOperations(initialized);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const berekenTotaal = (veld) => {
    if (veld === "afbramen") return null;
    return operations.reduce((sum, o) => sum + (o[veld] || 0), 0) || null;
  };

  const [modal, setModal] = useState(null);
  const [fout, setFout] = useState(null);
  const store = useCalculatieStore();
  const handleNext = () => {
  const validatie = valideerStap(5, store);

  if (!validatie.geldig) {
    setFout(validatie.fout);
    return;
  }

  if (validatie.waarschuwing) {
    setModal({
      message: validatie.waarschuwing,
      onConfirm: () => {
        setModal(null);
        navigate(`/stap6/${type}`);
      },
    });
    return;
  }

  setFout(null);
  navigate(`/stap6/${type}`);
};

  return (
    <div className="bewerkingen-page">
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: document?.quoteNumber ?? "-",
          klant: document?.customer ?? "-",
          verkoper: document?.salesperson ?? "-",
          aangemaaktOp: document?.createdAt ?? "-",
        }}
        progress={{ stap: 4, totaal: 8 }}
        onPrevious={() => navigate(`/stap4/${type}`)}
        onNext={handleNext}
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
            {operations.map((op) => (
              <tr key={op.id}>
                <td className="afbeelding-cel">
                  <span className="dxf-icoon">📄</span>
                </td>
                <td>{op.naam}</td>
                {BEWERKINGS_VELDEN.map((v) => (
                  <td key={v.key}>
                    {v.type === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={!!op[v.key]}
                        onChange={(e) => updateOperation(op.id, v.key, e.target.checked)}
                      />
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={op[v.key] ?? ""}
                        placeholder="-"
                        onChange={(e) =>
                          updateOperation(op.id, v.key, e.target.value === "" ? null : parseInt(e.target.value))
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
                return <td key={v.key}>{totaal != null ? `${totaal} st` : ""}</td>;
              })}
            </tr>
          </tfoot>
        </table>

        {modal && (
          <ConfirmModal
            title="Weet je het zeker?"
            message={modal.message}
            onConfirm={modal.onConfirm}
            onCancel={() => setModal(null)}
          />
        )} 
      </OfferteStapLayout>
    </div>
  );
}