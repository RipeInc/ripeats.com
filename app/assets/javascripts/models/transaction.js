RipeCom.Models.Transaction = Backbone.Model.extend({
  urlRoot: "/api/transactions",

  parse: function(response){
    this.set(response);
  }
})
