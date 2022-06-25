class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :stock_name, null: false
      t.string :x_values, array: true, default: []
      t.string :y_values, array: true, default: []

      t.timestamps
    end
    add_index :stocks, :ticker, unique: true
    add_index :stocks, :stock_name, unique: true
    add_index :stocks, :x_values
    add_index :stocks, :y_values
  end
end