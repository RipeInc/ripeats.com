RipeCom.Views.UserNavBarDashboard = Backbone.FusedView.extend({
  template: JST['user_navbar_dashboard'],

  events: {
    "click #user-deals-tab": "showDeals",
    "click #user-cart-tab": "showCart",
    "click #user-transactions-tab": "showTransactions",
  },

  initialize: function(options){
    var thisView = this;
    this.user = options.user;
    this.corporateDeals = new RipeCom.Collections.CorporateDeals();

    this.listenTo(this.user, 'sync', this.updateName.bind(this));
  },

  updateName: function(){
    this.$el.find("#user-name").html(this.user.attributes.username);
  },

  showDeals: function(event){
    if(event){ event.preventDefault(); };
    var newView = new RipeCom.Views.UserDeals({
      user: this.user,
      corporateDeals: this.corporateDeals
    });
    this._swap(newView);
  },

  showCart: function(event){
    event.preventDefault();
    var newView = new RipeCom.Views.UserCart({
      user: this.user
    });
    this._swap(newView);
  },

  showTransactions: function(event){
    event.preventDefault();
    var newView = new RipeCom.Views.UserTransactions({
      user: this.user
    });
    this._swap(newView);
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    this.showDeals();
    return this;
  },

  _swap: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$el.find("#user-tab-field-main").html(newView.render().$el);
  }
})
