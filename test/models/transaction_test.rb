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

require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
