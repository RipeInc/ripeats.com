RipeCom.Views.CorporateDeals = Backbone.FusedView.extend({
  template: JST['corporate_deals'],

  events: {

  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.deals = this.corporate.activeDeals();
    this.listenTo(this.corporate, 'sync', this.updateRender);
  },

  updateRender: function(){
    this.deals = this.corporate.activeDeals();
    this.render();
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      deals: this.deals
    });
    this.$el.html(content);
    return this;
  }
})
