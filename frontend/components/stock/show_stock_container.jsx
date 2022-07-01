import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { fetchStock } from '../../actions/stock_actions';
import ShowStock from './show_stock';

const mSTP = (state, ownProps) => ({
    stock: state.entities.stocks[ownProps.match.params.stockId],
    user: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchStock: stockId => dispatch(fetchStock(stockId)),
});

export default connect(mSTP, mDTP)(ShowStock);