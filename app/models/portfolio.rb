class Portfolio < ApplicationRecord
    validates :portfolio_owner_id, :portfolio_stock_ticker, :quantity, :total_spent, presence: true
    validates :portfolio_stock_ticker, uniqueness: { scope: :portfolio_owner_id }
    
    belongs_to :portfolio_owner,
    class_name: :User,
    foreign_key: 'portfolio_owner_id'
end