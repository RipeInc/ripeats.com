class CreateBundlings < ActiveRecord::Migration
  def change
    create_table :bundlings do |t|
      t.string :name
      t.integer :transaction_id, null: false
      t.integer :deal_id, null: false

      t.timestamps null: false
    end

    add_index, :bundlings, :transaction_id
    add_index, :bundlings, :deal_id
  end
end
