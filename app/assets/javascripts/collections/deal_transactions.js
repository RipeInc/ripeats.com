RipeCom.Collections.DealTransactions = Backbone.Collection.extend({
  url: function(){
    return "/api/deal/" + this.deal.id + "/transactions";
  },

  model: RipeCom.Models.Transaction,

  initialize: function(options){
    this.deal = options.deal;
  },

  parse: function(response){
    var thisCollection = this;
    response.forEach(function(r){
      var newModel = new RipeCom.Models.Transaction();
      newModel.parse(r);
      thisCollection.add(newModel);
    });
  }
})
