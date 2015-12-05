RipeCom.Collections.ActiveDeals = Backbone.Collection.extend({
  url: function(){
    return "/api/corporate/" + this.corporate.id + "/active_deals";
  },

  model: RipeCom.Models.Deal,

  initialize: function(options){
    this.corporate = options.corporate;
  },

  parse: function(response){
    this.set(response);
  }
})
