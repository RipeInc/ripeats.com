class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :name
      t.string :street_one, null: false
      t.string :street_two
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false

      t.integer :locatable_id, polymorphic: true
      t.string :locatable_type

      t.timestamps null: false
    end

    add_index :addresses, :locatable_id
  end
end
