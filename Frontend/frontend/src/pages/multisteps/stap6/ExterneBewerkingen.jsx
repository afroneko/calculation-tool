import "./ExterneBewerkingen.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate, useParams } from "react-router-dom";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useCalculatieStore from "../../../store/calculatieStore";
import { valideerStap } from "../../../services/validatie";
import ConfirmModal from "../../../components/modal/ConfirmModal";

// ----> 6TH STEP PAGE: EXTERNAL OPERATIONS <----

const EXTERNAL_OPERATIONS = [
  { key: "zwartcoaten",    label: "Zwartcoaten",    type: "boolean" },
  { key: "parelcoaten",    label: "Parelcoaten",    type: "boolean" },
  { key: "precisieGaten",  label: "Precisie gaten", type: "number"  },
  { key: "graveren",       label: "Graveren",       type: "number"  },
];



export default function ExterneBewerkingen() {
  const navigate = useNavigate();
  const { type } = useParams();

  const { files, externalOperations, setExternalOperations, updateExternalOperation, document } = useCalculatieStore();

  // Effect to initialize external operations based on the uploaded files, ensuring that each file has a corresponding external operation entry in the store
  useEffect(() => {
    if (files.length === 0) return;

    const initialized = files.map((file) => {
      const existing = externalOperations.find((o) => o.id === file.id);
      return existing ?? {
        id: file.id,
        naam: file.naam,
        zwartcoaten: false,
        parelcoaten: false,
        precisieGaten: null,
        graveren: null,
      };
    });

    setExternalOperations(initialized);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // Function to calculate the total for a specific field across all external operations, returning null for boolean fields
  const calcTotal = (field, fieldType) => {
    if (fieldType === "boolean") return null;
    return externalOperations.reduce((sum, o) => sum + (o[field] || 0), 0) || null;
  };

  const [modal, setModal] = useState(null);
  const [fout, setFout] = useState(null);
  const store = useCalculatieStore();
  const handleNext = () => {
    const validatie = valideerStap(6, store);

    if (!validatie.geldig) {
      setFout(validatie.fout);
      return;
    }

    if (validatie.waarschuwing) {
      setModal({
        message: validatie.waarschuwing,
        onConfirm: () => {
          setModal(null);
          navigate(`/stap7/${type}`);
        },
      });
      return;
    }

    setFout(null);
    navigate(`/stap7/${type}`);
  };

  return (
    <div className="externe-bewerkingen-page">
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: document?.quoteNumber ?? "-",
          klant: document?.customer ?? "-",
          verkoper: document?.salesperson ?? "-",
          aangemaaktOp: document?.createdAt ?? "-",
        }}
        progress={{ stap: 5, totaal: 8 }}
        onPrevious={() => navigate(`/stap5/${type}`)}
        onNext={handleNext}
      >
        <h2>Externe bewerkingen</h2>
        <p>Hier kunnen externe bewerkingen worden toegevoegd</p>

        <table className="externe-bewerkingen-tabel">
          <thead>
            <tr>
              <th>Afbeelding</th>
              <th>DXF naam</th>
              {EXTERNAL_OPERATIONS.map((op) => (
                <th key={op.key}>{op.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {externalOperations.map((file) => (
              <tr key={file.id}>
                <td className="afbeelding-cel">
                  <Icon icon="pepicons-pencil:file" width={20} height={20} />
                </td>
                <td>{file.naam}</td>
                {EXTERNAL_OPERATIONS.map((op) => (
                  <td key={op.key}>
                    {op.type === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={!!file[op.key]}
                        onChange={(e) => updateExternalOperation(file.id, op.key, e.target.checked)}
                      />
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={file[op.key] ?? ""}
                        placeholder="-"
                        onChange={(e) =>
                          updateExternalOperation(file.id, op.key, e.target.value === "" ? null : parseInt(e.target.value))
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
            <tr className="total-row">
              <td />
              <td>Totaal</td>
              {EXTERNAL_OPERATIONS.map((op) => {
                const total = calcTotal(op.key, op.type);
                return <td key={op.key}>{total != null ? `${total} min` : ""}</td>;
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