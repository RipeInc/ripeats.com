RipeCom.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  initialize: function(){

  },

  parse: function(payload){
    this.set(payload);
  }
})
