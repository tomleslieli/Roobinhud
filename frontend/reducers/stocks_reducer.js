import { RECEIVE_STOCK } from "../actions/stock_actions";

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({});
  switch (action.type) {
    case RECEIVE_STOCK:
      nextState[action.stock.symbol] = action.stock;
      return nextState;
    default:
      return state;
  }
};

export default stocksReducer;
