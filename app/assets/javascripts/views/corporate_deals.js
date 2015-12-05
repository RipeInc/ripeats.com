RipeCom.Views.CorporateDeals = Backbone.FusedView.extend({
  template: JST['corporate_deals'],

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
