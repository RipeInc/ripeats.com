RipeCom.Views.CorporatePastTransactions = Backbone.FusedView.extend({
  template: JST['corporate_past_transactions'],

  events: {

  },

  initialize: function(options){

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
