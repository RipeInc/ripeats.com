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

require 'test_helper'

class DealTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
