# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Corporate.create(corporate_name: "Razynoir", email: "razynoir@gmail.com", password: "abcdef", password_verify: "abcdef");
User.create(username: "Aaron", email: "aaron@gmail.com", password: "123456", password_verify: "123456");
User.create(username: "Brian", email: "brian@gmail.com", password: "123456", password_verify: "123456");
User.create(username: "Casey", email: "casey@gmail.com", password: "123456", password_verify: "123456");
User.create(username: "Dylan", email: "dylan@gmail.com", password: "123456", password_verify: "123456");

MenuItem.create(corporate_id: 1, item_name: "Fried Chicken", description: "Chicken at its finest.", price: 1200);
MenuItem.create(corporate_id: 1, item_name: "Turkey Burger", description: "Burger made with turkey.", price: 800);
MenuItem.create(corporate_id: 1, item_name: "Orange County Buffet", description: "Just a mixture of California stuff", price: 3600);

Deal.create(corporate_id: 1, deal_title: "Orange County Comes to You", description: "Orange County Buffet for sale", quantity: 25, price: 1800, least_price: 1200, expire: false, expiration: Time.now+99999999999);
Deal.create(corporate_id: 1, deal_title: "Chicken Frenzy", description: "Experience this American sensation for a buck", quantity: 10, price: 100, least_price: 1, expire: false, expiration: Time.now+99999999999);
Deal.create(corporate_id: 1, deal_title: "Flying Turkey", description: "Turkey burger for ridiculous low price.", quantity: 6, price: 100, least_price: 1, expire: true, expiration: Time.now+99999999999);

Transaction.create(user_id: 1, amount: 4300);
Transaction.create(user_id: 2, amount: 200);
Transaction.create(user_id: 3, amount: 500);

Bundling.create(transaction_id: 1, deal_id: 1);
Bundling.create(transaction_id: 1, deal_id: 2);
Bundling.create(transaction_id: 2, deal_id: 2);
Bundling.create(transaction_id: 3, deal_id: 3);

Rating.create(user_id: 1, corporate_id: 1, description: "This place is nice", rating: 5);
Rating.create(user_id: 2, corporate_id: 1, description: "The delivery was fast.", rating: 4);
Rating.create(user_id: 3, corporate_id: 1, description: "Chicken tastes like beef.", rating: 1);

Address.create(street_one: "80 Washington Square South", city: "New York", state: "NY", zip_code: "10003", locatable_id: 1, locatable_type: "Corporate");
Address.create(street_one: "70 Washington Square North", city: "New York", state: "NY", zip_code: "10003", locatable_id: 1, locatable_type: "User");
Address.create(street_one: "60 Washington Square West", city: "New York", state: "NY", zip_code: "10003", locatable_id: 2, locatable_type: "User");
Address.create(street_one: "50 Washington Square East", city: "New York", state: "NY", zip_code: "10003", locatable_id: 3, locatable_type: "User");
Address.create(street_one: "40 University Place", city: "New York", state: "NY", zip_code: "10013", locatable_id: 4, locatable_type: "User");




















#
