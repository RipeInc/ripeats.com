json.(@user, :id, :username, :email, :profile_image, :guest, :created_at)

json.deal_selections @user.cart_selections do |cart_selection|
  json.id cart_selection.deal.id
  json.deal_title cart_selection.deal.deal_title
  json.description cart_selection.deal.description
  json.quantity cart_selection.deal.quantity
  json.time_start cart_selection.deal.created_at
  json.expiration cart_selection.deal.expiration
  json.price cart_selection.deal.price
  json.original_price cart_selection.deal.original_price
  json.least_price cart_selection.deal.least_price
  json.created_at cart_selection.deal.created_at
  json.cart_selection_id cart_selection.id

  json.corporate do
    json.id cart_selection.deal.corporate.id
    json.corporate_name cart_selection.deal.corporate.corporate_name
    json.description cart_selection.deal.corporate.description
    json.profile_image cart_selection.deal.corporate.profile_image
    json.corporate_contact cart_selection.deal.corporate.corporate_contact
  end
end

json.transactions @user.transactions do |transaction|
  json.id transaction.id
  json.amount transaction.amount
  json.created_at transaction.created_at

  json.deals transaction.bundlings do |bundling|
    json.price bundling.price
    json.deal_title bundling.deal.deal_title
    json.corporate_name bundling.deal.corporate.corporate_name
    json.corporate_id bundling.deal.corporate.id
  end
end
