import { connect } from "react-redux";

import { logout } from "../../actions/session_actions";
import Body from "./body";

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id],
  };
};

const mDTP = (dispatch) => ({});

export default connect(mSTP, mDTP)(Body);
