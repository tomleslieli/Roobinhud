import * as StockUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock
});

export const fetchStock = stockId => dispatch => (
  StockUtil.fetchStock(stockId).then(stock => (
    dispatch(receiveStock(stock))))
)

export const createStock = stock => dispatch => (
  StockUtil.createStock(stock).then(stock => (
    dispatch(receiveStock(stock))
  ))
)

export const updateStock = stock => dispatch => (
  StockUtil.updateStock(stock).then(stock => (
    dispatch(receiveStock(stock))
  ))
)