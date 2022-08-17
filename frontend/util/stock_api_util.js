export const fetchStock = async (ticker) => {
  let loaded = false;
  const API_KEY = "I81HDS39D33EBDAH";
  let STOCKNAME = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${API_KEY}`;
  let NEWS = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${API_KEY}`;
  let DAILY = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
  let INTRADAY = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=${API_KEY}`;

  let GLOBALQUOTE = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
  let OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`

  let filteredData = {
    name: "",
    symbol: ticker,
    day: { xValues: [], yValues: [] },
    week: { xValues: [], yValues: [] },
    month: { xValues: [], yValues: [] },
    threeMonth: { xValues: [], yValues: [] },
    news: [],
    info: {
      open: 0,
      high: 0,
      low: 0,
      volume: 0,

      marketCap: 0,
      weekHigh: 0,
      weekLow: 0,
      price: 0
    }
  };

  await fetch(GLOBALQUOTE)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let globalData = {
        open: data['Global Quote']['02. open'],
        high: data['Global Quote']['03. high'],
        low: data['Global Quote']['04. low'],
        volume: data['Global Quote']['06. volume'],
        price: data['Global Quote']['05. price']
      };
      if (globalData.volume.length >= 4 && globalData.volume.length < 7) {
        globalData.volume = (parseFloat(parseInt(globalData.volume) / 1000)).toFixed(2) + 'K'
      }
      if (globalData.volume.length >= 7 && globalData.volume.length < 10) {
        globalData.volume = (parseFloat(parseInt(globalData.volume) / 1000000)).toFixed(2) + 'M'
      }
      if (globalData.volume.length >= 10 && globalData.volume.length < 13) {
        globalData.volume = (parseFloat(parseInt(globalData.volume) / 1000000000)).toFixed(2) + 'B'
      }
      filteredData.info.open = '$' + (parseFloat(globalData.open)).toFixed(2);
      filteredData.info.high = '$' + (parseFloat(globalData.high)).toFixed(2);
      filteredData.info.low = '$' + (parseFloat(globalData.low)).toFixed(2);
      filteredData.info.volume = globalData.volume;
      filteredData.info.price = globalData.price;
    })

  await fetch(OVERVIEW)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
      let overviewData = {
        marketCap: data['MarketCapitalization'],
        weekHigh: data['52WeekHigh'],
        weekLow: data['52WeekLow']
      }
      if (overviewData.marketCap.length >= 4 && overviewData.marketCap.length < 7) {
        overviewData.marketCap = (parseFloat(parseInt(overviewData.marketCap) / 1000)).toFixed(2) + 'K'
      }
      if (overviewData.marketCap.length >= 7 && overviewData.marketCap.length < 10) {
        overviewData.marketCap = (parseFloat(parseInt(overviewData.marketCap) / 1000000)).toFixed(2) + 'M'
      }
      if (overviewData.marketCap.length >= 10 && overviewData.marketCap.length < 13) {
        overviewData.marketCap = (parseFloat(parseInt(overviewData.marketCap) / 1000000000)).toFixed(2) + 'B'
      }
      filteredData.info.weekHigh = '$' + (parseFloat(overviewData.weekHigh)).toFixed(2);
      filteredData.info.weekLow = '$' + (parseFloat(overviewData.weekLow)).toFixed(2);
      filteredData.info.marketCap = overviewData.marketCap;
    })

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
          filteredData.day.xValues.unshift(intraData.xValues[i]);
          filteredData.day.yValues.unshift(intraData.yValues[i]);
        }
      }
    });
  await fetch(DAILY)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let dataObj = {
        xValues: [],
        yValues: [],
      };
      for (let key in data["Time Series (Daily)"]) {
        dataObj.xValues.push(key);
        dataObj.xValues.push(key + 0.5);
        dataObj.yValues.push(data["Time Series (Daily)"][key]["1. open"]);
        dataObj.yValues.push(data["Time Series (Daily)"][key]["4. close"]);
      }
      for (let i = 0; i < 14; i++) {
        filteredData.week.xValues.unshift(dataObj.xValues[i]);
        filteredData.week.yValues.unshift(dataObj.yValues[i]);
      }
      for (let i = 0; i < 60; i++) {
        filteredData.month.xValues.unshift(dataObj.xValues[i]);
        filteredData.month.yValues.unshift(dataObj.yValues[i]);
      }
      for (let i = 0; i < 180; i += 3) {
        filteredData.threeMonth.xValues.unshift(dataObj.xValues[i]);
        filteredData.threeMonth.yValues.unshift(dataObj.yValues[i]);
      }
    });

  await fetch(STOCKNAME)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const firstMatch = data.bestMatches[0]["2. name"];
      filteredData.name = firstMatch;
    });

  await fetch(NEWS)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.feed) {
        for (let i = 0; i < 5; i++) {
          filteredData.news.push(data.feed[i]);
        }
      }
    });
  return filteredData;
};