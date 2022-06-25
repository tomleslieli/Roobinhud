import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { receiveStock, addStock, subtractStock } from '../../actions/stock_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Log in',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);