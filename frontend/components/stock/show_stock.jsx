import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Link, useParams } from "react-router-dom";
import BuyStockForm from "./buy_stock_form";
import SellStockForm from "./sell_stock_form";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import { fetchStock } from "../../actions/stock_actions";
import { updatePortfolio } from "../../actions/portfolio_actions";
import { getUser, update } from "../../actions/session_actions";
import {
  fetchWatchlists,
  createWatchlist,
  deleteWatchlist,
} from "../../actions/watchlist_actions";

ChartJS.register(...registerables);

const initialCurrentInfo = {
  symbol: "",
  currentPrice: "",
  dailyChange: "",
  dailyPercent: "",
  news: [],
  color: "#000000",
};

const ShowStock = ({
  stocks,
  user,
  portfolios,
  fetchPortfolios,
  fetchStock,
  updatePortfolio,
  getUser,
  update,
  watchlists,
  fetchWatchlists,
  createWatchlist,
  deleteWatchlist,
}) => {
  const [Data, setData] = useState(null);
  const [stockName, setStockName] = useState(null);
  const [stockInterval, setStockInterval] = useState(15);
  const [step, setStep] = useState("day");
  const [toggleBuySell, setToggleBuySell] = useState("Buy");
  const [currentQuantity, setCurrentQuantity] = useState(null);
  const [totalShares, setTotalShares] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [ownsStock, setOwnsStock] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ ...initialCurrentInfo });
  const { ticker } = useParams();
  const [userObj, setUserObj] = useState(null);
  const [marketValueString, setMarketValueString] = useState(null);
  const [currBuyPow, setCurrBuyPow] = useState(null);
  const [totalReturn, setTotalReturn] = useState(null);
  const [shareString, setShareString] = useState(null);
  const [currentColor, setCurrentColor] = useState("#5AC53B");
  const [addedWatchlist, toggleAddedWatchlist] = useState(false);

  const intervals = {
    5: "5min",
    15: "15min",
    30: "30min",
    60: "60min",
  };
  const interval = intervals[stockInterval];

  let currentPrice;
  if (Object.values(stocks)?.[0] && currentInfo.info) {
    const res = stocks;
    const yValues = Object.values(res)[0]["day"]["yValues"];
    currentPrice = parseFloat(parseFloat(currentInfo.info.price).toFixed(2));
  }

  const handleSubmit = () => {
    const totalValue = parseFloat((currentPrice * currentQuantity).toFixed(2));
    userObj.buying_power = user.buying_power + parseFloat(totalValue);
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
    portfolio.id = currentPosition[0].id;
    updatePortfolio(portfolio);
    update(userObj);
    window.location.reload();
    setTimeout(() => {
      window.location.replace(
        window.location.pathname + window.location.search + window.location.hash
      );
    }, 100);
  };

  const handleAdd = () => {
    if (!addedWatchlist) {
      const watchlist = {
        watchlistStockTicker: ticker,
        watchlistOwnerId: user.id,
      };
      createWatchlist(watchlist);
      window.location.reload();
      setTimeout(() => {
        window.location.replace(
          window.location.pathname +
            window.location.search +
            window.location.hash
        );
      }, 100);
    } else {
      const userWatchlists = Object.values(watchlists).filter(
        (el) => el.watchlist_owner_id === user.id
      );
      const currentWatchlist = userWatchlists.filter(
        (el) => el.watchlist_stock_ticker === ticker
      );
      deleteWatchlist(currentWatchlist[0].id);
    }
  };

  useEffect(() => {
    if (user) {
      getUser(user.id);
      setUserObj(user);
      fetchWatchlists();
    }
    setCurrentQuantity(null);
  }, []);

  useEffect(() => {
    if (watchlists) {
      let userWatchlists = Object.values(watchlists).filter(
        (el) => el.watchlist_owner_id === user.id
      );
      let currentWatchlist = userWatchlists.filter(
        (el) => el.watchlist_stock_ticker === ticker
      );
      if (currentWatchlist.length) {
        toggleAddedWatchlist(true);
      } else {
        toggleAddedWatchlist(false);
      }
    }
  }, [watchlists, ticker]);

  useEffect(() => {
    const addToWatchlist = document.querySelector(".add-to-watchlist");
    if (toggleBuySell === "Buy") {
      setCurrentColor("#5AC53B");
      addToWatchlist.classList.remove("sell");
    } else if (toggleBuySell === "Sell") {
      setCurrentColor("rgb(244, 104, 39)");
      addToWatchlist.classList.add("sell");
    }
  }, [toggleBuySell]);

  useEffect(() => {
    if (currentInfo && currentQuantity && totalSpent) {
      const val = (currentInfo.currentPrice * currentQuantity).toFixed(2);
      const ret = Math.abs(
        currentInfo.currentPrice * currentQuantity - totalSpent
      ).toFixed(2);
      let shares = currentQuantity.toString().split(".")[1];
      if (!shares) {
        shares = "";
      } else {
        shares = "." + shares;
      }
      setTotalReturn(
        parseFloat(ret).toLocaleString("en-US").split(".")[0] +
          "." +
          ret.split(".")[1]
      );
      setMarketValueString(
        parseFloat(val).toLocaleString("en-US").split(".")[0] +
          "." +
          val.split(".")[1]
      );
      setShareString(
        parseFloat(currentQuantity).toLocaleString("en-US").split(".")[0] +
          shares
      );
    }
  }, [currentInfo, currentQuantity, totalSpent]);

  const incomingStock = (stocks, step) => {
    if (stocks) {
      if (stocks[ticker]) {
        const currentObject = stocks[ticker];
        setData(currentObject);
        const yStep = currentObject[step]["yValues"];
        const recentStep = parseFloat(yStep[yStep.length - 1]);
        const furthestStep = parseFloat(yStep[0]);
        const dailyChange = parseFloat(recentStep - furthestStep).toFixed(2);
        const dailyPercent = (
          (parseFloat(recentStep - furthestStep) / parseFloat(yStep[0])) *
          100
        ).toFixed(2);
        setCurrentInfo({
          symbol: currentObject.symbol,
          info: currentObject.info,
          currentPrice: `${parseFloat(stocks[ticker]['info']['price']).toFixed(2)}`,
          dailyChange: `${dailyChange}`,
          dailyPercent: `${dailyPercent}`,
          color: dailyChange >= 0 ? "#5AC53B" : "rgb(244, 104, 39)",
          news: currentObject.news,
        });
      }
    }
  };

  useEffect(() => {
    incomingStock(stocks, step);
  }, [stocks, step, ticker]);

  useEffect(() => {
    if (user.buying_power) {
      const buyingString = user.buying_power.toString();
      let buyingStringRight = buyingString.split(".")[1];
      if (!buyingStringRight) {
        buyingStringRight = "00";
      }
      if (buyingStringRight.length === 1) {
        buyingStringRight = buyingStringRight + "0";
      } else if (buyingStringRight.length > 2) {
        buyingStringRight = buyingStringRight.slice(0, 2);
      }
      let buyPow =
        user.buying_power.toLocaleString("en-US").split(".")[0] +
        "." +
        buyingStringRight;
      setCurrBuyPow(buyPow);
    }
  }, [user]);

  useEffect(() => {
    setCurrentQuantity(null);
    setCurrentInfo({ ...initialCurrentInfo });
    fetchPortfolios();
    incomingStock(stocks, step);
    if (!stocks.ticker) {
      fetchStock(ticker);
    }
  }, []);

  async function filterPortfolios() {
    const filteredPortfolios = Object.values(portfolios).filter(
      (portfolio) => portfolio.portfolio_owner_id === user.id
    );
    let totalShares = 0;
    for (let i = 0; i < filteredPortfolios.length; i++) {
      totalShares += parseFloat(filteredPortfolios[i]["quantity"]);
    }
    if (Object.values(stocks)[0]) {
      const currentPosition = filteredPortfolios.filter(
        (portfolio) =>
          portfolio.portfolio_stock_ticker ===
          Object.values(stocks)[0]["symbol"]
      );
      if (currentPosition[0]) {
        const totalSpent = currentPosition[0]["total_spent"];
        const res = [currentPosition[0].quantity, totalShares, totalSpent];
        return res;
      }
    }
  }

  async function setCurrentObj() {
    await filterPortfolios().then(function (res) {
      if (res?.[0]) {
        setCurrentQuantity(res[0]);
        setTotalShares(res[1]);
        setTotalSpent(res[2]);
        setOwnsStock(true);
      } else {
        setOwnsStock(false);
      }
    });
  }

  if (portfolios && stocks) {
    setCurrentObj();
  }

  return (
    <div className="stock-show">
      <div className="stock-dashboard">
        <div className="stock-left">
          <div className="stock-line-chart">
            {Data ? (
              <>
                <div className="stock-info">
                  <h1>{Data.name}</h1>
                  <h3 className="current-price">
                    ${parseFloat(currentInfo.currentPrice).toFixed(2)}
                  </h3>
                  <div className="stock-day-change">
                    <div
                      className="stock-dollar"
                      style={{ color: currentInfo.color }}
                    >
                      <h6>
                        {currentInfo.dailyPercent >= 0 ? "+" : "-"}$
                        {Math.abs(currentInfo.dailyChange).toFixed(2)}
                        {!currentInfo.dailyChange.includes(".") ? ".00" : ""}
                      </h6>
                    </div>
                    <div
                      className="stock-percent"
                      style={{ color: currentInfo.color }}
                    >
                      <h6>
                        ({currentInfo.dailyPercent >= 0 ? "+" : ""}
                        {currentInfo.dailyPercent}
                        {!currentInfo.dailyPercent.includes(".") ? ".00" : ""}
                        %)
                      </h6>
                    </div>
                    <div className="time-interval">
                      {step === "day" ? <h6>Today</h6> : <></>}
                      {step === "week" ? <h6>Past week</h6> : <></>}
                      {step === "month" ? <h6>Past month</h6> : <></>}
                      {step === "threeMonth" ? <h6>Past 3 months</h6> : <></>}
                    </div>
                  </div>
                </div>
                <br />
                <Line
                  id="stock-chart"
                  className="stock-line-chart-graph"
                  height="270px"
                  width="650px"
                  data={{
                    labels: Data[step].xValues,
                    datasets: [
                      {
                        type: "line",
                        data: Data[step].yValues,
                        borderColor: currentInfo.color,
                        borderWidth: 2,
                        backgroundColor: "white",
                        pointBorderColor: "rgba(0,0,0,0)",
                        pointBackgroundColor: "rgba(0,0,0,0)",
                        pointHoverBackgroundColor: "color",
                        pointHoverRadius: 6,
                        tension: 0.05,
                      },
                    ],
                  }}
                  options={{
                    animations: false,
                    plugins: {
                      legend: {
                        display: false,
                        labels: {
                          usePointStyle: true,
                        },
                      },
                      tooltip: {
                        enabled: false,
                        mode: "index",
                        intersect: false,
                      },
                    },
                    layout: {
                      padding: 10,
                    },
                    scales: {
                      x: {
                        gridLines: {
                          drawBorder: false,
                          zeroLineColor: "transparent",
                        },
                        ticks: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                      },
                      y: {
                        gridLines: {
                          drawBorder: false,
                          zeroLineColor: "transparent",
                        },
                        ticks: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                      },
                    },
                  }}
                />
                <div className="interval-buttons">
                  <button
                    className="interval-button-day"
                    style={{
                      color: step === "day" ? currentInfo.color : "#000000",
                    }}
                    onClick={() => setStep("day")}
                  >
                    <h6>1D</h6>
                  </button>
                  <button
                    className="interval-button-week"
                    style={{
                      color: step === "week" ? currentInfo.color : "#000000",
                    }}
                    onClick={() => setStep("week")}
                  >
                    <h6>1W</h6>
                  </button>
                  <button
                    className="interval-button-month"
                    style={{
                      color: step === "month" ? currentInfo.color : "#000000",
                    }}
                    onClick={() => setStep("month")}
                  >
                    <h6>1M</h6>
                  </button>
                  <button
                    className="interval-button-three-month"
                    style={{
                      color:
                        step === "threeMonth" ? currentInfo.color : "#000000",
                    }}
                    onClick={() => setStep("threeMonth")}
                  >
                    <h6>3M</h6>
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {ownsStock ? (
            <div className="current-position">
              <div className="current-position-item">
                <div className="current-position-top">
                  <h6>Your market value</h6>
                  {
                    <h5>
                      $
                      {marketValueString !== "0.00"
                        ? marketValueString
                        : "0.00"}
                    </h5>
                  }
                </div>
                <div className="current-position-bottom">
                  <h6>Total return</h6>
                  {
                    <h6 className="return-dollars">
                      {currentInfo.currentPrice * currentQuantity -
                        totalSpent >=
                      0
                        ? ""
                        : "-"}
                      ${totalReturn ? totalReturn : "0.00"}
                    </h6>
                  }
                </div>
                <div className="current-position-bottom-bottom">
                  <h6>% change</h6>
                  {
                    <h6>
                      {(
                        ((currentInfo.currentPrice * currentQuantity -
                          totalSpent) /
                          totalSpent) *
                        100
                      ).toFixed(2)}
                      %
                    </h6>
                  }
                </div>
              </div>
              <div className="current-position-item">
                <div className="current-position-top">
                  <h6>Your average cost</h6>
                  {<h5>${(totalSpent / currentQuantity).toFixed(2)}</h5>}
                </div>
                <div className="current-position-bottom">
                  <h6>Shares</h6>
                  {<h6>{shareString ? shareString : "0"}</h6>}
                </div>
                <div className="current-position-bottom-bottom">
                  <h6>Portfolio diversity</h6>
                  {
                    <h6>
                      {((currentQuantity / totalShares) * 100).toFixed(2)}%
                    </h6>
                  }
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="info-container">
            {currentInfo.info ? (
              <h3 className="stats-info-label">Key statistics</h3>
            ) : (
              <></>
            )}
            {!currentInfo.info ? (
              <></>
            ) : (
              <div className="stats-info">
                <div className="stats-info-column">
                  <div className="stats-info-item">
                    <h5>Market Cap</h5>
                    <h6>{currentInfo.info.marketCap}</h6>
                  </div>
                  <div className="stats-info-item">
                    <h5>Volume</h5>
                    <h6>{currentInfo.info.volume}</h6>
                  </div>
                </div>
                <div className="stats-info-column">
                  <div className="stats-info-item">
                    <h5>High today</h5>
                    <h6>{currentInfo.info.high}</h6>
                  </div>
                  <div className="stats-info-item">
                    <h5>Low today</h5>
                    <h6>{currentInfo.info.low}</h6>
                  </div>
                </div>
                <div className="stats-info-column">
                  <div className="stats-info-item">
                    <h5>52 Week high</h5>
                    <h6>{currentInfo.info.weekHigh}</h6>
                  </div>
                  <div className="stats-info-item">
                    <h5>52 Week low</h5>
                    <h6>{currentInfo.info.weekLow}</h6>
                  </div>
                </div>
                <div className="stats-info-column">
                  <div className="stats-info-item">
                    <h5>Open</h5>
                    <h6>{currentInfo.info.open}</h6>
                  </div>
                  <div className="stats-info-item">

                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="news-container">
            {currentInfo.news[0] ? <h3 className="news-label">News</h3> : <></>}
            <div className="news">
              {currentInfo.news[0] ? (
                currentInfo.news.map((el) => {
                  const dateString = el.time_published.split("T")[0];
                  const year = +dateString.substring(0, 4);
                  const month = +dateString.substring(4, 6);
                  const day = +dateString.substring(6, 8);

                  const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  const date = new Date(year, month - 1, day);
                  const shortDate = date.getDate();
                  const shortMonth = monthNames[date.getMonth()];
                  const postDate = shortMonth + " " + shortDate;
                  return (
                    <a className="news-item" href={el.url} key={el.url}>
                      <div className="news-left">
                        <div className="title-date">
                          <h5>{el.source}</h5>
                          <h6>{postDate}</h6>
                        </div>
                        <h5>{el.title}</h5>
                        <h6>{el.summary.substring(0, 100)}...</h6>
                      </div>
                      <div className="news-right">
                        {
                          el.banner_image ? 
                          <img
                          className="news-right-img"
                          src={el.banner_image}
                          alt="stock-news-image"
                        />
                          :
                          <img className='news-right-img'
                          src='https://robinhood-clone-assets.s3.amazonaws.com/blank-image.png'
                          alt='blank-news-image'/>
                        }

                      </div>
                    </a>
                  );
                })
              ) : (
                  <></>
              )}
            </div>
          </div>
        </div>
        <div className="buy-sell-stock-container">
          <div className="buy-sell-stock">
            <div className="buy-specific-stock">
              <h6
                id="toggle-buy"
                style={{
                  color:
                    toggleBuySell === "Buy"
                      ? "#08c40c"
                      : currentQuantity
                      ? "#000000"
                      : "#08c40c",
                }}
                onClick={() => setToggleBuySell("Buy")}
                className="buy-specific-text"
              >
                Buy {currentInfo.symbol}
              </h6>
              {currentQuantity && currentInfo && ownsStock ? (
                <h6
                  id="toggle-sell"
                  style={{
                    color:
                      toggleBuySell === "Sell"
                        ? "rgba(255,80,1,255)"
                        : currentQuantity
                        ? "#000000"
                        : "rgba(255,80,1,255)",
                  }}
                  onClick={() => setToggleBuySell("Sell")}
                  className="buy-specific-text"
                >
                  Sell {currentInfo.symbol}
                </h6>
              ) : (
                <></>
              )}
            </div>
            {stocks ? (
              <div className="buy-sell-component-container">
                {toggleBuySell === "Buy" ? (
                  <BuyStockForm
                    ticker = {ticker}
                    stocks={stocks}
                    user={user}
                    portfolios={portfolios}
                    updatePortfolio={updatePortfolio}
                  />
                ) : (
                  <SellStockForm
                  ticker = {ticker}
                    stocks={stocks}
                    user={user}
                    portfolios={portfolios}
                    updatePortfolio={updatePortfolio}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
            <div className="buying-power-container">
              {toggleBuySell === "Buy" ? (
                <h6>
                  {currBuyPow ? `$${currBuyPow}` : "$0.00"} buying power
                  available
                </h6>
              ) : (
                <>
                  <h6 id="available-stock">
                    {currentQuantity
                      ? `${shareString ? shareString : "0"} Shares Available -`
                      : "0 Shares Available -"}
                  </h6>
                  <h6 onClick={() => handleSubmit()} id="sell-all">
                    Sell All
                  </h6>
                </>
              )}
            </div>
          </div>
          <div
            className="add-to-watchlist"
            style={{
              color: currentColor,
              border: `1px solid ${currentColor}`,
            }}
            onClick={() => handleAdd()}
          >
            {addedWatchlist ? (
              <h6>Remove from Watchlist</h6>
            ) : (
              <h6>Add to Watchlist</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mSTP = (state) => {
  return {
    stocks: state.entities.stocks,
    user: state.entities.users[state.session.id],
    portfolios: state.entities.portfolios,
    watchlists: state.entities.watchlists,
  };
};

const mDTP = (dispatch) => ({
  fetchWatchlists: () => dispatch(fetchWatchlists()),
  createWatchlist: (watchlist) => dispatch(createWatchlist(watchlist)),
  deleteWatchlist: (id) => dispatch(deleteWatchlist(id)),
  fetchPortfolios: () => dispatch(fetchPortfolios()),
  fetchStock: (ticker) => dispatch(fetchStock(ticker)),
  updatePortfolio: (portfolio) => dispatch(updatePortfolio(portfolio)),
  getUser: (userId) => dispatch(getUser(userId)),
  update: (user) => dispatch(update(user)),
});

export default connect(mSTP, mDTP)(ShowStock);
