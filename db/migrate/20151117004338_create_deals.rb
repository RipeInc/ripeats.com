class CreateDeals < ActiveRecord::Migration
  def change
    create_table :deals do |t|
      t.integer :corporate_id, null: false
      t.string :deal_title, null: false
      t.text :description, null: false
      t.string :deal_image
      t.integer :menu_item_id

      t.integer :quantity, null: false
      t.integer :price, null: false
      t.integer :least_price, null: false
      t.integer :original_price

      t.boolean :expire, null: false
      t.datetime :expiration, null: false

      t.timestamps null: false
    end
  end
end
