RipeCom.Models.Deal = Backbone.Model.extend({
  urlRoot: "/api/deals",

  parse: function(response){
    this.set(response);
    return response;
  }
})
