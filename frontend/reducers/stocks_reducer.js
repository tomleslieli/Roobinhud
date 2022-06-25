import { RECEIVESTOCK } from '../actions/stock_actions';


const stocksReducer = (state = {stocks:{}}, action) => {
  Object.freeze(state);
  let newStocks;
  switch(action.type) {
    case RECEIVESTOCK:
        newStocks = {...state.stocks, action.payload.stock};
      return Object.assign({}, state, { stocks: newStocks });
    // case BUY/SELLSTOCK
    case CHARTRECEIVED:
        newStocks = {...state.stocks};
        let foundStock = newStocks.find(stock => stock.ticker === action.payload.ticker);
        foundStock.chart = action.payload.chart
        newStocks = {...newStocks, [action.ticker]: foundStock}
        return {...state, stock: newStocks};
        // return Object.assign({}, state, { stocks: newStocks });

    default:
      return state;
  }
};

export default stocksReducer;