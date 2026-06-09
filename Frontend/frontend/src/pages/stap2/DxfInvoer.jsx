import "./DxfInvoer.css";
import Progressbar from "../../components/progressbar/Progressbar";
import OfferteStapLayout from "../../layout/OfferteStapLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DxfInvoer() {
const navigate = useNavigate();
const [files, setFiles] = useState([
    "20260120.5-S002.dxf",
    "20260120.5-S005.dxf",
    "20260120.5-S008.dxf",
    "20260120.5-S0014.dxf",
  ]);
 
  function handleDrop(e) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...dropped]);
  }
 
  function handleFileInput(e) {
    const picked = Array.from(e.target.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...picked]);
  }

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
      voortgang={{ stap: 1, totaal: 8 }}
      onVorige={() => navigate('/stap/1')}
      onVolgende={() => navigate('/stap/3')}
    >
      
      <h2>DXF bestanden laden</h2>
      <p>Upload de DXF bestanden van de onderdelen</p>
     
     <div className="dxf-invoer__upload-row">
          <div
            className="dxf-invoer__dropzone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("dxf-file-input").click()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 15V3m0 12-4-4m4 4 4-4" />
              <path d="M2 17v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2" />
            </svg>
            Sleep bestanden hierheen of klik om te uploaden
          </div>
 
          <label className="dxf-invoer__add-btn">
            <input
              id="dxf-file-input"
              type="file"
              multiple
              accept=".dxf"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Bestanden toevoegen
          </label>
        </div>
 
        {/* Bestandslijst */}
        {files.length > 0 && (
          <div className="dxf-invoer__file-list">
            <span className="dxf-invoer__file-list-header">DXF</span>
            {files.map((name, i) => (
              <div key={i} className="dxf-invoer__file-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span>{name}</span>
              </div>
            ))}
          </div>
        )}
    </OfferteStapLayout>
    </div>
  );
}