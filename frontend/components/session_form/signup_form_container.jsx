import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Sign up',
    navHelper: 'Already registered?',
    navLink: <Link to="/login">Log in</Link>,
    imgLeft: <img src='https://robinhood-clone-assets.s3.amazonaws.com/signup-left-image.png' alt='login-form-left' width='100%'/>
  };
};

const mDTP = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
  };
};

export default connect(mSTP, mDTP)(SessionForm);
