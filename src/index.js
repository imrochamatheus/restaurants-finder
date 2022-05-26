import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import { Reset } from "styled-reset";
import { theme } from "./themes/theme";
import { ThemeProvider } from "styled-components";
import MapProvider from "./Providers/MapProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <MapProvider>
    <Reset />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </MapProvider>
  // </React.StrictMode>
);
