import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import OfferteOphalen from "./pages/stap1/OfferteOphalen";
import Login from "./pages/login/LoginOverlay";
// import Order from "./pages/Order";
// import Offerte from "./pages/Offerte";
// import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/offerteStap1" element={<OfferteOphalen />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}