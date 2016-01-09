RipeCom.Views.CorporatePastTransactions = Backbone.FusedView.extend({
  template: JST['corporate_past_transactions'],

  events: {
    "click #refund-deal": "refundDeal",
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.transactions = this.corporate.transactions();

    this.listenTo(this.transactions, 'sync update', this.render.bind(this));
  },

  refundDeal: function(event){
    event.preventDefault();
    var thisView = this;
    var bundlingID = Number(event.currentTarget.dataset.id);
    var transactionID = Number(event.currentTarget.dataset.tid);

    $.ajax({
      url: "/api/bundlings/" + bundlingID,
      method: "DELETE",
      success: function(model, response){
        thisView.transactions.remove(transactionID);
      },

      error: function(model, response){
        debugger;
      }
    })
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      transactions: this.corporate.transactions()
    });
    this.$el.html(content);
    return this;
  }
})
