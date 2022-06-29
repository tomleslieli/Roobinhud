import { connect } from 'react-redux';
import { createStock } from '../../actions/stock_actions';
import StockForm from './stock_form';

const mSTP = state => ({
  stock: {
    ticker: '',
    stockName: '',
    xValues: [],
    yValues: [],
  }
});

const mDTP = dispatch => ({
  fetchStock: stockId => dispatch(fetchStock(stockId)),
  action: stock => {
    console.log('STOCK IN ACTION',stock);
    dispatch(createStock(stock))
  }
});

export default connect(mSTP, mDTP)(StockForm);