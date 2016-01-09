json.(@transaction, :id, :amount, :created_at)

json.deals @transaction.bundlings do |bundling|
  json.price  bundling.price
  json.deal_title bundling.deal.deal_title
  json.corporate_name bundling.deal.corporate.corporate_name
end
