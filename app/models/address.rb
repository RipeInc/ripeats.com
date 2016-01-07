# == Schema Information
#
# Table name: addresses
#
#  id             :integer          not null, primary key
#  name           :string
#  street_one     :string           not null
#  street_two     :string
#  city           :string           not null
#  state          :string           not null
#  zip_code       :string           not null
#  locatable_id   :integer
#  locatable_type :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Address < ActiveRecord::Base
  belongs_to :locatable, polymorphic: true
end
