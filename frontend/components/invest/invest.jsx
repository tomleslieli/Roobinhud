import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";

const Invest = () => {
  return (
    <>
      <div className="invest-page">
        <div className="investing-image-container">
          <img
            id="investing-image"
            src="https://robinhood-clone-assets.s3.amazonaws.com/investing-image.png"
            alt="investing-image"
          />
        </div>
        <div className="invest-page-header">
          <div className="invest-header-centered">
            <h1>Investing doesn’t have to be that hard.</h1>
          </div>
        </div>
        <div className="invest-page-body">
          <h1>
            Access stocks, ETFs, and more. Oh, and no commission fees. That’s
            right. Zero. Nada. Zilch. Your first stock is even on us.{" "}
          </h1>
        </div>
        <div className="signup-button-invest-container">
          <Link to="/signup">
            <button className="signup-button-invest">Get started</button>
          </Link>
        </div>
      </div>
      <div className="invest-page-disclaimer">
        <div className="disclaimer-invest">
          <p>
            Stocks & funds offered through Roobinhüd Financial. Other fees may
            apply.{" "}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Invest;
