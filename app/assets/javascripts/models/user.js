RipeCom.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  initialize: function(){

  },

  dealSelections: function(){
    if(!this._dealSelections){
      this._dealSelections = new RipeCom.Collections.DealSelections({
        user: this
      });
    };
    return this._dealSelections;
  },

  parse: function(response){
    var thisModel = this;

    this.set(response);

    if(response.deal_selections){
      thisModel.dealSelections().parse(response.deal_selections);
      delete response.deal_selections;
    };
  }
})
