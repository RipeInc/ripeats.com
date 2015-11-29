class Deal < ActiveRecord::Base
  belongs_to(
    :corporate,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Corporate"
  )  
end
