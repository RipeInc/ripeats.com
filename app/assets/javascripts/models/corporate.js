RipeCom.Models.Corporate = Backbone.Model.extend({
  urlRoot: "/api/corporates",

  initialize: function(){

  },

  address: function(){
    if(!this._address){
      this._address = new RipeCom.Models.Address({
        corporate: this
      });
    }
    return this._address;
  },

  menuItems: function(){
    if(!this._menuItems){
      this._menuItems = new RipeCom.Collections.MenuItems({
        corporate: this
      });
    };
    return this._menuItems;
  },

  activeDeals: function(){
    if(!this._activeDeals){
      this._activeDeals = new RipeCom.Collections.ActiveDeals({
        corporate: this
      });
    };
    return this._activeDeals;
  },

  expiredDeals: function(){
    if(!this._expiredDeals){
      this._expiredDeals = new RipeCom.Collections.ExpiredDeals({
        corporate: this
      });
    };
    return this._expiredDeals;
  },

  ratings: function(){
    if(!this._ratings){
      this._ratings = new RipeCom.Collections.CorporateRatings({
        corporate: this
      });
    };
    return this._ratings;
  },

  transactions: function(){
    if(!this._transactions){
      this._transactions = new RipeCom.Collections.CorporateTransactions({
        corporate: this
      });
    };
    return this._transactions;
  },

  parse: function(response){
    var thisModel = this;

    thisModel.set(response);

    if(response.addresses){
      thisModel.address().parse(response.addresses[0]); // RAZYNOIR-WARNING: this may change in the future due to more than one address
      delete response.addresses;
    };

    if(response.menu_items){
      thisModel.menuItems().parse(response.menu_items);
      delete response.menu_items;
    };

    if(response.active_deals){
      thisModel.activeDeals().parse(response.active_deals);
      delete response.active_deals;
    };

    if(response.expired_deals){
      thisModel.expiredDeals().parse(response.expired_deals);
      delete response.expired_deals;
    };

    if(response.ratings){
      thisModel.ratings().parse(response.ratings);
      delete response.ratings;
    };

    if(response.transactions){
      thisModel.transactions().parse(response.transactions);
      delete response.transactions;
    };

    debugger;
    return response;
  }
})
