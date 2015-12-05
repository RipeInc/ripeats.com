RipeCom.Models.Corporate = Backbone.Model.extend({
  urlRoot: "/api/corporates",

  initialize: function(){

  },

  address: function(){
    if(!this._address){
      this._address = new RipeCom.Model.Address
    }
  },

  parse: function(response){

  }
})
