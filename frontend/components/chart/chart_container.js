import { connect } from 'react-redux';

import MyChart from './chart';

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP,mDTP)(MyChart);