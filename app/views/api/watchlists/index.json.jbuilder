@watchlists.each do |watchlist|
    json.set! watchlist.id do
        json.extract! watchlist, :id, :watchlist_owner_id, :watchlist_stock_ticker
    end
end