class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.integer :corporate_id, null: false
      t.integer :deal_id, null: false

      t.integer :amount, null: false

      t.timestamps null: false
    end

    add_index :transactions, :user_id
    add_index :transactions, :corporate_id
    add_index :transactions, :amount
  end
end
