import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { fetchStock } from "../../actions/stock_actions";
import { connect, useDispatch } from "react-redux";

const StockForm = ({ fetchStock }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    ticker: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchStock(state.ticker);
    history.push(`/stocks/${state.ticker}`);
    setState({ ticker: "" });
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        placeholder = 'Search'
        className="search-bar"
        type="text"
        value={state.ticker}
        onChange={(e) => setState({ ticker: e.target.value.toUpperCase() })}
      />
    </form>
  );
};

const mSTP = (state) => {
  return {};
};

const mDTP = (dispatch) => ({
  fetchStock: (ticker) => dispatch(fetchStock(ticker)),
});

export default connect(mSTP, mDTP)(StockForm);
