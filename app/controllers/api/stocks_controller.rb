class Api::StocksController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        @stocks = Stock.all
        render :index
    end

    def show
        @stock = Stock.find(params[:id])
    end

    def create
        @stock = Stock.new(stock_params)
        @stock.save
    end

    def update
        @stock = Stock.find(params[:id])
        @stock.update_attributes(stock_params)
    end

    private

    def stock_params
        params.require(:stock).permit(:ticker, :stock_name, :x_values, :y_values)
    end
end