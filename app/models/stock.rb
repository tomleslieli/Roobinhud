class Stock < ApplicationRecord
    validates :ticker, :stock_name, :x_values, :y_values, presence: true
    validates :ticker, :stock_name, uniqueness: true

    has_many :watchlists,
    foreign_key: 'watchlist_stock_id'

    has_many :portfolios,
    foreign_key: 'portfolio_stock_id'

    has_many :user_portfolios,
    through: :portfolios,
    source: :portfolio_owner

    has_many :user_watchlists,
    through: :watchlists,
    source: :watchlist_owner
end