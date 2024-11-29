import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import App from "./App.jsx";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </Router>
);
