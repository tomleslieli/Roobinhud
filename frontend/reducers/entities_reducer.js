import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import stocksReducer from "./stocks_reducer";
import portfoliosReducer from "./portfolios_reducer";
import watchlistsReducer from "./watchlists_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer,
  portfolios: portfoliosReducer,
  watchlists: watchlistsReducer
});

export default entitiesReducer;
