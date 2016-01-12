RipeCom.Views.UserNavBarDashboard = Backbone.FusedView.extend({
  template: JST['user_navbar_dashboard'],

  events: {
    "click #user-deals-tab": "showDeals",
    "click #user-cart-tab": "showCart",
    "click #user-transactions-tab": "showTransactions",
    "click #user-signup-tab": "userSignup",
    "click #user-login-tab": "userLogin",
  },

  initialize: function(options){
    var thisView = this;
    this.user = options.user;
    this.corporateDeals = new RipeCom.Collections.CorporateDeals();
    this.zip_code = options.lastQuery;

    this.listenTo(this.user.dealSelections(), 'sync change update', this.updateNumber.bind(this));
    this.listenTo(this.user, 'sync', this.updateName.bind(this));
    this.listenTo(this.user, 'sync', this.render.bind(this));
  },

  userSignup: function(event){
    event.preventDefault();

    var $modalField = $("#ripe-overlay-field-master");
    var newView = new RipeCom.Views.UserSignupModal();
    $modalField.html(newView.render().$el);
  },

  userLogin: function(event){
    event.preventDefault();

    var $modalField = $("#ripe-overlay-field-master");
    var newView = new RipeCom.Views.UserLoginModal();

    $modalField.html(newView.render().$el);
  },

  updateNumber: function(){
    this.$el.find("#items-in-cart").html(this.user.dealSelections().length);
  },

  updateName: function(){
    this.$el.find("#user-name").html(this.user.attributes.username);
  },

  showDeals: function(event){
    if(event){ event.preventDefault(); };

    var newView = new RipeCom.Views.UserDeals({
      user: this.user,
      corporateDeals: this.corporateDeals,
      zip_code: this.zip_code
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
    if(this._currentView && this._currentView.zip_code){
       this.zip_code = this._currentView.zip_code;
     };
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$el.find("#user-tab-field-main").html(newView.render().$el);
  }
})
