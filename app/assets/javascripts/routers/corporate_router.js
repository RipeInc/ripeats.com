RipeCom.Routers.CorporateRouter = Backbone.Router.extend({
  routes: {
  },

  initialize: function(options){
    this.$corporateRoot = options.$corporateRoot;

    var data = $("#corporate-info-header").html().split("\n");
    console.log(data);

    this.main();
  },

  main: function(){
    var $corporateMainView = new RipeCom.Views.CorporateMainView({
      $corporateRoot: this.$corporateRoot,
      user: this.user
    });
    this._swap($corporateMainView);
  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$corporateRoot.html(view.render().$el);
  }
})
