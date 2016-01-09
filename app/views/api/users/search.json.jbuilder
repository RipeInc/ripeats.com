json.corporates @corporates do |corporate|
  json.corporate_name corporate.corporate_name
  json.description corporate.description
  json.email corporate.email
  json.profile_image corporate.profile_image
  json.corporate_contact corporate.corporate_contact

  json.ratings corporate.ratings do |rating|
    json.rating rating.rating
  end

  json.transactions corporate.transactions do |transaction|
    json.id transaction.id
    json.time transaction.created_at
  end

  json.active_deals corporate.deals do |deal|
    if !deal.expire
      json.id deal.id
      json.deal_title deal.deal_title
      json.description deal.description
      json.quantity deal.quantity
      json.deal_image deal.deal_image
      json.time_start deal.created_at
      json.expiration deal.expiration
      json.price deal.price
      json.original_price deal.original_price
      json.least_price deal.least_price
      json.created_at deal.created_at
    end
  end
end
