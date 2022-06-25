import * as APIUtil from '../util/session_api_util';

export const RECEIVEALLSTOCKS = 'RECEIVEALLSTOCKS';
export const RECEIVESTOCK = 'RECEIVESTOCK';
export const SELLSTOCK = 'SELLSTOCK';
export const BUYSTOCK = 'BUYSTOCK';

const fetchAllStocks = stocks => ({
  type: RECEIVEALLSTOCKS,
  stocks
})

const fetchStock = stock => ({
    type: RECEIVESTOCK,
    stock
});

export const receiveStock = stock => dispatch => (
    APIUtil.viewStock(stock).then(stock => (
      dispatch(fetchStock(stock))))

  );
  
  export const login = stock => dispatch => (
    APIUtil.login(stock).then(stock => (
      dispatch(receiveStock(stock))), 
  );
  
  export const logout = () => dispatch => (
    APIUtil.logout().then(() => (
      dispatch(logoutCurrentStock())
    ))
  );