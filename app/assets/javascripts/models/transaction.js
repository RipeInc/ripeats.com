RipeCom.Models.Transaction = Backbone.Model.extend({
  urlRoot: "/api/transactions",

  parse: function(response){
    this.set(response);

    if(response.user){
      this.user().parse(response.user);
      delete response.user
    }

    return response;
  },

  user: function(){
    if(!this._user){
      this._user = new RipeCom.Models.User();
    };
    return this._user;
  }
})
