import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import OfferteOphalen from "./pages/stap1/OfferteOphalen";
import Login from "./pages/login/LoginOverlay";
import DxfInvoer from "./pages/stap2/DxfInvoer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stap1" element={<OfferteOphalen />} />
          <Route path="/stap2" element={<DxfInvoer />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}