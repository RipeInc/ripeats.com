RipeCom.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  initialize: function(){

  },

  parse: function(payload){
    this.set(payload);
  }
})
