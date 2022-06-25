class Portfolio < ApplicationRecord
    validates :portfolio_owner_id, :portfolio_stock_id, :quantity, presence: true
    validates :portfolio_stock_id, uniqueness: { scope: :portfolio_owner_id }
    
    belongs_to :portfolio_owner,
    foreign_key: 'portfolio_owner_id'

    belongs_to :portfolio_item,
    foreign_key: 'portfolio_stock_id'
end