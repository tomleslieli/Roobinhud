import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <div className='header-signed-out'>
      <div className='header-logo-signed-out'>
        <Link to="/">
          <img src='https://robinhood-clone-assets.s3.amazonaws.com/logo_full_black.png' alt='logo-full-black' width='135px'/>
        </Link>
      </div>
      <div className='header-info'>
        <span className='header-info-links'>
        <Link to='/' id='link' className='invest'>Invest</Link>
        <Link to='/' id='link' className = 'learn'>Learn</Link>
        <Link to='/' id='link' className='support'>Support</Link>
        </span>
      </div>
      <div className='empty-header-space'/>
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
      <div className='header-logo-signed-in'>
        <Link to="/">
          <img src='https://robinhood-clone-assets.s3.amazonaws.com/logo_icon_black.png' alt='logo-icon-black' width='32px'/>
        </Link>
      </div>
      <div className='search-bar-container'>
        <input className='search-bar' type='text' value='Search'/>
      </div>
      <div className='empty-header-space'/>
      <div className='header-user'>
        <span className='header-user-links'>
        <Link to='/' id='link' className='rewards'>Rewards</Link>
        <Link to='/'  id='link' className = 'portfolio'>Portfolio</Link>
        <Link to='/'  id='link' className='cash'>Cash</Link>
        <h4 className="header-name">{currentUser.full_name}</h4>
        <div className='account'>
          <Link id='link' className="header-button" onClick={logout}>Logout</Link>
        </div>
        {/* Messages dropdown goes here */}
        {/* Account dropdown goes here */}
        </span>
      </div>

    </div>
  );

  return currentUser ? personalHeader() : sessionLinks();
};


export default Header;
