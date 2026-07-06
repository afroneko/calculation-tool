import "./Controle.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import StatusCard from "../../../components/cards/status/StatusCard";
import DropdownCard from "../../../components/cards/dropdown/DropdownCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const sections = [
  {
    title: "Materiaal & diktes",
    status: "error",
    alerts: [
      {
        type: "error",
        title: "Dikte ontbreekt bij 2 onderdelen",
        description: "Bij de volgende onderdelen is geen dikte opgegeven",
        step: "/stap3/:type",
        stepNumber: 3,
        files: ["20260120.5-S008.dxf", "20260120.5-S0014.dxf"],
      },
    ],
  },
  {
    title: "Nesting",
    status: "warning",
    alerts: [
      {
        type: "warning",
        title: "Inefficiënte plaatbenutting",
        description: "2 platen hebben een benutting onder 60%",
        step: "/stap4/:type",
        stepNumber: 4,
      },
      {
        type: "warning",
        title: "Grote reststrook",
        description: "Plaat RVS316 wgw 10mm heeft een reststrook van meer dan 30%",
        step: "/stap4/:type",
        stepNumber: 4,
      },
    ],
  },
  { title: "Bewerkingen", status: "success", alerts: [] },
  { title: "Calculatie",  status: "success", alerts: [] },
  { title: "Algemeen",    status: "success", alerts: [] },
];

export default function Controle() {
  const navigate = useNavigate();
  const [allOpen, setAllOpen] = useState(false);

  const successful  = sections.filter((s) => s.status === "success").length;
  const warnings    = sections.flatMap((s) => s.alerts).filter((a) => a.type === "warning").length;
  const errors      = sections.flatMap((s) => s.alerts).filter((a) => a.type === "error").length;
  const total       = successful + warnings + errors;

  return (
    <div className="controle-page">
      <h1>Offerte calculeren</h1>
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: "23873",
          klant: "Tummers Food Processing",
          verkoper: "Senne Scheeren",
          aangemaaktOp: "10-05-2026",
        }}
        progress={{ stap: 7, totaal: 9 }}
        onPrevious={() => navigate(`/stap7/${type}`)}
        onNext={() => navigate(`/stap9/${type}`)}
      >
        <h2>Controle & validatie</h2>
        <p>Hieronder zie je een overzicht van de controles. Los de waarschuwingen of fouten op voordat je verder gaat.</p>

        <div className="status-cards">
          <StatusCard type="success" count={successful} label="Succesvol"      sublabel="Controles doorstaan" />
          <StatusCard type="warning" count={warnings}   label="Waarschuwingen" sublabel="Aanbevolen actie" />
          <StatusCard type="error"   count={errors}     label="Fout"           sublabel="Actie vereist" />
          <StatusCard type="info"    count={total}      label="Totaal"         sublabel="Uitgevoerde controles" />
        </div>

        <div className="expand-all-row">
          <button className="expand-all-button" onClick={() => setAllOpen((v) => !v)}>
            {allOpen ? "Alles inklappen ∧" : "Alles uitvouwen ∨"}
          </button>
        </div>

        <div className="dropdown-cards">
          {sections.map((section) => (
            <DropdownCard
              key={section.title}
              title={section.title}
              status={section.status}
              alerts={section.alerts}
              forceOpen={allOpen}
            />
          ))}
        </div>
      </OfferteStapLayout>
    </div>
  );
}