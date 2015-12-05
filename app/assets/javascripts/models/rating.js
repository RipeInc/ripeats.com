RipeCom.Model.Rating = Backbone.Model.extend({
  urlRoot: "/api/ratings",

  parse: function(response){
    this.set(response);
  }
})
