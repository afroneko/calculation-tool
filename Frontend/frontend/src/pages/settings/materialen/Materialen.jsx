import "./Materialen.css";
import "../Settings.css";
import SettingsLayout from "../../../layout/SettingsLayout";
import { Icon } from "@iconify/react";
import { useState } from "react";

const initialMaterials = [
  { id: 1,  category: "Staal",     name: "S235",  thickness: "1mm",  foil: false, pricePerKg: 0.85 },
  { id: 2,  category: "Staal",     name: "S235",  thickness: "2mm",  foil: false, pricePerKg: 0.82 },
  { id: 3,  category: "Staal",     name: "S355",  thickness: "3mm",  foil: false, pricePerKg: 0.90 },
  { id: 4,  category: "Staal",     name: "S355",  thickness: "5mm",  foil: false, pricePerKg: 0.88 },
  { id: 5,  category: "RVS",       name: "304 zf", thickness: "1mm", foil: false, pricePerKg: 3.20 },
  { id: 6,  category: "RVS",       name: "304 zf", thickness: "2mm", foil: false, pricePerKg: 3.15 },
  { id: 7,  category: "RVS",       name: "316 wgw",thickness: "3mm", foil: true,  pricePerKg: 4.10 },
  { id: 8,  category: "RVS",       name: "316 wgw",thickness: "5mm", foil: true,  pricePerKg: 4.05 },
  { id: 9,  category: "Aluminium", name: "5754",  thickness: "1mm",  foil: true,  pricePerKg: 2.60 },
  { id: 10, category: "Aluminium", name: "5754",  thickness: "2mm",  foil: true,  pricePerKg: 2.55 },
  { id: 11, category: "Aluminium", name: "6082",  thickness: "3mm",  foil: false, pricePerKg: 2.80 },
];

const categories = ["Alle", "Staal", "RVS", "Aluminium"];

export default function Materialen() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const filtered = activeCategory === "Alle"
    ? materials
    : materials.filter((m) => m.category === activeCategory);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.pricePerKg.toString().replace(".", ","));
  };

  const saveEdit = (id) => {
    const parsed = parseFloat(editValue.replace(",", "."));
    if (!isNaN(parsed)) {
      setMaterials((prev) => prev.map((m) => m.id === id ? { ...m, pricePerKg: parsed } : m));
    }
    setEditingId(null);
  };

  const deleteItem = (id) => setMaterials((prev) => prev.filter((m) => m.id !== id));

  return (
    <SettingsLayout title="Materialen" description="Beheer materiaalsoorten, diktes en prijzen">
      <div className="materials-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <table className="settings-table">
        <thead>
          <tr>
            <th className="col-item">Materiaal</th>
            <th className="col-unit">Dikte</th>
            <th className="col-unit">Folie</th>
            <th className="col-value">Prijs / kg</th>
            <th className="col-actions">Acties</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td className="item-cell">
                <div className="item-icon">
                  <Icon icon="pepicons-pencil:file" width={18} height={18} />
                </div>
                <div>
                  <span className="item-label">{item.category} {item.name}</span>
                  <span className="item-sublabel">{item.category}</span>
                </div>
              </td>
              <td className="unit-cell">{item.thickness}</td>
              <td className="unit-cell">
                <span className={`foil-badge ${item.foil ? "foil-badge--yes" : "foil-badge--no"}`}>
                  {item.foil ? "Ja" : "Nee"}
                </span>
              </td>
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
                  `€ ${item.pricePerKg.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`
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