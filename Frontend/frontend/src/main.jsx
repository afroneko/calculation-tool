import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuoteProvider } from "./context/Context";
import "./styles/global.css";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <QuoteProvider>
        <App />
    </QuoteProvider>
);