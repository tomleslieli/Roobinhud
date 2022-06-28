class AddColumnsUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :buying_power, :integer
    add_column :users, :stocks_value, :integer
  end
end
