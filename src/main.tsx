import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
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
        <ToastContainer position="top-center" />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
