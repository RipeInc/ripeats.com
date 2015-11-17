class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.integer :corporate_id, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
