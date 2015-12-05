RipeCom.Collections.CorporateRatings = Backbone.Collection.extend({
  url: function(){
    return "/api/corporate/" + this.corporate.id + "/ratings";
  },

  model: RipeCom.Models.Rating,

  initialize: function(options){
    this.corporate = options.corporate;
  },

  parse: function(response){
    this.set(response);
  }
})
