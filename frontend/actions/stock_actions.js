import * as StockUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';

export const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock
});

export const fetchStock = stockId => dispatch => (
  StockUtil.fetchStock(stockId).then(stock => 
    dispatch(receiveStock(ticker))
    )
)

// export const createStock = stock => dispatch => (
//   // console.log('CREATESTOCK ACTION REACHED')
//   // console.log(stock)
//   // console.log('END CREATESTOCK')
//   StockUtil.createStock(stock).then(
//     stock => dispatch(receiveStock(stock))
//   )
// )

export const createStock = (stock, x_values, y_values) => {
  // debugger
  return (dispatch) => {
    return StockUtil.createStock(stock, x_values, y_values)
    .then(stock => dispatch(receiveStock(stock)))
  }
}

export const updateStock = stock => dispatch => (
  StockUtil.updateStock(stock).then(stock => 
    dispatch(receiveStock(stock))
  )
)