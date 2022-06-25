# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_25_213243) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "portfolios", force: :cascade do |t|
    t.integer "portfolio_owner_id", null: false
    t.integer "portfolio_stock_id", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["portfolio_owner_id"], name: "index_portfolios_on_portfolio_owner_id", unique: true
    t.index ["portfolio_stock_id"], name: "index_portfolios_on_portfolio_stock_id", unique: true
  end

  create_table "stocks", force: :cascade do |t|
    t.string "ticker", null: false
    t.string "stock_name", null: false
    t.string "x_values", default: [], array: true
    t.string "y_values", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stock_name"], name: "index_stocks_on_stock_name", unique: true
    t.index ["ticker"], name: "index_stocks_on_ticker", unique: true
    t.index ["x_values"], name: "index_stocks_on_x_values"
    t.index ["y_values"], name: "index_stocks_on_y_values"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "full_name", null: false
    t.string "address", null: false
    t.integer "buying_power", null: false
    t.integer "stocks_value", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "watchlists", force: :cascade do |t|
    t.integer "watchlist_owner_id", null: false
    t.integer "watchlist_stock_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["watchlist_owner_id"], name: "index_watchlists_on_watchlist_owner_id", unique: true
    t.index ["watchlist_stock_id"], name: "index_watchlists_on_watchlist_stock_id", unique: true
  end

end
