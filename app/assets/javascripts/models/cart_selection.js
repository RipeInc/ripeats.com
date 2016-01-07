RipeCom.Models.CartSelection = Backbone.Model.extend({
  urlRoot: "/api/cart_selections",

  initialize: function(options){

  },

  parse: function(response){
    this.set(response);
  }
})
