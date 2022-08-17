import { RECEIVE_PORTFOLIOS } from "../actions/portfolio_actions";

const PortfoliosReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PORTFOLIOS:
      Object.assign(nextState, action.portfolios);
      return nextState;
    default:
      return state;
  }
};

export default PortfoliosReducer;
