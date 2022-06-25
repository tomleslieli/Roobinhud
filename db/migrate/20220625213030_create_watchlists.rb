class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :watchlist_owner_id, null: false
      t.integer :watchlist_stock_id, null: false

      t.timestamps
    end

    add_index :watchlists, :watchlist_owner_id, unique: true
    add_index :watchlists, :watchlist_stock_id, unique: true
  end
end