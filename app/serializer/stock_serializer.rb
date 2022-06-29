module V1
	class StockSerializer
		include FastJsonapi::ObjectSerializer
		set_key_transform :camel_lower
		attributes :ticker, :stock_name, :x_values, :y_values
	end
end