json.(@user, :id, :username, :email, :profile_image, :created_at)

json.deal_selections @user.deal_selections do |deal_selection|
  json.id deal_selection.id
  json.deal_title deal_selection.deal_title
  json.description deal_selection.description
  json.quantity deal_selection.quantity
  json.time_start deal_selection.created_at
  json.expiration deal_selection.expiration
  json.price deal_selection.price
  json.original_price deal_selection.original_price
  json.least_price deal_selection.least_price
  json.created_at deal_selection.created_at

  json.corporate do
    json.id deal_selection.corporate.id
    json.corporate_name deal_selection.corporate.corporate_name
    json.description deal_selection.corporate.description
    json.profile_image deal_selection.corporate.profile_image
    json.corporate_contact deal_selection.corporate.corporate_contact
  end
end
