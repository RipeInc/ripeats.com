RipeCom.Models.Deal = Backbone.Model.extend({
  urlRoot: "/api/deals",

  transactions: function(){
    if(!this._transactions){
      this._transactions = new RipeCom.Collections.DealTransactions({
        deal: this
      });
    };
    return this._transactions;
  },

  parse: function(response){
    var thisModel = this;

    thisModel.set(response);
    if(response.transactions){
      this.transactions().parse(response.transactions);
      delete response.transactions;
    }

    return response;
  },

  sold: function(){
    return this.transactions().length;
  },

  left: function(){
    return this.attributes.quantity - this.transactions().length;
  }
})
