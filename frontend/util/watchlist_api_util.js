export const fetchWatchlists = () =>
  $.ajax({
    url: "/api/watchlists",
    method: "GET",
  });

export const createWatchlist = (watchlist) =>
  $.ajax({
    url: "/api/watchlists",
    method: "POST",
    data: { watchlist },
  });

  export const deleteWatchlist = (watchlistId) =>
  $.ajax({
    url: `/api/watchlists/${watchlistId}`,
    method: 'DELETE'
  });