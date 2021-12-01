import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Amplify from "aws-amplify";

import awsExports from "./aws-exports";
import store from "./redux";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
