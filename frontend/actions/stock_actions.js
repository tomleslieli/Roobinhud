import * as StockUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock
});

export const fetchStock = stockId => dispatch => (
  StockUtil.fetchStock(stockId).then(stock => 
    dispatch(receiveStock(ticker))
    )
)

export const createStock = stock => dispatch => {
  console.log('CREATESTOCK ACTION REACHED')
  console.log(stock)
  console.log('END CREATESTOCK')
  let res = StockUtil.createStock(stock)
  dispatch(receiveStock(res))
}

export const updateStock = stock => dispatch => (
  StockUtil.updateStock(stock).then(stock => 
    dispatch(receiveStock(stock))
  )
)