# == Schema Information
#
# Table name: corporates
#
#  id                :integer          not null, primary key
#  corporate_name    :string           not null
#  description       :string
#  email             :string           not null
#  profile_image     :string
#  corporate_contact :string
#  password_digest   :string           not null
#  session_token     :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'test_helper'

class CorporateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
