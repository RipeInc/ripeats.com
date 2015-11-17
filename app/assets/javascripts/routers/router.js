RipeCom.Routers.Router = Backbone.Router.extend({
  routes: {
    "main": "showSearch",
    "login": "showLogin",
    "signup": "showSignup"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  showSearch: function(){
    var searchView = new RipeCom.Views.SplashSearch();
    this._swap(searchView);
  },

  showLogin: function(){
  },

  showSignup: function(){
  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
