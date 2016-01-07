class CreateCartSelections < ActiveRecord::Migration
  def change
    create_table :cart_selections do |t|
      t.integer :user_id, null: false
      t.integer :deal_id, null: false

      t.timestamps null: false
    end
  end
end
