import "../styles/layout.css";
import ClickableCard from "../components/cards/ClickableCard";

export default function Dashboard() {
  return (
   <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Welkom bij Tummers calculations</h1>

      </div>

      <div className="grid">
        <div className="leftColumn">
           <ClickableCard
              key={plant.plant_id}
              name={plant.plant_name}
              species={plantTypes[plant.plant_id] || "Loading..."}
              image={cactusPfp}
            />
        </div>
           <ClickableCard
              key={plant.plant_id}
              name={plant.plant_name}
              species={plantTypes[plant.plant_id] || "Loading..."}
              image={cactusPfp}
            />
      </div>

    </div>
  );
}