import "../Settings.css";
import SettingsLayout from "../../../layout/SettingsLayout";
import { Icon } from "@iconify/react";
import { useState } from "react";

const initialNormtijden = [
  { id: 1, icon: "material-symbols-light:devices-fold-outline", label: "Zetting 1e man",   sublabel: "Kantbewerkingen",          unit: "min / zetting", time: 3.5  },
  { id: 2, icon: "material-symbols-light:devices-fold-outline", label: "Zetting 2e man",   sublabel: "Kantbewerkingen",          unit: "min / zetting", time: 2.0  },
  { id: 3, icon: "pepicons-pencil:square-off",                  label: "Laswerk",          sublabel: "Lasmeters en -tijd",       unit: "min / meter",   time: 8.0  },
  { id: 4, icon: "fluent:person-wrench-20-regular",             label: "Boren",            sublabel: "Per gat",                  unit: "min / gat",     time: 1.5  },
  { id: 5, icon: "fluent:person-wrench-20-regular",             label: "Tappen",           sublabel: "Per gat",                  unit: "min / gat",     time: 2.0  },
  { id: 6, icon: "fluent:person-wrench-20-regular",             label: "Verzinken",        sublabel: "Per gat",                  unit: "min / gat",     time: 1.0  },
  { id: 7, icon: "ant-design:stock-outlined",                   label: "Walsen",           sublabel: "Per meter",                unit: "min / meter",   time: 4.0  },
  { id: 8, icon: "vaadin:euro",                                 label: "Afbramen",         sublabel: "Per onderdeel",            unit: "min / stuk",    time: 2.5  },
  { id: 9, icon: "hugeicons:package-receive",                   label: "Verpakken",        sublabel: "Verpakken en afhandelen",  unit: "min / stuk",    time: 3.0  },
];

export default function Normtijden() {
  const [normtijden, setNormtijden] = useState(initialNormtijden);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.time.toString().replace(".", ","));
  };

  const saveEdit = (id) => {
    const parsed = parseFloat(editValue.replace(",", "."));
    if (!isNaN(parsed)) {
      setNormtijden((prev) => prev.map((n) => n.id === id ? { ...n, time: parsed } : n));
    }
    setEditingId(null);
  };

  const deleteItem = (id) => setNormtijden((prev) => prev.filter((n) => n.id !== id));

  const formatTime = (time) =>
    time.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <SettingsLayout title="Normtijden" description="Beheer de standaard tijden per bewerking">
      <h3 className="section-subtitle">Bewerkingstijden</h3>

      <table className="settings-table">
        <thead>
          <tr>
            <th className="col-item">Bewerking</th>
            <th className="col-unit">Eenheid</th>
            <th className="col-value">Normtijd</th>
            <th className="col-actions">Acties</th>
          </tr>
        </thead>
        <tbody>
          {normtijden.map((item) => (
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
                  formatTime(item.time)
                )}
              </td>
              <td className="actions-cell">
                <button className="action-btn" onClick={() => startEdit(item)}>
                  <Icon icon="mdi:pencil-outline" width={18} height={18} />
                </button>
                <button className="action-btn action-btn--delete" onClick={() => deleteItem(item.id)}>
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