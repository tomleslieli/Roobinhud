class Api::WatchlistsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        @watchlists = Watchlist.all
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)
        
        @watchlist.save
    end

    def destroy
        @watchlist = Watchlist.find(params[:id])
        @watchlist.destroy
    end

    private

    def watchlist_params
        params.require(:watchlist).permit(:id, :watchlist_owner_id, :watchlist_stock_ticker)
    end    
end