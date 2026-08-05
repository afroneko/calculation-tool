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
import Gebruikers from "./pages/settings/gebruikers/Gebruikers";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stap1/:type" element={<OfferteOphalen />} />
          <Route path="/stap2/:type" element={<DxfInvoer />} />
          <Route path="/stap3/:type" element={<Materiaal />} />
          <Route path="/stap4/:type" element={<Nesting />} />
          <Route path="/stap5/:type" element={<Bewerkingen />} />
          <Route path="/stap6/:type" element={<ExterneBewerkingen />} />
          <Route path="/stap7/:type" element={<Calculatie />} />
          <Route path="/stap8/:type" element={<Controle />} />
          <Route path="/stap9/:type" element={<Export />} />

          <Route path="/instellingen/algemeen" element={<ProtectedRoute><Algemeen /></ProtectedRoute>} />
          <Route path="/instellingen/materialen" element={<ProtectedRoute><Materialen /></ProtectedRoute>} />
          <Route path="/instellingen/tarieven" element={<ProtectedRoute><Tarrifs /></ProtectedRoute>} />
          <Route path="/instellingen/normtijden" element={<ProtectedRoute><Normtijden /></ProtectedRoute>} />
          <Route path="/instellingen/gebruikers" element={<ProtectedRoute><Gebruikers /></ProtectedRoute>} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}