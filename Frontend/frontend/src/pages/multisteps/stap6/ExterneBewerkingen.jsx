import "./ExterneBewerkingen.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useState } from "react";
import { Icon } from "@iconify/react";

const EXTERNAL_OPERATIONS = [
  { key: "zwartcoaten",    label: "Zwartcoaten",    type: "boolean" },
  { key: "parelcoaten",    label: "Parelcoaten",    type: "boolean" },
  { key: "precisieGaten",  label: "Precisie gaten", type: "number"  },
  { key: "graveren",       label: "Graveren",       type: "number"  },
];

const initialFiles = [
  { id: 1, naam: "20260120.5-S002.dxf",  zwartcoaten: false, parelcoaten: false, precisieGaten: null, graveren: null },
  { id: 2, naam: "20260120.5-S005.dxf",  zwartcoaten: true,  parelcoaten: false, precisieGaten: 3,    graveren: null },
  { id: 3, naam: "20260120.5-S008.dxf",  zwartcoaten: false, parelcoaten: true,  precisieGaten: null, graveren: 2    },
  { id: 4, naam: "20260120.5-S0014.dxf", zwartcoaten: false, parelcoaten: false, precisieGaten: null, graveren: null },
];

export default function ExterneBewerkingen() {
  const navigate = useNavigate();
  const [files, setFiles] = useState(initialFiles);

  const updateRow = (id, field, value) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const calcTotal = (field, type) => {
    if (type === "boolean") return null;
    return files.reduce((sum, f) => sum + (f[field] || 0), 0) || null;
  };

  return (
    <div className="externe-bewerkingen-page">
      <h1>Offerte calculeren</h1>
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: "23873",
          klant: "Tummers Food Processing",
          verkoper: "Senne Scheeren",
          aangemaaktOp: "10-05-2026",
        }}
        progress={{ stap: 5, totaal: 9 }}
        onPrevious={() => navigate("/stap5")}
        onNext={() => navigate("/stap7")}
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
            {files.map((file) => (
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
                        onChange={(e) => updateRow(file.id, op.key, e.target.checked)}
                      />
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={file[op.key] ?? ""}
                        placeholder="-"
                        onChange={(e) =>
                          updateRow(file.id, op.key, e.target.value === "" ? null : parseInt(e.target.value))
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
                return <td key={op.key}>{total || ""}</td>;
              })}
            </tr>
          </tfoot>
        </table>
      </OfferteStapLayout>
    </div>
  );
}