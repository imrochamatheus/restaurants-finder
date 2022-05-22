import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Reset />
    <App />
  </React.StrictMode>
);
