# Roobinhüd

### [Roobinhüd](https://aa-linealert.herokuapp.com/)

## Demo

#### Search for Stock Ticker

![Search for Stock Ticker](https://robinhood-clone-assets.s3.amazonaws.com/search-stock.gif)

#### Buy / Sell a Stock

![Buy / Sell Stock](https://robinhood-clone-assets.s3.amazonaws.com/buy-stock.gif)

## Background and Technologies

Roobinhüd, a Robinhood clone, is a commission-free investing brokerage & platform for stocks & exchanged-traded funds.

## Frontend:
- React-Redux
- HTML5 / SCSS

## Backend:
- Ruby on Rails
- PostgreSQL

## Misc:
- Amazon AWS S3
- Babel
- Heroku

## Functionality and MVPs

- Ability to search for stocks, which returns updated charts / market data.
- Accounts are limited by their buying power, which they can add to by depositing.
- Users can buy and sell stocks if they have sufficient buying power / equity. These are displayed on their dashboard.
- Users can add / remove items to their watchlist. These are displayed on their dashboard.
- When users search for a stock, key statistics such as market capitalization, volume, etc. will be displayed.

## Bonus Features

- Stock-specific news articles will be displayed for individual stocks, and general news articles will be displayed on the user dashboard.

## Alpha Vantage API

All market data within this application is drawn directly from Alpha Vantage API.

Alpha Vantage provides enterprise-grade financial market data through a set of powerful and developer-friendly APIs. From traditional asset classes (e.g., stocks and ETFs) to economic metrics, from foreign exchange rates to cryptocurrencies, from fundamental data to technical indicators, Alpha Vantage is your one-stop-shop for real-time and historical global market data delivered through RESTful stock APIs, Excel, and Google Sheets.