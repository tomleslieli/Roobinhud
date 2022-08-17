import {
  RECEIVE_PORTFOLIOS,
  RECEIVE_PORTFOLIO_ERRORS,
  CLEAR_ERRORS,
} from "../actions/portfolio_actions";

const _nullErrors = [];

const portfolioErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PORTFOLIO_ERRORS:
      return Object.assign([], action.errors);
    case RECEIVE_PORTFOLIOS:
      return _nullErrors;
    case CLEAR_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

export default portfolioErrorsReducer;
