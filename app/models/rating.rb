# == Schema Information
#
# Table name: ratings
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  corporate_id :integer          not null
#  description  :text
#  rating       :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Rating < ActiveRecord::Base
end
