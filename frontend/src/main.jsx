import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Create the root element using createRoot
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the App component inside BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
