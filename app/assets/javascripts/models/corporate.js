RipeCom.Models.Corporate = Backbone.Model.extend({
  urlRoot: "/api/corporates",

  initialize: function(){

  },

  address: function(){
    if(!this._address){
      this._address = new RipeCom.Model.Address({
        corporate: this
      });
    }
    return this._address;
  },

  menuItems: function(){
    if(!this._menuItems){
      this._menuItems = new RipeCom.Collection.MenuItems({
        corporate: this
      });
    };
    return this._menuItems;
  },

  activeDeals: function(){
    if(!this._activeDeals){
      this._activeDeals = new RipeCom.Collection.ActiveDeals({
        corporate: this
      });
    };
    return this._activeDeals;
  },

  parse: function(response){

  }
})
