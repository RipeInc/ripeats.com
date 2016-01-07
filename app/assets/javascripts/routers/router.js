RipeCom.Routers.Router = Backbone.Router.extend({
  routes: {
    "main": "showSearch",
    "login": "showLogin",
    "signup": "showSignup"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.$footerEl = options.$footerEl;
    this.showFooter();
  },

  showSearch: function(){
    var searchView = new RipeCom.Views.SplashSearch();
    this._swap(searchView);
  },

  showLogin: function(){
    var loginView = new RipeCom.Views.SplashLogin();
    this._swap(loginView);
  },

  showSignup: function(){
    var signupView = new RipeCom.Views.SplashSignup();
    this._swap(signupView);
  },

  showFooter: function(){
    var footerView = new RipeCom.Views.FooterView();
    this.$footerEl.html(footerView.render().$el);
  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $("#ripe-overlay-field-master").css("display", "none");
    this.$rootEl.html(view.render().$el);
  }
})
