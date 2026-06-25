import "./DxfInvoer.css";
import Progressbar from "../../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../../layout/OfferteStapLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import useCalculatieStore from "../../../store/calculatieStore";

export default function DxfInvoer() {
const navigate = useNavigate();
const { type } = useParams();
const inputRef = useRef(null);
const { files, addFile, removeFile, setType } = useCalculatieStore();
 
const handleFiles = (selectedFiles) => {
    setType(type);
    Array.from(selectedFiles).forEach((file) => {
      if (!file.name.endsWith(".dxf")) return;
      if (files.find((f) => f.naam === file.naam)) return;

      addFile({
        id: crypto.randomUUID(),
        naam: file.name,
        file,
      });
    });
  };

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="dxf-invoer-page">
      <h1>Dxf Invoer</h1>
      <Progressbar />

       <OfferteStapLayout
      offerte={{
        offertenummer: '23873',
        klant: 'Tummers Food Processing',
        verkoper: 'Senne Scheeren',
        aangemaaktOp: '10-05-2026',
      }}
      progress={{ stap: 1, totaal: 8 }}
      onPrevious={() => navigate('/stap1/:type')}
      onNext={() => navigate('/stap3/:type')}
    >
      
      <h2>DXF bestanden laden</h2>
      <p>Upload de DXF bestanden van de onderdelen</p>
     
     {/* <div className="dxf-invoer__upload-row"> */}
          <div
            className="dxf-invoer__dropzone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current.click()}
          >
            <Icon icon="mdi:cloud-upload-outline" width={36} height={36} className="upload-icon" />
            <p className="upload-text">Sleep bestanden hierheen of <span className="upload-link">klik om te uploaden</span></p>
            <p className="upload-subtext">Alleen .dxf bestanden</p>
            <input
              ref={inputRef}
              type="file"
              accept=".dxf"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        {/* </div> */}
 
        {/* Bestandslijst */}
        {files.length > 0 && (
          <table className="upload-table">
            <thead>
              <tr>
                <th>Bestand</th>
                <th>DXF naam</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td className="file-icon-cel">
                    <Icon icon="pepicons-pencil:file" width={20} height={20} />
                  </td>
                  <td>{file.naam}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(file.id)}
                    >
                      <Icon icon="mdi:trash-can-outline" width={18} height={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </OfferteStapLayout>
    </div>
  );
}