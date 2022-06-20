import React from 'react';
import { Link } from 'react-router-dom';



const Header = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <div className='header-signed-out'>
      <div className='header-logo-signed-in'>
        <Link to="/">
          <img src='https://robinhood-clone-assets.s3.amazonaws.com/logo_full_black.png' alt='logo-full-black' width='90px'/>
        </Link>
      </div>
      <div className='header-info'>
        <span className='header-info-links'>
        <Link className='invest'>Invest</Link>
        <Link className = 'learn'>Learn</Link>
        <Link className='support'>Support</Link>
        </span>
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
    <>
      <hgroup className="header-group">
        <h2 className="header-name">Hi, {currentUser.username}!</h2>
        <button className="header-button" onClick={logout}>Log out</button>
      </hgroup>
    </>
  );

  return currentUser ? personalHeader() : sessionLinks();
};


export default Header;
