import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import portfolioErrorsReducer from "./portfolio_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  portfolio: portfolioErrorsReducer,
});

export default errorsReducer;
