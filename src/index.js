import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import { Reset } from "styled-reset";
import { CssBaseline } from "@mui/material";
import MapProvider from "./Providers/MapProvider";
import PlacesProvider from "./Providers/PlacesProvider";
import DirectionsProvider from "./Providers/DirectionsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <MapProvider>
    <DirectionsProvider>
      <PlacesProvider>
        <CssBaseline />
        <Reset />
        <App />
      </PlacesProvider>
    </DirectionsProvider>
  </MapProvider>
  //</React.StrictMode>
);
