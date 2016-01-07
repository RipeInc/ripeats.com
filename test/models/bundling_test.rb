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

require 'test_helper'

class BundlingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
