class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.integer :portfolio_owner_id, null: false
      t.string :portfolio_stock_ticker, null: false
      t.float :quantity, null: false
      t.float :total_spent, null: false
      
      t.timestamps
    end

    add_index :portfolios, :portfolio_owner_id
    add_index :portfolios, :portfolio_stock_ticker
  end
end