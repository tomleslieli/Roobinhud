class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :watchlist_owner_id, null: false
      t.string :watchlist_stock_ticker, null: false

      t.timestamps
    end

    add_index :watchlists, :watchlist_owner_id
    add_index :watchlists, :watchlist_stock_ticker
  end
end