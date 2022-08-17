import * as PortfolioApiUtil from "../util/portfolio_api_util";

export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";
export const RECEIVE_PORTFOLIO_ERRORS = "RECEIVE_PORTFOLIO_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receivePortfolios = (portfolios) => ({
  type: RECEIVE_PORTFOLIOS,
  portfolios,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_PORTFOLIO_ERRORS,
  errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const fetchPortfolios = () => (dispatch) =>
  PortfolioApiUtil.fetchPortfolios().then(
    (portfolios) => (
      dispatch(receivePortfolios(portfolios)),
      (error) => dispatch(receiveErrors(error.responseJSON))
    )
  );

export const createPortfolio = (portfolio) => (dispatch) =>
  PortfolioApiUtil.createPortfolio(portfolio);
  // .then(() => (
  //     dispatch(receivePortfolios()),
  //     error => (
  //         dispatch(receiveErrors(errors.responseJSON))
  //     )
  // ))

export const updatePortfolio = (portfolio) => (dispatch) =>
  PortfolioApiUtil.updatePortfolio(portfolio);
  // .then(() => (
  // dispatch(receivePortfolios()),
  // error => (
  //     dispatch(receiveErrors(errors.responseJSON))
  // )
  // ))
