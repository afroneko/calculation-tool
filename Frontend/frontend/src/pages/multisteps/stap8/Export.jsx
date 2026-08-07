import "./Export.css";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import Progressbar from "../../../components/progressbar/Progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import useCalculatieStore from "../../../store/calculatieStore";
import { genereerPdf } from "../../../services/pdfService";
import { exportNaarRidder } from "../../../services/exportService";
import { openMail } from "../../../services/mailService";
import { useState } from "react";

// ----> FINAL STEP PAGE: EXPORT <----

export default function Export() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { documentId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials } = useCalculatieStore();
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFout, setExportFout] = useState(null);
  const [exportSucces, setExportSucces] = useState(false);

  // Function to handle the export process, including setting loading state, handling errors, and calling the export service
  const handleExport = async () => {
    setExportLoading(true);
    setExportFout(null);
    try {
      await exportNaarRidder(document.orderId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials);
      setExportSucces(true);
    } catch (err){
      console.log(err);
      setExportFout("Export mislukt. Probeer het opnieuw.");
    } finally {
      setExportLoading(false);
    }
  };

  // Function to handle the PDF download, calling the PDF generation service with the necessary data
  const handleDownloadPdf = () => {
    genereerPdf(document, nestingData, operations, kostenposten, totaal);
  };
  // Function to handle the email sending, calling the mail service with the necessary data
  const handleMail = () => {
    console.log("Mail knop ingedrukt");
    openMail(document, nestingData, operations, kostenposten, totaal);
  }

  return (
    <div className="export-page">
      <Progressbar />

      <OfferteStapLayout
        offerte={{
          id: document?.quoteId ?? "-",
          offertenummer: document?.quoteNumber ?? "-",
          klant: document?.customer ?? "-",
          verkoper: document?.salesperson ?? "-",
          aangemaaktOp: document?.createdAt ?? "-",
        }}
        progress={{ stap: 8, totaal: 8 }}
        onPrevious={() => navigate(`/stap7/${type}`)}
        onNext={null}
      >
        <h2>Exporteren naar Ridder</h2>
        <p>Controleer de samenvatting en exporteer de calculatie naar Ridder.</p>

        <div className="export-success-banner">
          <Icon icon="icon-park-outline:check-one" width={22} height={22} className="export-success-icon" />
          <div>
            <p className="export-success-title">Calculatie is klaar om geëxporteerd te worden</p>
            <p className="export-success-description">Alle controles zijn succesvol doorstaan. De gegevens zijn volledig en valide.</p>
          </div>
        </div>

        <div className="export-content">
          <div className="export-info-card">
            <p className="export-info-title">Exportinformatie</p>
            <table className="export-info-table">
              <tbody>
                {[
                  ["Id",            document?.quoteId ?? "-"],
                  ["Offertenummer", document?.quoteNumber ?? "-"],
                  ["Klant",         document?.customer ?? "-"],
                  ["Verkoper",      document?.salesperson ?? "-"],
                  ["Aangemaakt op", document?.createdAt ?? "-"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="info-label">{label}</td>
                    <td className="info-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="export-actions">
            <div className="export-actions-group">
              <p className="export-actions-title">Voorblad</p>
              <button className="export-action-button" onClick={handleDownloadPdf}>
                Downloaden als pdf
                <Icon icon="pepicons-pencil:file" width={18} height={18} />
              </button>
              <button className="export-action-button" onClick={handleMail}>
                Doormailen
                <Icon icon="mdi:email-outline" width={18} height={18} />
              </button>
            </div>

            {exportFout && <p className="export-fout">{exportFout}</p>}
            {exportSucces && <p className="export-succes">Export succesvol verstuurd naar Ridder!</p>}


            <div className="export-actions-group">
              <p className="export-actions-title">Calculatie</p>
              <button
                className="export-action-button export-action-button--primary"
                onClick={handleExport}
                disabled={exportLoading}
              >
                {exportLoading ? "Exporteren..." : "Exporteren naar Ridder"}
                <Icon icon="mdi:export" width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </OfferteStapLayout>
    </div>
  );
}