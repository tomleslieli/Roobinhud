class Api::WatchlistsController < ApplicationController
    def show
        @watchlist = Watchlist.find(params[:id])
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)
        
        if @watchlist.save
            render 'api/users/show'
        end
    end

    def destroy
        @watchlist = current_user.watchlists.find_by(id: params[:id])
        if @watchlist && @watchlist.destroy
            render 'api/users/show'
        end
    end

    private

    def watchlist_params
        params.require(:watchlist).permit(:watchlist_owner_id, :buying_power, :stocks_value, :stocks_owned)
    end    
end