RipeCom.Collections.DealTransactions = Backbone.Collection.extend({
  url: function(){
    return "/api/deal/" + this.deal.id + "/transactions";
  },

  model: RipeCom.Models.Transaction,

  initialize: function(options){
    this.deal = options.deal;
  },

  parse: function(response){
    this.set(response);
  }
})
