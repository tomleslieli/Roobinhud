@stocks.each do |stock|
    json.set! stock.id do
        json.extract! stock, :id, :ticker, :stock_name, :x_values, :y_values, :updated_at
    end
end