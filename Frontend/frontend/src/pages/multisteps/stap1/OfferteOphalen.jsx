import "./OfferteOphalen.css";
import Progressbar from "../../../components/progressbar/Progressbar";
import DetailCard from "../../../components/cards/detail/DetailCard";
import ProgressCard from "../../../components/cards/progress/ProgressCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuote } from "../../../context/Context";
import { getQuote, getOrder } from "../../../services/api";

export default function OfferteOphalen() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const {quote, setQuote} = useQuote();
  const [error, setError] = useState(null);

   const { type } = useParams(); // "offerte" of "order"

    const label = type === "offerte" ? "Offertenummer" : "Ordernummer";
    const title = type === "offerte" ? "Offerte details" : "Order details";

    const handleSubmit = async () => {
        if (!number) return;
        try {
            const data = type === "offerte"
                ? await getQuote(number)
                : await getOrder(number);
            setQuote(data);
        } catch {
            setError(`${type} niet gevonden`);
        }
    };
  return (
    <div className="page">
      <h1>{type === "offerte" ? "Offerte" : "Order"} Ophalen</h1>
      <Progressbar />

       <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder={type === "offerte" ? "Offertenummer" : "Ordernummer"}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button className="primary-button" onClick={handleSubmit}>
            {title} ophalen uit Ridder
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="grid">
          <DetailCard 
          numberLabel={type === "offerte" ? "Offertenummer" : "Ordernummer"}
          title={title}
          number={quote?.id}
          />
          <ProgressCard
          currentStep={0}
          totalSteps={8}
          onNext={() => navigate("/stap2/${type}")}
          showPrevious={false}
          />
        </div>

      </div>
    </div>
  );
}