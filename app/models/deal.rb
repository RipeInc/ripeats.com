# == Schema Information
#
# Table name: deals
#
#  id             :integer          not null, primary key
#  corporate_id   :integer          not null
#  deal_title     :string           not null
#  description    :text             not null
#  deal_image     :string
#  quantity       :integer          not null
#  price          :integer          not null
#  least_price    :integer          not null
#  original_price :integer
#  expire         :boolean          not null
#  expiration     :datetime         not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

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
