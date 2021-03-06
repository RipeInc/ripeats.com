class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.integer :corporate_id, null: false

      t.string :item_name, null: false
      t.text :description, null: false
      t.string :item_image
      t.integer :price, null: false

      t.timestamps null: false
    end

    add_index :menu_items, :item_name
  end
end
