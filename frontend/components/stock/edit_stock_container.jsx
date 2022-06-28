import React from 'react';
import { connect } from 'react-redux';
import { updateStock } from '../../actions/stock_actions';
import StockForm from './stock_form';

const mSTP = (state, ownProps) => ({
  stock: state.stocks[ownProps.match.params.stockId]
});

const mDTP = dispatch => ({
  action: stock => dispatch(updateStock(stock))
});

export default connect(mSTP, mDTP)(StockForm);