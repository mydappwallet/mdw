/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import { LocalizeProvider } from "react-localize-redux";
import rootRecuder from "reducers";
import App from "App";
import * as serviceWorker from "serviceWorker";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

const store = createStore(rootRecuder, applyMiddleware(promiseMiddleware(), thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SoftUIControllerProvider>
        <LocalizeProvider store={store}>
          <App />
        </LocalizeProvider>
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
