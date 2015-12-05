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
  },

  average: function(){
    if(this._average){ return this._average; };
    var sum = 0;
    this.forEach(function(rating){
      sum += Number(rating.attributes.rating);
    });

    return Math.round((sum*100)/this.length)/100;
  }
})
