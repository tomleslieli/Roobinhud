import { RECEIVE_WATCHLISTS, DELETE_WATCHLIST } from "../actions/watchlist_actions";

const WatchlistsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_WATCHLISTS:
      Object.assign(nextState, action.watchlists);
      return nextState;
    case DELETE_WATCHLIST:
      delete nextState[action.watchlistId];
      return nextState
    default:
      return state;
  }
};

export default WatchlistsReducer;
