import * as StockUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';

export const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock
});

export const fetchStock = stockId => dispatch => {
  let aye = StockUtil.fetchStock(stockId)
  console.log(`THIS IS THE STOCK ${stockId}`, aye)
  jQuery.ajax({
    url: `/api/stocks/${stockId}`,
    type: 'GET',
    success: function(stock){
        dispatch(receiveStock(stock))
    }
  })
}

export const createStock = (stock, x_values, y_values) => {
  return (dispatch) => {
    return StockUtil.createStock(stock, x_values, y_values)
    .then(stock => dispatch(receiveStock(stock)))
  }
}

export const updateStock = (stock, x_values, y_values) => dispatch => (
  StockUtil.updateStock(stock, x_values, y_values).then(stock => 
    dispatch(receiveStock(stock))
  )
)