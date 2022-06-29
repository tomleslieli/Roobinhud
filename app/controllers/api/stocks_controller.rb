class Api::StocksController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :snake_case_params

    def serialize(stock)
        V1::StockSerializer.new(@stock)
    end


    def show
        @stock = Stock.find(params[:id])
    end

    def create
        puts 'WE ARE IN THE CREATE FUNCTION'
        @stock = Stock.new(stock_params)
        puts @stock
        if @stock.save
            puts 'STOCK HAS BEEN SAVED'
            render :show
        else
            render json: 'No results found.'
        end
    end

    def update
        @stock = Stock.find(params[:id])
        @stock.update_attributes(stock_params)
    end

    private

    def stock_params
        params.require(:stock).permit(:ticker, :stock_name, :x_values => [], :y_values => [])
    end
end