import { connect } from 'react-redux';

import MyChart from './chart';

const mSTP = ({ session, entities: { users, stocks } }) => {
  return {
    currentUser: users[session.id],
    stocks
  };
};

const mDTP = dispatch => ({
    dispatch
});

export default connect(mSTP,mDTP)(MyChart);