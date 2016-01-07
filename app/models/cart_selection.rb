# == Schema Information
#
# Table name: cart_selections
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  deal_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CartSelection < ActiveRecord::Base
  belongs_to(
    :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "User"
  )

  belongs_to(
    :deal,
    foreign_key: :deal_id,
    primary_key: :id,
    class_name: "Deal"
  )

end
