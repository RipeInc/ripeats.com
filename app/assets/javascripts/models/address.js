RipeCom.Models.Address = Backbone.Model.extend({
  urlRoot: "/api/address",

  parse: function(response){
    this.set(response);
  }
})
