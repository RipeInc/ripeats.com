# == Schema Information
#
# Table name: transactions
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  amount     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Transaction < ActiveRecord::Base
  belongs_to(
    :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "User"
  )

  has_many(
    :bundlings,
    foreign_key: :transaction_id,
    primary_key: :id,
    class_name: "Bundling"
  )

  has_many(
    :deals,
    through: :bundlings,
    source: :deal
  )

  has_many(
    :corporates,
    through: :deals,
    source: :corporate
  )

end
