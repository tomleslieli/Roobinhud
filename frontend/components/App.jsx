import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

// import SearchContainer from './search/search_container';
import HeaderContainer from './header/header_container';
import BodyContainer from './body/body_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import ShowStockContainer from './stock/show_stock_container';
import Invest from './invest/invest'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (

  <div className='app'>
    <header>
      <div className='header-container'>
        <HeaderContainer store = {store}/>
      </div>
    </header>

    <Switch>
      <AuthRoute exact path='/login' component={LogInFormContainer} />
      <AuthRoute exact path='/signup' component={SignUpFormContainer} />
      <AuthRoute exact path='/invest' component={Invest} />
      <ProtectedRoute exact path='/stocks/:stockId' component={ShowStockContainer} />
      <BodyContainer store={store}/>
    </Switch>
  </div>
);

export default App;
