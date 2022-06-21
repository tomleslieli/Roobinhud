import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Log in',
    formBody: 'Log in to Robinhood',
    navHelper: 'Not on Robinhood?',
    navLink: <Link to="/signup">Create an account</Link>,
    imgLeft: <img src='https://robinhood-clone-assets.s3.amazonaws.com/login-left-image.jpeg' alt='login-form-left' width='100%'/>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
