import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { RequestsProvider } from "./hooks/useRequests.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/index.tsx";
import theme from "./styles/mui/theme.ts";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RequestsProvider>
          <ToastContainer position="top-center" />
          <Router />
        </RequestsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
