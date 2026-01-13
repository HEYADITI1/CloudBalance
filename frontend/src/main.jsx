// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>

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
