RipeCom.Routers.CorporateRouter = Backbone.Router.extend({
  routes: {
  },

  initialize: function(options){
    this.$corporateRoot = options.$corporateRoot;

    if(!$("#corporate-info-header").html()){ return 0; };

    var data = $("#corporate-info-header").html().split("\n");
    var corporateID = Number(data[1].trim());
    this.corporate = new RipeCom.Models.Corporate({
      id: corporateID
    });
    this.corporate.fetch();

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
