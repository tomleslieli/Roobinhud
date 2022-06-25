class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.integer :portfolio_owner_id, null: false
      t.integer :portfolio_stock_id, null: false
      t.integer :quantity, null: false
      
      t.timestamps
    end

    add_index :portfolios, :portfolio_owner_id, unique: true
    add_index :portfolios, :portfolio_stock_id, unique: true
  end
end