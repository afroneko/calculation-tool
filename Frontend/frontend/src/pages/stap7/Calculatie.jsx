import "./Calculatie.css";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import Progressbar from "../../components/progressbar/Progressbar";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const kostenposten = [
  {
    icon: "pepicons-pencil:file",
    label: "Materiaal",
    sublabel: "RVS 304, RVS316 | Diverse diktes",
    kostprijs: 210.43,
    toelichting: "Gebaseerd op nesting en materiaalkosten",
  },
  {
    icon: "iconamoon:clock-light",
    label: "Snijtijd",
    sublabel: "Lasersnijden",
    kostprijs: 56.75,
    toelichting: "Totale snijtijd: 2u 14m",
  },
  {
    icon: "material-symbols-light:devices-fold-outline",
    label: "Zetting",
    sublabel: "Kantbewerkingen",
    kostprijs: 29.96,
    toelichting: "Totaal 18 zettingen",
  },
  {
    icon: "pepicons-pencil:square-off",
    label: "Laswerk",
    sublabel: "Lasmeters en -tijd",
    kostprijs: 86.71,
    toelichting: "Totale lengte en tijd: 24,6m en 30m",
  },
  {
    icon: "fluent:person-wrench-20-regular",
    label: "Overige bewerkingen",
    sublabel: "boren, tappen, gaten, walsen",
    kostprijs: 38.59,
    toelichting: "Inclusief uitbreken en afbramen",
  },
  {
    icon: "hugeicons:package-receive",
    label: "Verpakking",
    sublabel: "Verpakken en afhandelen",
    kostprijs: 14.07,
    toelichting: "Standaard verpakking",
  },
  {
    icon: "vaadin:euro",
    label: "Algemene kosten",
    sublabel: "WVB, Opslag inkoop en magazijn, transport",
    kostprijs: 20.43,
    toelichting: "Bedrijfskosten",
  },
  {
    icon: "ant-design:stock-outlined",
    label: "Winst & risico",
    sublabel: "Marge",
    kostprijs: 9.53,
    toelichting: "Inschatting risico en marge",
  },
];

const formatEuro = (bedrag) =>
  `€ ${bedrag.toFixed(2).replace(".", ",")}`;

export default function Kostenoverzicht() {
  const navigate = useNavigate();

  const totaal = kostenposten.reduce((sum, k) => sum + k.kostprijs, 0);

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
        progress={{ stap: 7, totaal: 9 }}
        onPrevious={() => navigate("/stap7")}
        onNext={() => navigate("/stap9")}
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
              const percentage = ((post.kostprijs / totaal) * 100).toFixed(1);
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