import "./Dashboard.css";
import ClickableCard from "../components/cards/clickable/ClickableCard";
import DescriptionCard from "../components/cards/description/DescriptionCard";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
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
        onClick={() => navigate("/offerteStap1")}
      />

       <ClickableCard
        title="Directe order calculeren"
        description="Maak een nieuwe calculatie voor een directe order"
        icon="mdi:cloud"
        onClick={() => console.log("Navigate to calculatie")}
      />
      </div>

      <div>
        <DescriptionCard
          title="Uitleg"
          description="Tummers calulations maakt gebruik van een stappensysteem.
          Na het ophalen van de offerte- of directe order gegevens, start het proces.
          Door middel van de progress bar kun je zien in welke stap van het proces je je begeeft,
          en je kunt ook altijd terug naar vorige stappen.
          Overzichten en dergelijke zijn op het eind eenvoudig te exporteren. Eventueel kan er voor het aanpassen van de tarieven ingelogd worden met een admin account."
        />
      </div>

    </div>
  );
}