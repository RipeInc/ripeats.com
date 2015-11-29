class Bundling < ActiveRecord::Base
  belongs_to(
    :transactn,
    foreign_key: :transaction_id,
    primary_key: :id,
    class_name: "Transaction"
  )

  belongs_to(
    :deal,
    foreign_key: :deal_id,
    primary_key: :id,
    class_name: "Deal"
  )
end
