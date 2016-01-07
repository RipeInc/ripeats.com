RipeCom.Collections.CorporateDeals = Backbone.Collection.extend({
  url: function(){
    return "/api/search/" + this.zipCode;
  },

  model: RipeCom.Models.Corporate,

  initialize: function(){
  },

  parse: function(response){
    this.set(response);
  },

  changeZip: function(newZip){
    this.zipCode = newZip;
  }
})
