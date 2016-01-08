RipeCom.Collections.DealSelections = Backbone.Collection.extend({
  url: function(){
    return "/api/users/" + this.user.id + "/cart";
  },

  model: RipeCom.Models.Deal,

  initialize: function(options){
    this.user = options.user;
  },

  parse: function(response){
    this.set(response);
  }
})
