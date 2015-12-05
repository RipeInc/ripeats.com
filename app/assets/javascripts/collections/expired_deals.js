RipeCom.Collections.ExpiredDeals = Bakbone.Collection.extend({
  url: function(){
    return "/api/corporate/" + this.corporate.id + "/expired_deals";
  },

  model: RipeCom.Models.Deal,

  initialize: function(options){
    this.corporate = options.corporate;
  },

  parse: function(response){
    this.set(response);
  }
})
