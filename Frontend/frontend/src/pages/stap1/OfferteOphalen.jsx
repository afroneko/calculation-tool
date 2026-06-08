import "./OfferteOphalen.css";
import Progressbar from "../../components/progressbar/Progressbar";
import DetailCard from "../../components/cards/detail/DetailCard";
import ProgressCard from "../../components/cards/progress/ProgressCard";
import { useNavigate } from "react-router-dom";

export default function OfferteOphalen() {
  return (
    <div className="page">
      <h1>Offerte Ophalen</h1>
      <Progressbar />

       <div className="content">
        <button className="primary-button">
          Offerte gegevens ophalen uit Ridder
        </button>

        <div className="grid">
          <DetailCard />
          <ProgressCard />
        </div>

        <div className="actions">
          <button className="next-button" onClick={() => navigate("/stap2")}>
            Volgende stap →
          </button>
        </div>
      </div>
      </div>
  );
}