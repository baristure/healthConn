import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

import "./styles/global.css";
import "./styles/buttons.scss";
import "./styles/radiobutton.scss";
import "./styles/loading.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

import { persistor, store } from "./store/store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Redux Toolkit Provider */}
    <Provider store={store}>
      {/* Redux Persist middleware */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Router */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
