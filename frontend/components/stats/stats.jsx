import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Link, useDispatch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/session_actions";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import { fetchWatchlists } from "../../actions/watchlist_actions";
import { fetchStock } from "../../actions/stock_actions";

ChartJS.register(...registerables);

const Stats = ({
  user,
  getUser,
  fetchStock,
  fetchPortfolios,
  portfolios,
  fetchWatchlists,
  watchlists,
}) => {
  const [currBuyingPower, setCurrBuyingPower] = useState(0);
  const [positions, setPositions] = useState(null);
  const [positionArr, setPositionArr] = useState([]);
  const [xValues, setXValues] = useState(null);
  const [yValues, setYValues] = useState(null);
  const [mappedPortfolio, setMappedPortfolio] = useState(false);
  const [redirectStock, setRedirectStock] = useState(null);
  const [hasFetchedStocks, setHasFetchedStocks] = useState(false);
  const [hideCurr, setHideCurr] = useState(true);
  const [readyToLoad, setReadyToLoad] = useState(false);

  const [portfolioValue, setPortfolioValue] = useState(null);
  const [hideWatchlist, setHideWatchlist] = useState(true);
  const [currentWatchlist, setCurrentWatchlist] = useState(null);
  const [watchlistArr, setWatchlistArr] = useState([]);

  const [dollarChange, setDollarChange] = useState(null);
  const [dollarShow, setDollarShow] = useState(null);
  const [percentChange, setPercentChange] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);
  const [color, setColor] = useState("#5AC53B");
  const [step, setStep] = useState("day");

  const history = useHistory();
  function redirectToCash() {
    history.push("/cash");
  }

  useEffect(() => {
    getUser(user.id);
    if (!Object.values(portfolios).length) {
      fetchPortfolios();
    }
    if (!Object.values(watchlists).length) {
      fetchWatchlists();
    }

    fetchNews();

    const script = document.createElement("script");

    script.src = "https://kit.fontawesome.com/a9b2f3d835.js";
    script.async = true;

    document.body.appendChild(script);

    setXValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setYValues([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }, []);

  useEffect(() => {
    console.log(xValues)
  }, [xValues])
  useEffect(() => {
    console.log(yValues)
  }, [yValues])

  useEffect(() => {
    let filteredArr;
    if (portfolios) {
      const filteredPortfolios = Object.values(portfolios).filter(
        (portfolio) => portfolio.portfolio_owner_id === user.id
      );
      filteredArr = filteredPortfolios.map((el) => [
        el.portfolio_stock_ticker,
        el.quantity,
      ]);
      if (filteredArr.length) {
        setPositions(filteredArr);
      }
    }
  }, [portfolios]);

  useEffect(() => {
    let filteredArr;
    if (watchlists) {
      const userWatchlists = Object.values(watchlists).filter(
        (el) => el.watchlist_owner_id === user.id
      );
      filteredArr = userWatchlists.map((el) => [el.watchlist_stock_ticker]);
      setCurrentWatchlist(filteredArr);
    }
  }, [watchlists]);

  useEffect(() => {
    if (currentWatchlist && !watchlistArr.length) {
      if (currentWatchlist.length && !watchlistArr.length) {
        const arr = [];
        const positionObjects = currentWatchlist.map(async (watchlist) => {
          await fetchChart(watchlist).then(function (obj) {
            setWatchlistArr((oldArr) => [...oldArr, obj]);
          });
        });
      }
    }
  }, [currentWatchlist]);

  const fetchChart = async (position) => {
    const ticker = position[0];
    let loaded = false;
    const KEY = "I81HDS39D33EBDAH";
    let INTRADAY = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=${KEY}`;
    let DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${KEY}`;

    const filteredData = {
      xValues: [],
      yValues: [],
      personalYValues: [],
      ticker: position[0],
      quantity: position[1],
      currentPrice: 0,
      totalValue: 0,
      week: { xValues: [], yValues: [] },
      month: { xValues: [], yValues: [] },
      threeMonth: { xValues: [], yValues: [] },
    };

    await fetch(DAILY)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let intraData = {
          xValues: [],
          yValues: [],
        };
        for (let key in data["Time Series (Daily)"]) {
          intraData.xValues.push(key);
          intraData.xValues.push(key + 0.5);
          intraData.yValues.push(data["Time Series (Daily)"][key]["1. open"]);
          intraData.yValues.push(data["Time Series (Daily)"][key]["4. close"]);
        }
        for (let i = 0; i < 14; i++) {
          filteredData.week.xValues.unshift(intraData.xValues[i]);
          filteredData.week.yValues.unshift(intraData.yValues[i]);
        }
        for (let i = 0; i < 60; i++) {
          filteredData.month.xValues.unshift(intraData.xValues[i]);
          filteredData.month.yValues.unshift(intraData.yValues[i]);
        }
        for (let i = 0; i < 180; i += 3) {
          filteredData.threeMonth.xValues.unshift(intraData.xValues[i]);
          filteredData.threeMonth.yValues.unshift(intraData.yValues[i]);
        }
      });

    await fetch(INTRADAY)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let intraData = {
          xValues: [],
          yValues: [],
        };

        for (let key in data[`Time Series (15min)`]) {
          intraData.xValues.push(key);
          intraData.xValues.push(key + 0.5);
          intraData.yValues.push(data[`Time Series (15min)`][key]["1. open"]);
          intraData.yValues.push(data[`Time Series (15min)`][key]["4. close"]);
        }
        const latestDate = intraData.xValues[0].split(" ")[0];
        for (let i = 0; i < intraData.xValues.length; i++) {
          const objDate = intraData.xValues[i].split(" ")[0];
          if (objDate === latestDate) {
            filteredData.xValues.unshift(intraData.xValues[i]);
            filteredData.yValues.unshift(intraData.yValues[i]);
          }
        }
      })
      .then(function () {
        filteredData.currentPrice = parseFloat(
          filteredData["yValues"][filteredData["yValues"].length - 1]
        ).toFixed(2);
        filteredData.totalValue = (
          position[1] *
          filteredData["yValues"][filteredData["yValues"].length - 1]
        ).toFixed(2);
        filteredData.personalYValues = filteredData["yValues"].map((el) => {
          return (parseFloat(el) * parseFloat(filteredData.quantity)).toFixed(
            2
          );
        });
      });

    return filteredData;
  };

  const fetchNews = async () => {
    const API_KEY = "I81HDS39D33EBDAH";
    let NEWS = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${API_KEY}`;
    let news = [];
    await fetch(NEWS)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.feed) {
          for (let i = 0; i < 10; i++) {
            news.push(data.feed[i]);
          }
        }
      });
    setCurrentNews(news);
  };

  useEffect(() => {
    if (positions && !positionArr.length) {
      const arr = [];
      const positionObjects = positions.map(async (position) => {
        await fetchChart(position).then(function (obj) {
          setPositionArr((oldArr) => [...oldArr, obj]);
        });
      });
    }
  }, [positions]);

  useEffect(() => {
    if (positionArr && positions && xValues.length === 10 && yValues.length === 10) {
      if (positionArr.length === positions.length && xValues.length === 10) {
        let totalValue = 0;

        positionArr.map((el) => {
          totalValue += parseFloat(el.totalValue);
        });
        let totalVal = totalValue.toFixed(2).toString().split(".")[1];
        if (totalVal) {
          if (totalVal.length > 2) {
            totalVal = totalVal.slice(0, 2);
          }
          setPortfolioValue(
            parseFloat(totalValue).toLocaleString("en-US").split(".")[0] +
              "." +
              totalVal
          );
        }

        let yVals = [];
        for (let i = 0; i < positionArr[0]["personalYValues"].length; i++) {
          let total = 0;
          for (let j = 0; j < positionArr.length; j++) {
            total += parseFloat(positionArr[j]["personalYValues"][i]);
          }
          if (!isNaN(total)) {
            yVals.push(total);
          }
        }
        setYValues(yVals);
        let xVals = positionArr[0]['xValues'];
        xVals = xVals.slice(0,yVals.length)
        setXValues(xVals);
        setReadyToLoad(true);
      }
    }
  }, [positionArr]);

  //SET CHART DATA ACCORDING TO STEP
  useEffect(() => {
    let newXValues = [];
    let newYValues = [];

    if (positionArr.length) {
      if (step === "day") {
        for (let i = 0; i < positionArr[0]["yValues"].length; i++) {
          let total = 0;
          for (let j = 0; j < positionArr.length; j++) {
            total += parseFloat(positionArr[j]["personalYValues"][i]);
          }
          if (!isNaN(total)) {
            newYValues.push(total);
          }
          newXValues = positionArr[0]["xValues"];
          newXValues = newXValues.slice(0, newYValues.length)
        }
      } else if (step === "week") {
        newXValues = positionArr[0]["week"]["xValues"];
        for (let i = 0; i < positionArr[0]["week"]["yValues"].length; i++) {
          let total = 0;
          for (let j = 0; j < positionArr.length; j++) {
            total += parseFloat(
              positionArr[j]["week"]["yValues"][i] * positionArr[j]["quantity"]
            );
          }
          if (!isNaN(total)) {
            newYValues.push(total);
          }
        }
      } else if (step === "month") {
        newXValues = positionArr[0]["month"]["xValues"];
        for (let i = 0; i < positionArr[0]["month"]["yValues"].length; i++) {
          let total = 0;
          for (let j = 0; j < positionArr.length; j++) {
            total += parseFloat(
              positionArr[j]["month"]["yValues"][i] * positionArr[j]["quantity"]
            );
          }
          if (!isNaN(total)) {
            newYValues.push(total);
          }
        }
      } else if (step === "threeMonth") {
        newXValues = positionArr[0]["threeMonth"]["xValues"];
        for (
          let i = 0;
          i < positionArr[0]["threeMonth"]["yValues"].length;
          i++
        ) {
          let total = 0;
          for (let j = 0; j < positionArr.length; j++) {
            total += parseFloat(
              positionArr[j]["threeMonth"]["yValues"][i] *
                positionArr[j]["quantity"]
            );
          }
          if (!isNaN(total)) {
            newYValues.push(total);
          }
        }
      }
      setXValues(newXValues);
      setYValues(newYValues);
    }
  }, [step]);

  //SET CHANGE AMOUNT ACCORDING TO STEP
  useEffect(() => {
    if (yValues) {
      let lastIndex;
      for (let i = yValues.length - 1; i >= 0; i--) {
        if (!isNaN(yValues[i])) {
          lastIndex = i;
          break;
        }
      }
      const diff = parseFloat(yValues[lastIndex] - yValues[0]);
      const diffPercent = parseFloat((diff / yValues[0]) * 100);
      if (diffPercent < 0) {
        setColor("rgb(244, 104, 39)");
      } else {
        setColor("#5AC53B");
      }
      const diffString = parseFloat(Math.abs(diff).toFixed(2)).toLocaleString(
        "en-US"
      );
      setDollarChange(diff);
      setDollarShow(diffString);
      setPercentChange(diffPercent.toFixed(2));
    }
  }, [yValues, step]);

  useEffect(() => {
    if (user.buying_power) {
      if (user.buying_power.toString().includes(".")) {
        let buyPow = user.buying_power.toFixed(2).split(".")[1];
        setCurrBuyingPower(
          parseFloat(user.buying_power).toLocaleString("en-US").split(".")[0] +
            "." +
            buyPow
        );
      } else {
        let buyPow = "00";
        setCurrBuyingPower(
          parseFloat(user.buying_power).toLocaleString("en-US").split(".")[0] +
            "." +
            buyPow
        );
      }
    }
  }, [user]);

  useEffect(() => {
    if (redirectStock) {
      handleSubmit(redirectStock);
    }
  }, [redirectStock]);

  const handleSubmit = (stock) => {
    fetchStock(redirectStock);
    setTimeout(() => {
      history.push(`/stocks/${redirectStock}`);
    }, 100);
  };

  return (
    <div className="stock-show">
      <div className="stock-dashboard">
        <div className="stock-left">
          <div className="stock-line-chart">
            {user && xValues && yValues ? (
              <>
                <div className="stock-info">
                  <h1>${portfolioValue ? portfolioValue : "0.00"}</h1>
                  <div className="stock-day-change">
                    <div className="stock-dollar" style={{ color: color }}>
                      <h6>
                        {dollarChange >= 0 ? "+" : "-"}$
                        {dollarChange && dollarShow ? dollarShow : "0.00"}
                      </h6>
                    </div>
                    <div className="stock-percent" style={{ color: color }}>
                      {isNaN(percentChange) ? (
                        "(+0.00%)"
                      ) : (
                        <h6>
                          ({percentChange >= 0 ? "+" : "-"}
                          {percentChange
                            ? Math.abs(percentChange).toFixed(2)
                            : "0.00"}
                          %)
                        </h6>
                      )}
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
                  id="portfolio-chart"
                  className="stock-line-chart-graph"
                  height="270px"
                  width="650px"
                  data={{
                    labels: xValues,
                    datasets: [
                      {
                        type: "line",
                        data: yValues,
                        borderColor: color,
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
                      color: step === "day" ? color : "#000000",
                    }}
                    onClick={() => setStep("day")}
                  >
                    <h6>1D</h6>
                  </button>
                  <button
                    className="interval-button-week"
                    style={{
                      color: step === "week" ? color : "#000000",
                    }}
                    onClick={() => setStep("week")}
                  >
                    <h6>1W</h6>
                  </button>
                  <button
                    className="interval-button-month"
                    style={{
                      color: step === "month" ? color : "#000000",
                    }}
                    onClick={() => setStep("month")}
                  >
                    <h6>1M</h6>
                  </button>
                  <button
                    className="interval-button-three-month"
                    style={{
                      color: step === "threeMonth" ? color : "#000000",
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
          <div className="stats-buying-power" onClick={() => redirectToCash()}>
            <h6 className="stats-buying-power-left">Buying Power</h6>
            <h6 className="stats-buying-power-right">${currBuyingPower}</h6>
          </div>
          <div className="current-news">
            {currentNews ? <h3 className="news-label">News</h3> : <></>}
            <div className="news">
              {currentNews ? (
                currentNews.map((el) => {
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
                    <a
                      className="news-item"
                      href={el.url}
                      target="_blank"
                      key={el.url}
                    >
                      <div className="news-left">
                        <div className="title-date">
                          <h5>{el.source}</h5>
                          <h6>{postDate}</h6>
                        </div>
                        <h5>{el.title}</h5>
                        <h6>{el.summary.substring(0, 100)}...</h6>
                      </div>
                      <div className="news-right">
                        {el.banner_image ? (
                          <img
                            className="news-right-img"
                            src={el.banner_image}
                            alt="home-news-image"
                          />
                        ) : (
                          <img
                            className="news-right-img"
                            src="https://robinhood-clone-assets.s3.amazonaws.com/blank-image.png"
                            alt="blank-news-image"
                          />
                        )}
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
        <div className="user-portfolio-container">
          <div className="user-portfolio">
            <div className="lists-title">
              <h6 className="lists-title-text">Lists</h6>
            </div>

            <div className="lists-item">
              <div className="watchlist-tab">
                <span className="list-icon-background">
                  <i className="fa-solid fa-eye"></i>
                </span>
                <h6>Current Positions</h6>
              </div>
              {hideCurr ? (
                <i
                  onClick={() => setHideCurr(!hideCurr)}
                  className="fa-solid fa-chevron-down"
                ></i>
              ) : (
                <i
                  onClick={() => setHideCurr(!hideCurr)}
                  className="fa-solid fa-chevron-up"
                ></i>
              )}
            </div>
            {positionArr.length &&
            !hasFetchedStocks &&
            hideCurr &&
            readyToLoad ? (
              positionArr.map((el) => {
                let change = (
                  el.yValues[el.yValues.length - 1] - el.yValues[0]
                ).toFixed(2);
                let color;
                if (change >= 0) {
                  color = "#5AC53B";
                } else {
                  color = "rgb(244, 104, 39)";
                }
                const stock = el.ticker;
                const changePercent = (
                  (parseFloat(change) / el.yValues[0]) *
                  100
                ).toFixed(2);
                return (
                  <>
                  {
                    !el.quantity ? <></> : 
                    <>
                                      <div
                    className="position-item"
                    key={el.ticker}
                    onClick={() => setRedirectStock(el.ticker)}
                  >
                    <div className="portfolio-item-ticker">
                      <h6>{el.ticker}</h6>
                    </div>
                    <div className="mini-chart">
                      <Line
                        id="stock-chart"
                        className="stock-line-chart-graph"
                        height="62.5px"
                        width="100px"
                        data={{
                          labels: el.xValues,
                          datasets: [
                            {
                              type: "line",
                              data: el.yValues,
                              borderColor: color,
                              borderWidth: 0.5,
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
                    </div>
                    <div className="portfolio-item-change">
                      <h5>
                        $
                        {parseFloat(el.yValues[el.yValues.length - 1]).toFixed(
                          2
                        )}
                      </h5>
                      <br />
                      <h6 style={{ color: color }}>
                        {change >= 0 ? "+" : ""}
                        {changePercent}%
                      </h6>
                    </div>
                  </div>
                    </>
                  }
                  </>
                );
                {
                  setHasFetchedStocks(true);
                }
              })
            ) : (
              <></>
            )}
            <div className="lists-item">
              <div className="watchlist-tab">
                <span className="list-icon-background">
                  <i className="fa-solid fa-lightbulb"></i>
                </span>
                <h6>Watchlist</h6>
              </div>
              {hideWatchlist ? (
                <i
                  onClick={() => setHideWatchlist(!hideWatchlist)}
                  className="fa-solid fa-chevron-down"
                ></i>
              ) : (
                <i
                  onClick={() => setHideWatchlist(!hideWatchlist)}
                  className="fa-solid fa-chevron-up"
                ></i>
              )}
            </div>
            {watchlistArr.length && !hasFetchedStocks && hideWatchlist ? (
              watchlistArr.map((el) => {
                let change = (
                  el.yValues[el.yValues.length - 1] - el.yValues[0]
                ).toFixed(2);
                const changePercent = (
                  (parseFloat(change) / el.yValues[0]) *
                  100
                ).toFixed(2);
                let color;
                if (change >= 0) {
                  color = "#5AC53B";
                } else {
                  color = "rgb(244, 104, 39)";
                }
                const stock = el.ticker;
                return (
                  <div
                    className="position-item"
                    key={el.ticker + '_position'}
                    onClick={() => setRedirectStock(el.ticker)}
                  >
                    <div className="portfolio-item-ticker">
                      <h6>{el.ticker}</h6>
                    </div>
                    <div>
                      <Line
                        id="stock-chart"
                        className="stock-line-chart-graph"
                        height="70px"
                        width="100px"
                        data={{
                          labels: el.xValues,
                          datasets: [
                            {
                              type: "line",
                              data: el.yValues,
                              borderColor: color,
                              borderWidth: 0.5,
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
                    </div>
                    <div className="portfolio-item-change">
                      <h5>
                        $
                        {parseFloat(el.yValues[el.yValues.length - 1]).toFixed(
                          2
                        )}
                      </h5>
                      <br />
                      <h6 style={{ color: color }}>
                        {change >= 0 ? "+" : ""}
                        {changePercent}%
                      </h6>
                    </div>
                  </div>
                );
                {
                  setHasFetchedStocks(true);
                }
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mSTP = (state) => {
  return {
    user: state.entities.users[state.session.id],
    portfolios: state.entities.portfolios,
    watchlists: state.entities.watchlists,
  };
};

const mDTP = (dispatch) => ({
  fetchWatchlists: () => dispatch(fetchWatchlists()),
  getUser: (userId) => dispatch(getUser(userId)),
  fetchPortfolios: () => dispatch(fetchPortfolios()),
  fetchStock: (ticker) => dispatch(fetchStock(ticker)),
});

export default connect(mSTP, mDTP)(Stats);
