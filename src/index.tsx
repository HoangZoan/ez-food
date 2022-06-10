import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import theme from "./shared/theme";
import ScrollToTop from "components/ScrollToTop";

import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
