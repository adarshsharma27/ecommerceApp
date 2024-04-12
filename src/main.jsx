import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        clientId:
          "AXTg35_iD_-XVjuIAO0Ak0H9-Ako4dLoW-KK9AdMdUeWFaC3BdWB-SdWGzc124ODLhnsTuSn_XJsta_A",
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
