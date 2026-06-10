import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import OfferteOphalen from "./pages/stap1/OfferteOphalen";
import Login from "./pages/login/LoginOverlay";
import DxfInvoer from "./pages/stap2/DxfInvoer";
import Materiaal from "./pages/stap3/Materiaal";
import Nesting from "./pages/stap4/Nesting";
import Bewerkingen from "./pages/stap5/Bewerkingen";
import ExterneBewerkingen from "./pages/stap6/ExterneBewerkingen";
import Calculatie from "./pages/stap7/Calculatie";
import Controle from "./pages/stap8/Controle";
import Export from "./pages/stap9/Export";

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
          
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}