import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import OfferteOphalen from "./pages/multisteps/stap1/OfferteOphalen";
import Login from "./pages/login/LoginOverlay";
import DxfInvoer from "./pages/multisteps/stap2/DxfInvoer";
import Materiaal from "./pages/multisteps/stap3/Materiaal";
import Nesting from "./pages/multisteps/stap4/Nesting";
import Bewerkingen from "./pages/multisteps/stap5/Bewerkingen";
import ExterneBewerkingen from "./pages/multisteps/stap6/ExterneBewerkingen";
import Calculatie from "./pages/multisteps/stap7/Calculatie";
import Controle from "./pages/multisteps/stap8/Controle";
import Export from "./pages/multisteps/stap9/Export";
import Algemeen from "./pages/settings/algemeen/Algemeen";
import Materialen from "./pages/settings/materialen/Materialen";
import Tarrifs from "./pages/settings/tarieven/Tarrifs";
import Normtijden from "./pages/settings/normtijden/Normtijden";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stap1" element={<OfferteOphalen />} />
          <Route path="/stap2" element={<DxfInvoer />} />
          <Route path="/stap3" element={<Materiaal />} />
          <Route path="/stap4" element={<Nesting />} />
          <Route path="/stap5" element={<Bewerkingen />} />
          <Route path="/stap6" element={<ExterneBewerkingen />} />
          <Route path="/stap7" element={<Calculatie />} />
          <Route path="/stap8" element={<Controle />} />
          <Route path="/stap9" element={<Export />} />
          <Route path="/instellingen/algemeen" element={<Algemeen />} />
          <Route path="/instellingen/materialen" element={<Materialen />} />
          <Route path="/instellingen/tarieven" element={<Tarrifs />} />
          <Route path="/instellingen/normtijden" element={<Normtijden />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}