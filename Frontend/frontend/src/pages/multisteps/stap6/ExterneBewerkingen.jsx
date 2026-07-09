import "./ExterneBewerkingen.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate, useParams } from "react-router-dom";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import useCalculatieStore from "../../../store/calculatieStore";

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

  const calcTotal = (field, fieldType) => {
    if (fieldType === "boolean") return null;
    return externalOperations.reduce((sum, o) => sum + (o[field] || 0), 0) || null;
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
        progress={{ stap: 5, totaal: 9 }}
        onPrevious={() => navigate(`/stap5/${type}`)}
        onNext={() => navigate(`/stap7/${type}`)}
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
      </OfferteStapLayout>
    </div>
  );
}