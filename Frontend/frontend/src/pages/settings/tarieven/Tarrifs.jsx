import "../Settings.css";
import SettingsLayout from "../../../layout/SettingsLayout";
import { Icon } from "@iconify/react";
import { useState } from "react";

const initialRates = [
  { id: 1, icon: "pepicons-pencil:file",                      label: "Lasersnijden",                    sublabel: "RVS 304, RVS316 | Diverse diktes", unit: "€ / min", rate: 2.63  },
  { id: 2, icon: "iconamoon:clock-light",                     label: "W.v.b",                           sublabel: "Lasersnijden",                     unit: "€ / uur", rate: 91.00 },
  { id: 3, icon: "material-symbols-light:devices-fold-outline",label: "Zetwerk machine + 1e man",        sublabel: "Kantbewerkingen",                  unit: "€ / uur", rate: 85.00 },
  { id: 4, icon: "pepicons-pencil:square-off",                label: "Plaatwerk 2e man",                sublabel: "Lasmeters en -tijd",               unit: "€ / uur", rate: 75.00 },
  { id: 5, icon: "fluent:person-wrench-20-regular",           label: "Zaagwerk/lassen/beitsen/schuren", sublabel: "boren, tappen, gaten, walsen",      unit: "€ / uur", rate: 75.00 },
  { id: 6, icon: "hugeicons:package-receive",                 label: "Boren/tappen/gaten verzinken",    sublabel: "Verpakken en afhandelen",          unit: "€ / uur", rate: 70.00 },
  { id: 7, icon: "vaadin:euro",                               label: "Uitbreken/afbramen/trommelontbramen", sublabel: "WVB, Opslag inkoop en magazijn, transport", unit: "€ / uur", rate: 64.00 },
  { id: 8, icon: "ant-design:stock-outlined",                 label: "Walsen",                          sublabel: "Marge",                            unit: "€ / uur", rate: 136.50 },
  { id: 9, icon: "hugeicons:package-receive",                 label: "verpakken",                       sublabel: "Verpakken en afhandelen",          unit: "€ / uur", rate: 64.00 },
];

export default function Tarrifs() {
  const [rates, setRates] = useState(initialRates);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.rate.toString().replace(".", ","));
  };

  const saveEdit = (id) => {
    const parsed = parseFloat(editValue.replace(",", "."));
    if (!isNaN(parsed)) {
      setRates((prev) => prev.map((r) => r.id === id ? { ...r, rate: parsed } : r));
    }
    setEditingId(null);
  };

  const deleteRate = (id) => {
    setRates((prev) => prev.filter((r) => r.id !== id));
  };

  const formatRate = (rate) =>
    rate.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <SettingsLayout
      title="Tarieven"
      description="Beheer de standaard tarieven per machine en bewerking"
    >
      <h3 className="section-subtitle">Uurtarieven</h3>

      <table className="settings-table">
        <thead>
          <tr>
            <th className="col-item">Kostenpost</th>
            <th className="col-unit">Eenheid</th>
            <th className="col-value">Standaard tarief</th>
            <th className="col-actions">Acties</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((item) => (
            <tr key={item.id}>
              <td className="item-cell">
                <div className="item-icon">
                  <Icon icon={item.icon} width={18} height={18} />
                </div>
                <div>
                  <span className="item-label">{item.label}</span>
                  <span className="item-sublabel">{item.sublabel}</span>
                </div>
              </td>
              <td className="unit-cell">{item.unit}</td>
              <td className="value-cell">
                {editingId === item.id ? (
                  <input
                    className="value-input"
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(item.id)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                  />
                ) : (
                  formatRate(item.rate)
                )}
              </td>
              <td className="actions-cell">
                <button className="action-btn" onClick={() => startEdit(item)}>
                  <Icon icon="mdi:pencil-outline" width={18} height={18} />
                </button>
                <button className="action-btn action-btn--delete" onClick={() => deleteRate(item.id)}>
                  <Icon icon="mdi:trash-can-outline" width={18} height={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SettingsLayout>
  );
}