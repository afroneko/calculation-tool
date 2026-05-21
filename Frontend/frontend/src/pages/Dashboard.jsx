import "../styles/layout.css";
import "../styles/global.css";
import ClickableCard from "../components/cards/clickable/ClickableCard";
import { Icon } from "@iconify/react";

export default function Dashboard() {
  return (
   <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Welkom bij Tummers calculations</h1>

      </div>

      <div className="grid">
         <ClickableCard
        title="Offerte calculeren"
        description="Maak een nieuwe calculatie voor een offerte"
        icon="mdi:cloud"
        onClick={() => console.log("Navigate to calculatie")}
      />

       <ClickableCard
        title="Directe order calculeren"
        description="Maak een nieuwe calculatie voor een directe order"
        icon="mdi:cloud"
        onClick={() => console.log("Navigate to calculatie")}
      />
      </div>

    </div>
  );
}