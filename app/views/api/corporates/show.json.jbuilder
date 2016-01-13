json.(@corporate, :id, :corporate_name, :description, :email, :profile_image, :corporate_contact)

json.addresses @corporate.addresses do |address|
  json.id address.id
  json.name address.name
  json.street_one address.street_one
  json.street_two address.street_two
  json.city address.city
  json.state address.state
  json.zip_code address.zip_code
  json.lat @location_lat
  json.lng @location_lng
end

json.menu_items @corporate.menu_items do |menu_item|
  json.id menu_item.id
  json.item_name menu_item.item_name
  json.description menu_item.description
  json.item_image menu_item.item_image
  json.original_price menu_item.price
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
    json.deal_image deal.deal_image
    json.price deal.price
    json.menu_item_id deal.menu_item_id
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
    json.id deal.menu_item_id
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

json.transactions @bundlings do |bundling|
  json.transaction_id bundling.transactn.id
  json.deal_id bundling.deal.id
  json.deal_title bundling.deal.deal_title
  json.bundling_id bundling.id
  json.price bundling.price
  json.time bundling.transactn.created_at
  json.user_id bundling.transactn.user_id
  json.username bundling.transactn.user.username
end
