import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPortfolio } from "../../actions/portfolio_actions";
import { update } from "../../actions/session_actions";


const BuyStockForm = ({
  stocks,
  user,
  portfolios,
  createPortfolio,
  updatePortfolio,
  update,
  ticker
}) => {
  const [buyIn, setBuyIn] = useState("Dollars");
  const [amount, setAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [userObj, setUserObj] = useState(null);
  const [estCost, setEstCost] = useState(null);
  const [estQuant, setEstQuant] = useState(null);

  useEffect(() => {
    setUserObj(user);
  }, [])

  useEffect(() => {
    const quant = (amount / currentPrice).toFixed(5)
    let cost = (estimatedCost).toString().split('.')[1]
    if (!cost) {
      cost = '.00'
    } else {
      cost = '.' + cost
    }
    setEstQuant(
      parseFloat(quant).toLocaleString("en-US").split(".")[0] +
      "." +
      quant.split(".")[1]
    )
    setEstCost(
      parseFloat(estimatedCost).toLocaleString("en-US").split(".")[0] +
      cost
    )
  }, [amount, currentPrice, estimatedCost])

  const handleSubmit = (buyIn, amount, currentPrice, estimatedCost) => {
    const filteredPortfolios = Object.values(portfolios).filter(
      (portfolio) => portfolio.portfolio_owner_id === user.id
    );
    let portfolio = {
      portfolio_owner_id: user.id,
      portfolio_stock_ticker: Object.values(stocks)[0]["symbol"],
      total_spent: 0,
      quantity: 0,
    };
    let currentPosition = filteredPortfolios.filter(
      (portfolio) =>
        portfolio.portfolio_stock_ticker === Object.values(stocks)[0]["symbol"]
    );
    if (user.buying_power >= estimatedCost){
      userObj.buying_power = user.buying_power - parseFloat(estimatedCost)
      if (currentPosition[0]) {
        portfolio.id = currentPosition[0].id;
        portfolio.quantity = Object.values(currentPosition[0])[4];
        portfolio.total_spent = Object.values(currentPosition[0])[3];
        const quantity = parseFloat((parseFloat(amount) / currentPrice).toFixed(5));
          if (buyIn === "Dollars") {
              portfolio.quantity = parseFloat((portfolio.quantity + quantity).toFixed(5));
          } else {
              portfolio.quantity = parseFloat((portfolio.quantity + parseFloat(amount)).toFixed(5));
          }
          portfolio.total_spent = portfolio.total_spent + parseFloat(estimatedCost);
          updatePortfolio(portfolio);
          update(userObj)
          window.location.reload();
          setTimeout(() => {
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);
          }, 100)
          } else {
          const quantity = parseFloat((amount / currentPrice).toFixed(5));
          if (buyIn === "Dollars") {
              portfolio.quantity = parseFloat(quantity.toFixed(5));
          } else {
              portfolio.quantity = parseInt(amount);
          }
          portfolio.total_spent = parseFloat(estimatedCost);
          createPortfolio(portfolio);
          update(userObj);
          window.location.reload();
          setTimeout(() => {
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);
          }, 100)
      }
    }
  };

  function toggleDollarsShares() {
    const currentVal = document.getElementById("dollars-shares").value;
    setBuyIn(currentVal);
  }

  function enterAmount() {
    const currentAmount = document.getElementById("buy-sell-amount").value;
    setAmount(currentAmount);
  }

  const setPrice = (price) => {
    setCurrentPrice(price);
  };

  function initializePrice() {
    if (Object.values(stocks)?.[0]) {
      const res = stocks;
      const yValues = Object.values(res)[0]["day"]["yValues"];
      const currentPrice = parseFloat(parseFloat(stocks[ticker]['info']['price']).toFixed(2));
      setPrice(currentPrice);
    }
  }

  useEffect(() => {
    if (stocks && stocks[ticker]) {
      initializePrice();
    }
  }, [stocks]);

  useEffect(() => {
    if (buyIn === "Dollars") {
      setEstimatedCost(amount);
    } else {
      const cost = (currentPrice * amount).toFixed(2);
      setEstimatedCost(cost);
    }
  }, [buyIn, amount, currentPrice]);

  return (
    <div className="transaction-form-container">
      <form
        className="transaction-form"
        onSubmit={() =>
          handleSubmit(buyIn, amount, currentPrice, estimatedCost)
        }
      >
        <div className="transaction-form-row">
          <h6>Order Type</h6>
          <h5>Market Order</h5>
        </div>
        <div className="transaction-form-row">
          <h6>Buy In</h6>
          <select id="dollars-shares" onChange={() => toggleDollarsShares()}>
            <option className="transaction-option" value="Dollars">
              Dollars
            </option>
            <option className="transaction-option" value="Shares">
              Shares
            </option>
          </select>
        </div>
        <div className="transaction-form-row">
          {buyIn === "Dollars" ? <h6>Amount</h6> : <h6>Shares</h6>}
          <input
            id="buy-sell-amount"
            type="text"
            value={amount}
            onChange={() => enterAmount()}
          />
        </div>
        {buyIn === "Shares" ? (
          <div className="transaction-form-row">
            <h6 className="market-price-buy">Market Price</h6>
            <h5>${currentPrice ? currentPrice.toFixed(2) : '0.00'}</h5>
          </div>
        ) : (
          <></>
        )}
        <div className="transaction-form-row">
          {buyIn === "Dollars" ? (
            <h5>Est. Quantity</h5>
          ) : (
            <h5>Estimated Cost</h5>
          )}
          {buyIn === "Dollars" ? (
            <h5>{isNaN(amount/currentPrice) ? '0.00000' : (estQuant)}</h5>
          ) : (
            <h5>${estCost ? estCost : '0.00'}</h5>
          )}
        </div>
        <div className="transaction-form-submit">
          <button className="buy-button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

const mSTP = (state) => {
  return {};
};

const mDTP = (dispatch) => ({
  createPortfolio: (portfolio) => dispatch(createPortfolio(portfolio)),
  update: (user) => dispatch(update(user))
});

export default connect(mSTP, mDTP)(BuyStockForm);
