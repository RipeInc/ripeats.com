json.deal_selections @deal_selections do |deal_selection|
  json.id deal_selection.id
  json.deal_title deal_selection.deal_title
  json.description deal_selection.description
  json.quantity deal_selection.quantity
  json.time_start deal_selection.created_at
  json.expiration deal_selection.expiration
  json.price deal_selection.price
  json.least_price deal_selection.least_price
  json.created_at deal_selection.created_at
end
