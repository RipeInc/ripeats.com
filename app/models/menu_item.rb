# == Schema Information
#
# Table name: menu_items
#
#  id           :integer          not null, primary key
#  corporate_id :integer          not null
#  item_name    :string           not null
#  description  :text             not null
#  item_image   :string
#  price        :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class MenuItem < ActiveRecord::Base
  belongs_to(
    :corporate,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Corporate"
  )
end
