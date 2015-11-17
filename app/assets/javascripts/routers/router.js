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
    alert('search');
  },

  showLogin: function(){
    alert('login');
  },

  showSignup: function(){
    alert('signup');
  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
