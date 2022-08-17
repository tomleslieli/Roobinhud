class Watchlist < ApplicationRecord
    validates :watchlist_owner_id, :watchlist_stock_ticker, presence: true
    validates :watchlist_stock_ticker, uniqueness: { scope: :watchlist_owner_id }

    belongs_to :watchlist_owner,
    class_name: :User,
    foreign_key: 'watchlist_owner_id'
end