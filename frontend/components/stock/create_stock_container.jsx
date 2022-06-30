import { connect } from 'react-redux';
import { fetchStock, receiveStock } from '../../actions/stock_actions';
import StockForm from './stock_form';
import { createStock } from '../../actions/stock_actions';

const mSTP = state => ({
  stock: {
    ticker: '',
    stockName: '',
    x_values: [],
    y_values: []
  },
  currentValue: 0.0,
  dollarsToday: 0.0,
  percentToday: 0.0,
});

const mDTP = dispatch => ({
  fetchStock: stockId => dispatch(fetchStock(stockId)),
  receiveStock: stock => dispatch(receiveStock(stock)),
  action: stock => dispatch(createStock(stock)),
});

export default connect(mSTP, mDTP)(StockForm);