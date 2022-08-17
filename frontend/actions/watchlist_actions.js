import * as WatchlistApiUtil from "../util/watchlist_api_util";

export const RECEIVE_WATCHLISTS = "RECEIVE_WATCHLISTS";
export const DELETE_WATCHLIST = 'DELETE_WATCHLIST';

export const receiveWatchlists = (watchlists) => ({
  type: RECEIVE_WATCHLISTS,
  watchlists,
});

export const removeWatchlist = (watchlistId) => ({
  type: DELETE_WATCHLIST,
  watchlistId
})

export const fetchWatchlists = () => (dispatch) =>
  WatchlistApiUtil.fetchWatchlists().then(
    (watchlists) => (
      dispatch(receiveWatchlists(watchlists))
    )
  );

export const createWatchlist = (watchlist) => (dispatch) =>
  WatchlistApiUtil.createWatchlist(watchlist);
  // .then(
  //   (watchlists) => (
  //     dispatch(receiveWatchlists())
  //   )
  // );

export const deleteWatchlist = (watchlistId) => (dispatch) =>
  WatchlistApiUtil.deleteWatchlist(watchlistId).then(
    () => dispatch(removeWatchlist(watchlistId))
  );