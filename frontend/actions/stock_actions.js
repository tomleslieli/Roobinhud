import * as StockUtil from "../util/stock_api_util";

export const RECEIVE_STOCK = "RECEIVE_STOCK";

export const receiveStock = (stock) => ({
  type: RECEIVE_STOCK,
  stock,
});

export const fetchStock = (ticker) => (dispatch) =>
  StockUtil.fetchStock(ticker).then((stock) => {
    dispatch(receiveStock(stock));
  });