import { connect } from 'react-redux';
import { fetchStock, receiveStock } from '../../actions/stock_actions';
import StockForm from './stock_form';
import { createStock } from '../../util/stock_api_util'

const mSTP = state => ({
  stock: {
    ticker: '',
    stockName: '',
    xValues: [],
    yValues: []
  }
});

const mDTP = dispatch => ({
  fetchStock: stockId => dispatch(fetchStock(stockId)),
  receiveStock: stock => dispatch(receiveStock(stock)),
  action: stock => dispatch(createStock(stock))
});

export default connect(mSTP, mDTP)(StockForm);