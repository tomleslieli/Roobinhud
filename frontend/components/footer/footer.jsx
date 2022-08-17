import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://kit.fontawesome.com/a9b2f3d835.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <>
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-top-left">
              <div className="bank-info">
                <a
                  id="link"
                  href="https://www.investor.gov/introduction-investing/investing-basics/glossary/form-crs#:~:text=A%20relationship%20summary%20tells%20you,to%20get%20more%20information%20about"
                  target="_blank"
                >
                  Brokerage Customer Relationship Summary
                </a>
              </div>
            </div>
            <div className="footer-bottom-left">
              <div className="product">
                <h3>Platform</h3>
                <ul id="list-item">
                  <li>
                    <Link id="link" to="/signup">
                      <h6>Register</h6>
                    </Link>
                  </li>
                  <li>
                    <Link id="link" to="/login">
                      <h6>Login</h6>
                    </Link>
                  </li>
                  <li>
                    <Link id="link" to="/invest">
                      <h6>Invest</h6>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="about">
                <h3>About</h3>
                <ul>
                  <li>
                    <a
                      id="link"
                      href="https://github.com/tomleslieli"
                      target="_blank"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      id="link"
                      href="https://www.linkedin.com/in/tomleslieli"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tomleslieli.github.io/Portfolio"
                      id="link"
                      className="portfolio-signed-out"
                      target="_blank"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      id="link"
                      className="support"
                      href="mailto:tomleslieli@yahoo.com"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-top-right">
              <p id="follow-us-on">Follow me on</p>
              <a href="https://www.linkedin.com/in/tomleslieli" target="_blank">
                <i id="link" className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/tomleslieli" target="_blank">
                <i id="link" className="fa-brands fa-github"></i>
              </a>
              <a href="https://www.instagram.com/tomleslieli" target="_blank">
                <i id="link" className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-bottom-right">
              <ul className="fine-print">
                <li>
                  <h6>All investing involves risk.</h6>
                </li>
                <br />
                <li>
                  <h6>
                    Brokerage services are offered through Roobinhüd Financial
                    LLC, (“RFH”) a registered broker dealer (member SIMP) and
                    clearing services through Roobinhüd Securities, LLC, (“RSH”)
                    a registered broker dealer (member SIMP). Cryptocurrency
                    services are offered through Roobinhüd Crypto, LLC (“RCH”)
                    (NMLS ID: 1024389). The Roobinhüd Money spending account is
                    offered through Roobinhüd Money, LLC (“RYH”) (NMLS ID:
                    2000968), a licensed money transmitter. The Roobinhüd Cash
                    Card is a prepaid card issued by Sutton Bank, Member FDIC,
                    pursuant to a license from Mastercard® International
                    Incorporated. RFH, RYH, RCH and RSH are affiliated entities
                    and wholly owned subsidiaries of Roobinhüd Markets, Inc.
                    RFH, RHY, RCH and RSH are not banks. Securities products
                    offered by RFH are not FDIC insured and involve risk,
                    including possible loss of principal. Cryptocurrencies held
                    in RCH accounts are not covered by FDIC or SIMP protections
                    and are not regulated by FINRA.
                  </h6>
                </li>
                <br />
                <li>
                  <h6>
                    Options trading entails significant risk and is not
                    appropriate for all customers. Customers must read and
                    understand the Characteristics and Risks of Standardized
                    Options before engaging in any options trading strategies.
                    Options transactions are often complex and may involve the
                    potential of losing the entire investment in a relatively
                    short period of time. Certain complex options strategies
                    carry additional risk, including the potential for losses
                    that may exceed the original investment amount.
                  </h6>
                </li>
                <br />
                <li>
                  <h6>
                    Commission-free trading of stocks, ETFs and options refers
                    to $0 commissions for Roobinhüd Financial self-directed
                    individual cash or margin brokerage accounts that trade U.S.
                    listed securities and certain OTC securities electronically.
                    Keep in mind, other fees such as trading (non-commission)
                    fees, Gold subscription fees, wire transfer fees, and paper
                    statement fees may apply to your brokerage account. Please
                    see Roobinhüd Financial’s Fee Schedule to learn more.
                  </h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
