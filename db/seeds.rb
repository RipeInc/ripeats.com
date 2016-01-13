# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Corporate.create(corporate_name: "The Bistro", description: "The Bistro is an Italian-American bistro located in the heart of downtown Manhattan, serving the finest food in a sophisticated setting.", email: "thebistro@nyc.com", password: "abcdef", password_verify: "abcdef", profile_image: "https://cdn.filepicker.io/api/file/tANELld4Q3m8xN0JejrY/convert?crop=0,0,195,195");
User.create(username: "Aaron", guest: false, email: "aaron@gmail.com", password: "123456", password_verify: "123456");
User.create(username: "Brian", guest: false, email: "brian@gmail.com", password: "123456", password_verify: "123456");
User.create(username: "Casey", guest: false, email: "casey@gmail.com", password: "123456", password_verify: "123456");

MenuItem.create(corporate_id: 1, item_name: "Southern-Style Buttermilk Fried Chicken", description: "with a blue cheese and bacon-smattered iceberg salad", price: 2000, item_image: "https://cdn.filepicker.io/api/file/eBqpzlIRs2D1MEQLc31z/convert?crop=27,0,440,440");
MenuItem.create(corporate_id: 1, item_name: "Orange-Rosemary Glazed Salmon", description: "on a bed of arugula", price: 2600, item_image: "https://cdn.filepicker.io/api/file/oxfTAkpfS6m4yVY0CZNO/convert?crop=0,0,575,575");
MenuItem.create(corporate_id: 1, item_name: "Filet Mignon with Rich Balsamic Glaze", description: "with warm goat cheese salad and roasted potatoes", price: 3000, item_image: "https://cdn.filepicker.io/api/file/GXO3oGidTSeepaD9H7ri/convert?crop=22,0,795,795");

Deal.create(corporate_id: 1, menu_item_id: 1, deal_title: "Southern-Style Buttermilk Fried Chicken", description: "with a blue cheese and bacon-smattered iceberg salad", quantity: 25, original_price: 2000, price: 1500, least_price: 800, expire: false, expiration: Time.now+86400, deal_image: "https://cdn.filepicker.io/api/file/eBqpzlIRs2D1MEQLc31z/convert?crop=27,0,440,440");
Deal.create(corporate_id: 1, menu_item_id: 2, deal_title: "Orange-Rosemary Glazed Salmon", description: "on a bed of arugula", quantity: 10, original_price: 2600, price: 2000, least_price: 1000, expire: false, expiration: Time.now+86400, deal_image: "https://cdn.filepicker.io/api/file/oxfTAkpfS6m4yVY0CZNO/convert?crop=0,0,575,575");
Deal.create(corporate_id: 1, menu_item_id: 3, deal_title: "Filet Mignon with Rich Balsamic Glaze", description: "with warm goat cheese salad and roasted potatoes", quantity: 10, original_price: 3000, price: 1800, least_price: 1200, expire: false, expiration: Time.now+86400, deal_image: "https://cdn.filepicker.io/api/file/GXO3oGidTSeepaD9H7ri/convert?crop=22,0,795,795");

Rating.create(user_id: 1, corporate_id: 1, description: "This place is nice", rating: 5);
Rating.create(user_id: 2, corporate_id: 1, description: "The delivery was fast.", rating: 4);
Rating.create(user_id: 3, corporate_id: 1, description: "Chicken tastes like beef.", rating: 1);

Address.create(street_one: "80 Washington Square South", city: "New York", state: "NY", zip_code: "10003", locatable_id: 1, locatable_type: "Corporate");




















#
