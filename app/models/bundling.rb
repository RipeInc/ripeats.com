# == Schema Information
#
# Table name: bundlings
#
#  id             :integer          not null, primary key
#  name           :string
#  transaction_id :integer          not null
#  deal_id        :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

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
