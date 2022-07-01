import React from 'react'
import { Link } from 'react-router-dom';
import CreateStockContainer from '../stock/create_stock_container';

const Header = ({ currentUser, logout }) => {

  const sessionLinks = () => (
    <div className='header-signed-out'>
      <div className='header-logo-signed-out'>
        <Link to="/">
          {/* <img className='logo-full-green' id='logo-full-green' src='https://robinhood-clone-assets.s3.amazonaws.com/logo_full_green.png' alt='logo-full-black' width='135px'/> */}
          <img className='logo-full-black' id='logo-full-black' src='https://robinhood-clone-assets.s3.amazonaws.com/logo_full_black.png' alt='logo-full-black' width='135px'/>
        </Link>
      </div>
      <div className='header-info-container'>
        <div className='header-info'>
          <span className='header-info-links'>
          <Link to='/invest' id='link' className='invest'>Invest</Link>
          <a href='https://github.com/tomleslieli/robinhood' id='link' className='github-signed-out'>Github</a>
          <a id='link' className='support' href="mailto:tomleslieli@yahoo.com">Support</a>          </span>
        </div>
      </div>
      <div className='header-login-signup'>
        <nav className="login-signup">
          <Link to="/login">
            <button className='login-button'>Log in</button>
          </Link>
          <Link to="/signup">
            <button className='signup-button'>Sign up</button>
          </Link>
        </nav>
      </div>
    </div>
  );
  const personalHeader = () => (
    <div className='header-signed-in'>
      <div className='header-signed-in-container'>
        <div className='header-logo-signed-in'>
          <Link to="/">
            <img id='header-logo-signed-in' src='https://robinhood-clone-assets.s3.amazonaws.com/logo_icon_black.png' alt='logo-icon-black' width='21px'/>
          </Link>
        </div>
        <div className='search-bar-container'>
          <CreateStockContainer store={store}/>
        </div>
      <div className='header-user'>
        <span className='header-user-links'>
        <a href='https://github.com/tomleslieli/robinhood' id='link' className='github'>Github</a>
        <Link to='/'  id='link' className = 'portfolio'>Portfolio</Link>
        <Link to='/'  id='link' className='cash'>Cash</Link>
        {/* <h4 className="header-name">{currentUser.full_name}</h4> */}
        <div className='account'>
          <Link id='link' className="header-button" onClick={logout}>Logout</Link>
        </div>
        {/* Messages dropdown goes here */}
        {/* Account dropdown goes here */}
        </span>
      </div>
      </div>

    </div>
  );

  return currentUser ? personalHeader() : sessionLinks();
};


export default Header;
