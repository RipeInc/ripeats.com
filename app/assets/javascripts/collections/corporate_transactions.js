RipeCom.Collections.CorporateTransactions = Backbone.Collection.extend({
  url: function(){
    return "/api/corporate/" + this.corporate.id + "/transactions";
  },

  model: RipeCom.Models.Transaction,

  initialize: function(options){
    this.corporate = options.corporate;
  },

  parse: function(resposne){
    this.set(response);
  }
})
