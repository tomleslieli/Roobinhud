import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

const Root = ({ store }) => (
  <Provider store={store}>
    <>
    <h1>hello</h1>
    <HashRouter>
      <App />
    </HashRouter>
    </>
  </Provider>
);

export default Root;
