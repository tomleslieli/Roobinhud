class ChangeUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :buying_power
    remove_column :users, :stocks_value
  end
end
