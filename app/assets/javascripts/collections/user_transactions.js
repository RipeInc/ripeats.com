RipeCom.Collections.UserTransactions = Backbone.Collection.extend({
  url: function(){
    return "/api/users/" + this.user.id + "/transactions";
  },

  model: RipeCom.Models.Transaction,

  initialize: function(options){
    this.user = options.user;
  },

  parse: function(response){
    this.set(response);
  }
})
