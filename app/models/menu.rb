class Menu < ActiveRecord::Base
  belongs_to(
    :corporate,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Corporate"
  )

  has_many(
    :menu_items,
    foreign_key: :menu_id,
    primary_key: :id,
    class_name: "MenuItem"
  )

end
