@portfolios.each do |portfolio|
    json.set! portfolio.id do
        json.extract! portfolio, :id, :portfolio_owner_id, :portfolio_stock_ticker, :total_spent, :quantity
    end
end