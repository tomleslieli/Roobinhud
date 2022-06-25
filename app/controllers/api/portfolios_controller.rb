class Api::PortfoliosController < ApplicationController
    def show
        @portfolio = Portfolio.find(params[:id])
    end

    def create
        @portfolio = Portfolio.new(portfolio_params)
        
        if @portfolio.save
            render 'api/users/show' 
        else
            render json: @portfolio.errors.full_messages, status: 422
        end
    end

    def update
        @portfolio = current_user.portfolios.find(params[:id])
        if @portfolio.update(portfolio_params)
            render 'api/users/show'
        else
            render json: 'Not enough buying power.'
            render 'api/users/show'
        end
    end

    private

    def portfolio_params
        params.require(:portfolio).permit(:portfolio_owner_id, :buying_power, :stocks_value, :stocks_owned)
    end
end
