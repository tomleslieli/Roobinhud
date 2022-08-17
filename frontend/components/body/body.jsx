import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Stats from "../../components/stats/stats";

const Body = ({ currentUser }) => {
  const sessionBody = () => (
    <div className="session-body">
      <div className="get-started-container">
        <div className="phone-animation-container">
          <img
            id="phone-animation"
            src="https://robinhood-clone-assets.s3.amazonaws.com/phone-animation.gif"
            alt="get-started-phone-animation"
          />
        </div>
        <div className="get-started-right-container">
          <div className="get-started-text">
            <p id="investing-is">Investing is</p>
            <p>simple here</p>
          </div>
          <div className="get-started-button-container">
            <Link to="/signup" id="get-started-right">
              <button className="get-started-button">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="free-stock-ribbon">
        <div>
          <p>Get your first stock free. Limitations apply.</p>
        </div>
      </div>
      <div className="investing-container">
        <div id="invest-wrap" className="investing-contents">
          <div id="investing-center" className="investing-left">
            <img
              id="investing-image-left"
              src="https://robinhood-clone-assets.s3.amazonaws.com/get-started-image.png"
              alt="investing-image"
            />
          </div>
          <div id="investing-center" className="investing-text">
            <div className="investing-box">
              <h2>Investing</h2>
            </div>
            <span id="start-building">
              <h2>Start building your portfolio with just </h2>
            </span>
            <span id="start-building">
              <h2>$1</h2>
            </span>
            <span id="invest-in-stocks">
              <h2>
                Invest in stocks, options, and ETFs at your pace and
                commission-free.
              </h2>
            </span>
            <Link to="/invest">
              <button className="investing-button">
                Learn more about investing
              </button>
            </Link>
          </div>
        </div>
        <div className="disclaimer">
          <p>
            Stocks & funds offered through Robinhood Financial. Other fees may
            apply.{" "}
          </p>
        </div>
      </div>
      <div className="sign-up-container">
        <div className="sign-up">
          <img
            id="sign-up-img"
            src="https://robinhood-clone-assets.s3.amazonaws.com/sign-up-banner.png"
            alttext="sign-up-banner"
          />
          <div className="join-generation-container">
            <h1 id="join-a">Join a new generation</h1>
            <h1 id="generation-of">of investors</h1>
            <Link to="/signup">
              <button className="signup-button-bottom">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  const personalBody = () => (
    <>
      <div className="main-body-left">
        <Stats store={store} />
      </div>
      {/* <div className = 'main-body-right'>
        <PortfolioContainer />
        <WishlistContainer />
      </div> */}
    </>
  );

  return currentUser ? personalBody() : sessionBody();
};

export default Body;
