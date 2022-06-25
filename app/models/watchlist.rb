class Watchlist < ApplicationRecord
    validates :watchlist_owner_id, :watchlist_stock_id, presence: true
    validates :watchlist_stock_id, uniqueness: { scope: :watchlist_owner_id }

    belongs_to :watchlist_owner,
    foreign_key: 'watchlist_owner_id'

    belongs_to :watchlist_item,
    foreign_key: 'watchlist_stock_id'
end