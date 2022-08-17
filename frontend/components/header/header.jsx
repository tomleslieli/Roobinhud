import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import StockForm from "../stock/stock_form";

const Header = ({ currentUser, logout }) => {
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();
  const [color, setColor] = useState(
    "https://robinhood-clone-assets.s3.amazonaws.com/logo_icon_black.png"
  );

  function redirectToHome() {
    logout();
    history.push("/");
  }

  function add(e) {
    setColor(
      "https://robinhood-clone-assets.s3.amazonaws.com/logo_icon_green.png"
    );
  }

  function remove(e) {
    setColor(
      "https://robinhood-clone-assets.s3.amazonaws.com/logo_icon_black.png"
    );
  }

  useEffect(() => {
    const xTop = document.getElementById("x-top");
    const xBottom = document.getElementById("x-bottom");

    if (!currentUser) {
      if (navOpen) {
        xTop.style.top = "-5px";
        xTop.style.transform = "rotate(-45deg)";
        xBottom.style.top = "4px";
        xBottom.style.transform = "rotate(45deg)";
      } else {
        xTop.style.top = "0px";
        xTop.style.transform = "rotate(0deg)";
        xBottom.style.top = "0px";
        xBottom.style.transform = "rotate(0deg)";
      }
    }
  }, [navOpen]);

  const sessionLinks = () => (
    <>
      <div className="header-signed-out">
        <div className="header-logo-signed-out">
          <Link to="/">
            {/* <img className='logo-full-green' id='logo-full-green' src='https://robinhood-clone-assets.s3.amazonaws.com/logo_full_green.png' alt='logo-full-black' width='135px'/> */}
            <img
              onClick={() => setNavOpen(false)}
              className="logo-full-black"
              id="logo-full-black"
              src="https://robinhood-clone-assets.s3.amazonaws.com/logo_full_black.png"
              alt="logo-full-black"
              width="135px"
            />
          </Link>
        </div>
        <div className="header-info-container">
          <div className="header-info">
            <span className="header-info-links">
              <Link to="/invest" id="link" className="invest">
                Invest
              </Link>
              <a
                href="https://github.com/tomleslieli/robinhood"
                id="link"
                className="github-signed-out"
                target="_blank"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/tomleslieli/"
                id="link"
                className="linkedin-signed-out"
                target="_blank"
              >
                Linkedin
              </a>
              <a
                href="https://tomleslieli.github.io/Portfolio"
                id="link"
                className="portfolio-signed-out"
                target="_blank"
              >
                Portfolio
              </a>
              <a
                id="link"
                className="support"
                href="mailto:tomleslieli@yahoo.com"
              >
                Contact
              </a>
            </span>
          </div>
        </div>
        <div className="header-login-signup">
          <nav className="login-signup">
            <div className="mobile-nav" onClick={() => setNavOpen(!navOpen)}>
              <div id="x-top" className="x-asset" />
              <div id="x-bottom" className="x-asset" />
            </div>
            <Link to="/login">
              <button className="login-button">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="signup-button">Sign up</button>
            </Link>
          </nav>
        </div>
      </div>
      {!navOpen ? (
        <></>
      ) : (
        <div className="full-page-container">
          <div className="full-page-nav">
            <Link
              onClick={() => setNavOpen(false)}
              to="/login"
              id="link"
              className="full-page-item"
            >
              Login
            </Link>
            <Link
              onClick={() => setNavOpen(false)}
              to="/signup"
              id="link"
              className="full-page-item"
            >
              Signup
            </Link>
            <Link
              onClick={() => setNavOpen(false)}
              to="/invest"
              id="link"
              className="full-page-item"
            >
              Invest
            </Link>
            <a
              onClick={() => setNavOpen(false)}
              href="https://github.com/tomleslieli/robinhood"
              id="link"
              className="full-page-item"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/tomleslieli/"
              id="link"
              className="full-page-item"
              target="_blank"
            >
              Linkedin
            </a>
            <a
              href="https://tomleslieli.github.io/Portfolio"
              id="link"
              className="full-page-item"
              target="_blank"
            >
              Portfolio
            </a>
            <a
              onClick={() => setNavOpen(false)}
              id="link"
              className="full-page-item"
              href="mailto:tomleslieli@yahoo.com"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
  const personalHeader = () => (
    <div className="header-signed-in">
      <div className="header-signed-in-container">
        <div className="header-logo-signed-in">
          <Link to="/">
            <img
              onMouseOver={(e) => add(e)}
              onMouseOut={(e) => remove(e)}
              id="header-logo-signed-in"
              src={color}
              alt="logo-icon-black"
              width="21px"
            />
          </Link>
        </div>
        <div className="search-bar-container">
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
          <StockForm store={store} />
        </div>
        <div className="header-user">
          <span className="header-user-links">
            <a
              href="https://github.com/tomleslieli/robinhood"
              id="link"
              className="github"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/tomleslieli/"
              id="link"
              className="linkedin"
              target="_blank"
            >
              Linkedin
            </a>
            <a
              href="https://tomleslieli.github.io/Portfolio"
              id="link"
              className="portfolio"
              target="_blank"
            >
              Portfolio
            </a>
            <a
              id="link"
              className="support-logged-in"
              href="mailto:tomleslieli@yahoo.com"
            >
              Contact
            </a>
            <Link to="/cash" id="link" className="cash">
              Cash
            </Link>
            <div className="account">
              <Link
                to="/"
                id="link"
                className="header-button"
                onClick={redirectToHome}
              >
                Logout
              </Link>
            </div>
          </span>
        </div>
      </div>
    </div>
  );

  return currentUser ? personalHeader() : sessionLinks();
};

export default Header;
