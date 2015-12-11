RipeCom.Views.CorporatePastTransactions = Backbone.FusedView.extend({
  template: JST['corporate_past_transactions'],

  events: {

  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.transactions = this.corporate.transactions();
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      transactions: this.transactions
    });
    this.$el.html(content);
    return this;
  }
})
