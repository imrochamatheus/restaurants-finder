import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import { Reset } from "styled-reset";
import { theme } from "./themes/theme";
import { ThemeProvider } from "styled-components";
import MapProvider from "./Providers/MapProvider";
import PlacesProvider from "./Providers/PlacesProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Reset />
    <ThemeProvider theme={theme}>
      <MapProvider>
        <PlacesProvider>
          <App />
        </PlacesProvider>
      </MapProvider>
    </ThemeProvider>
  </React.StrictMode>
);
