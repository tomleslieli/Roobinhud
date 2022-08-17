import React, { useState, useEffect } from "react";
import { update, getUser } from "../../actions/session_actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Cash = ({ user, update, getUser }) => {
  const [showAccount, toggleShowAccount] = useState(true);
  const [randNum, setRandNum] = useState(null);
  const [randChecking, setRandChecking] = useState(null);
  const [currentAmount, setCurrentAmount] = useState("0.00");
  const [currentFrom, setCurrentFrom] = useState(null);
  const [currentTo, setCurrentTo] = useState(null);
  const [currentUserObj, setCurrentUserObj] = useState(null);
  const [readyForTransfer, setReadyForTransfer] = useState(false);
  const [cashAmount, setCashAmount] = useState(0);
  const [infoWindow, toggleInfoWindow] = useState(false);
  const [showCard, toggleShowCard] = useState(false);
  const [randDebit, setRandDebit] = useState(null);
  const [randMo, setRandMo] = useState(null);
  const [randDay, setRandDay] = useState(null);
  const [randCvc, setRandCvc] = useState(null);
  const [changePin, toggleChangePin] = useState(false);
  const [pin, setPin] = useState(null);
  const [submittedPin, setSubmittedPin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://kit.fontawesome.com/a9b2f3d835.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.buying_power){
        const buyingPower =
        user.buying_power.toLocaleString("en-US").split(".")[0] +
        "." +
        user.buying_power.toFixed(2).split(".")[1];
        getUser(user.id);
        setCashAmount(buyingPower);
      }
    }
  }, []);

  useEffect(() => {
    const transferButton = document.querySelector(".transfer-button");
    if (readyForTransfer) {
      transferButton.classList.add("green");
    } else {
      transferButton.classList.remove("green");
    }
  }, [readyForTransfer]);

  if (!randNum) {
    setRandNum(Math.floor(100000000000 + Math.random() * 900000000000));
  }
  if (!randChecking) {
    setRandChecking(Math.floor(1000 + Math.random() * 9000));
  }
  if (!randDebit) {
    setRandDebit(
      Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    );
  }
  if (!randMo) {
    setRandMo(Math.floor(10 + Math.random() * 90) % 12);
  }

  if (!randDay) {
    setRandDay(Math.floor(10 + Math.random() * 90) % 28);
  }

  if (!randCvc) {
    setRandCvc(Math.floor(100 + Math.random() * 900));
  }

  function showCardClick() {
    const slider = document.querySelector(".debit-slider-number");
    const circle = document.querySelector(".slider-circle");
    if (showCard) {
      slider.classList.remove("clicked");
      circle.classList.remove("clicked");
    } else {
      slider.classList.add("clicked");
      circle.classList.add("clicked");
    }
    toggleShowCard(!showCard);
  }

  function enterAmount() {
    const currentAmount = document.getElementById("transfer-amount").value;
    if (!isNaN(currentAmount)) {
      setCurrentAmount(currentAmount);
    }
  }

  function enterPin() {
    const pinNumber = document.getElementById("enter-pin").value;
    if (pinNumber.length <= 4) {
      setPin(pinNumber);
    }
  }
  useEffect(() => {
    const button = document.querySelector(".pin-button");
    if (pin) {
      if (pin.length === 4) {
        button.classList.add("green");
      } else {
        button.classList.remove("green");
      }
    }
  }, [pin]);

  function submitPin() {
    if (pin) {
      if (pin.length === 4) {
        setSubmittedPin(true);
      }
    }
  }

  function changeValues() {
    const currFrom = document.getElementById("transfer-from").value;
    const currTo = document.getElementById("transfer-to").value;
    setCurrentFrom(currFrom);
    setCurrentTo(currTo);
  }

  useEffect(() => {
    let userObj;
    if (!user.buying_power) {
      userObj = {
        id: user.id,
        address: user.address,
        email: user.email,
        full_name: user.full_name,
        buying_power: 0,
      };
    } else {
      userObj = {
        id: user.id,
        address: user.address,
        email: user.email,
        full_name: user.full_name,
        buying_power: { cashAmount },
      };
    }
    if (
      parseFloat(currentAmount) > 0 &&
      currentFrom === "checking" &&
      currentTo === "roobin"
    ) {
      const amount =
        user.buying_power + parseFloat(parseFloat(currentAmount).toFixed(2));
      userObj.buying_power = amount;
      setReadyForTransfer(true);
    } else if (
      parseFloat(currentAmount) > 0 &&
      currentFrom === "roobin" &&
      currentTo === "checking"
    ) {
      if (currentAmount < userObj.buying_power) {
        const amount =
          user.buying_power - parseFloat(parseFloat(currentAmount).toFixed(2));
        userObj.buying_power = amount;
        setReadyForTransfer(true);
      } else {
        setReadyForTransfer(false);
      }
    } else {
      setReadyForTransfer(false);
    }
    setCurrentUserObj(userObj);
  }, [currentAmount, currentFrom, currentTo]);

  const handleSubmit = () => {
    if (readyForTransfer) {
      const submitUser = Object.assign({}, currentUserObj);
      update(submitUser);
      history.push("/");
    }
  };

  return (
    <>
      {changePin ? (
        <>
          {!submittedPin ? (
            <div className="change-pin-form-container">
              <div className="change-pin-form">
                <div className="close-modal-1">
                  <i
                    onClick={() => toggleChangePin(false)}
                    className="fa-solid fa-x fa-lg"
                  ></i>
                </div>
                <i className="fa-solid fa-credit-card fa-2x"></i>
                <h3>Set Your Pin</h3>
                <span className="set-pin-text">
                  <h5>You’ll need this number to access ATMs and make</h5>
                  <h5>purchases at some stores.</h5>
                </span>
                <form className="pin-form" onSubmit={() => submitPin()}>
                  <input
                    id="enter-pin"
                    type="password"
                    placeholder="Enter PIN"
                    onChange={() => enterPin()}
                    value={pin}
                  />
                  <button type="submit" className="pin-button">
                    Continue
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="change-pin-form-container">
              <div className="change-pin-form-complete">
                <div className="close-modal-2">
                  <i
                    onClick={() => toggleChangePin(false)}
                    className="fa-solid fa-x fa-lg"
                  ></i>
                </div>
                <h3>Your PIN has changed!</h3>
                <span className="set-pin-text">
                  <h5>You now have access to thousands of ATMs across</h5>
                  <h5>the country.</h5>
                </span>
                <button
                  className="pin-button-done"
                  onClick={() => toggleChangePin(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )}
          <div
            onClick={() => toggleChangePin(!changePin)}
            className="change-pin"
          ></div>
        </>
      ) : (
        <></>
      )}
      <div className="cash-page">
        <div className="cash-dashboard">
          <div className="cash-page-left">
            <div className="cash-page-item">
              <h1 className="cash-amount-title">Cash</h1>
              <div className="cash-amount">
                {cashAmount ? (
                  <h1 className="current-cash-amount">${cashAmount}</h1>
                ) : (
                  <h1 className="current-cash-amount">$0.00</h1>
                )}
                <i
                  onClick={() => toggleInfoWindow(!infoWindow)}
                  className="fa-solid fa-circle-info fa-lg"
                ></i>
              </div>
              {showAccount ? (
                <h5 className="ach">
                  ACH Account Number
                  {"  "}
                  <span className="ach-number">
                    ••••••••
                    {String(randNum).slice(-4)}
                  </span>
                </h5>
              ) : (
                <div className="show-account-container">
                  <h5 className="ach">
                    ACH Account Number
                    {"  "}
                    <span className="ach-number">{String(randNum)}</span>
                  </h5>
                  <h5 className="ach">
                    Routing Number
                    {"  "}
                    <span className="ach-number">021000021</span>
                  </h5>
                </div>
              )}
              <div className="account-details-toggle">
                {showAccount ? (
                  <h5 onClick={() => toggleShowAccount(!showAccount)}>
                    Show Account Details
                  </h5>
                ) : (
                  <h5 onClick={() => toggleShowAccount(!showAccount)}>
                    Hide Account Details
                  </h5>
                )}
              </div>

              <div className="cash-position">
                {infoWindow ? (
                  <div className="cash-position-item">
                    <div
                      id="brokerage-cash"
                      className="current-position-bottom"
                    >
                      <h6>Brokerage Cash</h6>
                      {cashAmount ? (
                        <h6 className="return-dollars">${cashAmount}</h6>
                      ) : (
                        <h6 className="return-dollars">$0.00</h6>
                      )}{" "}
                    </div>
                    <div
                      id="withdrawable-cash"
                      className="current-position-bottom-bottom"
                    >
                      <h6>Withdrawable Cash</h6>
                      {cashAmount ? <h6>${cashAmount}</h6> : <h6>$0.00</h6>}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="cash-page-item" id="debit-card">
              <div className="debit-card-left">
                <h1 className="debit-card-title">Debit Card</h1>
                <div className="debit-card-info">
                  {showCard ? (
                    <div className="debit-card-number">
                      <div className="numbers-row">
                        <h6>{String(randDebit).slice(0, 4)}</h6>
                      </div>
                      <div className="numbers-row">
                        <h6>{String(randDebit).slice(4, 8)}</h6>
                      </div>
                      <div className="numbers-row">
                        <h6>{String(randDebit).slice(8, 12)}</h6>
                      </div>
                      <div className="numbers-row">
                        <h6>{String(randDebit).slice(-4)}</h6>
                      </div>
                      <div className="valid-thru">
                        <h6 className="bottom-info"> Valid Thru</h6>
                        <h6>
                          {randMo}/{randDay}
                        </h6>
                      </div>
                      <div className="cvc">
                        <h6 className="bottom-info"> CVC</h6>
                        <h6>{randCvc}</h6>
                      </div>
                    </div>
                  ) : (
                    <div className="debit-card-number">
                      <div className="numbers-row">
                        <h5>••••</h5>
                      </div>
                      <div className="numbers-row">
                        <h5>••••</h5>
                      </div>
                      <div className="numbers-row">
                        <h5>••••</h5>
                      </div>
                      <div className="numbers-row">
                        <h6>{String(randDebit).slice(-4)}</h6>
                      </div>
                      <div className="valid-thru">
                        <h6> Valid Thru</h6>
                        <h6>••/••</h6>
                      </div>
                      <div className="cvc">
                        <h6> CVC</h6>
                        <h6>•••</h6>
                      </div>
                    </div>
                  )}
                </div>
                <svg width="232" height="352" viewBox="0 0 232 352" fill="none">
                  <path
                    d="M212.084 351.832H35.093C24.0662 351.832 15.1772 342.943 15.1772 331.916V33.5178C15.1772 22.491 24.0662 13.6021 35.093 13.6021H212.084C223.111 13.6021 232 22.491 232 33.5178V331.916C232 342.943 223.111 351.832 212.084 351.832Z"
                    fill="#F5F8FA"
                  ></path>
                  <path
                    opacity="0.3"
                    d="M202.633 344.068H25.6415C14.6147 344.068 5.72577 335.179 5.72577 324.152V25.6415C5.72577 14.6147 14.6147 5.72578 25.6415 5.72578H202.633C213.66 5.72578 222.548 14.6147 222.548 25.6415V324.04C222.548 335.067 213.66 344.068 202.633 344.068Z"
                    fill="white"
                  ></path>
                  <path
                    d="M202.633 344.068H25.6415C14.6147 344.068 5.72577 335.179 5.72577 324.152V25.6415C5.72577 14.6147 14.6147 5.72578 25.6415 5.72578H202.633C213.66 5.72578 222.548 14.6147 222.548 25.6415V324.04C222.548 335.067 213.66 344.068 202.633 344.068Z"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M217.823 319.314V20.9157C217.823 9.88894 208.934 1 197.907 1H101.141V339.23H197.907C208.934 339.342 217.823 330.341 217.823 319.314Z"
                    fill="white"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M104.967 344.068H202.633C213.66 344.068 222.549 335.179 222.549 324.153V25.6415C222.549 18.8904 219.173 13.0395 214.11 9.43887C216.473 12.7019 217.823 16.64 217.823 20.9157V319.314C217.823 330.341 208.934 339.23 197.907 339.23H101.141L104.967 344.068Z"
                    fill="#E4E9ED"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M165.052 70.7613H140.973C138.722 70.7613 137.035 68.961 137.035 66.8232V31.3799C137.035 29.1296 138.835 27.4418 140.973 27.4418H165.052C167.302 27.4418 168.99 29.2421 168.99 31.3799V66.8232C168.99 68.961 167.302 70.7613 165.052 70.7613Z"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    opacity="0.5"
                    d="M20.9157 1C9.88895 1 1 9.88894 1 20.9157V319.314C1 330.341 9.88895 339.23 20.9157 339.23H101.141V1H20.9157Z"
                    fill="white"
                  ></path>
                  <path
                    d="M137.035 49.0453H168.99"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M20.9157 1C9.88895 1 1 9.88894 1 20.9157V319.314C1 330.341 9.88895 339.23 20.9157 339.23H101.141V1H20.9157Z"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M159.426 40.2689H146.486V57.8217H159.426V40.2689Z"
                    fill="white"
                    stroke="black"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M36.7808 323.477C48.8364 323.477 58.6094 313.704 58.6094 301.649C58.6094 289.593 48.8364 279.82 36.7808 279.82C24.7252 279.82 14.9523 289.593 14.9523 301.649C14.9523 313.704 24.7252 323.477 36.7808 323.477Z"
                    stroke="black"
                    strokeWidth="1.1453"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M68.736 323.477C80.7916 323.477 90.5646 313.704 90.5646 301.649C90.5646 289.593 80.7916 279.82 68.736 279.82C56.6804 279.82 46.9075 289.593 46.9075 301.649C46.9075 313.704 56.6804 323.477 68.736 323.477Z"
                    stroke="black"
                    strokeWidth="1.1453"
                    strokeMiterlimit="10"
                  ></path>
                </svg>
              </div>
              <div className="debit-card-right">
                <div className="debit-card-right-item">
                  <h5>Show Card Number</h5>
                  <div
                    onClick={() => showCardClick()}
                    className="debit-slider-number"
                  >
                    {showCard ? <h6 className="slider-on">On</h6> : <></>}
                    <div className="slider-circle" />
                    {!showCard ? <h6 className="slider-off">Off</h6> : <></>}
                  </div>
                </div>
                <div className="debit-card-right-item">
                  <h5>Change PIN</h5>
                  <i
                    onClick={() => toggleChangePin(!changePin)}
                    className="fa-solid fa-angle-right fa-xl"
                  ></i>
                </div>
                <div className="debit-card-right-item" id="report-problem">
                  <h5>Report a Problem</h5>
                  <a href="mailto:tomleslieli@yahoo.com">
                    <i className="fa-solid fa-angle-right fa-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="cash-page-item" id="cash-page-footer">
              <h6 className="cash-page-footer-item">
                Your routing number is provided by JPMorgan Chase Bank, N.A.
                Wire transfers are not supported through your routing and ACH
                account numbers.
              </h6>
              <h6 className="cash-page-footer-item">
                APY is the annual interest rate you earn on the cash swept from
                your brokerage account to the program banks. The current APY
                paid by the program banks is 1.50% as of August 11, 2022, but it
                can change at any time at their discretion. Roobinhüd Financial
                is not a bank.
              </h6>
            </div>
          </div>
          <div className="cash-page-right">
            <div className="add-cash-container">
              <div className="add-cash">
                <div className="transfer-money">
                  <h6 className="transfer-text">Transfer Money</h6>
                </div>
                <div className="transfer-container">
                  <div className="transfer-item">
                    <div className="transfer-item-left">
                      <h6>Amount</h6>
                    </div>
                    <div className="transfer-item-right">
                      <input
                        className="transfer-amount"
                        id="transfer-amount"
                        type="text"
                        value={currentAmount}
                        onChange={() => enterAmount()}
                      />
                    </div>
                  </div>
                  <div className="transfer-item">
                    <div className="transfer-item-left">
                      <h6>From</h6>
                    </div>
                    <div className="transfer-item-right">
                      <select
                        id="transfer-from"
                        onChange={() => changeValues()}
                      >
                        <optgroup label="Roobinhüd accounts">
                          <option hidden disabled selected value>
                            {" "}
                            Choose account{" "}
                          </option>
                          <option className="transaction-option" value="roobin">
                            {"Roobinhüd "}
                            Withdrawable Cash - $
                            {cashAmount ? cashAmount : "0.00"}
                          </option>
                        </optgroup>
                        <optgroup label="External accounts">
                          <option hidden disabled selected value>
                            {" "}
                            Choose account{" "}
                          </option>
                          <option
                            className="transaction-option"
                            value="checking"
                          >
                            TOTAL CHECKING - Checking {` ${randChecking}`}
                          </option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div className="transfer-item">
                    <div className="transfer-item-left">To</div>
                    <div className="transfer-item-right">
                      <select id="transfer-to" onChange={() => changeValues()}>
                        <optgroup label="Roobinhüd accounts">
                          <option hidden disabled selected value>
                            {" "}
                            Choose account{" "}
                          </option>
                          <option className="transaction-option" value="roobin">
                            {"Roobinhüd "}
                            Withdrawable Cash - $
                            {cashAmount ? cashAmount : "0.00"}
                          </option>
                        </optgroup>
                        <optgroup label="External accounts">
                          <option
                            className="transaction-option"
                            value="checking"
                          >
                            TOTAL CHECKING - Checking {` ${randChecking}`}
                          </option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <button
                    className="transfer-button"
                    onClick={() => handleSubmit()}
                  >
                    Transfer funds
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mSTP = (state) => {
  return {
    user: state.entities.users[state.session.id],
  };
};

const mDTP = (dispatch) => ({
  update: (user) => dispatch(update(user)),
  getUser: (userId) => dispatch(getUser(userId)),
});

export default connect(mSTP, mDTP)(Cash);
