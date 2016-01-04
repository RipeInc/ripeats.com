json.(@corporate, :id, :corporate_name, :description, :email, :profile_image, :corporate_contact)

json.addresses @corporate.addresses do |address|
  json.id address.id
  json.name address.name
  json.street_one address.street_one
  json.street_two address.street_two
  json.city address.city
  json.state address.state
  json.zip_code address.zip_code
end

json.menu_items @corporate.menu_items do |menu_item|
  json.id menu_item.id
  json.item_name menu_item.item_name
  json.description menu_item.description
  json.item_image menu_item.item_image
  json.price menu_item.price
  json.created_at menu_item.created_at
end

json.active_deals @corporate.deals do |deal|
  if !deal.expire
    json.id deal.id
    json.deal_title deal.deal_title
    json.description deal.description
    json.quantity deal.quantity
    json.time_start deal.created_at
    json.expiration deal.expiration
    json.price deal.price
    json.least_price deal.least_price
    json.created_at deal.created_at

    json.transactions deal.transactions do |transaction|
      json.id transaction.id
      json.user_id transaction.user_id
      json.created_at transaction.created_at
    end
  end
end

json.expired_deals @corporate.deals do |deal|
  if deal.expire
    json.id deal.id
    json.deal_title deal.deal_title
    json.description deal.description
    json.quantity deal.quantity
    json.time_start deal.created_at
    json.price deal.price
    json.least_price deal.least_price
    json.created_at deal.created_at

    json.transactions deal.transactions do |transaction|
      json.id transaction.id
      json.user_id transaction.user_id
    end
  end
end

json.ratings @corporate.ratings do |rating|
  json.id rating.id
  json.user_id rating.user_id
  json.description rating.description
  json.rating rating.rating
  json.created_at rating.created_at
end

json.transactions @corporate.transactions do |transaction|
  json.id transaction.id
  json.time transaction.created_at

  json.user do
    json.id transaction.user.id
    json.username transaction.user.username
  end

  json.deals transaction.deals do |deal|
    json.id deal.id
    json.corporate_id deal.corporate_id
    json.deal_title deal.deal_title
    json.price deal.price
    json.least_price deal.least_price
    json.time deal.created_at
  end
end
