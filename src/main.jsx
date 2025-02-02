// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tus estilos globales
import "primereact/resources/themes/lara-light-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css"; // Estilos generales
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
