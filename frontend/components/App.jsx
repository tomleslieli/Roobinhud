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
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <div className='header-container'>
        <HeaderContainer />
      </div>
    </header>

    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
    </Switch>

    <div className='body-container'>
      <BodyContainer />
    </div>
    <footer>
      <div className='footer'>
        
      </div>
    </footer>
  </div>
);

export default App;
