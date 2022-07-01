import { render } from 'react-dom';
import { RECEIVE_STOCK } from '../actions/stock_actions';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  // console.log('STOCKSREDUCER REACHED', action)
  switch(action.type) {
    case RECEIVE_STOCK:
      // console.log('RECEIVESTOCK IN REDUCER!!!',action)
      console.log('ACTION IN REDUCER',action);
      return {...state, [action.stock.id]: action.stock };
    default:
      return state
  }
};

export default stocksReducer;