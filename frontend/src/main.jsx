// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer 
        position="top-right"
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
