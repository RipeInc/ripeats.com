RipeCom.Views.CorporateDeals = Backbone.FusedView.extend({
  template: JST['corporate_deals'],

  events: {
    "click #remove-deal": "removeDeal",
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.deals = this.corporate.activeDeals();
    this.listenTo(this.corporate, 'sync', this.updateRender);
    this.listenTo(this.deals, 'sync update', this.updateRender);

    this.timeInterval = setInterval(this.updateRender.bind(this), 1000);
  },

  updateRender: function(){
    this.deals = this.corporate.activeDeals();
    this.render();
  },

  removeDeal: function(event){
    event.preventDefault();
    var thisView = this;
    var removeID = Number(event.currentTarget.dataset.dealid);
    var removeDeal = this.deals.where({id: removeID})[0];
    removeDeal.destroy({
      success: function(model, response){

      }
    })
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      deals: this.deals
    });
    this.$el.html(content);
    return this;
  },

  remove: function(){
    clearInterval(this.timeInterval);
  }
})
