class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :user_id, null: false
      t.integer :corporate_id, null: false
      t.text :description
      t.integer :rating, null: false

      t.timestamps null: false
    end

    add_index :ratings, :user_id
    add_index :ratings, :corporate_id
    add_index :ratings, :rating
  end
end
