import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import { Reset } from "styled-reset";
import { CssBaseline } from "@mui/material";
import MapProvider from "./Providers/MapProvider";
import PlacesProvider from "./Providers/PlacesProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <MapProvider>
    <CssBaseline />
    <PlacesProvider>
      <Reset />
      <App />
    </PlacesProvider>
  </MapProvider>
  //</React.StrictMode>
);
