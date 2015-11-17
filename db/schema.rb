# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151117004408) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "corporates", force: :cascade do |t|
    t.string   "corporate_name",  null: false
    t.string   "email",           null: false
    t.string   "profile_image"
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "corporates", ["corporate_name"], name: "index_corporates_on_corporate_name", unique: true, using: :btree
  add_index "corporates", ["email"], name: "index_corporates_on_email", unique: true, using: :btree

  create_table "deals", force: :cascade do |t|
    t.integer  "corporate_id", null: false
    t.string   "deal_title",   null: false
    t.text     "description",  null: false
    t.integer  "quantity",     null: false
    t.boolean  "expire",       null: false
    t.datetime "expiration",   null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "menu_items", force: :cascade do |t|
    t.integer  "menu_id",     null: false
    t.string   "item_name",   null: false
    t.text     "description", null: false
    t.string   "item_image"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "menu_items", ["item_name"], name: "index_menu_items_on_item_name", using: :btree

  create_table "menus", force: :cascade do |t|
    t.integer  "corporate_id", null: false
    t.text     "description"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.integer  "corporate_id", null: false
    t.text     "description"
    t.integer  "rating",       null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "ratings", ["corporate_id"], name: "index_ratings_on_corporate_id", using: :btree
  add_index "ratings", ["rating"], name: "index_ratings_on_rating", using: :btree
  add_index "ratings", ["user_id"], name: "index_ratings_on_user_id", using: :btree

  create_table "transactions", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.integer  "corporate_id", null: false
    t.integer  "deal_id",      null: false
    t.integer  "amount",       null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "transactions", ["amount"], name: "index_transactions_on_amount", using: :btree
  add_index "transactions", ["corporate_id"], name: "index_transactions_on_corporate_id", using: :btree
  add_index "transactions", ["user_id"], name: "index_transactions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "profile_image"
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
