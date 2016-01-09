RipeCom.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  initialize: function(){

  },

  dealSelections: function(){
    if(!this._dealSelections){
      this._dealSelections = new RipeCom.Collections.DealSelections({
        user: this
      });
      this._dealSelections.reset();
    };
    return this._dealSelections;
  },

  transactions: function(){
    if(!this._transactions){
      this._transactions = new RipeCom.Collections.UserTransactions({
        user: this
      });
      this._transactions.reset();
    };
    return this._transactions;
  },

  parse: function(response){
    var thisModel = this;

    this.set(response);

    if(response.deal_selections){
      thisModel.dealSelections().parse(response.deal_selections);
      delete response.deal_selections;
    };

    if(response.transactions){
      thisModel.transactions().parse(response.transactions);
      delete response.transactions;
    };
  }
})
