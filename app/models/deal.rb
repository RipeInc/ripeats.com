class Deal < ActiveRecord::Base
  belongs_to(
    :corporate,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Corporate"
  )

  has_many(
    :bundlings,
    foreign_key: :deal_id,
    primary_key: :id,
    class_name: "Bundling"
  )

  has_many(
    :transactions,
    through: :bundlings,
    source: :transactn
  )
end
