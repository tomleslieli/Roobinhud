import { RECEIVE_STOCK } from '../actions/stock_actions';

const StocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let nextState = Object.assign({}, oldState)
  switch(action.type) {
    case RECEIVE_STOCK:
        nextState[action.stock.id] = action.stock;
      return nextState
    default:
      return oldState
  }
};

export default StocksReducer;