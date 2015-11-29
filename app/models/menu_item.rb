class MenuItem < ActiveRecord::Base
  belongs_to(
    :menu,
    foreign_key: :menu_id,
    primary_key: :id,
    class_name: "Menu"
  )
end
