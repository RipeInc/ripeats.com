RipeCom.Views.UserNavBarDashboard = Backbone.FusedView.extend({
  template: JST['user_navbar_dashboard'],

  events: {
    "click $user-deals-tab": "showDeals",
    "click $user-cart-tab": "showCart",
    "click $user-transactions-tab": "showTransactions",
  },

  initialize: function(options){
    this.user = options.user;

    this.listenTo(this.user, 'sync', this.render.bind(this));
  },

  render: function(){
    var content = this.template({
      user: this.user
    });

    this.$el.html(content);

    return this;
  }
})
