import React from "react";
import { Provider } from "react-redux";
import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";

import HeaderContainer from "./header/header_container";
import BodyContainer from "./body/body_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import LogInFormContainer from "./session_form/login_form_container";
import ShowStock from "./stock/show_stock";
import Invest from "./invest/invest";
import Cash from "./cash/cash";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

const App = () => (
  <div className="app">
    <header>
      <div className="header-container">
        <HeaderContainer store={store} />
      </div>
    </header>

    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/invest" component={Invest} />
      <Route exact path="/" component={BodyContainer} />
      <Route exact path="/stocks/:ticker" component={ShowStock} store={store} />
      <ProtectedRoute exact path="/cash" component={Cash} />
    </Switch>
  </div>
);

export default App;
