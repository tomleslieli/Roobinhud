class Api::PortfoliosController < ApplicationController
    skip_before_action :verify_authenticity_token

    
    def index
        @portfolios = Portfolio.all
    end

    def create
        @portfolio = Portfolio.new(portfolio_params)
        if @portfolio.save
            render json: 'PURCHASED'
        else
            render json: @portfolio.errors.full_messages, status: 422
        end
    end

    def update
        @portfolio = Portfolio.find(params[:id])
        @portfolio.update(portfolio_params)
    end

    private

    def portfolio_params
        params.require(:portfolio).permit(:portfolio_owner_id, :portfolio_stock_ticker, :total_spent, :quantity)
    end
end
