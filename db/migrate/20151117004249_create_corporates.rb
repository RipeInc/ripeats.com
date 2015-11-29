class CreateCorporates < ActiveRecord::Migration
  def change
    create_table :corporates do |t|
      t.string :corporate_name, null: false
      t.string :description
      t.string :email, null: false
      t.string :profile_image

      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps null: false
    end

    add_index :corporates, :corporate_name, unique: true
    add_index :corporates, :email, unique: true
  end
end
