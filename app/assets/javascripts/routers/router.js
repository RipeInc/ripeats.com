RipeCom.Routers.Router = Backbone.Router.extend({
  routes: {
    "main": "showSearch",
    "login": "showLogin",
    "signup": "showSignup"
  },

  initialize: function(){

  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
