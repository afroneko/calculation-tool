import "./Calculatie.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import useCalculatieStore from "../../../store/calculatieStore";



const formatEuro = (bedrag) =>
  `€ ${bedrag.toFixed(2).replace(".", ",")}`;

export default function Kostenoverzicht() {
  const navigate = useNavigate();
  const { type } = useParams();

  const { nestingData, materials, operations, externalOperations } = useCalculatieStore();

  const [kostenposten, setKostenposten] = useState([]);
  const [totaal, setTotaal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalculatie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/calculatie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nestingData,
            materials,
            operations,
            externalOperations,
          }),
        });

        if (!response.ok) throw new Error("Calculatie mislukt");

        const data = await response.json();
        setKostenposten(data.kostenposten);
        setTotaal(data.totaal);
      } catch (err) {
        setError("Er ging iets mis bij het berekenen van de kosten.");
      } finally {
        setLoading(false);
      }
    };

    if (nestingData.length > 0) fetchCalculatie();
  }, [nestingData, materials, operations, externalOperations]);

  if (loading) return <p className="kosten-laden">Kosten berekenen...</p>;
  if (error)   return <p className="kosten-fout">{error}</p>;

  return (
    <div className="kostenoverzicht-page">
      <h1>Offerte calculeren</h1>
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          offertenummer: "23873",
          klant: "Tummers Food Processing",
          verkoper: "Senne Scheeren",
          aangemaaktOp: "10-05-2026",
        }}
        progress={{ stap: 6, totaal: 9 }}
        onPrevious={() => navigate(`/stap6/${type}`)}
        onNext={() => navigate(`/stap8/${type}`)}
      >
        <h2>Kostenoverzicht</h2>
        <p>Hieronder vind je een overzicht van alle kosten op basis van de ingevulde gegevens.</p>

        <table className="kosten-tabel">
          <thead>
            <tr>
              <th className="col-kostenpost">Kostenpost</th>
              <th className="col-kostprijs">kostprijs</th>
              <th className="col-percentage">% van totaal</th>
              <th className="col-toelichting">Toelichting</th>
            </tr>
          </thead>
          <tbody>
            {kostenposten.map((post) => {
              const percentage = totaal > 0
                ? ((post.kostprijs / totaal) * 100).toFixed(1)
                : "0.0";
              return (
                <tr key={post.label}>
                  <td className="kostenpost-cel">
                    <div className="kostenpost-icoon">
                      <Icon icon={post.icon} width={20} height={20} />
                    </div>
                    <div>
                      <span className="kostenpost-label">{post.label}</span>
                      <span className="kostenpost-sublabel">{post.sublabel}</span>
                    </div>
                  </td>
                  <td className="kostprijs-cel">{formatEuro(post.kostprijs)}</td>
                  <td className="percentage-cel">{percentage}%</td>
                  <td className="toelichting-cel">{post.toelichting}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="totaal-rij">
              <td>Totale kostprijs</td>
              <td>{formatEuro(totaal)}</td>
              <td>100%</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </OfferteStapLayout>
    </div>
  );
}