import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import theme from "./shared/theme";
import ScrollToTop from "components/ScrollToTop";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { v4 as uuid } from "uuid";

import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { QueryClient, QueryClientProvider } from "react-query";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY!,
  uuid: uuid(),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PubNubProvider client={pubnub}>
        <ScrollToTop />

        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </PubNubProvider>
    </BrowserRouter>
  </React.StrictMode>
);
